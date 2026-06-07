// Form validation class
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitButton = this.form.querySelector('#submit-button');
    this.gdprCheckbox = this.form.querySelector('#gdpr_checkbox');
    this.initEvents();
  }

  initEvents() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.gdprCheckbox.addEventListener('change', this.toggleSubmitButton.bind(this));
  }

  handleSubmit(event) {
    if (!this.gdprCheckbox.checked) {
      alert("Trebuie să acceptați prelucrarea datelor personale pentru a trimite formularul.");
      event.preventDefault(); // Prevent form submission
    }

    // Additional form validation can be added here
  }

  toggleSubmitButton() {
    this.submitButton.disabled = !this.gdprCheckbox.checked;
  }
}

// Initialize the form validator
const formValidator = new FormValidator('restricted-link');
