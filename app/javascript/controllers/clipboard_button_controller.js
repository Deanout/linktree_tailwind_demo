import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="clipboard-button"
export default class extends Controller {
  static targets = ["link", "share"]

  connect() {
    // Grab the url from the data-url attribute
    this.urlValue = this.linkTarget.getAttribute("data-url");
    console.log(this.urlValue)
    console.log(this.shareTarget)
  }

  // Copy to clipboard action
  copy(e) {
    e.preventDefault();
    const url = this.urlValue;
    console.log(url)
    navigator.clipboard.writeText(url).then(() => {
      // Change the link text to "Copied!" for 2 seconds
      this.shareTarget.textContent = "Copied!";
      setTimeout(() => {
        this.shareTarget.textContent = "Share";
      }, 2000);
    });
  }
}
