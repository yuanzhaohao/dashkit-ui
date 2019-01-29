
let modalElement = null;
let needToFocus = false;

export function handleBlur() {
  needToFocus = true;
}

export function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    setTimeout(() => {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      const el = modalElement;
      el.focus();
    }, 0);
  }
}