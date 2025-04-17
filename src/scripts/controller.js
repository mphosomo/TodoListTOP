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
		console.log(this.projects);

		return newProject;
	}

	editProjectDetails(projectId, name, description) {
		const projectToEdit = this.projects.find(
			(project) => project.projectId === projectId
		);

		projectToEdit.name = name;
		projectToEdit.description = description;

		console.log(this.projects);
	}

	setActiveProject(projectId) {
		this.activeProject = this.projects.find(
			(project) => project.projectId === projectId
		);
	}

	getActiveProject() {
		return this.activeProject;
	}

	deleteProject(project) {
		const indexOfProjectToDelete = this.projects.indexOf(project);

		this.projects.splice(indexOfProjectToDelete, 1);

		// The element at the index of the project we just deleted will contain a different project now, we will set this project to active after deleting
		return indexOfProjectToDelete;
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
