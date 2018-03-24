import Heart from "./Heart";

export default class SearchListItem {
  constructor(item, searchResults, savedArticles) {
    this.item = item;
    this.searchResults = searchResults;
    this.savedArticles = savedArticles;
    this.list = "";
    this.generateHtml();
  }
  generateHtml() {
    const html = `
        <li id="search-${this.item.fields.entity_id}">
            <span>${this.item.title}</span>
        </li>
      `;
    this.searchResults.insertAdjacentHTML("beforeend", html);
    this.list = this.searchResults.querySelector(
      `#search-${this.item.fields.entity_id}`
    );
    var saved = this.inArray(this.item.fields.entity_id, this.savedArticles);
    var heart = new Heart(saved, this.list, this.savedArticles);
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
