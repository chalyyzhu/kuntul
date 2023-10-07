const menu = `▬▭▬▭▬▭▬▭▬▬▭▬▭▬
⚠  BUG KAMPRET ⚠
▬▭▬▭▬▭▬▭▬▬▭▬▭▬

┏━━⊱                             
┣❏ Hajar  [62xxxxxxxxxxx]
┣❏ Bakar [62xxxxxxxxxxx]
┗━━⊱

▬▭▬▭▬▭▬▭▬▬▭▬▭▬
📵   BOT KUMAHA AING  📵
▬▭▬▭▬▭▬▭▬▬▭▬▭▬`


module.exports = async (wa, m, msg, store) => {
    to = m.chat
    text = m.body
    cmd = text.toLowerCase()

    if (cmd == 'menu'){
        wa.sendText(to, menu)
    }
    else if (cmd == 'ping'){
        wa.sendText(to, "*BOT ACTIVE* >>")
    }


}