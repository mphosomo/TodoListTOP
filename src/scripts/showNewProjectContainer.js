export const addNewProjectButton = document.querySelector('.add-new-project');
export const addNewProjectContainer = document.querySelector('.add-project-container');

addNewProjectButton.addEventListener('click', () => {
    addNewProjectContainer.style.display = 'flex';
    addNewProjectButton.style.display = 'none';
});