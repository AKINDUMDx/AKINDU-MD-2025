const axios = require("axios");
const { cmd } = require("../command");

// twitter-hd-dl

const axios = require("axios");

cmd({
  pattern: "twitter",
  alias: ["tweet", "twdl"],
  desc: "Download Twitter video in HD quality",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, {
        text: "❌ Please provide a valid Twitter video URL.",
      }, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '📥', key: m.key }
    });

    const res = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = res.data;

    if (!data?.status || !data.result?.video_hd) {
      return reply("⚠️ Unable to fetch HD video. Please make sure the link is valid.");
    }

    const { desc, video_hd } = data.result;

    await conn.sendMessage(from, {
      video: { url: video_hd },
      caption: `📹 *𝐓𝐖𝐈𝐓𝐓𝐄𝐑 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃* 📹\n\n*☵ 📝 Description : ${desc || "No description\n\n> *𝐀𝐊𝐈𝐍𝐃𝐔 𝐌𝐃*"}`
    }, { quoted: m });

  } catch (err) {
    console.error("Twitter HD DL Error:", err);
    reply("❌ Error while downloading Twitter video. Try again later.");
  }
});