/**
 * 
 * 
 * 
 * CLASSES
 * 
 * 
 * 
 * 
*/
// TASK CLASS
class Task {
    constructor(title, startDate, endDate, color, costEst) {
        this.title = title;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.color = color;
        this.costEst = costEst;
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
    getCostEst() {
        return this.costEst;
    }
    setColor(costEst) {
        this.costEst = costEst;
    }

    // Method to check if the task is overdue
    isOverdue() {
        const now = new Date();
        return now > this.endDate;
    }
}

//Task get and generate
/**
 * 
 * THIS CHECKS LOCALSTORAGE FOR EXISTING DATA BEFORE CREATING 
 * SAVING POINTS
 * 
 * 
 * 
 * **/
let tasks = [];
let count = 0;

// Retrieve data from localStorage if it exists
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    loadTasks(tasks);
    count = parseInt(localStorage.getItem('count'), 10);
    // console.log(tasks);
}

// Update localStorage
localStorage.setItem('count', count);
localStorage.setItem('tasks', JSON.stringify(tasks));

/**
 * BODY PARTS AND VIEW CONTROL
 * 
 * 
 */
const body = document.body;
const chartBody = document.getElementById('chart');
const infoBody = document.getElementById('info');
const infoTable = document.getElementById('infoTable');
const optionsBody = document.getElementById('options');
const profileBody = document.getElementById('profile');
const addBody = document.getElementById('add');

chartBody.style.display = 'block';
infoBody.style.display = 'block';
optionsBody.style.display = 'block';
profileBody.style.display = 'block';
addBody.style.display = 'block';


function chart() {
    infoBody.style.display = 'none';
    chartBody.style.display = 'block';
    optionsBody.style.display = 'none';
    profileBody.style.display = 'none';
    addBody.style.display = 'block';
}
function info() {
    infoBody.style.display = 'block';
    chartBody.style.display = 'none';
    optionsBody.style.display = 'none';
    profileBody.style.display = 'none';
    addBody.style.display = 'block';
}
function options() {
    infoBody.style.display = 'none';
    chartBody.style.display = 'none';
    optionsBody.style.display = 'block';
    profileBody.style.display = 'none';
    addBody.style.display = 'block';
}
function profile() {
    infoBody.style.display = 'none';
    chartBody.style.display = 'none';
    optionsBody.style.display = 'none';
    profileBody.style.display = 'block';
    addBody.style.display = 'block';
}

/**
 * 
 * DATES AND CALENDAR GENERATOR 
 * 
 * 
 * */
const nextChart = document.getElementById('nextChart');
const prevChart = document.getElementById('prevChart');
let currentDate = new Date();
prevChart.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 7);
    generateWeekDays(currentDate);
});

nextChart.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 7);
    generateWeekDays(currentDate);
});

function generateWeekDays(date) {
    let dateRow = document.getElementById('daysOfWeek');
    dateRow.innerHTML = '<th>edit</th><th><i>task name</i></th>';
    const startOfWeek = getStartOfWeek(date);
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const dayDiv = document.createElement('th');
        dayDiv.className = 'day';
        dayDiv.id = day.toDateString();
        const dayTit = document.createElement('p');
        dayTit.innerHTML =
            `<div class="date">${day.toDateString().split(" ")[0]}
        <br>${day.toDateString().split(" ")[2]}</div>`;
        dayDiv.appendChild(dayTit);

        dateRow.appendChild(dayDiv);
    }

    populateTasks();
}

function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

generateWeekDays(currentDate);



//** POPULATE WITH CURRENT TASKS */
function populateTasks() {
    // Clear the existing table content before populating
    infoTable.innerHTML = '<tr><th>edit</th><th>Title</th><th>StartDate</th><th>EndDate</th><th>Cost Est.</th><th>Work Done</th><th>Cost</th></tr>';

    tasks.forEach((task, index) => {
        const taskStart = new Date(task.startDate);
        const taskEnd = new Date(task.endDate);

        const infoRow = document.createElement('tr');

        // Only add the task once
        if (infoTable) {
            let editBump = document.createElement('button');
            editBump.innerHTML = 'Edit';
            //
            //TODO : EDIT 
            //
            // editBump.onclick = edit(task,index);
            infoRow.appendChild(editBump);
            let taskTitle = document.createElement('td');
            taskTitle.innerHTML = task.title;
            taskTitle.style.color = task.color;

            let taskStDt = document.createElement('td');
            taskStDt.innerHTML = taskStart.toDateString();

            let taskEndDt = document.createElement('td');
            taskEndDt.innerHTML = taskEnd.toDateString();

            let taskCostEst = document.createElement('td');
            taskCostEst.innerHTML = task.costEst;

            let emptyWorkDone = document.createElement('td');
            emptyWorkDone.innerHTML = '0d';

            let emptyCostTotal = document.createElement('td');
            emptyCostTotal.innerHTML = '$0';

            infoRow.appendChild(taskTitle);
            infoRow.appendChild(taskStDt);
            infoRow.appendChild(taskEndDt);
            infoRow.appendChild(taskCostEst);
            infoRow.appendChild(emptyWorkDone);
            infoRow.appendChild(emptyCostTotal);

            infoTable.appendChild(infoRow);
        }
    });

    console.log(infoTable.innerHTML);
}

/** TAKES A NEW TASK AND POPULATES THE LOCAL STORAGE AND CALENDAR VIEW */
//
//
function newTask(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form inputs
    const title = document.getElementById('taskName').value;
    const start = document.getElementById('startDt').value;
    const end = document.getElementById('endDt').value;
    const color = document.getElementById('color').value;
    const costEst = document.getElementById('costEst').value;

    // Create and add the new task
    const task = new Task(title, start, end, color, costEst);
    addTask(task);
    // console.log(task);
}

function addTask(newTaskItem) {
    tasks.push(newTaskItem);
    count++;

    localStorage.setItem('count', count);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    generateWeekDays(currentDate); // Refresh the week view to include the new task
}

function loadTasks(tasks) {
    let taskList = [];

    tasks.forEach((task, index) => {
        let tempTask = new Task(task.title, task.startDate, task.endDate, task.color, task.costEst);
        taskList.push(tempTask);
    });

    tasks = taskList; console.log(tasks);
}

function clearAll() {
    window.localStorage.clear();
    console.log('clear');
}