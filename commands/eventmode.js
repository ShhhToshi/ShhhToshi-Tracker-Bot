const User = require('../models/User');
const eventMode = require('../utils/eventMode');

module.exports = (bot) => {
  const ADMIN_ID = parseInt(process.env.ADMIN_ID);

  bot.command('eventmode', async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) {
      return ctx.reply('❌ You are not authorized to perform this action.');
    }

    const text = ctx.message.text.trim().toLowerCase();

    if (text.includes('on')) {
      eventMode.toggleEventMode(true);
      ctx.reply('🚨 *Event Mode Activated!* Auto leaderboard will post every 5 mins.', { parse_mode: 'Markdown' });
    } else if (text.includes('off')) {
      eventMode.toggleEventMode(false);
      ctx.reply('🛑 *Event Mode Deactivated.*', { parse_mode: 'Markdown' });
    } else {
      ctx.reply('ℹ️ Usage: `/eventmode on` or `/eventmode off`', { parse_mode: 'Markdown' });
    }
  });
};
