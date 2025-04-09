import '../style.css';

import Controller from './controller';
import { demoProject } from './project';

const modalContainer = document.querySelector('.modal-container');

const projectsContainer = document.querySelector('.projects');
let projects = document.querySelectorAll('.project-container');

const newProjectButton = document.querySelector('#add-new-project');
const projectCreateModal = document.querySelector('.create-project-modal');
const closeProjectCreateModal = document.querySelector(
	'#close-project-creation-modal'
);
const projectForm = document.querySelector('.project-details');

const newTaskButton = document.querySelector('#add-new-task');
const taskCreateModal = document.querySelector('.create-task-modal');
const closeTaskCreateModal = document.querySelector(
	'#close-task-creation-modal'
);
const taskForm = document.querySelector('.task-details');

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
	// Creating a new project
	projectForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const projectName = document.querySelector('#project-name-input').value;
		const projectDescription = document.querySelector(
			'#project-description-input'
		).value;

		const newProject = controller.createNewProject(
			projectName,
			projectDescription
		);

		// Making the new project active and rendering it
		// 'renderProject' returns the projects container element, that is why I have it as a callback
		setProjectActive(newProject, renderProject(newProject));

		document.querySelector('#project-name-input').value = '';
		document.querySelector('#project-description-input').value = '';

		modalContainer.classList.remove('active');
		projectCreateModal.classList.remove('active');
	});

	function renderProject(project) {
		const projectContainer = document.createElement('div');
		projectContainer.classList.add('project-container');
		projectContainer.id = project.projectId;

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

		// created project has to be clickable
		projectContainer.addEventListener('click', () => {
			setProjectActive(project, projectContainer);
		});

		projectsContainer.appendChild(projectContainer);

		projects = document.querySelectorAll('.project-container');

		// returning the project container element so we can set it as active
		return projectContainer;
	}

	function setProjectActive(project, container) {
		setAllAsInactive(projects);
		controller.setActiveProject(project.projectId);
		container.classList.add('active');

		displayActiveProjectDetails(project.name, project.description);
	}

	function displayActiveProjectDetails(projectName, projectDescription) {
		const activeProjectNameDisplay =
			document.querySelector('.project-title');
		activeProjectNameDisplay.innerText = projectName;

		const activeProjectDescriptionDisplay = document.querySelector(
			'.project-description'
		);
		activeProjectDescriptionDisplay.innerText = projectDescription;
	}

	function setAllAsInactive(projectElements) {
		projectElements.forEach((projectElement) => {
			projectElement.classList.remove('active');
		});
	}

	function initialRender() {
		controller.projects.forEach((project) => {
			// Setting the demo project as active
			if (project.projectId === demoProject.projectId) {
				setProjectActive(project, renderProject(project));
			} else {
				// For the rest of the projects(When localStorage is introduced), I want the projects to be rendered but not set to active
				projects = renderProject(project);
			}
		});
	}

	// Rendering any pre-exsisting projects
	initialRender();
})();

const taskManager = (function () {
	// Creating a new Task
	taskForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const taskName = document.querySelector('#task-name-input').value;
		const taskDescription = document.querySelector(
			'#task-description-input'
		).value;
		const taskPriority = document.querySelector(
			'#task-priority-input'
		).value;
		const taskDueDate = document.querySelector(
			'#task-due-date-input'
		).value;
	});
})();
