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
