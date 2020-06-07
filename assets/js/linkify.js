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