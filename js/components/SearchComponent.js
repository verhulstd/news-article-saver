import axios from "axios";
import SearchListItem from "./SearchListItem";

export default class SearchComponent {
  constructor(searchSection, savedArticles, saveComponent) {
    this.searchSection = searchSection;
    this.savedArticles = savedArticles;
    this.saveComponent = saveComponent;
    this.form;
    this.searchResults;
    this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    const html = `
            <form>
                <input type="text">
                <input type="submit" value="search">
            </form>
            <ul id="searchResults"></ul>
      `;
    this.searchSection.insertAdjacentHTML("beforeend", html);
    this.form = document.querySelector("form");
    this.searchResults = document.getElementById("searchResults");
  }
  setUpEvents() {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const value = this.form.querySelector("input[type=text]").value;
    this.searchResults.innerHTML = "";
    axios
      .get(
        "https://nieuws.vtm.be/feed/articles/solr?format=json&query=" +
          value.replace(" ", ",")
      )
      .then(response => {
        for (const item of response.data.response.items) {
          const searchListItem = new SearchListItem(
            item,
            this.searchResults,
            this.savedArticles
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
