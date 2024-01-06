const { Telegraf, Markup } = require('telegraf');

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


ctx.replyWithPhoto("https://ae01.alicdn.com/kf/S3e6e4d5a07894b9c840c15defc65c71cJ/Windbreaker-Men-Tactical-Jacket-Waterproof-Outdoor-Hooded-Coat-Sports-Military-European-Size-S-3xl-Field-Climbing.jpg", {
    caption: 'This is an example of an image with text and buttons.',
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Button 1', callback_data: 'button1' },
          { text: 'Button 2', callback_data: 'button2' },
        ],
      ],
    },
});


ctx.replyWithPhoto(
    { url: "https://picsum.photos/200/300/?random" },
    {
        caption: "Caption",
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
            Markup.button.callback("Plain", "plain"),
            Markup.button.url("Italic", "https://www.npmjs.com/"),
        ])
});



ctx.reply('This message will be deleted in 5 seconds')
  .then((message) => {
    setTimeout(() => {
      ctx.deleteMessage(message.message_id).then(() => {
        ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" },
        {
          caption: "Caption",
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            Markup.button.callback("Plain", "plain"),
            Markup.button.url("Italic", "https://www.npmjs.com/"),
          ])
        });
      })
    }, 5000)
});


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