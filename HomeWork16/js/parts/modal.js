const SelectorOverlay = ".overlay";
const SelectorClose = ".popup-close";
const SelectorMoreButtons = ".more, .description-btn";
const SelectorFormModal = ".main-form";
const SelectorFormContact = "#form";

function modal() {
  class Form {
    constructor(formSelector, method, URL) {
      this.method = method;
      this.URL = URL;

      this.form = document.querySelector(formSelector);
      this.inputs = this.form.getElementsByTagName("input");
      this.statusMessage = document.createElement("div");
      this.statusMessage.classList.add("status");

      this.message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
      };

      this.setSubmitAction();
    }
    setSubmitAction() {
      this.form.addEventListener("submit", event => {
        event.preventDefault();
        this.form.appendChild(this.statusMessage);

        let sendRequest = new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open(this.method, this.URL);
          request.setRequestHeader(
            "Content-Type",
            "application/json; charset=utf-8"
          );

          let formData = new FormData(this.form);

          let obj = {};
          formData.forEach(function(value, key) {
            obj[key] = value;
          });
          let json = JSON.stringify(obj);

          request.send(json);

          request.addEventListener("readystatechange", () => {
            if (request.readyState < 4) {
              this.setStatusMessage(this.message.loading);
              // this.statusMessage.innerHTML = this.message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
              resolve(this.message.success);
            } else {
              reject(this.message.failure);
            }
          });
        });
        sendRequest
          .then(result => this.setStatusMessage(result))
          .catch(err => this.setStatusMessage(err))
          .finally(() => this.clearInputs());
      });
    }
    setStatusMessage(message) {
      this.statusMessage.innerHTML = message;
    }
    clearInputs() {
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].value = "";
      }
    }
  }

  class MoreButtons {
    constructor(modal, buttonsSelector) {
      this.modal = modal;
      this.buttons = document.querySelectorAll(buttonsSelector);
      this.setEventClick();
    }
    setEventClick() {
      this.buttons.forEach(element => {
        this.addMore.call(element);
      });
    }
    addMore() {
      this.addEventListener("click", () => {
        modal.show();
      });
    }
  }

  class Modal {
    SetOverlay(overlaySelector) {
      this.overlay = document.querySelector(overlaySelector);
      return this;
    }
    SetClose(closeSelector) {
      this.close = document.querySelector(closeSelector);
      this.close.addEventListener("click", () => {
        this.hide();
      });

      return this;
    }
    show() {
      this.overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
    hide() {
      this.overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // Modal
  this.modal = new Modal().SetOverlay(SelectorOverlay).SetClose(SelectorClose);
  this.moreButtons = new MoreButtons(this.modal, SelectorMoreButtons);

  // Form Modal
  this.formModal = new Form(SelectorFormModal, "POST", "server.php");
  // Form Contact
  this.formContact = new Form(SelectorFormContact, "POST", "server.php");
}

module.exports = modal;
