const cron = require('node-cron');
const axios = require('axios');
const getChartImage = require('../utils/getChartImage');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Fetch token data
async function getTokenData() {
  const tonPair = process.env.PAIR_ID_TON;
  const usdtPair = process.env.PAIR_ID_USDT;
  const burnWallet = process.env.BURN_WALLET_ADDRESS;

  try {
    const [tonRes, usdtRes, burnRes] = await Promise.all([
      axios.get(`https://api.dexscreener.com/latest/dex/pairs/ton/${tonPair}`),
      axios.get(`https://api.dexscreener.com/latest/dex/pairs/ton/${usdtPair}`),
      axios.get(`https://tonapi.io/v2/accounts/${burnWallet}/jettons`, {
        headers: { accept: 'application/json' },
      }),
    ]);

    const tonData = tonRes.data.pair || {};
    const usdtData = usdtRes.data.pair || {};
    const jettons = burnRes.data.balances || [];

    console.log('🔍 Jettons array from burn wallet:', jettons);

    const found = jettons.find(j => j.jetton?.symbol === 'SHHHT');
    const symbol = found ? found.jetton.symbol : '(none found)';
    const balanceRaw = found?.balance || 0;
    console.log(`Detected jetton symbol: ${symbol}, balance raw: ${balanceRaw}`);

    const burnBalance = found
      ? (parseInt(balanceRaw) / 1e9).toFixed(2)
      : '0.00';

    return {
      pn_ton: tonData.priceNative || 'N/A',
      pd_usdt: usdtData.priceUsd || 'N/A',
      fdv: tonData.fdv || 'N/A',
      burn: burnBalance,
      burnSymbol: symbol
    };
  } catch (err) {
    console.error('❌ Error fetching token data:', err.message);
    return {
      pn_ton: 'Error',
      pn_usdt: 'Error',
      fdv: 'Error',
      burn: 'Error',
      burnSymbol: 'Error'
    };
  }
}

module.exports = () => {
  cron.schedule('*/180 * * * *', async () => {
    try {
      const chartPath = await getChartImage(process.env.CHART_URL);
      const data = await getTokenData();

      const caption = `📊 *Live SHHHT Chart + Stats*\n\n` +
        `💰 *Price Update*\n` +
        `🔹 1 SHHHT = ${data.pn_ton} TON\n` +
        `🔹 1 SHHHT = $${data.pd_usdt} USDT\n` + 
        `📈 *Market Cap Estimate*: $${data.fdv}\n` +
        // `🔥 *Total Burned (${data.burnSymbol}):* ${data.burn} SHHHT\n` +
        `[📉 View Chart](${process.env.CHART_URL})\n\n` +
        `#ShhhToshi #SHHHT #Crypto #TON`;

      await bot.telegram.sendPhoto(process.env.CHAT_ID, { source: chartPath }, {
        caption,
        parse_mode: 'Markdown',
      });

      console.log('📤 Chart + stats sent successfully.');
    } catch (error) {
      console.error('❌ Sending error:', error.message);
    }
  });
  bot.on('text', (ctx) => {
  console.log('Got a text:', ctx.message.text);
});
};
