(function () {
  const d = document;
  const accordionOpenBtns = d.querySelectorAll('[data-accordion-open]');
  const touchSupported = ('ontouchstart' in window);
  const pointerSupported = ('pointerdown' in window);

  const skipClickDelay = e => {
    e.preventDefault();
    e.currentTarget.click();
  }

  const setAriaAttr = (el, ariaType, newProperty) => {
    el.setAttribute(ariaType, newProperty);
  };

  const setAccordionAria = (el1, el2, expanded) => {
    switch (expanded) {
      case 'true':
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case 'false':
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
        break;
    }
  };

  const switchAccordion = e => {
    e.preventDefault();
    const accordion = document.querySelector(`[data-accordion=${e.currentTarget.dataset.accordionId}]`);
    const openBtn = accordion.querySelector('[data-accordion-open]');
    const content = accordion.querySelector(`#${e.currentTarget.dataset.accordionId}`);
    const closeBtn = accordion.querySelector('[data-accordion-close]');

    if (content.classList.contains('accordion__content--collapsed')) {
      setAccordionAria(openBtn, content, 'true');
      openBtn.classList.add('button--expanded');
      content.style.maxHeight = content.children[0].offsetHeight + 'px';
    } else {
      setAccordionAria(openBtn, content, 'false');
      openBtn.classList.remove('button--expanded');
      content.style.maxHeight = '0px';
    }
    if (openBtn.dataset.accordionOpen !== 'full') {
      openBtn.classList.toggle('button--hidden');
    }
    content.classList.toggle('accordion__content--collapsed');
    content.classList.toggle('accordion__content--expanded');

    content.classList.toggle('accordion__content--animateIn');

    if (closeBtn) {
      closeBtn.addEventListener('click', switchAccordion, false);
    }
  };

  for (let i = 0, len = accordionOpenBtns.length; i < len; i++) {
    if (touchSupported) {
      accordionOpenBtns[i].addEventListener('touchstart', skipClickDelay, false);
    }

    if (pointerSupported) {
      accordionOpenBtns[i].addEventListener('pointerdown', skipClickDelay, false);
    }

    accordionOpenBtns[i].addEventListener('click', switchAccordion, false);
  }
})();