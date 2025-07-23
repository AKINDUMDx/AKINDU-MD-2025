const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/AKINDU-WHATSAPP-BOT/AKINDU-MD-2025';

    try {
        // Extract username and repo name
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // GitHub API fetch
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API request failed with status ${response.status}`);

        const repoData = await response.json();

        // Format the info
        const formattedInfo = `*🪀 𝐆𝐈𝐓𝐇𝐔𝐁 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘 𝐈𝐍𝐅𝐎 🪀*
        
*☵ 📦 Bot Name : ${repoData.name}*
*☵ 👤 Owner : ${repoData.owner.login}*
*☵ ⭐ Stars : ${repoData.stargazers_count}*
*☵ 🍴 Forks : ${repoData.forks_count}*
*☵ 🔗 Link : ${repoData.html_url}*
*☵ 📝 Description : ${repoData.description || 'No description'}*

> Don't forget to ★ Star & Fork!

> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃*`;

        // Send image & caption
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/wqp3y9.jpg' },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Error fetching repository info. Please try again later.");
    }
});