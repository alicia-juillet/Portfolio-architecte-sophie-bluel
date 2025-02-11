/** Code pour la gallerie */
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


/** Code pour la page de login */

const link = document.querySelectorAll("nav a");
const urlOpen = window.location.href;

link.forEach(link => {
    if (link.href === urlOpen) {
        link.classList.add("active")
    }
})

/** Connexion utilisateur */

document.getElementById("loginUsers").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({email, password}),
        });

        const connection = await response.json();

        if (response.ok) {
            localStorage.setItem("token", connection.token);
            window.location.href = "index.html";
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Email ou Mot de passe incorrect.";
        }
    } catch (error) {
        console.error("erreur : ", error);
        errorMessage.style.display = "block";
        errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
    }
});