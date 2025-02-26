import { checkElement } from "./error.js";

/** Code pour la gallerie */
async function works() {
    const response = await fetch('http://localhost:5678/api/works');
    const project = response.json();
    return project;
}

function galleryProjects(project) {
    const galleryElement = checkElement(".gallery");
    if (galleryElement) {
        galleryElement.innerHTML = "";
    }

    project.forEach(content => {

        const contentElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = content.imageUrl;
        imageElement.alt = content.title;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = content.title

        galleryElement.appendChild(contentElement);
        contentElement.appendChild(imageElement);
        contentElement.appendChild(captionElement);
    });
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
    const buttonFilter = checkElement(".btn-filter-container");

    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("btn-filter");
    const project = await works();
    allButton.addEventListener("click", async () => {
        galleryProjects(project);
    })
    buttonFilter.appendChild(allButton);

    categories.forEach(category => {

        const button = document.createElement("button");
        button.innerText = category.name;
        button.classList.add("btn-filter");
        button.addEventListener("click", async () => {
            const projectFilter = project.filter(project => project.categoryId === category.id);
            galleryProjects(projectFilter);
        })
    buttonFilter.appendChild(button);

    });
}

async function init() {
    await initGallery(); 
    await categoryButtons(); 
}

init();

/** mode édition */

const editionMode = checkElement(".edition-mode");
const logoutButton = checkElement(".logout-link");
const loginButton = checkElement(".login-link");
const btnFilter = checkElement(".btn-filter-container");
const btnModify = checkElement(".modify");

const token = localStorage.getItem("token");
if (token) {
    editionMode.style.display= "flex";
    logoutButton.style.display= "inline";
    loginButton.style.display= "none";
    btnFilter.style.display= "none";
    btnModify.style.display="flex"
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        editionMode.style.display="none";
        logoutButton.style.display="none";
        window.location.reload();
    })
}

