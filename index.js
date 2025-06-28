require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectDB = require('./db');
const leaderboardCommand = require('./commands/leaderboard');
const postChartImage = require('./cron/chartPoster');
const User = require('./models/User');

const bot = new Telegraf(process.env.BOT_TOKEN);

leaderboardCommand(bot);
// Middleware to track messages
bot.on('message', async (ctx) => {
  
  if (!ctx.chat || ctx.chat.type !== 'supergroup') return;
  const { id, username } = ctx.from;

  console.log(`📩 Message received in group:`, ctx.message.text);

  await User.findOneAndUpdate(
    { telegramId: id },
    { $inc: { messageCount: 1 }, username: username || 'Unknown' },
    { upsert: true, new: true }
  );
});


bot.command('ping', (ctx) => {
  ctx.reply('🏓 Bot is alive!');
});

// Launch bot
connectDB();
bot.launch();
console.log('🤖 Bot running...');

// Schedule chart poster every 30 min
postChartImage();
