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