import { resultsFunc } from "./searchresult.js";
class Form {
  constructor() {}
  showElementsFunc(body, navBar, title, form, input, button) {
    console.log(body);
    navBar.classList.add("navbar", "navbar-light", "bg-light");
    document.body.appendChild(navBar);
    title.classList.add("title");
    title.innerText = "Search Nasdaq Stocks";
    navBar.appendChild(title);
    form.classList.add("form-inline", "navbar-items");
    navBar.appendChild(form);
    input.classList.add("form-control", "mr-sm-2", "input");
    input.setAttribute("id", "input");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", "Search");
    input.setAttribute("iaria-label", "Search");
    form.appendChild(input);
    button.classList.add(
      "btn",
      "btn-outline-success",
      "my-2",
      "my-sm-0",
      "button"
    );
    button.setAttribute("id", "button");
    button.setAttribute("type", "button");
    button.innerText = "Search";
    form.appendChild(button);
    const resultContainer = document.getElementById("res-cont");
    button.addEventListener("click", () => {
      resultContainer.innerHTML = "";
      let searchTerm = document.getElementById("input").value;
      let url =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
        searchTerm +
        "&limit=10&exchange=NASDAQ";
      resultsFunc.stockSearch(url);
    });
  }
}
let showElements = new Form();
let navBar = document.createElement("nav");
let title = document.createElement("h1");
let form = document.createElement("form");
let input = document.createElement("input");
let button = document.createElement("button");
let body = document.getElementsByTagName("body");
showElements.showElementsFunc(body, navBar, title, form, input, button);
