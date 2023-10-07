const { default: makeWASocket, Browsers, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/func')
const fs = require('fs')
const pino = require('pino')
const path = require('path')
const axios = require('axios')
const chalk = require('chalk');
const FileType = require('file-type')
const { Boom } = require('@hapi/boom')
const NodeCache = require('node-cache')
const prompt = require('prompt-sync')();
const express = require("express")
const command_path = './commands'
const command_files = fs.readdirSync(command_path)



SELF_BOT = false
auto_join = 'Cxd74axG8lr7fNKT7CsQWK'
ses = './session/'+process.argv[2]



const startSock = async() => {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
    const { state, saveCreds } = await useMultiFileAuthState(ses)
    const wa = makeWASocket({
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
		printQRInTerminal: true,
		auth: state,
		generateHighQualityLinkPreview: true,
    })

    wa.decodeJid = (jid) => {
      if (!jid) return jid
      if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
      } else return jid
    }

  
	
    //=================================================//
    wa.ev.on('messages.upsert', async msg => {
        mek = msg.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!mek.key.fromMe && msg.type === 'notify' && SELF_BOT) return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        if ( auto_join && mek.key.remoteJid !== wa.my_group) return
        m = smsg(wa, mek, store)
        if (m.mtype == "conversation" || m.mtype == "extendedTextMessage"){
          command_files.forEach(file => {
            if (!file.endsWith('.js')){
                return
            }
            require(command_path + `/${file}`)(wa, m, msg, store);
          })


        }
    })

    //=================================================//
    
    wa.ev.on('creds.update', saveCreds)

    //=================================================//

    wa.ev.on("connection.update", async (update) => {
        const { version, isLatest } = await fetchLatestBaileysVersion()
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
          let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
          if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            process.exit();
          } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            startSock();
          } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            startSock();
          } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
            process.exit();
          } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Delete Folder Session [  ${ses}  ] and Scan Again.`);
            process.exit();
          } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            startSock();
          } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            startSock();
          } else {
            console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
            startSock();
          }
        } else if (connection === "open") {
          if (auto_join){
              const response = await wa.groupAcceptInvite(auto_join)
              wa.sendText(response, `INFO >>\n\nBOT STARTED IN SESSION [  ${ses}  ]`)
              wa.my_group = response
              console.log("joined to: " + response)
          }
          console.log(
                chalk.green(
                    `✅ Koneksi Ke Server Terhubung, Bot  Siap Digunakan.`
                )
            );
        }
    })


    wa.sendText = (jid, text, quoted = '', options) => wa.sendMessage(jid, { text: text, ...options }, { quoted })
}
startSock()


