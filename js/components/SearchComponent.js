import axios from "axios";
import SearchListItem from "./SearchListItem";
import SavedListItem from "./SavedListItem";

export default class SearchComponent {
  constructor(searchSection, savedArticles, firebase, saveComponent) {
    this.searchSection = searchSection;
    this.savedArticles = savedArticles;
    this.firebase = firebase;
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
    this.searchResults.addEventListener(
      "click",
      this.handleListItemClick.bind(this)
    );
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
  handleListItemClick(e) {
    //id to work with
    const id = e.target.parentElement.dataset.id;
    if (e.target.nodeName == "A") {
      if (e.target.classList.contains("checked")) {
        //add to array
        this.savedArticles.push(parseInt(id));
        //add to DOM
        var savedListItem = new SavedListItem(
          id,
          this.saveComponent.listHolder
        );
        //add to DB
        this.firebase
          .database()
          .ref("articles")
          .set(this.savedArticles);
      } else {
        //click on remove icon from saved id
        document
          .getElementById(`saved-${id}`)
          .querySelector("a")
          .click();
      }
    }
    if (e.target.nodeName == "LI") {
    }
  }
}
