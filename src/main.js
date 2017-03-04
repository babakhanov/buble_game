require("./stylesheets/application.scss");
require("./app/app.js");

import ready from "./app/utils/ready";
import app from "./app/app";

ready(() => {
  app();
});

window.toggleSidebar = () => {
  document.getElementsByTagName("body")[0].classList.toggle("sidebar-close");
  app();
};

