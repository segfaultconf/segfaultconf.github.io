(function () {
  const slider = document.querySelectorAll('[data-slider]');
  const isMobile = document.querySelector('body').offsetWidth < 768;

  slider.forEach(slider => {
    if ((slider.dataset.slider === 'mobile-only' && isMobile) || slider.dataset.slider === '') {
      const container = slider.querySelector('.slider__container');
      const buttons = slider.querySelector('.slider__buttons');
      const slides = slider.querySelectorAll('.slider__slide');
      const wrapper = slider.querySelector('.slider__wrapper');
      const slideWidth = isMobile ? wrapper.offsetWidth : slides[0].firstElementChild.offsetWidth;
      const buttonsArr = [];
      let currentIndex = 0;
      let timeout;

      container.style.width = isMobile ? 
            slideWidth * slides.length + 'px' : 1.25 *slideWidth * slides.length + 'px';
      wrapper.style.height = slides[0].firstElementChild.offsetHeight + 'px';      

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

        if (newIndex > currentIndex) {
          offsetLeft = slideWidth * newIndex; 
          container.style.left = `-${offsetLeft}px`;
        } else {
          offsetLeft = slideWidth * newIndex;
          container.style.left = `-${offsetLeft}px`;
        }

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
        slide.style.width = `${slideWidth}px`;

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
    }
  });

})();