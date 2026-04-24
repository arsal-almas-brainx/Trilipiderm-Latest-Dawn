class QuizSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initDropdowns();
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  initDropdowns() {
    const triggers = this.querySelectorAll('.quiz-dropdown-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = trigger.getAttribute('data-dropdown-trigger');
        const wrapper = trigger.closest('.quiz-dropdown-wrapper');
        const isOpen = wrapper.classList.contains('is-open');

        this.closeAllDropdowns();

        if (!isOpen) {
          wrapper.classList.add('is-open');
        }
      });
    });

    const items = this.querySelectorAll('.quiz-dropdown-item');
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = item.getAttribute('data-dropdown-target');
        const value = item.getAttribute('data-dropdown-value');
        const selectedEl = this.querySelector(`[data-dropdown-selected="${target}"]`);
        if (selectedEl) {
          selectedEl.textContent = value;
        }
        const wrapper = item.closest('.quiz-dropdown-wrapper');
        wrapper.classList.remove('is-open');
      });
    });
  }

  closeAllDropdowns() {
    const openDropdowns = this.querySelectorAll('.quiz-dropdown-wrapper.is-open');
    openDropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
    });
  }

  handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.closeAllDropdowns();
    }
  }
}

customElements.define('quiz-section', QuizSection);

