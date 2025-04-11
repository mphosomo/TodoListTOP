import Task from './task.js';

import { demoTask } from './task.js';

export default class Project {
	constructor(name, description) {
		const randomId = crypto.randomUUID();
		this.projectId =
			'project-' +
			randomId.substring(randomId.lastIndexOf('-') + 1, randomId.length);
		this.name = name;
		this.description = description;
		this.tasks = [];
	}

	addTask(name, description, priority, dueDate) {
		const task = new Task(name, description, priority, dueDate);
		this.tasks.push(task);
	}

	removeTask(taskId) {
		const indexOfTask = this.tasks.indexOf(
			(task) => task.taskId === taskId
		);
		this.tasks.splice(indexOfTask, 1);
	}

	getTasks() {
		return this.tasks;
	}

	toString() {
		return `Project ID: ${this.projectId}\nName: ${this.name}\nDescription: ${this.description}`;
	}
}

export const demoProject = new Project(
	'Demo Project',
	'This is a demo project'
);

demoProject.addTask(
	demoTask.name,
	demoTask.description,
	demoTask.priority,
	demoTask.dueDate
);
