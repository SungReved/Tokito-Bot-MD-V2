import axios from "axios";

// تعريف دالة delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) return m.reply(`*❌ Access Denied*\n\n* Example: ${usedPrefix + command} kereta api`);

  try {
    const { data } = await axios.get("https://api.wzblueline.xyz/api/ai/bing-image?prompt=" + encodeURIComponent(text), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "trialkey1mnth" // مفتاح API الخاص بك
      }
    });

    const imageLinks = data.value;
    m.reply(`تم العثور على ${imageLinks.length}/4 صورة\n\n*\`\`*`);

    let fek = 0;
    for (const i of imageLinks) {
      fek += 1;
      await conn.sendFile(m.chat, i.contentUrl, "", `صورة من BING\nالصورة: ${fek}/4`, m);
    }
  } catch (error) {
    await m.reply(`خطأ: ${error.message}`);
  }
};

handler.help = ["bingimg", "bingart"];
handler.tags = ["ai", "txt to image"];
handler.command = /^(bing(img)?(art))$/i;

export default handler;
