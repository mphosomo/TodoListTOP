export class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    setName(newName) {
        this.name = newName;
    }

    setDescription(newDescription) {
        this.description = newDescription
    }
}