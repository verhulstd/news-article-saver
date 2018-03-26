import Heart from "./Heart";

export default class SearchListItem {
  constructor(item, searchResults, savedArticles) {
    this.item = item;
    this.searchResults = searchResults;
    this.savedArticles = savedArticles;
    this.list = "";
    this.heart = "";
    this.generateHtml();
  }
  generateHtml() {
    const html = `
        <li id="search-${this.item.fields.entity_id}" data-id="${
      this.item.fields.entity_id
    }">
            ${this.item.title} - ${this.item.fields.entity_id}
        </li>
      `;
    this.searchResults.insertAdjacentHTML("beforeend", html);
    this.list = this.searchResults.querySelector(
      `#search-${this.item.fields.entity_id}`
    );
    var saved = this.inArray(this.item.fields.entity_id, this.savedArticles);
    console.log("--------------------");
    console.log(this.savedArticles);
    console.log("--------------------");
    this.heart = new Heart(saved, this.list);
  }
  inArray(needle, haystack) {
    var count = haystack.length;
    for (var i = 0; i < count; i++) {
      if (haystack[i] === needle) {
        return true;
      }
    }
    return false;
  }
}
