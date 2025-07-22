const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅",
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        if (!ownerName || !ownerNumber) {
            return reply("❌ Owner details not configured properly.");
        }

        const waOwnerNumber = ownerNumber.replace('+', '');

        // Create vCard
        const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${waOwnerNumber}:${ownerNumber}
END:VCARD
        `.trim();

        // Send contact card
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

        // Send decorated image message
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/wqp3y9.jpg' },
            caption: `*👤 𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃 𝐎𝐖𝐍𝐄𝐑 👤*

*☵ 👑 Name : ${ownerName}*

*☵ 📞 Number : ${ownerNumber}*

*☵ 🧪 Version :  2.0.0*

*☵ 🔧 Type : Developer & Bot Owner*

✨ *Contact has been shared above.*
🔗 *Reach out for collaborations, issues, or support.*
⚡ *Thank you for using 𝐀𝐊𝐈𝐍𝐃𝐔-𝐌𝐃 !*

> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃*`,
            contextInfo: {
                mentionedJid: [`${waOwnerNumber}@s.whatsapp.net`]
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`❌ An error occurred: ${error.message}`);
    }
});