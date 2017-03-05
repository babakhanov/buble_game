require("./stylesheets/application.scss");

import ready from "./app/utils/ready";
import game from "./app/game";
import gameTpl from "./templates/game.jade";
import introTpl from "./templates/intro.jade";

window.play = () => {
  let customersCount = parseInt(document.getElementById("customersCount").value) || 20;
  let tickCount = parseInt(document.getElementById("tickCount").value) || 20;
  let tickTime = parseInt(document.getElementById("tickTime").value) || 20;
  document.getElementById("content").innerHTML = gameTpl();
  game(customersCount, tickCount, tickTime);
};

window.init = () => {
  document.getElementById("content").innerHTML = introTpl();
};

ready(window.init);

if (NODE_ENV == 'development'){
  window._ = _;
}
