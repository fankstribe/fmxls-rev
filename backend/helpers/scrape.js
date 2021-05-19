const puppeteer = require("puppeteer");

const searchFifa = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--start-maximized",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list ",
    ],
    defaultViewport: null,
  });

  let results = [];
  const website = "https://sofifa.com/players?hl=it-IT";
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() == 'stylesheet'
      || req.resourceType() == 'font'
      || req.resourceType() == 'image') {
        req.abort();
      } else {
        req.continue();
      }
  })

  try {

    for (let pagination = 0; pagination < 17200; pagination += 60) {
      let url = pagination === 0 ? website : `${website}&offset=${pagination}`;

      await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});

      await page.waitForTimeout(2000);

      results = results.concat(await extractedSofifaEvaluateCall(page));
    }

    await browser.close();
    return results;

  } catch (error) {
    console.log(error)
    await browser.close();
    return false;
  }
};

async function extractedSofifaEvaluateCall(page) {
  return page.evaluate(() => {
    let data = [];
    const items = document.querySelector(".card table tbody");

    for (let i = 0; i < items.children.length; i++) {
      const playerId = items.children[i].querySelector(
        "tr td.col-avatar .avatar img"
      );;
      const img = items.children[i].querySelector(
        "tr td.col-avatar .avatar img"
      );
      const playerName = items.children[i].querySelector(
        "tr td.col-name a .bp3-text-overflow-ellipsis"
      );
      const age = items.children[i].querySelector("tr td.col-ae");
      const position = items.children[i].querySelector("tr td.col-name a .pos");
      const overall = items.children[i].querySelector("tr td.col-oa");
      const value = items.children[i].querySelector("tr td.col-vl");
      const wage = items.children[i].querySelector("tr td.col-wg");
      const source = 'sofifa';

      if (img || playerName || age || position || overall || value || wage) {
        let imageId = (playerId && img.getAttribute("id"));
        data.push({
          playerId: (playerId && img.getAttribute("id")),
          img: `https://www.fifaindex.com/static/FIFA21/images/players/10/${imageId}.webp`,
          playerName: (playerName && playerName.innerText),
          age: (age && age.innerText),
          position: (position && position.innerText),
          overall: (overall && overall.innerText),
          value: (value && value.innerText),
          wage: (wage && wage.innerText),
          source: source
        });
      }
    }
    return data;
  });
}

const searchPesdb = async () => {

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--start-maximized",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list ",
    ],
    defaultViewport: null,
  });

  let results = [];
  const website = "https://pesdb.net/pes2021/";
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() == 'stylesheet'
      || req.resourceType() == 'font'
      || req.resourceType() == 'image') {
        req.abort();
      } else {
        req.continue();
      }
  })


  try {

    await page.goto(website, {waitUntil: 'networkidle2', timeout: 0});
    await page.select('#select_language', 'ita');
    await page.waitForSelector('.pages a')

    const pageNum = await page.evaluate(() => {
      const item = document.querySelector(".pages a:last-of-type")
      return item && item.innerText
    })

    for (let pagination = 1; pagination < pageNum; pagination ++) {
      let url = pagination === 1 ? website : `${website}?page=${pagination}`;

      await page.goto(url);

      await page.waitForTimeout(2000);

      results = results.concat(await extractedPesdbEvaluateCall(page));
    }

    await browser.close();
    return results;

  } catch (error) {
    console.log(error)
    await browser.close();
    return false;
  }

};

async function extractedPesdbEvaluateCall(page) {
  return page.evaluate(() => {
    let data = [];
    const items = document.querySelector("#content table.players tbody")
    items.firstElementChild.remove();

    for (let i = 0; i < items.children.length; i++) {
      const playerId = '';
      const img = items.children[i].querySelector("tr td:nth-child(2) a");
      const playerName = items.children[i].querySelector("tr td:nth-child(2)");
      const age = items.children[i].querySelector("tr td:nth-child(7)");
      const position = items.children[i].querySelector("tr td:first-child");
      const overall = items.children[i].querySelector("tr td.selected");
      const value = "";
      const wage = "";
      const source = 'pesdb';

      if (playerId || playerName || img || age || position || overall || value || wage || source) {
        let imageId = 'https://pesdb.net/pes2021/images/players/'
        data.push({
          playerId: img.getAttribute("href").split("=").pop(),
          img: imageId + (img && img.getAttribute("href").split("=").pop()) + '.png',
          playerName: (playerName && playerName.innerText),
          age: (age && age.innerText),
          position: (position && position.innerText),
          overall: (overall && overall.innerText),
          value: "",
          wage: "",
          source: source
        });
      }
    }
    return data;
  });
}

module.exports = {
  searchFifa,
  searchPesdb
};
