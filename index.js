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
          // ${coinPi.aff.normal} / limited / super / points /
          // ${coinPi.info.super.price}
        {
          
          caption: `
          <b>« تخفيض الاسعار 🎉 »</b>
          ${coinPi.info.normal.name}
          <b>الشحن</b>: ${coinPi.info.normal.shipping}
          <b>إسم المتجر</b>: ${coinPi.info.normal.store}
          <b>تقييم المتجر</b>: ${coinPi.info.normal.storeRate}
          <b>----------- | ✨ التخفيضات ✨ | -----------</b>
          <b>السعر الاصلي</b>(${coinPi.info.normal.discountPrice}) :
          <a href="${coinPi.aff.normal}">اضغط هنا</a>
          <b>تخفيض العملات</b>(${coinPi.info.points.discount}) :
          <a href="${coinPi.aff.points}">اضغط هنا</a>
          <b>تخفيض السوبر</b>(${coinPi.info.super.price}) :
          <a href="${coinPi.aff.super}">اضغط هنا</a>
          <b>تخفيض العرض المحدود</b> (${coinPi.info.limited.price}) :
          <a href="${coinPi.aff.limited}">اضغط هنا</a>
          `,
          parse_mode: "HTML",
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