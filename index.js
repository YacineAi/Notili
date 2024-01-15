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
          
          caption: `<b>-----------✨ تخفيض الاسعار ✨-----------</b>\n<code>اضغط للنسخ</code>\n<ol><li>العنصر 1</li><li>العنصر 2</li></ol>\n${coinPi.info.normal.name}.\n\n<b>الشحن</b> : ${coinPi.info.normal.shipping}.\n<b>إسم المتجر</b> : ${coinPi.info.normal.store}.\n<b>تقييم المتجر</b> : ${coinPi.info.normal.storeRate}.\n<b>----------- |✨ التخفيضات ✨| -----------</b>\n\n<b>السعر الاصلي</b> : (${coinPi.info.normal.discountPrice})\n${coinPi.aff.normal}\n\n<b>تخفيض العملات</b> : (${coinPi.info.points.discount})\n${coinPi.aff.points}\n\n<b>تخفيض السوبر</b> : (${coinPi.info.super.price})\n${coinPi.aff.super}\n\n<b>تخفيض العرض المحدود</b> : (${coinPi.info.limited.price})\n${coinPi.aff.limited}`,
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