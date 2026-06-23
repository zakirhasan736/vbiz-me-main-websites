'use client';

export function unlockDocumentScroll() {
  document.documentElement.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('overflow-y');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('overflow-y');
}

export function lockDocumentScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

/** Native instant scroll — no smooth behavior. */
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function scrollElementIntoView(
  element: Element,
  block: ScrollLogicalPosition = 'start',
) {
  element.scrollIntoView({ block, behavior: 'auto' });
}
