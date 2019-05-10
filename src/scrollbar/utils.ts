export function getInnerWidth(el: Element) {
  const { clientWidth } = el;
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return (
    clientWidth -
    (paddingLeft ? parseFloat(paddingLeft) : 0) -
    (paddingRight ? parseFloat(paddingRight) : 0)
  );
}

export function getInnerHeight(el: Element) {
  const { clientHeight } = el;
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return (
    clientHeight -
    (paddingTop ? parseFloat(paddingTop) : 0) -
    (paddingBottom ? parseFloat(paddingBottom) : 0)
  );
}

let scrollbarWidth: number;

export function getScrollbarWidth() {
  if (!scrollbarWidth) { return 0; }

  const div = document.createElement('div');
  div.setAttribute(
    'style',
    'display:block;position:absolute;width:100px;height:100px;top:-9999px;overflow:scroll;',
  );

  document.body.appendChild(div);
  scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollbarWidth || 0;
}

export const raf =
  window.requestAnimationFrame ||
  function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10);
  };

export const caf = window.cancelAnimationFrame;
