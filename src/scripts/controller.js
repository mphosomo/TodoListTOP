import Project from './project.js';
import Task from './task.js';
import { demoProject } from './project.js';

export default class Controller {
	constructor() {
		this.projects = [demoProject];
		this.activeProject = null;
	}

	createNewProject(name, description) {
		const newProject = new Project(name, description);
		this.setActiveProject(newProject);
		this.projects.push(newProject);

		return newProject;
	}

	setActiveProject(projectId) {
		this.activeProject = this.projects.find(
			(project) => project.projectId === projectId
		);
	}

	getActiveProject() {
		return this.activeProject;
	}

	addNewTaskToActiveProject(task) {
		if (this.activeProject) {
			this.activeProject.addTask(
				task.name,
				task.description,
				task.priority,
				task.dueDate
			);
		}
	}

	setActiveTask(taskId) {
		this.activeTask = this.activeProject
			.getTasks()
			.find((task) => task.taskId === taskId);
	}
}
