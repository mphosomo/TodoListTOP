import { format } from 'date-fns';

export default class Task {
	constructor(name, description, priority, dueDate) {
		this.taskId = 'task-' + crypto.randomUUID().substring(0, 8);
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.isComplete = false;
	}

	toggleCompletedStatus() {
		this.isComplete = !this.isComplete;
	}

	getFormattedDate() {
		const formattedDate = format(this.dueDate, 'do, MMM, yyyy');
		const formattedDateArr = formattedDate.split(',');
		const trimmedFormattedDateArr = formattedDateArr.map((element) => {
			return element.trim();
		});
		const dayNumber = trimmedFormattedDateArr[0];
		const month = trimmedFormattedDateArr[1];
		const year = trimmedFormattedDateArr[2];

		return `${dayNumber} of ${month}, ${year}`;
	}

	toString() {
		return `Task ID: ${this.taskId}\nName: ${this.name}\nDescription: ${this.description}\nPriority: ${this.priority}\nDue Date: ${this.dueDate}\nComplete: ${this.isComplete}`;
	}
}

export const demoTask = new Task(
	'Demo Task',
	'This is a demo task',
	'High',
	'2025-04-02',
	false
);
