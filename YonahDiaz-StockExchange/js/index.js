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

function presentResults(result) {
  loader.setAttribute("style", "display:none;");
  for (let i = 0; i < result.length; i++) {
    let searchResults = document.createElement("a");
    searchResults.classList.add("results");
    searchResults.innerHTML =
      result[i].name + " " + "(" + result[i].symbol + ")";
    searchResults.setAttribute(
      "href",
      "/company.html?symbol=" + result[i].symbol
    );
    resultContainer.appendChild(searchResults);
  }
}

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
