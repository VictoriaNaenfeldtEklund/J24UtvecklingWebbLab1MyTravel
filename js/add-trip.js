const form = document.getElementById('form');
const imageInput = document.getElementById('image');
const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const resultText = document.getElementById('result');
const radioRemember = document.getElementById('radio-remember');
const radioDream = document.getElementById('radio-dream');

const imageError = document.getElementById('imageError');

const IMAGE_MAX_SIZE = 3 * 1024 * 1024; // 3MB

imageInput.addEventListener('click', resetFormInfoText);

form.addEventListener('submit', (event) => {

    event.preventDefault();
    resetFormInfoText();

    // Get image from file input (always a list)
    const file = imageInput.files[0];

    // check if image is valid (jpeg and < 3mb) else return
    if (!isImageValid(file)) return;

    // read and get choosen image.
    // reader.onload - Triggers/Tells the browser what to do when the file is read from reader.readAsDataURL(file).
    // 1. When you call readAsDataURL(file), the browser starts reading the file in the background
    // 2. When the reading is done, it triggers the onload event
    // 3. If you haven't defined .onload yet, nothing will happen!
    // Best practice is to always attach event handlers before triggering the action that could fire them.
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64Image = event.target.result;

        const article = {
            image: base64Image,
            title: titleInput.value.trim(),
            text: textInput.value.trim()
        };

        // Check if the article is for Remember page or Dream page
        let articleSite = '';

        if (radioDream.checked) {
            articleSite = 'articles-dream';
        } else if (radioRemember.checked) {
            articleSite = 'articles-remember';
        }

        // Get existing articles or start empty
        // localStorage only stores stringified data (via JSON.stringify()), 
        // and File objects lose their actual file content when stringified, 
        // only basic metadata like name, size, and type remain.
        const articles = loadFromLocalStorage(articleSite);
        articles.push(article);
        saveToLocalStorage(articleSite, articles);

        // let the user know and reset form
        resultText.textContent = 'Article added!';
        resultText.style.display = 'block';
        form.reset();
    };

    reader.readAsDataURL(file);
});

function isImageValid(image) {

    if (!['image/jpeg'].includes(image.type)) {
        imageError.textContent = 'Only JPEG images are allowed.';
        imageError.style.display = 'block';
        return false;
    } else if (image.size > IMAGE_MAX_SIZE) {
        imageError.textContent = 'Image size must be less than 3MB.';
        imageError.style.display = 'block';
        return false;
    }

    return true;
}

function resetFormInfoText() {
    imageError.style.display = 'none';
    imageError.textContent = '';
    resultText.style.display = 'none';
    resultText.textContent = '';
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}