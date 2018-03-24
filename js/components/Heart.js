export default class Heart {
  constructor(status, holder) {
    this.status = status;
    this.holder = holder;
    this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    const html = `
            <a class="heart"></a>
        `;
    this.list.insertAdjacentHTML("beforeend", html);
    if (this.status) {
      this.list.querySelector("a").classList.add("checked");
    }
  }
  setUpEvents() {
    this.list
      .querySelector("a")
      .addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    e.preventDefault();
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked");
    } else {
      e.target.classList.add("checked");
    }
  }
}
