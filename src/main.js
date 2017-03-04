require("./stylesheets/application.scss");
require("./app/app.js");

import ready from "./app/utils/ready";
import app from "./app/app";
import gameTpl from "./templates/game.jade";

window.play = (customersCount, tickCount, tickTime) => {
  document.getElementById("content").innerHTML = gameTpl();
  app(customersCount, tickCount, tickTime);
};

ready(() => {
  play(20, 600, 5000);
});

window.toggleSidebar = () => {
  document.getElementsByTagName("body")[0].classList.toggle("sidebar-close");
  //app();
};

if (NODE_ENV == 'development'){
  window._ = _;
}
