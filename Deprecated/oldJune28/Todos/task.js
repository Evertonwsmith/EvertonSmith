//TASK CLASS
class Task {
    constructor(title, startDate, endDate, color) {
        this.title = title;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.color = color;
    }

    // Getter for title
    getTitle() {
        return this.title;
    }

    // Setter for title
    setTitle(newTitle) {
        this.title = newTitle;
    }

    // Getter for startDate
    getStartDate() {
        return this.startDate;
    }

    // Setter for startDate
    setStartDate(newStartDate) {
        this.startDate = new Date(newStartDate);
    }

    // Getter for endDate
    getEndDate() {
        return this.endDate;
    }

    // Setter for endDate
    setEndDate(newEndDate) {
        this.endDate = new Date(newEndDate);
    }

    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }

    // Method to check if the task is overdue
    isOverdue() {
        const now = new Date();
        return now > this.endDate;
    }
}
