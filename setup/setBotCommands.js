const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

async function setCommands() {
  const commonCommands = [
    { command: 'leaderboard', description: 'Top active users' },
    { command: 'myrank', description: 'Your message stats' },
    { command: 'top10today', description: 'Daily leaderboard' },
    { command: 'eventmode', description: 'Admin: Toggle event mode' },
    { command: 'resetall', description: 'Admin: Reset total count' },
    { command: 'resetday', description: 'Admin: Reset today\'s count' },
  ];

  try {
    // ✅ Set for private chats
    await bot.telegram.setMyCommands(commonCommands, {
      scope: { type: 'default' },
    });

    // ✅ Set for group chats
    await bot.telegram.setMyCommands(commonCommands, {
      scope: { type: 'all_group_chats' },
    });

    console.log('✅ Commands set for private and group chats.');
    process.exit();
  } catch (error) {
    console.error('❌ Failed to set commands:', error.message);
    process.exit(1);
  }
}

setCommands();
