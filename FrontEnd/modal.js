import { confirmed } from "./delete.js";
import { checkElement } from "./error.js";

async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  const project = await response.json();
  return project;
}

function galleryModal(photos) {
  const galleryElement = document.createElement("div");
  galleryElement.classList.add("modale-gallery");

  photos.forEach((content) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.setAttribute("data-id", content.id);
    galleryElement.appendChild(galleryItem);

    const imageElement = document.createElement("img");
    imageElement.src = content.imageUrl;
    imageElement.alt = content.title;
    galleryItem.appendChild(imageElement);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => confirmed(content.id));
    galleryItem.appendChild(deleteBtn);

    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid", "fa-trash-can");
    deleteBtn.appendChild(iconDelete);
  });
  return galleryElement;
}

async function initModal() {
  await categorieSelection();

  const overlay = checkElement(".overlay");
  const modale = checkElement(".modale");
  const modaleAddPhotos = checkElement(".modale-add-photo");
  const addPhotoBtn = checkElement(".add-photo");
  const modifyLink = checkElement("#open-modal");

  overlay.style.display = "none";
  modaleAddPhotos.style.display = "none";

  modifyLink.addEventListener("click", async () => {
    const photos = await works();
    const galleryElement = galleryModal(photos);
    overlay.style.display = "flex";
    modale.style.display = "block";
    modaleAddPhotos.style.display = "none";

    const galleryAnchor = checkElement(".gallery-anchor");
    if (galleryAnchor) {
      galleryAnchor.innerHTML = "";
    }
    galleryAnchor.appendChild(galleryElement);
  });

  const closeBtns = document.querySelectorAll(".closeBtn");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      modale.style.display = "none";
      modaleAddPhotos.style.display = "none";
    });
  });

  addPhotoBtn.addEventListener("click", () => {
    modale.style.display = "none";
    modaleAddPhotos.style.display = "block";
  });

  const returnBtn = checkElement(".returnBtn");
  returnBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    modale.style.display = "block";
    modaleAddPhotos.style.display = "none";
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
      modale.style.display = "none";
      modaleAddPhotos.style.display = "none";
    }
  });
}

initModal();

/** modale ajout photo */

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}

async function categorieSelection() {
  const categories = await getCategories();
  const categorieSelect = checkElement("#categorie");

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.id;

    categorieSelect.appendChild(option);
  });
}
