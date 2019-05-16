import * as api from "./api";
import * as icon from "./icon";
import { getPositionClicked } from "./mouse";

let menuValue = null;
let menuVisible = null;

export const createMenu = (config: api.IConfig, event: MouseEvent, attrs?: { value?: string, menu?: string }) => {
  const position = getPositionClicked(event);

  const items = attrs && attrs.menu && config.menu[attrs.menu] ? config.menu[attrs.menu] : config.menu.default;

  const markup = menuMarkup(items);
  window.document.getElementsByTagName("body")[0].innerHTML += markup;

  const menuNode = window.document.getElementById("clickable-menu");
  setPosition(menuNode, position);

  menuValue = attrs && attrs.value;
  menuVisible = true;
};

export const deleteMenuNode = () => {
  const menu = window.document.getElementById("clickable-menu");
  if (!menu) {
    return;
  }

  menu.parentElement.removeChild(menu);

  menuVisible = false;
  menuValue = false;
}

export const getFirstClickableAttribute = (node: HTMLElement): { value?: string, menu?: string } => {
  if (!node || !node.getAttributeNode) {
    return null;
  }

  const valueAttr = node.getAttribute("data-clickable-value");
  const menuAttr = node.getAttribute("data-clickable-menu");
  if (valueAttr || menuAttr) {
    // @ts-ignore
    return { value: valueAttr, menu: menuAttr };
  }

  // @ts-ignore
  return getFirstClickableAttribute(node.parentNode);
};

const setPosition = (menuNode: HTMLElement, position: { top: number, left: number }) => {
  const fixedLeft = position.left + menuNode.offsetWidth <= window.innerWidth ? position.left : position.left - menuNode.offsetWidth;
  const fixedTop = position.top + menuNode.offsetHeight <= window.innerHeight ? position.top : position.top - menuNode.offsetHeight;

  menuNode.style.left = `${fixedLeft}px`;
  menuNode.style.top = `${fixedTop}px`;
};



const menuMarkup = (options: api.IOption[]) => {
  if (options.length < 1) {
    return '';
  }

  const optionsMarkup = options.map(o => itemMarkup(o)).join('');

  return `
    <div id="clickable-menu" style="display: block">
      <ul class="clickable-menu-options">
        ${optionsMarkup}
      </ul>
    </div>
  `;
};

const itemMarkup = (option: api.IOption) => `
  <li class="clickable-menu-option" id="clickable-${option.id}">
    ${icon.getIconMarkup(option.icon)}
    ${option.text}
  </li>
`;