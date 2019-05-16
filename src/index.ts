import * as menu from "./menu";
import * as api from "./api";

let apiConfig: api.IConfig;

api.getConfig('key').then(response => apiConfig = response);

window.addEventListener("click", (event: MouseEvent) => {
  menu.deleteMenuNode();
});

window.addEventListener("contextmenu", (event: MouseEvent) => {
  event.preventDefault();

  menu.deleteMenuNode();
  menu.createMenu(apiConfig, event);

  return false;
});