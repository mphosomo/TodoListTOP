import '../style.css';

import Controller from './controller';

const projectsContainer = document.querySelector('.projects');

const modalContainer = document.querySelector('.modal-container');

const newProjectButton = document.querySelector('#add-new-project');
const projectCreateModal = document.querySelector('.create-project-modal');
const closeProjectCreateModal = document.querySelector(
	'#close-project-creation-modal'
);
const ProjectForm = document.querySelector('.project-details');

const newTaskButton = document.querySelector('#add-new-task');
const taskCreateModal = document.querySelector('.create-task-modal');
const closeTaskCreateModal = document.querySelector(
	'#close-task-creation-modal'
);

const controller = new Controller();

const modalManager = (function () {
	// New Project Modal
	newProjectButton.addEventListener('click', () => {
		modalContainer.classList.add('active');
		projectCreateModal.classList.add('active');
	});

	closeProjectCreateModal.addEventListener('click', () => {
		modalContainer.classList.remove('active');
		projectCreateModal.classList.remove('active');
	});

	// New Task Modal
	newTaskButton.addEventListener('click', () => {
		modalContainer.classList.add('active');
		taskCreateModal.classList.add('active');
	});

	closeTaskCreateModal.addEventListener('click', () => {
		modalContainer.classList.remove('active');
		taskCreateModal.classList.remove('active');
	});
})();

const projectManager = (function () {
	ProjectForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const projectName = document.querySelector('#project-name-input').value;
		const projectDescription = document.querySelector(
			'#project-description-input'
		).value;

		const newProject = controller.createNewProject(
			projectName,
			projectDescription
		);

		renderProject(newProject);

		document.querySelector('#project-name-input').value = '';
		document.querySelector('#project-description-input').value = '';

		modalContainer.classList.remove('active');
		projectCreateModal.classList.remove('active');
	});

	function renderProject(project) {
		const projectContainer = document.createElement('div');
		projectContainer.classList.add('project-container');

		const leftSide = document.createElement('div');
		leftSide.classList.add('left');
		const projectNameElement = document.createElement('p');
		projectNameElement.innerText = project.name;
		leftSide.appendChild(projectNameElement);

		const rightSide = document.createElement('div');
		rightSide.classList.add('right');
		const editButton = document.createElement('button');
		editButton.id = 'edit-project';
		editButton.innerText = 'Edit';
		const deleteButton = document.createElement('button');
		deleteButton.id = 'delete-project';
		deleteButton.innerText = 'Delete';
		rightSide.append(editButton, deleteButton);

		projectContainer.append(leftSide, rightSide);
		projectsContainer.appendChild(projectContainer);
	}

	function initialRender() {
		controller.projects.forEach((project) => {
			renderProject(project);
		});
	}

	initialRender();
})();
