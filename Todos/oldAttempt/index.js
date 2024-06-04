let tasks = [];
let count = 0;

// Retrieve data from localStorage if it exists
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    count = parseInt(localStorage.getItem('count'), 10);
}

// Update localStorage
localStorage.setItem('count', count);
localStorage.setItem('tasks', JSON.stringify(tasks));

function newTask(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form inputs
    const title = document.getElementById('title').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const color = document.getElementById('color').value;

    // Create and add the new task
    const task = new Task(title, start, end, color);
    addTask(task);

    // Display the values in an alert
    alert('Title: ' + title + '\nstart: ' + start + '\nend:' + end);
}

function addTask(newTaskItem) {
    tasks.push(newTaskItem);
    count++;

    localStorage.setItem('count', count);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    generateWeekDays(currentDate); // Refresh the week view to include the new task
}


// CHART FUNCTIONS
const chartView = document.getElementById('chartView');
const taskChart = document.getElementById('taskChart');
const prevWeekButton = document.getElementById('prev');
const nextWeekButton = document.getElementById('next');

let currentDate = new Date();

function generateWeekDays(date) {
    taskChart.innerHTML = '';
    const startOfWeek = getStartOfWeek(date);
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.id = day.toDateString();
        const dayTit = document.createElement('p');
        dayTit.innerHTML = `<div class="date">${day.toDateString().split(" ")[0]}<br>${day.toDateString().split(" ")[2]}</div>`;
        dayDiv.appendChild(dayTit);

        taskChart.appendChild(dayDiv);
    }

    populateTasks();
}

function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function populateTasks() {
    tasks.forEach(task => {
        console.log(task);
        const taskStart = task.startDate;
        const taskEnd = task.endDate;

        for (let date = new Date(taskStart); date <= taskEnd; date.setDate(date.getDate() + 1)) {
            const dayDiv = document.getElementById(date.toDateString());
            if (dayDiv) {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.style.backgroundColor = task.getColor();
                taskDiv.innerText = task.getTitle();
                dayDiv.appendChild(taskDiv);
            }
        }
    });
}

prevWeekButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 7);
    generateWeekDays(currentDate);
});

nextWeekButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 7);
    generateWeekDays(currentDate);
});

// Initialize with the current week
generateWeekDays(currentDate);

// TASK CLASS
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
