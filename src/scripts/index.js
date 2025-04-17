// TODO: implement project editing
// TODO: implement task editing

import '../style.css';

import folderIcon from '../components/icons/folder.svg';
import editIcon from '../components/icons/edit.svg';
import deleteIcon from '../components/icons/delete.svg';

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

const projectEditModal = document.querySelector('.edit-project-modal');
const closeProjectEditModal = document.querySelector(
	'#close-project-editing-modal'
);

const editProjectForm = document.querySelector('.edit-project-details');

const tasksContainer = document.querySelector('.tasks');
let tasks = document.querySelectorAll('.task-container');

const newTaskButton = document.querySelector('#add-new-task');
const taskCreateModal = document.querySelector('.create-task-modal');
const closeTaskCreateModal = document.querySelector(
	'#close-task-creation-modal'
);
const taskForm = document.querySelector('.task-details');

const taskEditModal = document.querySelector('.edit-task-modal');
const closeTaskEditModal = document.querySelector('#close-task-editting-modal');

const editTaskForm = document.querySelector('.edit-task-details');

const controller = new Controller();

const ModalManager = (function () {
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

	// Edit Project Modal
	closeProjectEditModal.addEventListener('click', () => {
		modalContainer.classList.remove('active');
		projectEditModal.classList.remove('active');
	});

	// Edit Task Modal
	closeTaskEditModal.addEventListener('click', () => {
		modalContainer.classList.remove('active');
		taskEditModal.classList.remove('active');
	});
})();

const taskManager = (function () {
	let taskBeingEditted;

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
		document.querySelector('#task-priority-input').value = 'High';
		document.querySelector('#task-due-date-input').value = '';

		modalContainer.classList.remove('active');
		taskCreateModal.classList.remove('active');
	});

	editTaskForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const newTaskName = document.querySelector(
			'#edit-task-name-input'
		).value;
		const newTaskDescription = document.querySelector(
			'#edit-task-description-input'
		).value;
		const newTaskPriority = document.querySelector(
			'#edit-task-priority-input'
		).value;
		const newTaskDueDate = document.querySelector(
			'#edit-task-due-date-input'
		).value;

		controller.editTaskDetails(
			taskBeingEditted.taskId,
			newTaskName,
			newTaskDescription,
			newTaskPriority,
			newTaskDueDate
		);

		modalContainer.classList.remove('active');
		taskEditModal.classList.remove('active');

		displayEdittedChanges(
			taskBeingEditted,
			newTaskName,
			newTaskDescription,
			newTaskPriority,
			newTaskDueDate
		);
	});

	function renderTask(task) {
		const taskContainer = document.createElement('div');
		taskContainer.classList.add('task-container');
		taskContainer.id = task.taskId;
		taskContainer.addEventListener('click', () => {
			setTaskAsActive(task, taskContainer);
		});

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
		taskCompleteCheckbox.checked = task.isComplete;
		taskCompleteCheckbox.addEventListener('click', (event) => {
			event.stopPropagation();

			controller.activeProject.completeTask(task.taskId);
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

		const editTaskIcon = document.createElement('img');
		editTaskIcon.classList.add('edit-task-icon');
		editTaskIcon.src = editIcon;

		editTaskButton.appendChild(editTaskIcon);

		editTaskButton.addEventListener('click', (event) => {
			event.stopPropagation();

			// For tracking reasons
			taskBeingEditted = task;

			document.querySelector('#edit-task-name-input').value = task.name;
			document.querySelector('#edit-task-description-input').value =
				task.description;
			document.querySelector('#edit-task-priority-input').value =
				task.priority;
			document.querySelector('#edit-task-due-date-input').value =
				task.dueDate;

			modalContainer.classList.add('active');
			taskEditModal.classList.add('active');
		});

		const deleteTaskButton = document.createElement('button');
		deleteTaskButton.type = 'button';
		deleteTaskButton.id = 'delete-task';

		const deleteTaskIcon = document.createElement('img');
		deleteTaskIcon.classList.add('delete-task-icon');
		deleteTaskIcon.src = deleteIcon;

		deleteTaskButton.appendChild(deleteTaskIcon);

		deleteTaskButton.addEventListener('click', () => {
			controller.removeTaskFromProject(task, controller.activeProject);
			tasksContainer.removeChild(taskContainer);
		});

		buttons.append(editTaskButton, deleteTaskButton);

		outsideRight.append(textWrapper, buttons);

		taskContainer.append(outsideLeft, seperator, outsideRight);

		tasksContainer.appendChild(taskContainer);

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

	function displayEdittedChanges(task, name, description, priority, dueDate) {
		let NodeToEdit;

		// I want to only change the details of what has been editted instead of rerendering the whole projects tab
		tasks.forEach((taskElement) => {
			if (taskElement.id == task.taskId) {
				NodeToEdit = taskElement;
			}
		});

		NodeToEdit.querySelector('h3').innerText = name;
		NodeToEdit.querySelector('.task-description').innerText = description;
		NodeToEdit.querySelector('#task-priority').innerText = priority;
		NodeToEdit.querySelector('#due-date').innerText =
			task.getFormattedDate();
	}

	return { renderTask };
})();

const projectManager = (function () {
	let projectBeingEditted;

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

	editProjectForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const newProjectName = document.querySelector(
			'#edit-project-name-input'
		).value;
		const newProjectDescription = document.querySelector(
			'#edit-project-description-input'
		).value;

		controller.editProjectDetails(
			projectBeingEditted.projectId,
			newProjectName,
			newProjectDescription
		);

		modalContainer.classList.remove('active');
		projectEditModal.classList.remove('active');

		displayEdittedChanges(
			projectBeingEditted,
			newProjectName,
			newProjectDescription
		);
	});

	function renderProject(project) {
		const projectContainer = document.createElement('div');
		projectContainer.classList.add('project-container');
		projectContainer.id = project.projectId;
		// created project has to be clickable
		projectContainer.addEventListener('click', () => {
			setProjectAsActive(project, projectContainer);
		});

		const projectIcon = document.createElement('img');
		projectIcon.classList.add('project-icon');
		projectIcon.src = folderIcon;

		const leftSide = document.createElement('div');
		leftSide.classList.add('left');
		const projectNameElement = document.createElement('p');
		projectNameElement.innerText = project.name;
		leftSide.appendChild(projectNameElement);

		const rightSide = document.createElement('div');
		rightSide.classList.add('right');
		const editButton = document.createElement('button');
		editButton.id = 'edit-project';

		const editProjectIcon = document.createElement('img');
		editProjectIcon.classList.add('edit-project-icon');
		editProjectIcon.src = editIcon;

		editButton.appendChild(editProjectIcon);

		editButton.addEventListener('click', (event) => {
			event.stopPropagation();

			// For tracking reasons
			projectBeingEditted = project;

			document.querySelector('#edit-project-name-input').value =
				project.name;
			document.querySelector('#edit-project-description-input').value =
				project.description;

			modalContainer.classList.add('active');
			projectEditModal.classList.add('active');
		});

		const deleteButton = document.createElement('button');
		deleteButton.id = 'delete-project';

		const deleteProjectIcon = document.createElement('img');
		deleteProjectIcon.classList.add('delete-project-icon');
		deleteProjectIcon.src = deleteIcon;

		deleteButton.appendChild(deleteProjectIcon);

		deleteButton.addEventListener('click', (event) => {
			event.stopPropagation();

			// Only allow project deleting if there is at least 1 project
			if (controller.projects.length > 1) {
				setNextProjectAsActive(controller.deleteProject(project));

				projectsContainer.removeChild(projectContainer);
			} else {
				alert('There must be at least one project');
			}
		});

		rightSide.append(editButton, deleteButton);

		projectContainer.append(projectIcon, leftSide, rightSide);

		projectsContainer.appendChild(projectContainer);

		projects = document.querySelectorAll('.project-container');

		// returning the project container element so we can set it as active
		return projectContainer;
	}

	function setNextProjectAsActive(projectIndex) {
		let nextProject = controller.projects[0];

		// we need to do this because if the number of projects in the array is 1, then we can only use the only project in the array as the next project
		if (controller.projects.length > 1) {
			nextProject = controller.projects[projectIndex];
		}

		const nextProjectContainer = document.querySelector(
			`#${nextProject.projectId}`
		);

		setProjectAsActive(nextProject, nextProjectContainer);
	}

	function setProjectAsActive(project, container) {
		setAllAsInactive(projects);
		controller.setActiveProject(project.projectId);
		container.classList.add('active');

		removeTasksFromProjectDisplay();
		displayActiveProject(project.name, project.description);

		// display the tasks of the active project
		if (project.getTasks().length != 0) {
			renderProjectTasks(project);
		}
	}

	function displayActiveProject(projectName, projectDescription) {
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

	function removeTasksFromProjectDisplay() {
		const tasksContainer = document.querySelector('.tasks');

		while (tasksContainer.firstChild) {
			tasksContainer.firstChild.remove();
		}
	}

	function renderProjectTasks(project) {
		if (project) {
			project.getTasks().forEach((task) => {
				taskManager.renderTask(task);
			});
		}
	}

	function displayEdittedChanges(project, name, description) {
		let NodeToEdit;

		// I want to only change the details of what has been editted instead of rerendering the whole projects tab
		projects.forEach((projectElement) => {
			if (projectElement.id == project.projectId) {
				NodeToEdit = projectElement;
			}
		});

		NodeToEdit.querySelector('p').innerText = name;

		// The details of the active project in the task view need to be updated if the project being edited is the active project
		if (project === controller.activeProject) {
			displayActiveProject(name, description);
		}
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
