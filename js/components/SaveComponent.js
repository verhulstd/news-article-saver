/**
 * Load and show firebase data (saved articles)
 * @class SaveComponent
 * @classdesc This component creates a list, contacts Firebase and loads up the listitems in the list.
 * @constructor
 * @param  {HTMLElement} saveSection HtmlElement referencing the section where the list needs to be created
 * @param  {Array} savedArticles reference to the array containing all the saved articles
 * @param  {Object} firebase reference to the firebase object
 */
import SavedListItem from "./SavedListItem";
import axios from "axios";

var popupS = require("popups");

export default class SaveComponent {
  constructor(saveSection, savedArticles, firebase) {
    this.saveSection = saveSection;
    this.savedArticles = savedArticles;
    this.firebase = firebase;
    this.listHolder = "";
    this.generateHtml();
    this.loadFirebase();
    this.setUpEvents();
  }

  /**
   *  @function generateHtml - Function to create h1 and Ul
   */
  generateHtml() {
    const html = `
            <h1>Saved Articles</h1>
            <ul id="saved_articles"></ul>
        `;
    this.saveSection.insertAdjacentHTML("beforeend", html);
    this.listHolder = document.getElementById("saved_articles");
  }
  loadFirebase() {
    var data = this.firebase.database().ref("articles");
    data.once("value", snapshot => {
      var returnedObject = snapshot.val();
      for (const prop in returnedObject) {
        this.savedArticles.push(returnedObject[prop]);
        var savedListItem = new SavedListItem(
          returnedObject[prop],
          this.listHolder
        );
      }
    });
  }
  setUpEvents() {
    this.listHolder.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    if (e.target.nodeName == "A") {
      const list = e.target.parentElement;
      const id = parseInt(list.dataset.id);
      const positionToRemove = this.savedArticles.indexOf(id);
      this.savedArticles.splice(positionToRemove, 1);
      /*
      Cannot use filter => creates new location in memory!

      this.savedArticles = this.savedArticles.filter(
        el => el != list.dataset.id
      );
      */
      //console.log("updated array ==> " + this.savedArticles);
      list.remove();
      this.firebase
        .database()
        .ref("articles")
        .set(this.savedArticles);
      //if a heart component with same id stille is red => remove checked class from heart
      if (document.querySelector("li#search-" + id + " a.heart.checked")) {
        document
          .querySelector("li#search-" + id + " a.heart.checked")
          .classList.remove("checked");
      }
    }
    if (e.target.nodeName == "LI") {
      const id = e.target.dataset.id;
      popupS.window({
        mode: "modal",
        content: "loading...",
        onOpen: function() {
          axios
            .get(
              "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
                id
            )
            .then(response => {
              const item = response.data.response.items[0];
              this.$contentEl.innerHTML = `
                <h1>${item.title}</h1>
                <img src="${item.image.medium}">
                <div>${item.text_html}"</div>
                <a target="_blank" href="${item.url}">link</a>
              `;
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
}
