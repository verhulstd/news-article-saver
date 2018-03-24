import * as firebase from "firebase";
import SavedListItem from "./SavedListItem";
import axios from "axios";

var popupS = require("popups");

export default class SaveComponent {
  constructor(saveSection, savedArticles) {
    this.saveSection = saveSection;
    this.savedArticles = savedArticles;
    this.listHolder = "";
    this.generateHtml();
    this.initFirebase();
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
  initFirebase() {
    var config = {
      apiKey: "AIzaSyArVEG_eppVPiMSFoG4APql9zYm6IYQczQ",
      authDomain: "squarebuilder-2dd65.firebaseapp.com",
      databaseURL: "https://squarebuilder-2dd65.firebaseio.com",
      projectId: "squarebuilder-2dd65",
      storageBucket: "squarebuilder-2dd65.appspot.com",
      messagingSenderId: "14989606875"
    };
    firebase.initializeApp(config);
    var data = firebase.database().ref("articles");
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
      this.savedArticles = this.savedArticles.filter(
        el => el != list.dataset.id
      );
      list.remove();
      firebase
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
