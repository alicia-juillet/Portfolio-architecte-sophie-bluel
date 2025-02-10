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

async function getCategories() {
    const response = await fetch( 'http://localhost:5678/api/categories');
    const categories = response.json();
    return categories;
}

async function categoryButtons() {
    const categories = await getCategories();
    const buttonFilter = document.querySelector(".btn-filter-container");

    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("btn-filter");
    const project = await works();
    allButton.addEventListener("click", async () => {
        galleryProjects(project);
    })
    buttonFilter.appendChild(allButton);

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        const button = document.createElement("button");
        button.innerText = category.name;
        button.classList.add("btn-filter");
        button.addEventListener("click", async () => {
            const projectFilter = project.filter(project => project.categoryId === category.id);
            galleryProjects(projectFilter);
        })
    buttonFilter.appendChild(button);

    }
}

async function init() {
    await initGallery(); 
    await categoryButtons(); 
}

init();