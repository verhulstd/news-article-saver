export default class SearchListItem {
  constructor(item, searchResults) {
    this.item = item;
    this.searchResults = searchResults;
    this.generateHtml();
  }
  generateHtml() {
    const html = `
        <li>
            ${this.item.title} - O
        </li>
      `;
    this.searchResults.insertAdjacentHTML("beforeend", html);
  }
}
