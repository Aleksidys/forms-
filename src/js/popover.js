export class Popover {
    constructor(element) {
        this.element = element;
        this.title = element.getAttribute('data-title');
        this.content = element.getAttribute('data-content');
        this.popoverElement = null;
        this.element.addEventListener('click', this.togglePopover.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    createPopover() {
        if (!this.popoverElement) {
            this.popoverElement = document.createElement('div');
            this.popoverElement.classList.add('popover');
        }
    }

    togglePopover(event) {
        if (!this.popoverElement || !this.popoverElement.parentElement) {
            this.showPopover();
        } else {
            this.hidePopover();
        }
        event.stopPropagation(); // Предотвращаем всплытие события, чтобы оно не вызывалось на документе
    }

    showPopover() {
        this.hidePopover(); // Удаляем предыдущий popoverElement, если он существует
        this.createPopover();
        this.popoverElement.innerHTML = `<h3>${this.title}</h3><p>${this.content}</p>`;
        const rect = this.element.getBoundingClientRect();
        const buttonRight = rect.right + window.scrollX;
        const buttonTop = rect.top + window.scrollY;
        this.popoverElement.style.left = buttonRight + 'px'; // Позиция справа от кнопки
        this.popoverElement.style.top = buttonTop + 'px';
        document.body.appendChild(this.popoverElement);
    }

    hidePopover() {
        if (this.popoverElement && this.popoverElement.parentElement) {
            this.popoverElement.parentElement.removeChild(this.popoverElement);
        }
    }

    handleDocumentClick(event) {
        if (!this.element.contains(event.target) && !this.popoverElement.contains(event.target)) {
            this.hidePopover();
        }
    }
}