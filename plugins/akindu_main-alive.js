const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');
const moment = require('moment-timezone');

// Time-based greeting messages
const timeGreetings = {
    morning: [
        "☀️ Good morning !" 
    ],
    afternoon: [
        "🌞 Good afternoon !"
    ],
    evening: [
        "🌇 Good evening !"
    ],
    night: [
        "🌜 Good night !"
    ]
};

cmd({
    pattern: "alive",
    alias: ["status", "hi", "hello"],
    react: "🤖",
    desc: "Get time-based greeting with Sri Lanka time",
    category: "core",
    filename: __filename
},
async(conn, mek, m, {from, pushname, reply}) => {
    try {
        // Get current time in Sri Lanka
        const now = moment().tz('Asia/Colombo');
        const currentHour = now.hour();
        const currentTime = now.format('hh:mm:ss A');
        const currentDate = now.format('dddd, MMMM D, YYYY');
        
        // Determine time of day
        let timeOfDay;
        let greetingPool;
        
        if (currentHour < 12) {
            timeOfDay = "morning";
            greetingPool = timeGreetings.morning;
        } else if (currentHour < 17) { // 12pm-5pm
            timeOfDay = "afternoon";
            greetingPool = timeGreetings.afternoon;
        } else if (currentHour < 21) { // 5pm-9pm
            timeOfDay = "evening";
            greetingPool = timeGreetings.evening;
        } else { // 9pm-12am
            timeOfDay = "night";
            greetingPool = timeGreetings.night;
        }
        
        // Select random greeting for the time period
        const randomGreeting = greetingPool[Math.floor(Math.random() * greetingPool.length)]
            .replace('{name}', pushname.split(' ')[0]);
        
        // Simplified status message
        const statusMessage = `*🤖 ${config.BOT_NAME} 𝐀𝐋𝐈𝐕𝐄 🤖*

> ✨ *Bot is Active & Online!*

*👋 Hello *${pushname}* *${randomGreeting}*

*☵ 🕓 Time : ${currentTime}*

*☵ 📆 Date : ${currentDate}*

*☵ 🧠 Owner : ${config.OWNER_NAME}*

*☵ ⚡ Version : 2.0.0*

*☵ 📝 Prefix : ${config.PREFIX}*

*☵ 📳 Mode : ${config.MODE}*

*☵ 💾 Ram : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB*

*☵ 🖥 Host : ${os.hostname()}*

*☵ ⌛ Uptime : ${runtime(process.uptime())}*

> *${config.DESCRIPTION}*`;

        // Send message with image or fallback to text
        const opts = {
            quoted: mek
        };

        if (config.ALIVE_IMG) {
            opts.image = { url: config.ALIVE_IMG };
            opts.caption = statusMessage;
        } else {
            opts.text = statusMessage;
        }

        await conn.sendMessage(from, opts);

    } catch (error) {
        console.error('[ALIVE ERROR]', error);
        try {
            await reply('⚠️ Oops! Something went wrong. Please try again.');
        } catch (fallbackError) {
            console.error('[FALLBACK ERROR]', fallbackError);
        }
    }
});

// Command metadata
commands.alive = {
    name: "Greeting",
    desc: "Shows time-based greeting with Sri Lanka time",
    usage: `.alive - Time-based greeting
.status/.ping/.hi/.hello - Same as alive`,
    category: "core"
};