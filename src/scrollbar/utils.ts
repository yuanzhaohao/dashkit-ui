import css from 'dom-css';

export function getInnerWidth(el: Element) {
  const { clientWidth } = el;
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return clientWidth
    - (paddingLeft ? parseFloat(paddingLeft) : 0)
    - (paddingRight ? parseFloat(paddingRight) : 0);
}

export function getInnerHeight(el: Element) {
  const { clientHeight } = el;
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return clientHeight
    - (paddingTop ? parseFloat(paddingTop) : 0)
    - (paddingBottom ? parseFloat(paddingBottom) : 0);
}

let scrollbarWidth: boolean | number = false;

export function getScrollbarWidth() {
  if (scrollbarWidth !== false) return scrollbarWidth;
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    css(div, {
      width: 100,
      height: 100,
      position: 'absolute',
      top: -9999,
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar'
    });
    document.body.appendChild(div);
    scrollbarWidth = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
  } else {
    scrollbarWidth = 0;
  }
  return scrollbarWidth || 0;
}