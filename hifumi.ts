/*
 * Base ORI By SpyroTech
 */

//---------- [ MODULES ] ----------\\

import { Telegraf } from 'telegraf';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import './settings.js'
//---------- [ CONNECTION ] ----------\\

const configuration = new Configuration({apiKey: AI_TOKEN });
const openai = new OpenAIApi(configuration);
const bot = new Telegraf(BOT_TOKEN);

//---------- [ DATABASE ] ----------\\

global.chatbot = {};
global.imgbot ={};

//---------- [ FUNCTION ] ----------\\

async function reply(chatid, message, msgid, opts) {
    return bot.telegram.sendMessage(chatid, message, { reply_to_message_id: msgid, ...opts });
}

//---------- [ COMMANDS ] ----------\\

bot.start(async(client) => {
    const chatId = client.message.chat.id;
    const messageId = client.message.message_id;
client.telegram.sendChatAction(chatId, "typing");
	let shareText = `Cobain Nih!!\nChat Bot AI yang akan membantu kamu.\nKirimkan pertanyaan kamu disini, nanti bot akan menjawab pertanyaan kamu.\n\nhttps://t.me/${bot.botInfo.username.toLowerCase()}`;
    reply(chatId, `Hai ðŸ‘‹,\n\nSaya adalah Robot AI untuk menjawab pertanyaan anda, Silahkan kirim Pertanyaan kamu, nanti jawaban kamu akan dijawab oleh robot.\n\n_AI (Artificial Intelligence) adalah teknologi yang menggunakan algoritma kompleks untuk membuat mesin yang dapat berpikir dan bertindak seperti manusia. AI dapat digunakan untuk menyelesaikan masalah yang rumit dan membuat keputusan yang lebih tepat daripada manusia. AI juga dapat digunakan untuk menganalisis data dan mengambil keputusan berdasarkan data tersebut. AI juga dapat digunakan untuk meningkatkan produktivitas dan efisiensi, serta membantu manusia dalam menyelesaikan tugas-tugas yang rumit._\n\n_bot dibatasi menjawab maximal ${MAX_TOKEN} kata_\n\n*Created by @${OWNER_USERNAME}*`, messageId, { parse_mode: "Markdown", reply_markup: {
        inline_keyboard: [
            [{ text: 'Owner', url: `https://t.me/${OWNER_USERNAME}`}],
            [{ text: "Share This Bot", url: "https://t.me/share/url?"+new URLSearchParams({ text: shareText }) }]
        ]
    }});
});

bot.command('ping', async (client) => {
    const chatId = client.message.chat.id;
    const messageId = client.message.message_id;
client.telegram.sendChatAction(chatId, "typing");
    var det = new Date
    var x = await reply(chatId, "Testing ping...", messageId)
    var dex = new Date - det
    client.telegram.editMessageText(chatId, x.message_id, null, `Pong!!!\nSpeed : ${dex < 1000 ? dex : dex / 1000} ${dex < 1000 ? "ms" : "Seconds"}`);
});
bot.command('img', async (client) => {
let body = client.message.text || client.message.caption || "";
let args = body.split(" ").slice(1);
let userId = client.message.from.id;
let chatId = client.message.chat.id;
let messageId = client.message.message_id;
if (!global.imgbot[userId]) {
        imgbot[userId] = [];
    };
imgbot[userId].push(args[0])
client.telegram.sendChatAction(chatId, "typing");
if(!args[0]) return reply(chatId, 'Mau buat image apa?', messageId)
try {
client.telegram.sendChatAction(chatId, "upload_photo");
const response = await openai.createImage({
  prompt: args[0],
  n: 1,
  size: "512x512",
});
if (debug) console.log(response.data);
          client.replyWithPhoto({
    url: response.data.data[0].url,
    filename: 'openai.jpg',
caption: 'Result'
  });
         } catch (e) {
            console.log(e);
            reply(chatId, "Server Error, AI Not Responding...", messageId);
        } ;
})
bot.on('message', async (client) => {
    let body = client.message.text || client.message.caption || "";
    let chatId = client.message.chat.id;
    let userId = client.message.from.id;
    let messageId = client.message.message_id;
    if (!global.chatbot[userId]) {
        chatbot[userId] = [`Ai: Aku adalah ${BOT_NAME} yang dibuat oleh ${OWNER_NAME}!`];
    };
    if (!body) return 
    client.telegram.sendChatAction(chatId, "typing");
    chatbot[userId].push(`Human: ${body}`)
    chatbot[userId].push(`Ai:`)
    try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: chatbot[userId].join("\n"),
                temperature: 0,
                max_tokens: MAX_TOKEN,
                stop: ["Ai:", "Human:"],
                top_p: 1,
                frequency_penalty: 0.2,
               presence_penalty: 0,
          });
          if (debug) console.log(response.data);
          reply(chatId, response.data.choices[0].text.trim(), messageId);
         } catch (e) {
            console.log(e);
            reply(chatId, "Server Error, AI Not Responding...", messageId);
        } ;
});

bot.launch().then((client) => {
    console.log("Success Launching This Bot!");
}).catch((err) => {
    console.log(err);
});