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

	getTasks() {
		this.tasks.forEach((task) => {
			return task.toString();
		});
	}

	createNewTask(name, description, priority, dueDate, isComplete) {
		const newTask = new Task(
			name,
			description,
			priority,
			dueDate,
			isComplete
		);
		this.tasks.push(newTask);

		return `Task created with ID ${newTask.taskId}`;
	}

	editTask(
		taskId,
		newName,
		newDescription,
		newPriority,
		newDueDate,
		newCompleteStatus
	) {
		const task = this.tasks.find((task) => task.taskId === taskId);

		if (task) {
			task.name = newName;
			task.description = newDescription;
			task.priority = newPriority;
			task.dueDate = newDueDate;
			task.isComplete = newCompleteStatus;

			return `Task with ID '${taskId}' edited!`;
		} else {
			return `Task with ID '${taskId}' does not exist!`;
		}
	}

	deleteTask(taskId) {
		const taskIndex = this.tasks.findIndex(
			(task) => task.taskId === taskId
		);

		if (taskIndex !== -1) {
			this.tasks.splice(taskIndex, 1);
			return `Task with ID '${taskId}' deleted!`;
		} else {
			return `Task with ID '${taskId}' does not exist!`;
		}
	}

	toString() {
		return `Project ID: ${this.projectId}\nName: ${this.name}\nDescription: ${this.description}`;
	}
}

export const demoProject = new Project(
	'Demo Project',
	'This is a demo project'
);

demoProject.createNewTask(
	demoTask.name,
	demoTask.description,
	demoTask.priority,
	demoTask.dueDate,
	demoTask.isComplete
);
