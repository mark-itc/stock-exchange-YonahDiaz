const button = document.getElementById("button");
const resultContainer = document.getElementById("res-cont");
let loader = document.getElementById("loader");

async function stockSearch(url) {
  try {
    loader.setAttribute("style", "display:block;");
    const response = await fetch(url);
    const result = await response.json();
    presentResults(result);
  } catch (error) {
    console.log(error);
  }
}

async function presentResults(result) {
  loader.setAttribute("style", "display:none;");
  for (let i = 0; i < result.length; i++) {
    try {
      let decorationUrl =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
        result[i].symbol;
      const decorationResponse = await fetch(decorationUrl);
      const decorationResult = await decorationResponse.json();
      let searchResults = document.createElement("a");
      searchResults.classList.add("results");
      searchResults.innerHTML =
        result[i].name + " " + "(" + result[i].symbol + ")";
      searchResults.setAttribute(
        "href",
        "company.html?symbol=" + result[i].symbol
      );
      resultContainer.appendChild(searchResults);
      let decorationChange = document.createElement("div");
      if (+decorationResult.profile.changesPercentage < 0) {
        decorationChange.classList.add("change-red");
      } else {
        decorationChange.classList.add("change-green");
      }
      decorationChange.innerText =
        "(" + +decorationResult.profile.changesPercentage + "%)";
      let decorationImage = document.createElement("img");
      decorationImage.classList.add("decoration-image");
      decorationImage.setAttribute("src", decorationResult.profile.image);
      searchResults.appendChild(decorationImage);
      searchResults.appendChild(decorationChange);
    } catch (error) {
      console.log(error);
    }
  }
}

let marqueeDataUrl =
  "https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=6d111f223ec978a64915097363219394";

async function marqueeDataSearch(marqueeDataUrl) {
  try {
    const marqueeDataUrlResponse = await fetch(marqueeDataUrl);
    const marqueeDataUrlResult = await marqueeDataUrlResponse.json();
    let marqueeHmove = document.getElementById("hmove");
    for (let i = 0; i < marqueeDataUrlResult.length; i++) {
      let stockMarquee = document.createElement("div");
      stockMarquee.classList.add("hitem");
      stockMarquee.innerText =
        marqueeDataUrlResult[i].symbol +
        " " +
        "$" +
        marqueeDataUrlResult[i].price;
      marqueeHmove.appendChild(stockMarquee);
    }
  } catch (error) {
    console.log(error);
  }
}

marqueeDataSearch(marqueeDataUrl);

button.addEventListener(
  "click",
  (onClick = () => {
    resultContainer.innerHTML = "";
    let searchTerm = document.getElementById("input").value;
    let url =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      searchTerm +
      "&limit=10&exchange=NASDAQ";
    stockSearch(url);
  })
);
