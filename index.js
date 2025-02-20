const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new", // Runs Chromium visibly like a desktop browser
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920,1080' // Set desktop screen size
        ]
    });

    const page = await browser.newPage();

    // Set User-Agent to mimic a desktop browser
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.setViewport({ width: 1920, height: 1080 });

    const url = 'https://widget.vackertvader.se/widgetv3?geonameid=2615876&bgcolor=000000&border=none&size=x215&textcolor=ffffff&days=5&maxtemp=yes&wind=yes&unit=C&lang=';

    await page.goto(url, { waitUntil: 'networkidle2' });

    console.log('Page loaded successfully.');

    // Get and save full page HTML
    const content = await page.content();
    fs.writeFileSync('weather-widget.html', content, 'utf8');
    console.log('Saved HTML to weather-widget.html');

    // Take a screenshot for verification
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('Saved screenshot as screenshot.png');

    await browser.close();
})();
