async function works() {
    const response = await fetch('http://localhost:5678/api/works');
    const project = await response.json();
    return project;
}


function galleryModal(photos) {
    const galleryElement = document.querySelector(".modal-gallery");
    galleryElement.innerHTML = "";

    for (let i = 0; i < photos.length; i++) {
        const content = photos[i];

        const imageElement = document.createElement("img");
        imageElement.src = content.imageUrl;
        imageElement.alt = content.title;


        galleryElement.appendChild(imageElement);
    }
}

async function initModal() {
    const modal = await works();
    galleryModal(photos);
}

initModal();


const modify = document.querySelector(".modify");
modify.addEventListener("click", async () => {
    galleryModal(photos)
})