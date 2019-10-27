const SelectorTabs = ".info-header-tab";
const SelectorInfo = ".info-header";
const SelectorTabContent = ".info-tabcontent";

function tabs() {
  class Tabs {
    constructor(tabsSelector, infoSelector, tabContentSelector) {
      this.tabs = document.querySelectorAll(tabsSelector);
      this.tabContent = document.querySelectorAll(tabContentSelector);
      this.info = document.querySelector(infoSelector);
      this.info.addEventListener("click", function(event) {
        let tabs = window.tabs;
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
          for (let i = 0; i < tabs.tabs.length; i++) {
            if (target == tabs.tabs[i]) {
              tabs.hideTabContent(0);
              tabs.showTabContent(i);
              break;
            }
          }
        }
      });
      this.hideTabContent(1);
    }
    hideTabContent(a) {
      for (let i = a; i < this.tabContent.length; i++) {
        this.tabContent[i].classList.remove("show");
        this.tabContent[i].classList.add("hide");
      }
    }
    showTabContent(b) {
      if (this.tabContent[b].classList.contains("hide")) {
        this.tabContent[b].classList.remove("hide");
        this.tabContent[b].classList.add("show");
      }
    }
  }

  this.tabs = new Tabs(SelectorTabs, SelectorInfo, SelectorTabContent);
}

module.exports = tabs;
