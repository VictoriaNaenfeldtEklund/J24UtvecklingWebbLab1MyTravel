const articlesContainer = document.querySelector('#articles');
const articleData = 'data/articles-remember.json';

fetch(articleData)
    .then((resp) => resp.json())
    .then(function (data) {
        let articles = data.articles;

        articles.forEach(({ image, title, text }) => {

            // Create a new article
            const article = document.createElement('article');
            article.classList.add('article');

            // Image content for article
            const articleImage = document.createElement('img');
            articleImage.src = image;
            articleImage.alt = title || 'Uploaded image';
            articleImage.classList.add('article-image');

            // Text content for article - Title + text
            const articleTextContent = document.createElement('div');
            articleTextContent.classList.add('article-content');

            const articleTitle = document.createElement('h2');
            articleTitle.classList.add('article-content-title');
            articleTitle.textContent = title;

            const articleText = document.createElement('p');
            articleText.classList.add('article-content-text');
            articleText.textContent = text;

            articleTextContent.appendChild(articleTitle);
            articleTextContent.appendChild(articleText);

            // Add image and articleTextContent to the article
            article.appendChild(articleImage);
            article.appendChild(articleTextContent);

            // Add the article to the container
            articlesContainer.appendChild(article);
        });
    });

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function createNode(element) {
    return document.createElement(element);
}