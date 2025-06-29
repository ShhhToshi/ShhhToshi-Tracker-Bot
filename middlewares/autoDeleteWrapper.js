const autoDelete = require('../utils/autoDelete');

module.exports = (bot, delay = 60) => {
  bot.use(async (ctx, next) => {
    const originalReply = ctx.reply?.bind(ctx);
    const originalMarkdown = ctx.replyWithMarkdownV2?.bind(ctx);

    if (originalReply) {
      ctx.reply = async (...args) => {
        const msg = await originalReply(...args);
        autoDelete(ctx, msg, delay); // 🔥 PASS ctx here
        return msg;
      };
    }

    if (originalMarkdown) {
      ctx.replyWithMarkdownV2 = async (...args) => {
        const msg = await originalMarkdown(...args);
        autoDelete(ctx, msg, delay); // 🔥 PASS ctx here
        return msg;
      };
    }

    await next();
  });
};
