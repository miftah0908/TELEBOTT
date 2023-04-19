"use strict";
/*
 * Base ORI By SpyroTech
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//---------- [ MODULES ] ----------\\
var telegraf_1 = require("telegraf");
var openai_1 = require("openai");
require("./settings.js");
//---------- [ CONNECTION ] ----------\\
var configuration = new openai_1.Configuration({ apiKey: AI_TOKEN });
var openai = new openai_1.OpenAIApi(configuration);
var bot = new telegraf_1.Telegraf(BOT_TOKEN);
//---------- [ DATABASE ] ----------\\
global.chatbot = {};
global.imgbot = {};
//---------- [ FUNCTION ] ----------\\
function reply(chatid, message, msgid, opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bot.telegram.sendMessage(chatid, message, __assign({ reply_to_message_id: msgid }, opts))];
        });
    });
}
//---------- [ COMMANDS ] ----------\\
bot.start(function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, messageId, shareText;
    return __generator(this, function (_a) {
        chatId = client.message.chat.id;
        messageId = client.message.message_id;
        client.telegram.sendChatAction(chatId, "typing");
        shareText = "Cobain Nih!!\nChat Bot AI yang akan membantu kamu.\nKirimkan pertanyaan kamu disini, nanti bot akan menjawab pertanyaan kamu.\n\nhttps://t.me/".concat(bot.botInfo.username.toLowerCase());
        reply(chatId, "Hai \u00F0\u0178\u2018\u2039,\n\nSaya adalah Robot AI untuk menjawab pertanyaan anda, Silahkan kirim Pertanyaan kamu, nanti jawaban kamu akan dijawab oleh robot.\n\n_AI (Artificial Intelligence) adalah teknologi yang menggunakan algoritma kompleks untuk membuat mesin yang dapat berpikir dan bertindak seperti manusia. AI dapat digunakan untuk menyelesaikan masalah yang rumit dan membuat keputusan yang lebih tepat daripada manusia. AI juga dapat digunakan untuk menganalisis data dan mengambil keputusan berdasarkan data tersebut. AI juga dapat digunakan untuk meningkatkan produktivitas dan efisiensi, serta membantu manusia dalam menyelesaikan tugas-tugas yang rumit._\n\n_bot dibatasi menjawab maximal ".concat(MAX_TOKEN, " kata_\n\n*Created by @").concat(OWNER_USERNAME, "*"), messageId, { parse_mode: "Markdown", reply_markup: {
                inline_keyboard: [
                    [{ text: 'Owner', url: "https://t.me/".concat(OWNER_USERNAME) }],
                    [{ text: "Share This Bot", url: "https://t.me/share/url?" + new URLSearchParams({ text: shareText }) }]
                ]
            } });
        return [2 /*return*/];
    });
}); });
bot.command('ping', function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, messageId, det, x, dex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = client.message.chat.id;
                messageId = client.message.message_id;
                client.telegram.sendChatAction(chatId, "typing");
                det = new Date;
                return [4 /*yield*/, reply(chatId, "Testing ping...", messageId)];
            case 1:
                x = _a.sent();
                dex = new Date - det;
                client.telegram.editMessageText(chatId, x.message_id, null, "Pong!!!\nSpeed : ".concat(dex < 1000 ? dex : dex / 1000, " ").concat(dex < 1000 ? "ms" : "Seconds"));
                return [2 /*return*/];
        }
    });
}); });
bot.command('img', function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var body, args, userId, chatId, messageId, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = client.message.text || client.message.caption || "";
                args = body.split(" ").slice(1);
                userId = client.message.from.id;
                chatId = client.message.chat.id;
                messageId = client.message.message_id;
                if (!global.imgbot[userId]) {
                    imgbot[userId] = [];
                }
                ;
                imgbot[userId].push(args[0]);
                client.telegram.sendChatAction(chatId, "typing");
                if (!args[0])
                    return [2 /*return*/, reply(chatId, 'Mau buat image apa?', messageId)];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                client.telegram.sendChatAction(chatId, "upload_photo");
                return [4 /*yield*/, openai.createImage({
                        prompt: args[0],
                        n: 1,
                        size: "512x512",
                    })];
            case 2:
                response = _a.sent();
                if (debug)
                    console.log(response.data);
                client.replyWithPhoto({
                    url: response.data.data[0].url,
                    filename: 'openai.jpg',
                    caption: 'Result'
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                reply(chatId, "Server Error, AI Not Responding...", messageId);
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
bot.on('message', function (client) { return __awaiter(void 0, void 0, void 0, function () {
    var body, chatId, userId, messageId, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = client.message.text || client.message.caption || "";
                chatId = client.message.chat.id;
                userId = client.message.from.id;
                messageId = client.message.message_id;
                if (!global.chatbot[userId]) {
                    chatbot[userId] = ["Ai: Aku adalah ".concat(BOT_NAME, " yang dibuat oleh ").concat(OWNER_NAME, "!")];
                }
                ;
                if (!body)
                    return [2 /*return*/];
                client.telegram.sendChatAction(chatId, "typing");
                chatbot[userId].push("Human: ".concat(body));
                chatbot[userId].push("Ai:");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: chatbot[userId].join("\n"),
                        temperature: 0,
                        max_tokens: MAX_TOKEN,
                        stop: ["Ai:", "Human:"],
                        top_p: 1,
                        frequency_penalty: 0.2,
                        presence_penalty: 0,
                    })];
            case 2:
                response = _a.sent();
                if (debug)
                    console.log(response.data);
                reply(chatId, response.data.choices[0].text.trim(), messageId);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                reply(chatId, "Server Error, AI Not Responding...", messageId);
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
bot.launch().then(function (client) {
    console.log("Success Launching This Bot!");
}).catch(function (err) {
    console.log(err);
});
