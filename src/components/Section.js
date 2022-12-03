export default class Section {
    constructor({renderer}, elementContainerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(elementContainerSelector);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}