// TODO: Add active state to tasks
// TODO: Implement task and project editing and deletion feature

import '../style.css';

import Controller from './controller';
import { demoProject } from './project';
import Task from './task';

const modalContainer = document.querySelector('.modal-container');

const projectsContainer = document.querySelector('.projects');
let projects = document.querySelectorAll('.project-container');

const newProjectButton = document.querySelector('#add-new-project');
const projectCreateModal = document.querySelector('.create-project-modal');
const closeProjectCreateModal = document.querySelector(
	'#close-project-creation-modal'
);
const projectForm = document.querySelector('.project-details');

const tasksContainer = document.querySelector('.tasks');
let tasks = document.querySelectorAll('.task-container');

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

		const newTask = new Task(
			taskName,
			taskDescription,
			taskPriority,
			taskDueDate
		);

		controller.addNewTaskToActiveProject(newTask);

		// display the task as active after it has been created
		setTaskAsActive(newTask, renderTask(newTask));

		document.querySelector('#task-name-input').value = '';
		document.querySelector('#task-description-input').value = '';
		document.querySelector('#task-due-date-input').value = '';

		modalContainer.classList.remove('active');
		taskCreateModal.classList.remove('active');
	});

	function renderTask(task) {
		const taskContainer = document.createElement('div');
		taskContainer.classList.add('task-container');
		taskContainer.id = task.taskId;

		const outsideLeft = document.createElement('div');
		outsideLeft.classList.add('left');

		const outsideLeftTop = document.createElement('div');
		outsideLeftTop.classList.add('top');

		const outsideLeftTopLeft = document.createElement('div');
		outsideLeftTopLeft.classList.add('left');
		const taskNameElement = document.createElement('h3');
		taskNameElement.innerText = task.name;
		outsideLeftTopLeft.appendChild(taskNameElement);

		const outsideLeftTopRight = document.createElement('div');
		outsideLeftTopRight.classList.add('right');

		const taskCompleteCheckbox = document.createElement('input');
		taskCompleteCheckbox.type = 'checkbox';
		taskCompleteCheckbox.name = 'task-complete';
		taskCompleteCheckbox.id = 'task-complete';
		taskCompleteCheckbox.classList.add('task-complete');
		taskCompleteCheckbox.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		outsideLeftTopRight.appendChild(taskCompleteCheckbox);

		outsideLeftTop.append(outsideLeftTopLeft, outsideLeftTopRight);

		const outsideLeftBottom = document.createElement('div');
		outsideLeftBottom.classList.add('bottom');

		const taskDescriptionElement = document.createElement('p');
		taskDescriptionElement.classList.add('task-description');
		taskDescriptionElement.innerText = task.description;
		outsideLeftBottom.appendChild(taskDescriptionElement);

		outsideLeft.append(outsideLeftTop, outsideLeftBottom);

		const seperator = document.createElement('div');
		seperator.classList.add('seperator');

		const outsideRight = document.createElement('div');
		outsideRight.classList.add('right');

		const textWrapper = document.createElement('div');
		textWrapper.classList.add('wrapper');

		const wrapperLeft = document.createElement('div');
		wrapperLeft.classList.add('left');
		const taskPriorityLabel = document.createElement('label');
		taskPriorityLabel.setAttribute('for', 'task-priority');
		taskPriorityLabel.innerText = 'Priority:';
		const taskPriority = document.createElement('p');
		taskPriority.name = 'priority';
		taskPriority.id = 'task-priority';
		taskPriority.innerText = task.priority;
		wrapperLeft.append(taskPriorityLabel, taskPriority);

		const wrapperRight = document.createElement('div');
		wrapperRight.classList.add('right');
		const taskDueDateLabel = document.createElement('label');
		taskDueDateLabel.setAttribute('for', ' due-date');
		taskDueDateLabel.innerText = 'DueDate:';
		const taskDueDate = document.createElement('p');
		taskDueDate.id = 'due-date';
		taskDueDate.innerText = task.getFormattedDate();
		wrapperRight.append(taskDueDateLabel, taskDueDate);

		textWrapper.append(wrapperLeft, wrapperRight);

		const buttons = document.createElement('div');
		buttons.classList.add('action-buttons');

		const editTaskButton = document.createElement('button');
		editTaskButton.type = 'button';
		editTaskButton.id = 'edit-task';
		editTaskButton.innerText = 'Edit';

		const deleteTaskButton = document.createElement('button');
		deleteTaskButton.type = 'button';
		deleteTaskButton.id = 'delete-task';
		deleteTaskButton.innerText = 'Delete';

		buttons.append(editTaskButton, deleteTaskButton);

		outsideRight.append(textWrapper, buttons);

		taskContainer.append(outsideLeft, seperator, outsideRight);

		tasksContainer.appendChild(taskContainer);

		taskContainer.addEventListener('click', () => {
			setTaskAsActive(task, taskContainer);
		});

		tasks = document.querySelectorAll('.task-container');

		// returing the project container element so we can set it as active
		return taskContainer;
	}

	function setTaskAsActive(task, container) {
		setAllAsInactive(tasks);
		controller.setActiveTask(task);
		container.classList.add('active');
	}

	function setAllAsInactive(taskElements) {
		taskElements.forEach((taskElement) => {
			taskElement.classList.remove('active');
		});
	}

	return { renderTask };
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
		setProjectAsActive(newProject, renderProject(newProject));

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

		projectsContainer.appendChild(projectContainer);

		// created project has to be clickable
		projectContainer.addEventListener('click', () => {
			setProjectAsActive(project, projectContainer);
		});

		projects = document.querySelectorAll('.project-container');

		// returning the project container element so we can set it as active
		return projectContainer;
	}

	function setProjectAsActive(project, container) {
		setAllAsInactive(projects);
		controller.setActiveProject(project.projectId);
		container.classList.add('active');

		removeTasksFromProjectDisplay();
		displayActiveProject(project.name, project.description);
	}

	function displayActiveProject(projectName, projectDescription) {
		const activeProjectNameDisplay =
			document.querySelector('.project-title');
		activeProjectNameDisplay.innerText = projectName;

		const activeProjectDescriptionDisplay = document.querySelector(
			'.project-description'
		);
		activeProjectDescriptionDisplay.innerText = projectDescription;

		// display the tasks of the active project
		renderProjectTasks();
	}

	function setAllAsInactive(projectElements) {
		projectElements.forEach((projectElement) => {
			projectElement.classList.remove('active');
		});
	}

	function removeTasksFromProjectDisplay() {
		const tasksContainer = document.querySelector('.tasks');

		while (tasksContainer.firstChild) {
			tasksContainer.firstChild.remove();
		}
	}

	function renderProjectTasks() {
		const activeProject = controller.getActiveProject();

		activeProject.getTasks().forEach((task) => {
			taskManager.renderTask(task);
		});
	}

	function initialRender() {
		controller.projects.forEach((project) => {
			// Setting the demo project as active
			if (project.projectId === demoProject.projectId) {
				setProjectAsActive(project, renderProject(project));
			} else {
				// For the rest of the projects(When localStorage is introduced), I want the projects to be rendered but not set to active
				projects = renderProject(project);
			}
		});
	}

	// Rendering any pre-exsisting projects
	initialRender();
})();
