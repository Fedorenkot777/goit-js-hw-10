
const gallery = document.querySelector(".gallery");

const imgEl = images.map(image => {
    return `<li class= "gallery-item"><a class="gallery-link" href="${image.original}">
    <img class="gallery-image" src="${image.preview}" data-source="${image.original}"
    alt="${image.description}"/></a>
    </li>`
}).join("");

gallery.insertAdjacentHTML("beforeend", imgEl);
