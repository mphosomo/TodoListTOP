function generateUUID() {
	const randomId = crypto.randomUUID();
	return (
		'project-' +
		randomId.substring(randomId.lastIndexOf('-') + 1, randomId.length)
	);
}

export default class Project {
	constructor(name, description, projectId = null) {
		this.projectId = projectId || generateUUID();
		this.name = name;
		this.description = description;
		this.tasks = [];
	}

	removeTask(task) {
		const indexOfTaskToDelete = this.tasks.indexOf(task);

		this.tasks.splice(indexOfTaskToDelete, 1);

		console.log(this.tasks);
	}

	completeTask(taskId) {
		const taskToComplete = this.tasks.find(
			(task) => (task.taskId = taskId)
		);

		taskToComplete.toggleCompletedStatus();
	}
}
