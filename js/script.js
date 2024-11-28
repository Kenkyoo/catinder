// script.js

const toggleButton = document.getElementById('toggleTheme');

document.addEventListener('DOMContentLoaded', () => {
    

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        toggleIcon();
    });
});

function toggleIcon() {
    if (toggleButton.classList.contains("fa-regular")) {
        toggleButton.classList.remove("fa-regular")
        toggleButton.classList.add("fa-solid")
    } else {
        toggleButton.classList.add("fa-regular");
        toggleButton.classList.remove("fa-solid");
    }
}