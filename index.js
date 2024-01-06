const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.TELETOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome to your Telegram bot! Send me a message.');
});

bot.help((ctx) => {
  ctx.reply('This is a simple Telegram bot. You can interact with it by sending messages.');
});

bot.on('text', (ctx) => {
  console.log(ctx.message.from);
  ctx.reply('This message will be deleted in 5 seconds')
  .then((message) => {
    setTimeout(() => {
      ctx.deleteMessage(message.message_id).then(() => {
        ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" },
        {
          caption: "This is a simple URL: https://www.npmjs.com/\nThis is a URL that is displayed as a word: [npm](https://www.npmjs.com/package/telegraf)",
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            Markup.button.callback("Plain", "plain"),
            Markup.button.url("Italic", "https://www.npmjs.com/"),
          ])
        });
      })
    }, 5000)
  });
});

bot.launch({ webhook: { domain: process.env.RENDER_EXTERNAL_URL, port: process.env.PORT } })
.then(() => {
    console.log('Bot is running');
})
.catch((error) => {
    console.error('Error starting the bot:', error);
});