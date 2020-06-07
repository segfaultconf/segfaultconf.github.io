(function () {
  let menuContainer, button, menu, body, menuLinks;

  menuContainer = document.getElementById('siteMenu');
  if (!menuContainer) {
    return;
  }

  button = menuContainer.getElementsByTagName('button')[0];
  if ('undefined' === typeof button) {
    return;
  }

  menu = document.getElementById('siteMenuInside');

  body = document.getElementsByTagName('body')[0];

  menuLinks = Array.from(menuContainer.getElementsByTagName('a'));

  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }

  menuLinks.forEach(el => {
    el.addEventListener('click', function () {
      menuContainer.className = menuContainer.className.replace(' menu--toggled', '');
      button.setAttribute('aria-expanded', 'false');
      body.style.overflow = 'visible';
    });
  });

  button.onclick = function () {
    if (-1 !== menuContainer.className.indexOf('menu--toggled')) {
      menuContainer.className = menuContainer.className.replace(' menu--toggled', '');
      button.setAttribute('aria-expanded', 'false');
      body.style.overflow = 'visible';
    } else {
      menuContainer.className += ' menu--toggled';
      button.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }
  };
})();