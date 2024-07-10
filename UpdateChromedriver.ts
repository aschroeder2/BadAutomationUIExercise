const extract = require('extract-zip');
const request = require('request');
const request2 = require('async-request');
const fstream = require('fs');

async function makeRequest() {
    const zipName = 'chromedriver-win32.zip';

    let response = await request2(`https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json`);
    response = await JSON.parse(response.body);
    const chromedriverURL = response.channels.Stable.downloads.chromedriver['3'].url;
    console.log('Downloading Chromedriver from: ' + chromedriverURL);

    await request(chromedriverURL)
        .pipe(fstream.createWriteStream(zipName))
        .on('close', () => {
            console.log('Chromedriver for Windows zip written!');
            extract(zipName, { dir: __dirname });
            console.log('Chromedriver for Windows zip extracted!');
        });
}

async function makeRequestMac() {
    const zipName = 'chromedriver-mac-x64.zip';

    let response = await request2(`https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json`);
    response = await JSON.parse(response.body);
    const chromedriverURL = response.channels.Stable.downloads.chromedriver['2'].url;
    console.log('Downloading Chromedriver from: ' + chromedriverURL);

    await request(chromedriverURL)
        .pipe(fstream.createWriteStream(zipName))
        .on('close', () => {
            console.log('Chromedriver for Mac zip written!');
            extract(zipName, { dir: __dirname });
            console.log('Chromedriver for Mac zip extracted!');
        });
}

console.log('Searching for latest version of Chromedriver for Windows...');
makeRequest();
console.log('Searching for latest version of Chromedriver for Mac...');
makeRequestMac();
