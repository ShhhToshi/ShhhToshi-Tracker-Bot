require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectDB = require('./db');
const leaderboardCommand = require('./commands/leaderboard');
const myrankCommand = require('./commands/myrank');
const User = require('./models/User');
const top10TodayCommand = require('./commands/top10today');
const resetCommands = require('./commands/reset');
const eventPoster = require('./cron/eventPoster');
const eventModeCommand = require('./commands/eventmode');
const excludedUsernames = require('./config/excludedUsernames');
const autoDeleteMiddleware = require('./middlewares/autoDeleteWrapper');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Connect DB
connectDB();

// Register commands
leaderboardCommand(bot);
myrankCommand(bot);
top10TodayCommand(bot);
resetCommands(bot);
eventModeCommand(bot);
eventPoster();
autoDeleteMiddleware(bot, 60);


// Track messages + daily count
bot.on('message', async (ctx) => {
  if (!ctx.chat || ctx.chat.type !== 'supergroup') return;

  const { id, username, first_name } = ctx.from;
  if (excludedUsernames.includes(username)) return;
  // ✅ Ignore old messages (like Telegram backfills)
  
  const msgTime = new Date(ctx.message.date * 1000);
  const now = new Date();
  if (now - msgTime > 30 * 1000) return;

  const today = new Date().toISOString().split('T')[0];

  try {
    const user = await User.findOne({ telegramId: id });

    if (user) {
      const lastSeen = user.lastMessageDate?.toISOString().split('T')[0];
      const isNewDay = lastSeen !== today;

      user.username = username || first_name || 'Unknown';
      user.messageCount += 1;

      if (isNewDay) {
        user.dailyCount = 1;
        user.lastMessageDate = new Date();
      } else {
        user.dailyCount += 1;
      }

      await user.save();
    } else {
      await User.create({
        telegramId: id,
        username: username || first_name || 'Unknown',
        messageCount: 1,
        dailyCount: 1,
        lastMessageDate: new Date(),
      });
    }

    console.log(`📩 Message received from ${username || first_name}`);
  } catch (err) {
    console.error('❌ Error saving message:', err.message);
  }
});

bot.launch();
console.log('🤖 Bot running...');
