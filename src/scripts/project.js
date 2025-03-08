export class Project {
	constructor(name, description, dateCreated) {
		this.name = name;
		this.description = description;
		this.dateCreated = dateCreated;
	}

	getName() {
		return this.name;
	}

	getDescription() {
		return this.description;
	}

	getDateCreated() {
		return this.dateCreated;
	}

	setName(newName) {
		this.name = newName;
	}

	setDescription(newDescription) {
		this.description = newDescription;
	}
}
