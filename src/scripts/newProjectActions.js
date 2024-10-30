import { addNewProjectButton } from './showNewProjectContainer.js';
import { addNewProjectContainer } from './showNewProjectContainer.js';
import { createNewProject } from './createNewProject.js';
import { checkIfProjectExists } from './checkIfProjectExists.js';

const confirmNewProjectButton = document.querySelector('#add-new-project');
const cancelNewProjectButton = document.querySelector('#cancel-new-project');

const cancelProjectCreation = (function () {
	cancelNewProjectButton.addEventListener('click', () => {
		const projectName = document.querySelector('#project-name');
		projectName.value = '';
		addNewProjectContainer.style.display = 'none';
		addNewProjectButton.style.display = 'flex';
	});
})();

const confirmProjectCreation = (function () {
	confirmNewProjectButton.addEventListener('click', (e) => {
		e.preventDefault();

		const addProjectButton = document.querySelector('#add-new-project');

		addProjectButton.addEventListener('click', () => {
			const projectNameInput = document.querySelector('#project-name');

			if (projectNameInput.value == '') {
				console.log('This projects name is empty');
			} else if (checkIfProjectExists(projectNameInput.value) === false) {
				createNewProject();
				addNewProjectContainer.style.display = 'none';
				addNewProjectButton.style.display = 'flex';
			} else {
				console.log('This project already exists');
			}
		});
	});
})();
