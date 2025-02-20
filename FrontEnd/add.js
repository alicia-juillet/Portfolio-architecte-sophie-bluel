/** ajout photo vers l'api */


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
