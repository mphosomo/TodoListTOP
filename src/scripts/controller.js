import Project from './project.js';

export default class Controller {
	constructor() {
		this.projects = [];
	}

	get projects() {
		this.projects.forEach((project) => {
			return project.toString();
		});
	}

	createNewProject(name, description) {
		const newProject = new Project(name, description);
		this.projects.push(newProject);

		return `Project created with ID ${newProject.projectId}`;
	}

	editProject(projectId, newName, newDescription) {
		const project = this.projects.find(
			(project) => project.projectId === projectId
		);

		if (project) {
			project.name = newName;
			project.description = newDescription;
			return `Project with ID '${projectId}' edited!`;
		} else {
			return `Project with ID '${projectId}' does not exist!`;
		}
	}

	deleteProject(projectId) {
		const projectIndex = this.projects.findIndex(
			(project) => project.projectId === projectId
		);

		if (projectIndex !== -1) {
			this.projects.splice(projectIndex, 1);
			return `Project with ID '${projectId}' deleted!`;
		} else {
			return `Project with ID '${projectId}' does not exist!`;
		}
	}
}
