(function () {
  const articlesNavItems = document.querySelectorAll('[data-articles-nav-item]');

  if (articlesNavItems.length) {

    const articlesAll = Array.from(document.querySelectorAll('[data-articles]'));
    const loadMoreButton = document.querySelector('[data-load-more-articles]');

    articlesNavItems.forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const articlesChosen = articlesAll.filter(art => art.dataset.articles === el.dataset.articlesNavItem);

        articlesNavItems.forEach(el => el.classList.remove('text-accent', 'link'));
        el.classList.add('text-accent', 'link');
        articlesAll.forEach(el => el.classList.add('d-none'));
        articlesChosen.forEach(el => {el.classList.remove('d-none'); el.classList.add('come-in');});

        loadMoreButton.dataset.loadMoreArticles = el.dataset.articlesNavItem;

      });
    });

    loadMoreButton.addEventListener('click', function (e) {
      e.preventDefault();
      loadMoreArticles(e.currentTarget.dataset.loadMoreArticles);
    });

    const loadMoreArticles = articles => {
      const articlesContainer = document.querySelector(`[data-articles="${articles}"]`);
      const articleSample = articlesContainer.firstElementChild;

      // replace with real data
      const articlesToLoad = [{
          title: 'Lorem ipsum',
          date: '20/02/2020',
          image: 'images/insta-3.jpg',
          url: '/article.html',
          excerpt: 'Molestiae, hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore provident deserunt accusantium magni repellendus? Dicta.'

        },
        {
          title: 'Labore provident deserunt',
          date: '02/02/2020',
          image: 'images/insta-1.jpg',
          url: '/article.html',
          excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, adipisicing elit. Labore provident deserunt accusantium magni repellendus? Dicta.'

        }
      ];

      articlesToLoad.forEach(art => {
        const articleEl = articleSample.cloneNode(true);

        articleEl.querySelector('[data-article-title]').innerText = art.title;
        articleEl.querySelector('[data-article-date]').innerText = art.date;
        articleEl.querySelector('[data-article-excerpt]').innerText = art.excerpt;
        articleEl.querySelectorAll('[data-article-url]').forEach(el => el.setAttribute('href', art.url));
        articleEl.querySelector('[data-article-image]').setAttribute('src', art.image);

        articlesContainer.appendChild(articleEl);
      });

    };

  };

})();