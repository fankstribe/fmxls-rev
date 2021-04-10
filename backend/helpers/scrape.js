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

  for (let pagination = 0; pagination < 120; pagination += 60) {
    let url = pagination === 0 ? website : `${website}&offset=${pagination}`;

    await page.goto(url);

    await page.waitForTimeout(4000);

    results = results.concat(await extractedSofifaEvaluateCall(page));
  }

  await browser.close();
  return results;
};

async function extractedSofifaEvaluateCall(page) {
  return page.evaluate(() => {
    let data = [];
    const items = document.querySelector(".card table tbody");

    for (let i = 0; i < items.children.length; i++) {
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
        data.push({
          img: (img && img.getAttribute("data-src")) || "Unknow URL",
          playerName: (playerName && playerName.innerText) || "Unknow Name",
          age: (age && age.innerText) || "Unknow Age",
          position: (position && position.innerText) || "Unknow Position",
          overall: (overall && overall.innerText) || "Unknow Overall",
          value: (value && value.innerText) || "Unknow Value",
          wage: (wage && wage.innerText) || "Unknow Wage",
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

  for (let pagination = 0; pagination < 10; pagination++) {
    let url = pagination === 0 ? website : `${website}?page=${pagination}`;

    await page.goto(url);

    await page.waitForTimeout(4000);

    results = results.concat(await extractedPesdbEvaluateCall(page));
  }

  await browser.close();
  return results;
};

async function extractedPesdbEvaluateCall(page) {
  return page.evaluate(() => {
    let data = [];
    const items = document.querySelector(".card table tbody");

    for (let i = 0; i < items.children.length; i++) {
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
      const source = 'pesdb';

      if (img || playerName || age || position || overall || value || wage) {
        data.push({
          img: (img && img.getAttribute("data-src")) || "Unknow URL",
          playerName: (playerName && playerName.innerText) || "Unknow Name",
          age: (age && age.innerText) || "Unknow Age",
          position: (position && position.innerText) || "Unknow Position",
          overall: (overall && overall.innerText) || "Unknow Overall",
          value: (value && value.innerText) || "Unknow Value",
          wage: (wage && wage.innerText) || "Unknow Wage",
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
