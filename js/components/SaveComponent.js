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
      console.log(this.savedArticles);
      const positionToRemove = this.savedArticles.indexOf(
        parseInt(list.dataset.id)
      );
      console.log("position to remove: " + positionToRemove);
      this.savedArticles.splice(positionToRemove, 1);
      console.log(this.savedArticles);
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
