export default class Task {
    constructor(name, description, dueDate, priority, isComplete) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
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