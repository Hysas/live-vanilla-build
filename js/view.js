export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs("[data-id=menu]");
    this.$.menuBtn = this.#qs("[data-id=menu-btn]");
    this.$.menuItems = this.#qs("[data-id=menu-items]");
    this.$.resetBtn = this.#qs("[data-id=reset-btn]");
    this.$.newRoundBtn = this.#qs("[data-id=new-round-btn]");
    this.$.modal = this.#qs("[data-id=modal]");
    this.$.modalText = this.#qs("[data-id=modal-text]");
    this.$.modalBtn = this.#qs("[data-id=modal-btn]");
    this.$.turn = this.#qs("[data-id=turn]");

    this.$$.squares = this.#qsAll("[data-id=square]");

    // UI-only event listeners
    this.$.menu.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  //   Register all the event listeneres

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", handler);
    });
  }

  //   DOM helper methods

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");

    icon.classList.toggle("fa-chevron-up");
    icon.classList.toggle("fa-chevron-down");
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  // player = 1 | 2
  setTurnIndicator(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error(`Could not find element: ${selector}`);

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error(`Could not find element: ${selector}`);

    return elList;
  }
}