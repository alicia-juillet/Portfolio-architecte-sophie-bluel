export function checkElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Erreur : L'élément "${selector}" est introuvable.`);
    }
    return element;
}