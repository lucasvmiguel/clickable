import config from "./config";

import * as api from "./api";
import * as icon from "./icon";
import * as mouse from "./mouse";
import * as screen from "./screen";

let menuValue = null;
let menuVisible = false;

interface IAttributes {
  value?: string;
  menu?: string;
}

export const isMenuVisible = (): boolean => {
  return menuVisible;
}

export const getMenuValue = (): string | null => {
  return menuValue;
}

export const shouldShowMenu = (apiConfig: api.IConfig, attrs?: IAttributes): boolean => {
  if (!apiConfig.global && !attrs) {
    return false;
  }

  const screenWidth = screen.getWidth();
  if (!apiConfig.breakpoints.mobile && screenWidth < config.breakpoints.mobile) {
    return false;
  }

  if (!apiConfig.breakpoints.tablet && screenWidth >= config.breakpoints.mobile && screenWidth < config.breakpoints.desktop) {
    return false;
  }

  if (!apiConfig.breakpoints.desktop && screenWidth >= config.breakpoints.desktop) {
    return false;
  }


  return true;
}

export const createMenu = (apiConfig: api.IConfig, event: MouseEvent, attrs?: IAttributes) => {
  const position = mouse.getPositionClicked(event);

  const items = attrs && attrs.menu && apiConfig.menu[attrs.menu] ? apiConfig.menu[attrs.menu] : apiConfig.menu.default;

  const markup = menuMarkup(items);
  screen.getElementByTag("body").innerHTML += markup;

  const menuNode = screen.getElementById(config.htmlIdentifiers.menu);
  setPosition(menuNode, position);

  menuValue = attrs && attrs.value;
  menuVisible = true;
};

export const deleteMenuNode = () => {
  const menu = screen.getElementById(config.htmlIdentifiers.menu);
  if (!menu) {
    return;
  }

  menu.parentElement.removeChild(menu);

  menuVisible = false;
  menuValue = null;
}

export const getFirstClickableAttribute = (node: HTMLElement): IAttributes => {
  if (!node || !node.getAttributeNode) {
    return null;
  }

  const valueAttr = node.getAttribute(config.htmlAttrs.value);
  const menuAttr = node.getAttribute(config.htmlAttrs.menu);
  if (valueAttr || menuAttr) {
    return { value: valueAttr, menu: menuAttr };
  }

  // @ts-ignore
  return getFirstClickableAttribute(node.parentNode);
};

const setPosition = (menuNode: HTMLElement, position: { top: number, left: number }) => {
  const screenWidth = screen.getWidth();
  const screenHeight = screen.getHeight();
  const fixedLeft = position.left + menuNode.offsetWidth <= screenWidth ? position.left : position.left - menuNode.offsetWidth;
  const fixedTop = position.top + menuNode.offsetHeight <= screenHeight ? position.top : position.top - menuNode.offsetHeight;

  menuNode.style.left = `${fixedLeft}px`;
  menuNode.style.top = `${fixedTop}px`;
};

const menuMarkup = (options: api.IOption[]) => {
  if (options.length < 1) {
    return '';
  }

  const optionsMarkup = options.map(o => itemMarkup(o)).join('');

  return `
    <div id="${config.htmlIdentifiers.menu}" style="display: block">
      <ul class="${config.htmlIdentifiers.menuOptions}">
        ${optionsMarkup}
      </ul>
    </div>
  `;
};

const itemMarkup = (option: api.IOption) => `
  <li class="${config.htmlIdentifiers.menuOption}" id="${config.htmlIdentifiers.menuOption}-${option.id}">
    ${icon.getIconMarkup(option.icon)}
    ${option.text}
  </li>
`;