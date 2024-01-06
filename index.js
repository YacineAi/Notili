const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.TELETOKEN);
const affData = require("./afflinker.js");


bot.start((ctx) => {
  ctx.reply('Welcome to your Telegram bot! Send me a message.');
});

bot.help((ctx) => {
  ctx.reply('This is a simple Telegram bot. You can interact with it by sending messages.');
});

bot.on('text', (ctx) => {
  console.log(ctx.message.from);
  // ctx.message.text
  ctx.reply('Searching...')
  .then((message) => {
    affData.getData(ctx.message.text)
    .then((coinPi) => {
      console.log("coinPi : ", coinPi)
      ctx.deleteMessage(message.message_id)
      .then(() => {
        ctx.replyWithPhoto({ url: coinPi.info.normal.image },
          // coinPi.info.limited.price
        {
          caption: `------ « تخفيض الاسعار 🎉 » ------\n Name\n الشحن : ${coinPi.info.normal.name}\n إسم المتجر : ${coinPi.info.normal.store}\n تقييم المتجر : ${coinPi.info.normal.storeRate}\n ----- | ✨ التخفيضات ✨ | -----\n السعر الاصلي :\n ${coinPi.info.normal.discountPrice}\n تخفيض العملات :\n ${coinPi.info.points.discount}\n تخفيض السوبر :\n ${coinPi.info.super.price}\n تخفيض العرض المحدود : ${coinPi.info.limited.price}`,
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            Markup.button.callback("زر عادي", "plain"),
            Markup.button.url("زر رابط", "https://www.npmjs.com/"),
          ])
        });
      })

    });
  });
});

bot.launch({ webhook: { domain: process.env.RENDER_EXTERNAL_URL, port: process.env.PORT } })
.then(() => {
    console.log('Bot is running');
})
.catch((error) => {
    console.error('Error starting the bot:', error);
});