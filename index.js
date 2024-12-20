const puppeteer = require('puppeteer');

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://rejseplanen.dk/', { waitUntil: 'networkidle2' });

  // Extract and log title
  const title = await page.title();
  console.log("Page Title:", title);

  // Extract specific content
  const content = await page.evaluate(() => {
    return document.querySelector('h1')?.innerText || 'No Header Found';
  });

  console.log("Page Content:", content);

  await browser.close();
})();
