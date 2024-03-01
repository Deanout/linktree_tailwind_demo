import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="edit-link"
export default class extends Controller {
  static targets = ["content", "form"];
  connect() {
    // console.log("Connected the Edit Link Controller");
  }

  showForm(event) {
    this.toggleForm(false);
  }
  hideForm(event) {
    this.toggleForm(true);
  }

  toggleForm(hidden) {
    console.log("Toggling form")
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
