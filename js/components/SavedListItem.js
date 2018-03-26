import axios from "axios";

export default class SavedListItem {
  constructor(id, holder) {
    this.id = id;
    this.holder = holder;
    this.getData();
  }
  getData() {
    axios
      .get("https://nieuws.vtm.be/feed/articles?format=json&ids=" + this.id)
      .then(response => this.addListItem(response.data.response.items[0]))
      .catch(function(error) {
        console.log(error);
      });
  }
  addListItem(item) {
    const html = `
            <li id="saved-${item.id}" data-id="${item.id}">
                ${item.title} - ${item.id} - <a>X</a>
            </li>
        `;
    this.holder.insertAdjacentHTML("afterbegin", html);
  }
}
