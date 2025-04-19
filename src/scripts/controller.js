import Project from './project.js';
import Task from './task.js';

export default class Controller {
	activeProject;

	constructor() {
		this.projects = [];
	}

	createProject(name, description, id) {
		const newProject = new Project(name, description, id);
		this.setActiveProject(newProject.projectId);
		this.projects.push(newProject);
		this.saveToLocalStorage();

		return newProject;
	}

	editProject(projectId, name, description) {
		const projectToEdit = this.projects.find(
			(project) => project.projectId === projectId
		);

		projectToEdit.name = name;
		projectToEdit.description = description;

		this.saveToLocalStorage();
	}

	deleteProject(project) {
		const indexOfProjectToDelete = this.projects.indexOf(project);

		this.projects.splice(indexOfProjectToDelete, 1);

		this.saveToLocalStorage();

		// The element at the index of the project we just deleted will contain a different project or no project, we will set this project to active after deleting
		return indexOfProjectToDelete;
	}

	createTask(project, task) {
		const newTask = new Task(
			task.name,
			task.description,
			task.priority,
			task.dueDate,
			task.id,
			task.isComplete
		);

		project.tasks.push(newTask);

		this.saveToLocalStorage();

		return newTask;
	}

	editTask(taskId, name, description, priority, dueDate) {
		const taskToEdit = this.activeProject.tasks.find(
			(task) => task.taskId === taskId
		);

		taskToEdit.name = name;
		taskToEdit.description = description;
		taskToEdit.dueDate = dueDate;
		taskToEdit.priority = priority;

		this.saveToLocalStorage();
	}

	deleteTask(task, project) {
		if (project) {
			project.removeTask(task);
		}

		this.saveToLocalStorage();
	}

	setActiveProject(projectId) {
		if (!projectId) return;

		const found = this.projects.find(
			(project) => project.projectId === projectId
		);

		if (found) {
			this.activeProject = found;
			this.saveToLocalStorage();
		} else {
			console.warn(`Project with Id ${projectId} not found!`);
		}
	}

	setActiveTask(taskId) {
		this.activeTask = this.activeProject.tasks.find(
			(task) => task.taskId === taskId
		);
	}

	saveToLocalStorage() {
		const data = {
			projects: this.projects,
			activeProjectId: this.activeProject?.projectId || null,
		};

		localStorage.setItem('projects-data', JSON.stringify(data));
	}

	loadDataFromLocalStorage() {
		const data = JSON.parse(localStorage.getItem('projects-data')) || null;

		if (!data) return;

		this.projects = data.projects.map((project) => {
			const newProject = this.createProject(
				project.name,
				project.description,
				project.projectId
			);

			project.tasks.forEach((task) => this.createTask(newProject, task));

			return newProject;
		});

		this.activeProject = this.projects.find(
			(project) => project.projectId === data.activeProjectId
		);

		this.saveToLocalStorage();

		return data;
	}
}
