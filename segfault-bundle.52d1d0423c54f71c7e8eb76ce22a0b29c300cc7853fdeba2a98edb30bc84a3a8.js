(function () {
  const elementInViewport = el => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length) {
    counters.forEach(counter => counter.innerText = 0);

    window.addEventListener('scroll', function (e) {
      counters.forEach(counter => {
        if (elementInViewport(counter) && !counter.dataset.initialized) {
          count(counter);
        }
      });
    });

    const count = counter => {
      counter.dataset.initialized = true;

      const max = parseFloat(counter.dataset.counter);
      const step = max < 1 ? 0.1 : 1;
      const performanceTime = 1000;
      const intervalTime = performanceTime / (max / step);
      const interval = setInterval(setCounter, intervalTime);

      let i = 0;
      counter.innerText = i;

      function setCounter() {
        if (i < max) {
          i += step;
          counter.innerText = i < 1 ? i.toFixed(1) : i;
        } else {
          clearInterval(interval);
        }
      }

    }
  }

  const animatedElements = Array.from(document.getElementsByClassName('el-animated'));

  if (animatedElements.length) {
    const animate = elements => {
      let counter = 0;
      elements.forEach(el => {

        if (!el.classList.contains('come-in')) {
          if (elementInViewport(el)) {
            el.classList.add('come-in');
            el.style.transitionDelay = `${counter*0.2}s`;
            counter++;
          }
        }

      });
    };

    window.addEventListener('scroll', function () {
      animate(animatedElements);
    });

    animate(animatedElements);
  }

  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      document.querySelector('[data-header]').classList.remove('header--hidden');
    } else {
      document.querySelector('[data-header]').classList.add('header--hidden');
    }
    prevScrollPos = currentScrollPos;
  }

})();
;
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
;
(function () {
  const twitterPosts = document.querySelectorAll('[data-linkify]');
  const reUrl = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  const reHash = /(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g
  const reMention = /(?:\s|^)?@[A-Za-z0-9\-\.\_]+(?:\s|$)/g

  const linkify = text => {
    return text
      .replace(
        reUrl,
        url => `<a href="${url}" target="_blank" rel="nofollow noopener">${url}</a>`
      )
      .replace(
        reHash,
        hash => `<a href="https://twitter.com/hashtag/${hash.replace('#', '').trim()}" target="_blank" rel="nofollow noopener">${hash}</a>`
      )
      .replace(
        reMention,
        mention => `<a href="https://twitter.com/${mention.replace('@', '').trim()}" target="_blank" rel="nofollow noopener">${mention}</a>`
      )
  };

  for (const post of twitterPosts) {
    post.innerHTML = linkify(post.innerHTML);
  }
  
})();
;
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
;
(function () {
  var playerEl = document.getElementById('player');

  if (playerEl) {
    function loadPlayer(videoId) {
      if (typeof (YT) == 'undefined' || typeof (YT.Player) == 'undefined') {

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = function () {
          onYouTubePlayer(videoId);
        };

      } else {

        onYouTubePlayer(videoId);

      }
    }

    var player;

    function onYouTubePlayer(videoId) {
      if (player) {
        player.destroy();
      };
      player = new YT.Player('player', {
        height: '291',
        width: '516',
        videoId: videoId,
        playerVars: {
          controls: 2,
          showinfo: 0,
          rel: 0,
          showsearch: 0,
          iv_load_policy: 3
        },
      });
    }

    var playlistItems = document.querySelectorAll('[data-yt-video-id]');

    loadPlayer(playlistItems[0].dataset.ytVideoId);

    for (var i = 0, len = playlistItems.length; i < len; i++) {
      playlistItems[i].addEventListener('click', function (e) {
        e.preventDefault();
        loadPlayer(this.dataset.ytVideoId);
      });
    }
  }
})();
;
(function () {
  const gallery = document.querySelector('[data-random-gallery]');

  if (gallery) {
    const galleryItems = Array.from(gallery.querySelectorAll('[data-random-gallery-photo]'));

    const shuffle = array => {
      let currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    const newGalleryItems = shuffle(galleryItems);

    galleryItems.forEach(element => {
      gallery.removeChild(element);
    });

    newGalleryItems.forEach(element => {
      gallery.appendChild(element);
    });
  }

})();
;
(function () {
  const slider = document.querySelectorAll('[data-slider]');  

  slider.forEach(slider => {    
    const container = slider.querySelector('.slider__container');
    const buttons = slider.querySelector('.slider__buttons');
    while (buttons.firstChild) {
      buttons.removeChild(buttons.lastChild);
    }
    const slides = slider.querySelectorAll('.slider__slide');
    const wrapper = slider.querySelector('.slider__wrapper');
    const buttonsArr = [];
    
    const slideWidth = () => {
      const isMobile = document.querySelector('body').offsetWidth < 768;
      const isFullWidth = () => isMobile || slider.dataset.slider === 'full-width';
      const slideWidth = isFullWidth() ? wrapper.offsetWidth : slides[0].firstElementChild.offsetWidth;
      container.style.width = isFullWidth() ? 
            slideWidth * slides.length + 'px' : 1.25 * slideWidth * slides.length + 'px';
      wrapper.style.height = slides[0].firstElementChild.offsetHeight + 'px';        
      return slideWidth;
    }

    let currentIndex = 0;
    let timeout;

    const autoPlay = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (currentIndex < (slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 3000);
    }

    const move = newIndex => {
      let offsetLeft;

      if (currentIndex === newIndex) {
        return;
      }

      autoPlay();

      buttonsArr[currentIndex].classList.remove('slider__button--active');
      buttonsArr[newIndex].classList.add('slider__button--active');

      offsetLeft = slideWidth() * newIndex; 
      container.style.left = `-${offsetLeft}px`;
      currentIndex = newIndex;

      const animatedElements = Array.from(slider.querySelectorAll('.el-animated'));
      animatedElements.forEach(el => {
        if (!el.classList.contains('come-in')) {
          el.classList.add('come-in');
        }
      });
    }

    let x0 = null;
    const unify = e => e.changedTouches ? e.changedTouches[0] : e;
    const lock = e => x0 = unify(e).clientX;
    const swipe = e => {
      if (x0 || x0 === 0) {
        let dx = unify(e).clientX - x0,
          s = Math.sign(dx);

        const newIndex = currentIndex - s;
        if (newIndex >= 0 && newIndex < slides.length) {
          move(newIndex);
        }
        if (newIndex >= slides.length) {
          move(0);
        }

        x0 = null
      }
    };

    container.addEventListener('mousedown', lock, false);
    container.addEventListener('touchstart', lock, false);

    container.addEventListener('touchmove', e => {
      e.preventDefault()
    }, false);

    container.addEventListener('mouseup', swipe, false);
    container.addEventListener('touchend', swipe, false);

    for (let [index, slide] of slides.entries()) {
      slide.style.width = `${slideWidth()}px`;

      const button = document.createElement('button');
      button.classList.add('slider__button');
      button.setAttribute('title', `Idź do slajdu nr ${index+1}`)

      if (index === currentIndex) {
        button.classList.add('slider__button--active');
      }

      button.addEventListener('click', () => move(index));

      buttons.appendChild(button);
      buttonsArr.push(button);
    }
    
    autoPlay();
    window.onresize = autoPlay;
  });

})();