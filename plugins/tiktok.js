const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tt",
    alias: ["tiktok", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("*`Please provide a TikTok video link.`*");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `📹 *𝐓𝐈𝐊 𝐓𝐎𝐊 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃* 📹
 
*☵ 👤 User : ${author.nickname}(${author.username})*

*☵ 📖 Title :* *${title}*

*☵ 👍 Likes : ${like}*

*☵ 💬 Comments : ${comment}*

*☵ 🔁 Shares : ${share}*

> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃*`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});