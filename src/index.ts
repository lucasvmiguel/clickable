import config from "./config";

import * as menu from "./menu";
import * as api from "./api";
import * as qs from "./query-params";
import * as screen from "./screen";

let apiConfig: api.IConfig;

const tag = screen.getElementById(config.htmlIdentifiers.script) as HTMLScriptElement;
const qsParams = qs.getQueryParamsFromUrl(tag.src);

api.getConfig(qsParams[config.script.keyParam]).then(response => apiConfig = response);

screen.addMouseEvent("click", (event: MouseEvent) => {
  if (!menu.isMenuVisible()) {
    return;
  }

  console.log(event.target);
  console.log(menu.getMenuValue());

  menu.deleteMenuNode();
});

screen.addMouseEvent("contextmenu", (event: MouseEvent) => {
  const attrs = menu.getFirstClickableAttribute(event.target as HTMLElement);
  menu.deleteMenuNode();

  if (!menu.shouldShowMenu(apiConfig, attrs)) {
    return;
  }

  event.preventDefault();

  menu.createMenu(apiConfig, event, attrs);

  return false;
});