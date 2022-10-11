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
  } else if (+result.profile.changesPercentage == 0) {
    companyChange.classList.add("change-black");
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
  const labels = [
    history[19].date,
    history[18].date,
    history[17].date,
    history[16].date,
    history[15].date,
    history[14].date,
    history[13].date,
    history[12].date,
    history[11].date,
    history[10].date,
    history[9].date,
    history[8].date,
    history[7].date,
    history[6].date,
    history[5].date,
    history[4].date,
    history[3].date,
    history[2].date,
    history[1].date,
    history[0].date,
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price History",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [
          history[19].close,
          history[18].close,
          history[17].close,
          history[16].close,
          history[15].close,
          history[14].close,
          history[13].close,
          history[12].close,
          history[11].close,
          history[10].close,
          history[9].close,
          history[8].close,
          history[7].close,
          history[6].close,
          history[5].close,
          history[4].close,
          history[3].close,
          history[2].close,
          history[1].close,
          history[0].close,
        ],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  console.log(myChart);
}
