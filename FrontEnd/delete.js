import { checkElement } from "./error.js";

export async function deleteWorks(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }

    const deleteElement = checkElement(`.gallery-item[data-id="${id}"]`);
    if (deleteElement) {
      deleteElement.remove();
    }

    const worksResponse = await fetch("http://localhost:5678/api/works");
    const works = await worksResponse.json();

    const mainGallery = checkElement(".gallery");
    if (mainGallery) {
      mainGallery.innerHTML = "";
    }

    works.forEach((work) => {
      const contentElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      const captionElement = document.createElement("figcaption");
      captionElement.innerText = work.title;

      contentElement.appendChild(imageElement);
      contentElement.appendChild(captionElement);
      mainGallery.appendChild(contentElement);
    });
  } catch (error) {
    console.error("Erreur:", error);
  }
}

export async function confirmed(id) {
  await deleteWorks(id);
}
