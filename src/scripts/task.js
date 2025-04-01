export default class Task {
	constructor(name, description, priority, dueDate, isComplete) {
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.isComplete = isComplete;
	}

	get name() {
		return this.name;
	}

	get description() {
		return this.description;
	}

	get priority() {
		return this.priority;
	}

	get dueDate() {
		return this.dueDate;
	}

	get isComplete() {
		return this.dueDate;
	}

	set name(newName) {
		this.name = newName;
	}

	set description(newDescription) {
		this.description = newDescription;
	}

	set priority(newPriority) {
		this.priority = newPriority;
	}

	set dueDate(newDueDate) {
		this.dueDate = newDueDate;
	}

	set isComplete(newStatus) {
		this.isComplete = newStatus;
	}

	toString() {
		return `Name: ${this.name}\nDescription: ${this.description}\nPriority: ${this.priority}\nDue Date: ${this.dueDate}\nComplete: ${this.isComplete}`;
	}
}
