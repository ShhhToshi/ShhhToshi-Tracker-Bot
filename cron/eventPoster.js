const cron = require('node-cron');
const User = require('../models/User');
const eventMode = require('../utils/eventMode');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const escapeMarkdownV2 = (text) =>
  text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');

module.exports = () => {
  cron.schedule('*/5 * * * *', async () => {
    if (!eventMode.isEventActive()) return;

    const topUsers = await User.find().sort({ dailyCount: -1 }).limit(10);

    if (!topUsers.length) return;

    let msg = `🎯 *Live Event Leaderboard*\n\n`;
    topUsers.forEach((u, i) => {
      msg += `${i + 1}. ${escapeMarkdownV2(u.username || 'Anonymous')} — ${u.dailyCount} messages\n`;
    });

    await bot.telegram.sendMessage(process.env.CHAT_ID, msg, {
      parse_mode: 'MarkdownV2'
    });

    console.log('📢 Event leaderboard posted');
  });
};
