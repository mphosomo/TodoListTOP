import { addNewProjectButton } from "./showNewProjectContainer.js";
import { addNewProjectContainer } from "./showNewProjectContainer.js";

const confirmNewProjectButton = document.querySelector('#add-new-project');
const cancelNewProjectButton = document.querySelector('#cancel-new-project');

const cancelProjectCreation = (function() {
    cancelNewProjectButton.addEventListener('click', () => {
        addNewProjectContainer.style.display = 'none';
        addNewProjectButton.style.display = 'flex';
    });
})();