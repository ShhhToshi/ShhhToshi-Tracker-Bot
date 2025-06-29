const User = require('../models/User');

module.exports = (bot) => {
  const ADMIN_ID = parseInt(process.env.ADMIN_ID);

  bot.command('resetall', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
      return ctx.reply('❌ You are not authorized to perform this action.');
    }

    await User.updateMany({}, { messageCount: 0 });
    ctx.reply('🧹 All users\' total message counts have been reset.');
  });

  bot.command('resetday', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
      return ctx.reply('❌ You are not authorized to perform this action.');
    }

    await User.updateMany({}, { dailyCount: 0, lastMessageDate: new Date() });
    ctx.reply('🧼 All users\' *today\'s* message counts have been reset.');
  });
};
