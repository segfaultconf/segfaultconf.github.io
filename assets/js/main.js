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