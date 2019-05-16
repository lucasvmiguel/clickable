import * as menu from "./menu";
import * as api from "./api";
import * as qs from "./query-params";

let apiConfig: api.IConfig;

const tag = document.getElementById('clickable-js') as HTMLScriptElement;
const qsParams = qs.getQueryParamsFromUrl(tag.src);

api.getConfig(qsParams["key"]).then(response => apiConfig = response);

window.addEventListener("click", (event: MouseEvent) => {
  menu.deleteMenuNode();
});

window.addEventListener("contextmenu", (event: MouseEvent) => {
  const attrs = menu.getFirstClickableAttribute(event.target as HTMLElement);
  menu.deleteMenuNode();

  if (!apiConfig.global && !attrs) {
    return;
  }

  event.preventDefault();

  menu.createMenu(apiConfig, event, attrs);

  return false;
});