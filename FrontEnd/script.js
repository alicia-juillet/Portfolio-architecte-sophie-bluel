async function works() {
    const response = await fetch('http://localhost:5678/api/works');
    const project = response.json();
    return project;
}

function galleryProjects(project) {
    const galleryElement = document.querySelector(".gallery");
    galleryElement.innerHTML = "";

    for (let i = 0; i < project.length; i++) {
        const content = project[i];

        const contentElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = content.imageUrl;
        imageElement.alt = content.title;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = content.title

        galleryElement.appendChild(contentElement);
        contentElement.appendChild(imageElement);
        contentElement.appendChild(captionElement);
    }
}

async function initGallery() {
    const project = await works();
    galleryProjects(project);
}

initGallery()