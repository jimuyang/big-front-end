const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        // executablePath: '/usr/local/bin/chromium',
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://music.163.com/');
    await page.screenshot({ path: 'music.png' });
    browser.close();
})();
