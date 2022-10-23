let urlParams = new URLSearchParams(window.location.search);
let stringUrlParams = urlParams.toString();
let companySymbol = stringUrlParams.slice(7);

let url =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
  companySymbol;

let historyUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" +
  companySymbol +
  "?serietype=line";

async function getCompanyProfileAndHistory(url, historyUrl) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    presentData(result);
    let companyLoader = document.getElementById("company-loader");
    const historyResponse = await fetch(historyUrl);
    const historyResult = await historyResponse.json();
    chartData(historyResult);
    companyLoader.setAttribute("style", "display:none;");
  } catch (error) {
    console.log(error);
  }
}

function presentData(result) {
  let profileAndHistoryContainer = document.getElementById(
    "profile-and-history-container"
  );
  let companyImage = document.createElement("img");
  companyImage.classList.add("company-image");
  companyImage.setAttribute("src", result.profile.image);
  let companyNameAndLink = document.createElement("a");
  companyNameAndLink.setAttribute("href", result.profile.website);
  companyNameAndLink.classList.add("company-name");
  companyNameAndLink.innerText = result.profile.companyName;
  let companyDescription = document.createElement("div");
  companyDescription.classList.add("company-description");
  companyDescription.innerText = result.profile.description;
  let companyPrice = document.createElement("div");
  companyPrice.classList.add("company-price");
  companyPrice.innerText =
    "Stock price:" + " " + result.profile.price + result.profile.currency;
  let companyChange = document.createElement("div");
  if (+result.profile.changesPercentage < 0) {
    companyChange.classList.add("change-red");
  } else {
    companyChange.classList.add("change-green");
  }
  companyChange.innerText = "(" + +result.profile.changesPercentage + "%)";
  profileAndHistoryContainer.appendChild(companyImage);
  profileAndHistoryContainer.appendChild(companyNameAndLink);
  profileAndHistoryContainer.appendChild(companyDescription);
  profileAndHistoryContainer.appendChild(companyPrice);
  companyPrice.appendChild(companyChange);
}

getCompanyProfileAndHistory(url, historyUrl);

function chartData(historyResult) {
  let history = historyResult.historical;
  let historyDate = [];
  for (let i = 0; i < history.length; i++) {
    historyDate.push(history[i].date);
  }
  const labels = historyDate.reverse();
  let historyClose = [];
  for (let i = 0; i < history.length; i++) {
    historyClose.push(history[i].close);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price History",
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
        data: historyClose.reverse(),
      },
    ],
  };
  const chartAreaBorder = {
    id: "chartAreaBorder",
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };
  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        chartAreaBorder: {
          borderColor: "gray",
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
      },
    },
    plugins: [chartAreaBorder],
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  console.log(myChart);
}
