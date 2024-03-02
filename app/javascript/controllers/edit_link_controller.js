import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-link"
export default class extends Controller {
  static targets = ["content", "form"];
  connect() {
  }

  showForm(event) {
    this.toggleForm(false);
  }
  hideForm(event) {
    this.toggleForm(true);
  }

  toggleForm(hidden) {
    const hiddenClass = "hidden";
    if (hidden) {
      this.contentTarget.classList.remove(hiddenClass);
      this.formTarget.classList.add(hiddenClass);
      return;
    }
    this.contentTarget.classList.add(hiddenClass);
    this.formTarget.classList.remove(hiddenClass);
  }
}
