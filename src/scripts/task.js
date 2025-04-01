export default class Task {
	constructor(name, description, priority, dueDate, isComplete) {
		this.taskId = 'task-' + crypto.randomUUID().substring(0, 8);
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.isComplete = isComplete;
	}

	toString() {
		return `Task ID: ${this.taskId}\nName: ${this.name}\nDescription: ${this.description}\nPriority: ${this.priority}\nDue Date: ${this.dueDate}\nComplete: ${this.isComplete}`;
	}
}
