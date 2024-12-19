const puppeteer = require('puppeteer');

(async () => {
  // Launch Puppeteer with required options
  const browser = await puppeteer.launch({
    headless: true,  // Run headless browser
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-gpu', 
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://rejseplanen.dk/', { waitUntil: 'networkidle2' });

  // Extract data from the page
  const title = await page.title();
  console.log("Page Title:", title);

  const content = await page.evaluate(() => {
    return document.querySelector('h1')?.innerText || 'No Header Found';
  });

  console.log("Page Content:", content);

  await browser.close();
})();
