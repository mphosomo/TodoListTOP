import Project from './project.js';
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

	deleteProject(projectId) {
		const projectToDelete = this.projects.find(
			(project) => project.projectId === projectId
		);

		this.projects.splice(projectToDelete);
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

	removeTaskFromProject(task, project) {
		if (project) {
			project.removeTask(task.taskId);
		}
	}
}
