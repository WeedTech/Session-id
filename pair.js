const { makeid } = require('./gen-id'); const express = require('express'); const fs = require('fs'); let router = express.Router(); const pino = require("pino"); const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys'); const { upload } = require('./mega');

function removeFile(FilePath) { if (!fs.existsSync(FilePath)) return false; fs.rmSync(FilePath, { recursive: true, force: true }); }

router.get('/', async (req, res) => { const id = makeid(); let num = req.query.number;

async function GIFTED_MD_PAIR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
    try {
        var items = ["Safari"];
        var randomItem = items[Math.floor(Math.random() * items.length)];

        let sock = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
            },
            printQRInTerminal: false,
            generateHighQualityLinkPreview: true,
            logger: pino({ level: "fatal" }).child({ level: "fatal" }),
            syncFullHistory: false,
            browser: Browsers.macOS(randomItem)
        });

        if (!sock.authState.creds.registered) {
            await delay(1500);
            num = num.replace(/[^0-9]/g, '');
            const code = await sock.requestPairingCode(num);
            if (!res.headersSent) {
                await res.send({ code });
            }
        }

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on("connection.update", async (s) => {
            const { connection, lastDisconnect } = s;

            if (connection == "open") {
                await delay(5000);
                let rf = `./temp/${id}/creds.json`;
                const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                const string_session = mega_url.replace('https://mega.nz/file/', '');
                let md = "PEACE~" + string_session;

                let code = await sock.sendMessage(sock.user.id, { text: md });

                const kenyaTime = new Date().toLocaleTimeString('en-KE', { timeZone: 'Africa/Nairobi' });
                const kenyaDate = new Date().toLocaleDateString('en-KE', { timeZone: 'Africa/Nairobi' });

                let desc = `🟢  *ʙᴏᴛ sᴜᴄᴄᴇssғᴜʟʟʏ ᴄᴏɴɴᴇᴄᴛᴇᴅ 🟢!*
                
╭━━ 『 ᴘᴇᴀᴄᴇ-ᴍᴅ ɪɴɪᴛɪᴀʟɪᴢᴇᴅ 』\n┃  ⚡ ʙᴏᴛ ɴᴀᴍᴇ: ᴘᴇᴀᴄᴇᴍᴅ \n┃  👑 ᴏᴡɴᴇʀ: ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ \n┃  ⚙️ ᴍᴏᴅᴇ: *private*\n┃  🎯 ᴘʀᴇꜰɪx: *.*\n┃  ⏳ ᴛɪᴍᴇ: *${kenyaTime}*\n┃  📆 ᴅᴀᴛᴇ: ${kenyaDate}\n╰━━━━━━━━━━━━━━━━━━━╯\n\n⚠️ ʀᴇᴘᴏʀᴛ ᴀɴʏ ɢʟɪᴛᴄʜᴇꜱ ᴅɪʀᴇᴄᴛʟʏ ᴛᴏ ᴛʜᴇ ᴏᴡɴᴇʀ.\n\n╭──────────────────★\n│ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ᴍᴅ\n╰──────────────────★\n📢 𝐂ʜᴀɴɴᴇʟ: Click Here(https://whatsapp.com/channel/0029VbA9YD323n3ko5xL7J1e) }\n🛠️ 𝐃ᴇᴘʟᴏʏ 𝐘ᴏᴜʀ 𝐁ᴏᴛ: GitHub Repo(https://github.com/Peacemaker-cyber/PEACE-MD)\n
🔋  𝐒ʏꜱᴛᴇᴍ 𝐒ᴛᴀᴛᴜꜱ: ▓▓▓▓▓▓▓▓▓▓ 100% 🧐  𝐀.I 𝐑ᴇᴀᴅʏ • 𝐌ᴜʟᴛɪ 𝐃ᴇᴠɪᴄᴇ • 𝐒ᴛᴀʙʟᴇ 𝐑ᴇʟᴇᴀꜱᴇ\n`;

await sock.sendMessage(sock.user.id, {
                    text: desc,
                    contextInfo: {
                        externalAdReply: {
                            title: "ᴘᴇᴀᴄᴇ ᴍᴅ💚",
                            thumbnailUrl: "https://files.catbox.moe/er8ksj",
                            sourceUrl: "https://github.com/Peacemaker-cyber/PEACE-MD",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, { quoted: code });

                await delay(10);
                await sock.ws.close();
                await removeFile('./temp/' + id);
                console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);
                await delay(10);
                process.exit();
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                await delay(10);
                GIFTED_MD_PAIR_CODE();
            }
        });
    } catch (err) {
        console.log("service restated");
        await removeFile('./temp/' + id);
        if (!res.headersSent) {
            await res.send({ code: "❗ Service Unavailable" });
        }
    }
}
return await GIFTED_MD_PAIR_CODE();

});

module.exports = router;
