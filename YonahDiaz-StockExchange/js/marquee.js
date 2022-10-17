let marqueeHmove = document.getElementById("hmove");

class Marquee {
  constructor(marqueeHmove) {
    this.marqueeHmove = marqueeHmove;
  }
  async marqueeDataSearch(marqueeDataUrl) {
    try {
      const marqueeDataUrlResponse = await fetch(marqueeDataUrl);
      const marqueeDataUrlResult = await marqueeDataUrlResponse.json();
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
}

let showMarquee = new Marquee();

let marqueeDataUrl =
  "https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=6d111f223ec978a64915097363219394";

showMarquee.marqueeDataSearch(marqueeDataUrl);
