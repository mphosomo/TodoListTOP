import Project from './project.js';
import Task from './task.js';
import { demoProject } from './project.js';

export default class Controller {
	constructor() {
		this.projects = [demoProject];
	}

	createNewProject(name, description) {
		const newProject = new Project(name, description);
		this.setActiveProject(newProject);
		this.projects.push(newProject);

		return newProject;
	}

	setActiveProject(projectId) {
		const activeProject = this.projects.find(
			(project) => project.projectId === projectId
		);

		if (activeProject) {
			console.log(
				`Project '${activeProject.name}' with ID '${activeProject.projectId}' was set to Active!`
			);
		}
	}
}
