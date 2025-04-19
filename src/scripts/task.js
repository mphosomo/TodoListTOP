import { format } from 'date-fns';

function generateUUID() {
	return 'task-' + crypto.randomUUID().substring(0, 8);
}

export default class Task {
	constructor(
		name,
		description,
		priority,
		dueDate,
		taskId = null,
		isComplete = false
	) {
		this.taskId = taskId || generateUUID;
		this.name = name;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.isComplete = isComplete;
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
}
