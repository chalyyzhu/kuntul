const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const moment = require('moment-timezone')
const { buttonkal } = require('../virtex/buttonkal')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")


module.exports = async (wa, m, msg, store) => {
    to = m.chat
    text = m.body
    cmd = text.toLowerCase()
    if (cmd.startsWith("!")){
        let sep = text.split('\n');
        let texts = text.replace(sep[0] + '\n', '');
        console.log(texts)
        const codeFormat = (texts) => "\n" + text + "\n";
        const print = async function(texts){
            await wa.sendText(to, util.format(texts));
        }
        const jsonFormat = async function(texts){
            await (JSON.stringify(texts, null, 2));
        }
        
        f = `(async () => {
            try {
                ${texts}
            } catch (e){
                await wa.sendText(to, util.format(e))
            }
        })()`
        try {
            eval(f)
        }catch(e) {
            await wa.sendText(to, codeFormat(String(e.stack)))
        }
    }
}