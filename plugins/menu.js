const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `
> *👋 Hello* *${pushname}*

> *☵ 🤖 Mode : ${config.MODE}*
> *☵ 🏷️Prefix : ${config.PREFIX}*
> *☵ 👤 Owner : Akindu MD*
> *☵ 🚀 Version : *2.0.0*


*☵ 01. 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔 ⚙*
*☵ 02. 𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔 🔄*
*☵ 03. 𝐀𝐈 𝐌𝐄𝐍𝐔 🤖*
*☵ 04. 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔 🔍*
*☵ 05. 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔📥*
*☵ 06. 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔 📄*
*☵ 07. 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔 👥*
*☵ 08. 𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔 🖇*
⁠

▶ *Reply With The Number With You Want to Select*

> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃*`;

        const vv = await conn.sendMessage(from, { image: { url:config.ALIVE_IMG}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`👤 𝙾𝚆𝙽𝙴𝚁  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 👤

 ◉ *ᴏᴡɴᴇʀ*
 ◉ *ʀᴇᴘᴏ*
 ◉ *ꜱʏꜱᴛᴇᴍ*
 ◉ *ꜱᴛᴀᴛᴜꜱ*
 ◉ *ʙʟᴏᴄᴋ*
 ◉ *ᴜɴʙʟᴏᴄᴋ*
 ◉ *ᴄʟᴇᴀʀᴄʜᴀᴛs*
 ◉ *sᴇᴛᴘᴘ*
 ◉ *ʙʀᴏᴀᴅᴄᴀsᴛ*
 ◉ *ᴊɪᴅ*
 ◉ *ɢᴊɪᴅ*
 ◉ *ʀᴇꜱᴛᴀʀᴛ*
 ◉ *ᴜᴘᴅᴀᴛᴇ*
 ◉ *ᴜᴘᴅᴀᴛᴇᴄᴍᴅ*
 ◉ *sʜᴜᴛᴅᴏᴡɴ*
 ◉ *ᴀʟɪᴠᴇ*
 ◉ *ᴀʙᴏᴜᴛ*
 ◉ *ᴅᴇʟᴇᴛᴇ*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴏᴡɴᴇʀ: 19*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '2':               
                        reply(`🔄 𝙲𝙾𝙽𝚅𝙴𝚁𝚃  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 🔄
                        
 ◉ *ᴛᴀᴋᴇ* 
 ◉ *ᴜʀʟ* 
 ◉ *sᴛɪᴄᴋᴇʀ*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴄᴏɴᴠᴇʀᴛ: 03*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '3':               
                        reply(`🤖 𝙰𝙸  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 🤖

 ◉ *ᴀɪ* 
 ◉ *ᴅᴇᴇᴘꜱᴇᴇᴋ*
 ◉ *ᴏᴘᴇɴᴀɪ*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴀɪ: 03*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '4':               
                        reply(`🔍 𝚂𝙴𝙰𝚁𝙲𝙷  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 🔎
                         
 ◉ *ʏᴛꜱ  <ᴛᴇxᴛ>*
 ◉ *ᴍᴏᴠɪᴇ <ᴛᴇxᴛ>*
 ◉ *ɪᴍɢ <ᴛᴇxᴛ>*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ sᴇᴀʀᴄʜ: 03*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '5':               
                        reply(`📥 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 📥

 ◉ *ᴀᴘᴋ* 
 ◉ *ᴛᴡɪᴛᴛᴇʀ* 
 ◉ *ɢᴏᴏɢʟᴇᴅʀɪᴠᴇ* 
 ◉ *ᴍᴇᴅɪᴀғɪʀᴇ* 
 ◉ *ғᴀᴄᴇʙᴏᴏᴋ*
 ◉ *ɪɴꜱᴛᴀɢʀᴀᴍɢ* 
 ◉ *ᴍᴏᴠɪᴇ*
 ◉ *soɴɢ* 
 ◉ *ᴠɪᴅᴇᴏ*
 ◉ *ᴛɪᴋᴛᴏᴋ*
 ◉ *ɪᴍɢ* 
 ◉ *ᴘʀɪɴᴛᴇʀꜱᴇᴛ*


⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴅᴏᴡɴʟᴏᴀᴅ: 12*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '6':               
                        reply(`📜 𝙼𝙰𝙸𝙽  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 📜

 ◉ *ᴀʟɪᴠᴇ* 
 ◉ *ᴀʙᴏᴜᴛ* 
 ◉ *ᴍᴇɴᴜ* 
 ◉ *ᴀʟʟᴍᴇɴᴜ*  
 ◉ *ꜱʏꜱᴛᴇᴍ* 
 ◉ *ᴘɪɴɢ* 

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴍᴀɪɴ: 06*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '7':               
                        reply(`👥 𝙶𝚁𝙾𝚄𝙿  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 👥

◉ *ᴘʀᴏᴍᴏᴛᴇ*
◉ *ᴅᴇᴍᴏᴛᴇ*
◉ *ᴋɪᴄᴋ*
◉ *ᴀᴅᴅ*
◉ *ɢᴇᴛᴘɪᴄ*
◉ *sᴇᴛᴡᴇʟᴄᴏᴍᴇ*
◉ *sᴇᴛɢᴏᴏᴅʙʏᴇ*
◉ *ᴀᴅᴍɪɴs*
◉ *ɢɴᴀᴍᴇ* 
◉ *ᴛᴀɢᴀʟʟ* 
◉ *ᴛᴀɢᴀᴅᴍɪɴ* 
◉ *ᴏᴘᴇɴᴛɪᴍʀ/ᴄʟᴏsᴇᴛɪᴍᴇ*
◉ *ɢɪɴғᴏ*
◉ *ɢʟɪɴᴋ* 
◉ *ɢᴅᴇsᴄ*
◉ *ᴍᴜᴛᴇ*
◉ *ᴜɴᴍᴜᴛᴇ*
◉ *ʟᴏᴄᴋ*
◉ *ᴜɴʟᴏᴄᴋ*
◉ *ᴅᴇʟᴇᴛᴇ*
◉ *ᴋɪᴄᴋᴀʟʟ*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ɢʀᴏᴜᴘ: 21*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);
                        break;
                    case '8':               
                        reply(`*🧚‍♂️ 𝙾𝚃𝙷𝙴𝚁  𝙲𝙾𝙼𝙼𝙰𝙽𝙳  𝙻𝙸𝚂𝚃 🧚‍♂️*
                        
◉ *sᴀᴠᴇ*
◉ *ᴘᴀɪʀ <ᴘᴜᴛ ᴜʀ #>*

⭓ *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ ᴏᴛʜᴇʀ 02*

> *ᴀᴋɪɴᴅᴜ ᴍᴅ*`);


                       break;
                    default:
                        reply("ᴘʟᴇᴀꜱᴇ ꜱᴇʟᴇᴄᴛ ᴠᴀʟɪᴅ ᴏᴘᴄᴛɪᴏɴ 🤖");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
