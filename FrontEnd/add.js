import { checkElement } from "./error.js";

/** ajout photo vers l'api */
const form = checkElement("#add-photos");

async function addPhoto() {
  const title = checkElement("#title").value;
  const category = checkElement("#categorie").value;
  const imageFile = checkElement("#upload-image").files[0];
  const errorMessage = checkElement("#message-error");
  errorMessage.style.display = "none";

  // Vérifier que tous les champs sont remplis
  if (!title || !category || !imageFile) {
    errorMessage.style.display = "block";
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", parseInt(category));
  formData.append("image", imageFile);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    errorMessage.textContent = "Erreur lors de l'ajout de la photo";
    errorMessage.style.display = "block";
    throw new Error(`Erreur :  ${response}`);
  }

  // Mettre à jour les galeries
  await updateGalleries();
}

// Fonction pour mettre à jour les galeries
async function updateGalleries() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();

  // Mettre à jour la galerie principale
  const mainGallery = checkElement(".gallery");
  if (mainGallery) {
    mainGallery.innerHTML = "";
  }
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    mainGallery.appendChild(figure);
  });

  form.reset();
  checkElement(".label-content").style.display = "flex";
  checkElement("#selected-img").style.display = "none";
}

// Gestion de l'aperçu de l'image
const inputFile = checkElement("#upload-image");
const selectedImg = checkElement("#selected-img");
const labelContent = checkElement(".label-content");

inputFile.addEventListener("change", () => {
  const img = inputFile.files[0];
  if (img) {
    labelContent.style.display = "none";
    selectedImg.style.display = "flex";
    selectedImg.src = URL.createObjectURL(img);
  }
});

/** changement de couleur bouton de validation */
const validateBtn = checkElement(".validate-btn");
const uploadImageInput = checkElement("#upload-image");
const titleInput = checkElement("#title");
const categorieInput = checkElement("#categorie");
const inputs = [uploadImageInput, titleInput, categorieInput];
const overlay = checkElement(".overlay");
const errorMessage = checkElement("#message-error");

inputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    event.preventDefault();
    if (isFormCompleted(inputs)) {
      errorMessage.style.display = "none";
      validateBtn.style.backgroundColor = "#1D6154";
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isFormCompleted(inputs)) {
    overlay.style.display = "none";
    addPhoto();
  } else {
    errorMessage.style.display = "block";
    validateBtn.style.backgroundColor = "#A7A7A7";
  }
});

function isFormCompleted(inputs) {
  let completed = true;
  inputs.forEach((input) => {
    if (input.type === "file") {
      if (!input.files || input.files.length === 0) {
        completed = false;
      }
    } else {
      if (!input.value.trim()) {
        completed = false;
      }
    }
  });

  return completed;
}
