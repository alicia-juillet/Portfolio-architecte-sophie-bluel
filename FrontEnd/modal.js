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
    galleryElement.appendChild(galleryItem);

    const imageElement = document.createElement("img");
    imageElement.src = content.imageUrl;
    imageElement.alt = content.title;
    galleryItem.appendChild(imageElement);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
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

  const overlay = document.querySelector(".overlay");

  const modifyLink = document.querySelector("#open-modal");
  modifyLink.addEventListener("click", () => {
    overlay.style.display = "flex";
    const galleryAnchor = document.querySelector(".gallery-anchor");
    galleryAnchor.appendChild(galleryElement);


    const closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      console.log("click");
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) overlay.style.display = "none";
    });
  });
}

initModal();