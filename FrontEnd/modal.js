import { confirmed } from "./delete.js";
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  const project = await response.json();
  return project;
}

function galleryModal(photos) {
  const galleryElement = document.createElement("div");
  galleryElement.classList.add("modale-gallery");

  for (let i = 0; i < photos.length; i++) {
    const content = photos[i];

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.setAttribute('data-id', content.id); 
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
  }
  return galleryElement;
}

async function initModal() {
  const photos = await works();
  const galleryElement = galleryModal(photos);

  await categorieSelection();

  const overlay = document.querySelector(".overlay");
  const modale = document.querySelector(".modale");
  const modaleAddPhotos = document.querySelector(".modale-add-photo");
  const addPhotoBtn = document.querySelector(".add-photo");
  const modifyLink = document.querySelector("#open-modal");

  overlay.style.display = "none";
  modaleAddPhotos.style.display = "none";

  modifyLink.addEventListener("click", () => {
    overlay.style.display = "flex";
    modale.style.display = "block";
    modaleAddPhotos.style.display = "none";

    const galleryAnchor = document.querySelector(".gallery-anchor");
    galleryAnchor.innerHTML = "";
    galleryAnchor.appendChild(galleryElement);
  });

  const closeBtns = document.querySelectorAll(".closeBtn");
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      modale.style.display = "none";
      modaleAddPhotos.style.display = "none";
    });
  })

  addPhotoBtn.addEventListener("click", () => {
    modale.style.display = "none";
    modaleAddPhotos.style.display = "block";
  });

  const returnBtn = document.querySelector(".returnBtn");
  returnBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    modale.style.display = "block";
    modaleAddPhotos.style.display = "none";
  })

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
  const categorieSelect = document.querySelector("#categorie");

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    const option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.id;

    categorieSelect.appendChild(option);
  }
}

/** ajout photo vers l'api */

const validateBtn =document.querySelector(".validate-btn");
    validateBtn.addEventListener("click", () => {

    })


document.querySelector(".upload-image").addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const category = document.querySelector("#categorie").value;
  const errorMessage = document.querySelector("#message-error");

  try {
      const response = await fetch('http://localhost:5678/api/works', {
          method: "POST",
          headers: {
              "accept": "application/json",
              "Content-Type": "multipart/form-data" 
          },
          body: JSON.stringify({image, title, category}),
      });

      if (response.ok) {
        window.location.href = "index.html";
      } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Format de l'image invalide";
      }
    } catch (error) {
      console.log("erreur : ", error);
      errorMessage.style.display = "block";
      errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
    }
  });


  /** Suppression des travaux */

  const deleteBtn = document.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {

      })
