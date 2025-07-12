const puppeteer = require('puppeteer');

module.exports = async function getChartImage(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // ✅ Fix for Fly.io
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const path = 'chart.png';
  await page.screenshot({ path });

  await browser.close();
  return path;
};
