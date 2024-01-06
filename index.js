const { Telegraf } = require('telegraf');
const { Markup } = require('telegraf');
const bot = new Telegraf(process.env.TELETOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome to your Telegram bot! Send me a message.');
});

bot.help((ctx) => {
  ctx.reply('This is a simple Telegram bot. You can interact with it by sending messages.');
});

bot.on('text', (ctx) => {
  console.log(ctx.message.from);
  ctx.reply("Hi this test message with buttons", {
    reply_markup:{
      inline_keyboard:[
        [
          { text:"Frontend", callback_data:"Frontend"},
          { text:"Backend", callback_data:"Backend"}
        ]
      ]
    }
  });
  ctx.replyWithPhoto("https://picsum.photos/200/300/?random", {
    caption: 'This is an example of an image with text and buttons.',
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Button 1', callback_data: 'button1' },
          { text: 'Button 2', callback_data: 'button2' },
        ],
      ],
    },
  })
});

bot.launch({ webhook: { domain: process.env.RENDER_EXTERNAL_URL, port: process.env.PORT } })
.then(() => {
    console.log('Bot is running');
})
.catch((error) => {
    console.error('Error starting the bot:', error);
});