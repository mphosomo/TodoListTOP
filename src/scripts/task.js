export default class Task {
	constructor(name, description, dueDate, priority, completeStatus) {
		this.name = name;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completeStatus = completeStatus;
	}

	getName() {
		return this.name;
	}

	getDescription() {
		return this.description;
	}

	getDueDate() {
		return this.dueDate;
	}

	getPriority() {
		return this.priority;
	}

	getCompleteStatus() {
		return this.completeStatus;
	}

	setName(newName) {
		this.name = newName;
	}

	setDescription(newDescription) {
		this.description = newDescription;
	}

	setDueDate(newDueDate) {
		this.dueDate = newDueDate;
	}

	setPriority(newPriority) {
		this.priority = newPriority;
	}

	setIsComplete(newCompleteStatus) {
		this.isComplete = newCompleteStatus;
	}
}
