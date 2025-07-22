const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

// Date & greeting based on Sri Lanka timezone
const getGreeting = () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });
    const hour = new Date(now).getHours();

    if (hour < 12) return "Good Morning 🌅";
    if (hour < 17) return "Good Afternoon ☀️";
    if (hour < 20) return "Good Evening 🌇";
    return "Good Night 🌙";
};

const getSriLankaTime = () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });
    const date = new Date(now);
    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
};

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const greeting = getGreeting();
        const sriLankaTime = getSriLankaTime();

        const status = `
╭───〔 *🤖 ${config.BOT_NAME} STATUS* 〕───◉
│✨ *${greeting}*
│📅 *Date & Time:* ${sriLankaTime}
│
│🧠 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 4.0.0
│📝 *Prefix:* [${config.PREFIX}]
│📳 *Mode:* [${config.MODE}]
│💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *Host:* ${os.hostname()}
│⌛ *Uptime:* ${runtime(process.uptime())}
╰────────────────────◉
> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
