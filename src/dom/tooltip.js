/**
 * @file Runtime tooltip manager for auto-linked URLs.
 */

const TOOLTIP_ID = 'cdp-hover-tooltip';
const LINK_SELECTOR = '.cdp-auto-link[data-cdp-tooltip]';
const TOOLTIP_SHOW_DELAY_MS = 650;
const TOOLTIP_HIDE_DELAY_MS = 140;
const TOOLTIP_INSTALL_FLAG = '__cdpTooltipInstalled';

/**
 * Clamps value into [minValue, maxValue].
 *
 * @param {number} value - Source value.
 * @param {number} minValue - Lower bound.
 * @param {number} maxValue - Upper bound.
 * @returns {number}
 */
function clamp(value, minValue, maxValue) {
  return Math.min(maxValue, Math.max(minValue, value));
}

/**
 * Ensures tooltip root element exists.
 *
 * @returns {HTMLElement | null}
 */
function ensureTooltipElement() {
  if (!globalThis.document || !globalThis.document.body) {
    return null;
  }

  let tooltipElement = globalThis.document.getElementById(TOOLTIP_ID);
  if (tooltipElement) {
    return tooltipElement;
  }

  tooltipElement = globalThis.document.createElement('div');
  tooltipElement.id = TOOLTIP_ID;
  tooltipElement.setAttribute('role', 'tooltip');
  tooltipElement.hidden = true;
  globalThis.document.body.appendChild(tooltipElement);
  return tooltipElement;
}

/**
 * Positions tooltip relative to active link using fixed coordinates.
 *
 * Why:
 * Fixed positioning avoids clipping within post cards that use overflow rules.
 *
 * @param {HTMLElement} tooltipElement - Tooltip DOM node.
 * @param {Element} linkElement - Active link element.
 * @returns {void}
 */
function positionTooltip(tooltipElement, linkElement) {
  const linkRect = linkElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();
  const gap = 10;

  let top = linkRect.top - tooltipRect.height - gap;
  if (top < 8) {
    top = linkRect.bottom + gap;
  }

  const left = clamp(linkRect.left, 8, globalThis.innerWidth - tooltipRect.width - 8);

  tooltipElement.style.left = `${left}px`;
  tooltipElement.style.top = `${top}px`;
}

/**
 * Installs delegated hover/focus tooltip behavior for auto links.
 *
 * @returns {void}
 */
function installAutoLinkTooltip() {
  if (globalThis[TOOLTIP_INSTALL_FLAG]) {
    return;
  }
  globalThis[TOOLTIP_INSTALL_FLAG] = true;

  const tooltipElement = ensureTooltipElement();
  if (!tooltipElement) {
    return;
  }

  let activeLink = null;
  let showTimerId = null;
  let hideTimerId = null;

  /**
   * Updates tooltip visibility for current active link.
   *
   * @returns {void}
   */
  function refreshTooltip() {
    if (!activeLink || !globalThis.document.contains(activeLink)) {
      tooltipElement.hidden = true;
      activeLink = null;
      return;
    }

    const tooltipText = activeLink.getAttribute('data-cdp-tooltip') || activeLink.href || '';
    if (!tooltipText) {
      tooltipElement.hidden = true;
      return;
    }

    tooltipElement.textContent = tooltipText;
    tooltipElement.hidden = false;
    positionTooltip(tooltipElement, activeLink);
  }

  /**
   * Clears pending show/hide timers.
   *
   * @returns {void}
   */
  function clearTimers() {
    if (showTimerId) {
      clearTimeout(showTimerId);
      showTimerId = null;
    }

    if (hideTimerId) {
      clearTimeout(hideTimerId);
      hideTimerId = null;
    }
  }

  /**
   * Activates tooltip for link.
   *
   * @param {Element | null} linkElement - Link candidate.
   * @returns {void}
   */
  function activateLink(linkElement, immediate) {
    clearTimers();

    if (!linkElement) {
      hideTimerId = setTimeout(
        () => {
          activeLink = null;
          refreshTooltip();
        },
        immediate ? 0 : TOOLTIP_HIDE_DELAY_MS
      );
      return;
    }

    showTimerId = setTimeout(
      () => {
        activeLink = /** @type {HTMLAnchorElement} */ (linkElement);
        refreshTooltip();
      },
      immediate ? 0 : TOOLTIP_SHOW_DELAY_MS
    );
  }

  globalThis.document.addEventListener('mouseover', (event) => {
    const linkElement =
      event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
    activateLink(linkElement, false);
  });

  globalThis.document.addEventListener('mouseout', (event) => {
    if (!activeLink) {
      return;
    }

    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Element && relatedTarget.closest(LINK_SELECTOR) === activeLink) {
      return;
    }

    const currentTargetLink =
      event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
    if (currentTargetLink === activeLink) {
      activateLink(null, false);
    }
  });

  globalThis.document.addEventListener('focusin', (event) => {
    const linkElement =
      event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
    if (linkElement) {
      activateLink(linkElement, true);
    }
  });

  globalThis.document.addEventListener('focusout', (event) => {
    const currentTargetLink =
      event.target instanceof Element ? event.target.closest(LINK_SELECTOR) : null;
    if (currentTargetLink === activeLink) {
      activateLink(null, true);
    }
  });

  globalThis.addEventListener('scroll', refreshTooltip, { passive: true });
  globalThis.addEventListener('resize', refreshTooltip);
}

module.exports = {
  installAutoLinkTooltip,
};
