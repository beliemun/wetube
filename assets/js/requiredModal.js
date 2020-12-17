const requiredModal = document.getElementById("jsRequiredModal");
const yesButton = document.getElementById("jsYesButton");
const noButton = document.getElementById("jsNoButton");


const closeModal = () => {
    requiredModal.classList.remove("opacity");
    yesButton.removeEventListener("click", closeModal);
    noButton.removeEventListener("clikc", closeModal);

    // .requiredModal - transition: opacity 0.5s ease-in-out;
    setTimeout(() => {
        requiredModal.style.visibility = "hidden";
    }, 500);
}

const showRequireModal = () => {
    requiredModal.style.visibility = "visible";
    requiredModal.classList.add("opacity");

    if (requiredModal) {
        yesButton.addEventListener("click", closeModal);
        noButton.addEventListener("click", closeModal);
    } else {
        console.log("Can`t Find requiredModal");
    }
}

export default showRequireModal;