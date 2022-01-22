import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('payment-system visa', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card_number_input');
    await input.type('49');

    const images = await page.$$('.payment_system');
    const classes = await images[0].evaluate((el) => [...el.classList]);
    const isVisa = classes.length === 1 && classes[0] === 'payment_system';
    expect(isVisa).toBeTruthy();
  });

  test('payment-system master-card', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card_number_input');
    await input.type('531');

    const images = await page.$$('.payment_system');
    const classes = await images[1].evaluate((el) => [...el.classList]);
    const isVisa = classes.length === 1 && classes[0] === 'payment_system';
    expect(isVisa).toBeTruthy();
  });

  test('payment-system mir', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card_number_input');
    await input.type('256');

    const images = await page.$$('.payment_system');
    const classes = await images[2].evaluate((el) => [...el.classList]);
    const isVisa = classes.length === 1 && classes[0] === 'payment_system';
    expect(isVisa).toBeTruthy();
  });

  test('valid', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card_number_input');
    await input.type('5315584365505728');
    const submit = await page.$('.card_button');
    submit.click();
    await page.waitForSelector('.valid');
  });
});
