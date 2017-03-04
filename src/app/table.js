import tableTpl from "../templates/table.jade";

export default (data) => {
  document.getElementById("table-container").innerHTML = tableTpl({data: data});
};

