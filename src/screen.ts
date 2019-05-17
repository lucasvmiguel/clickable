export const addMouseEvent = (name: string, callback: (event: MouseEvent) => void) => {
  window.addEventListener(name, callback);
};

export const getElementByTag = (tag: string): HTMLElement | undefined => {
  const tagHtml = window.document.getElementsByTagName(tag);
  if (tagHtml) {
    return tagHtml[0] as HTMLElement;
  }

  return undefined
};

export const getElementById = (id: string): HTMLElement | undefined => {
  return window.document.getElementById(id);
};

export const getWidth = (): number => {
  return window.innerWidth;
};

export const getHeight = (): number => {
  return window.innerHeight;
};