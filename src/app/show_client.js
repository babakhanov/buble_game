import activeClientTpl from "../templates/active_client.jade";

export default (id) => {
  document.getElementById("client-info").innerHTML = activeClientTpl({client: window.clients[id]});
};

