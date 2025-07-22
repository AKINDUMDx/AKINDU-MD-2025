const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for Akindu-MD Bot",
    category: "download",
    use: ".pair +94000000000",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim() : senderNumber;
        
        // Validate phone number format
        if (!phoneNumber || !phoneNumber.match(/^\+?\d{10,15}$/)) {
            return await reply("❌ Please provide a valid phone number with country code\nExample: .pair +94760000000");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://akindu-md-pair.onrender.com/pair=${encodeURIComponent(phoneNumber)}`);
        
        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        const doneMessage = "> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃 𝐏𝐀𝐈𝐑𝐈𝐍𝐆 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃*";

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*Your pairing code is :* ${pairingCode}`);

        // Add 2 second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code message
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});