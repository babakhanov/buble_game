require("./stylesheets/application.scss");
require("./app/app.js");

import ready from "./app/utils/ready";
import app from "./app/app";

ready(() => {
  app(20, 600, 5000); // number of customers, tickCount, tickTime
});

window.toggleSidebar = () => {
  document.getElementsByTagName("body")[0].classList.toggle("sidebar-close");
  //app();
};

if (NODE_ENV == 'development'){
  window._ = _;
}
