/** ajout photo vers l'api */
const form = document.querySelector("#add-photos");

async function addPhoto(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const category = document.querySelector("#categorie").value;
  const imageFile = document.querySelector("#upload-image").files[0];
  const errorMessage = document.querySelector("#message-error");
  errorMessage.style.display = 'none';

  // Vérifier que tous les champs sont remplis
  if (!title || !category || !imageFile) {
    console.log("Champs manquants");
    errorMessage.textContent = "Tous les champs doivent être remplis";
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
  console.log('works', works)

  // Mettre à jour la galerie principale
  const mainGallery = document.querySelector(".gallery");
  mainGallery.innerHTML = "";
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

  document.querySelector("#add-photos").reset();
  document.querySelector(".label-content").style.display = "block";
  document.querySelector("#selected-img").style.display = "none";
}

document.querySelector("#add-photos").addEventListener("submit", addPhoto);

// Gestion de l'aperçu de l'image
const inputFile = document.querySelector("#upload-image");
const selectedImg = document.querySelector("#selected-img");
const labelContent = document.querySelector(".label-content");

inputFile.addEventListener("change", () => {
  const img = inputFile.files[0];
  if (img) {
    labelContent.style.display = "none";
    selectedImg.style.display = "flex";
    selectedImg.src = URL.createObjectURL(img);
  }
});


/** changement de couleur bouton de validation */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".modale-add-photo form");
  const inputs = form.querySelectorAll(
    "input[type='text'], input[type='file'], select"
  );
  const validateBtn = document.querySelector(".validate-btn");

  function checkFormCompletion() {
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

    validateBtn.style.backgroundColor = completed ? "#1D6154" : "#A7A7A7";
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkFormCompletion);
    input.addEventListener("change", checkFormCompletion);
  });

  checkFormCompletion();
});


/** fermeture automatique de la modale après ajout de la photo */

const validateBtn = document.querySelector(".validate-btn");
const overlay = document.querySelector(".overlay");
validateBtn.addEventListener("click", () => {
    overlay.style.display = "none"
})
