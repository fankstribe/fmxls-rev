const puppeteer = require("puppeteer");

const searchFifa = async () => {
  const browser = await puppeteer.launch({
    headless: false,
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

  for (let pagination = 0; pagination < 600; pagination += 60) {
    let url = pagination === 0 ? website : `${website}&offset=${pagination}`;

    await page.goto(url);

    await page.waitForTimeout(4000);

    results = results.concat(await extractedEvaluateCall(page));
  }

  await browser.close();
  console.log(results);
  return results;
};

async function extractedEvaluateCall(page) {
  return page.evaluate(() => {
    let data = [];
    const items = document.querySelector(".card table tbody");

    for (let i = 0; i < items.children.length; i++) {
      const url = items.children[i].querySelector(
        "tr td.col-avatar .avatar img"
      );
      const name = items.children[i].querySelector(
        "tr td.col-name a .bp3-text-overflow-ellipsis"
      );
      const age = items.children[i].querySelector("tr td.col-ae");
      const position = items.children[i].querySelector("tr td.col-name a .pos");
      const overall = items.children[i].querySelector("tr td.col-oa");
      const value = items.children[i].querySelector("tr td.col-vl");
      const wage = items.children[i].querySelector("tr td.col-wg");

      if (url || name || age || position || overall || value || wage) {
        data.push({
          url: (url && url.getAttribute("data-src")) || "Unknow URL",
          name: (name && name.innerText) || "Unknow Name",
          age: (age && age.innerText) || "Unknow Age",
          position: (position && position.innerText) || "Unknow Position",
          overall: (overall && overall.innerText) || "Unknow Overall",
          value: (value && value.innerText) || "Unknow Value",
          wage: (wage && wage.innerText) || "Unknow Wage",
        });
      }
    }
    console.log(data);
    return data;
  });
}

module.exports = {
  searchFifa,
};
