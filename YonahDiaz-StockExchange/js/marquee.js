class Marquee {
  constructor(containerDiv) {
    this.containerDiv = containerDiv;
  }
  async marqueeDataSearch(marqueeDataUrl) {
    try {
      const marqueeDataUrlResponse = await fetch(marqueeDataUrl);
      const marqueeDataUrlResult = await marqueeDataUrlResponse.json();
      let marqueeHmove = document.createElement("div");
      marqueeHmove.classList.add("hmove");
      this.containerDiv.appendChild(marqueeHmove);
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
let marqueeHwrap = document.getElementById("hwrap");

let showMarquee = new Marquee(marqueeHwrap);

let marqueeDataUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${limit} ";

showMarquee.marqueeDataSearch(marqueeDataUrl);
