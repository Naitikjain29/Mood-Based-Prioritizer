// Energy Level mapping for status labels
const energyLabels = {
    1: "Comatose / Burned Out",
    2: "Barely Functional",
    3: "Low Battery",
    4: "Slow & Steady",
    5: "Steady Flow",
    6: "Productive",
    7: "High Performance",
    8: "Flow State",
    9: "Hyper Focused",
    10: "Limitless / God Mode"
};

// State
let tasks = JSON.parse(localStorage.getItem('vibe-tasks')) || [
    { id: 1, name: "Drink some water", cost: 1 },
    { id: 2, name: "Clear your desk", cost: 3 },
    { id: 3, name: "Deep work session", cost: 8 },
    { id: 4, name: "Solve complex architectural problem", cost: 10 }
];
let currentEnergy = 5;

// DOM Elements
const energySlider = document.getElementById('energy-slider');
const energyNumber = document.getElementById('energy-number');
const energyStatus = document.getElementById('energy-status');
const taskInput = document.getElementById('task-input');
const costSelect = document.getElementById('cost-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Initialize
function init() {
    updateEnergyUI(currentEnergy);
    renderTasks();
    
    // Event Listeners
    energySlider.addEventListener('input', (e) => {
        currentEnergy = parseInt(e.target.value);
        updateEnergyUI(currentEnergy);
        updateTaskVibes();
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
}

function updateEnergyUI(value) {
    energyNumber.textContent = value;
    energyStatus.textContent = energyLabels[value];
    
    // Dynamic color shifting based on energy
    const hue = 250 + (value * 10); // Shifts from purple towards pink/blue
    document.documentElement.style.setProperty('--primary', `hsl(${hue}, 80%, 65%)`);
    document.documentElement.style.setProperty('--primary-glow', `hsla(${hue}, 80%, 65%, 0.5)`);
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskCard = createTaskElement(task);
        taskList.appendChild(taskCard);
    });
    updateTaskVibes();
}

function createTaskElement(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.cost = task.cost;
    card.id = `task-${task.id}`;

    card.innerHTML = `
        <div class="task-info">
            <span class="task-name">${task.name}</span>
            <span class="task-cost">Energy Cost: <span>${task.cost}</span></span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
    `;

    return card;
}

function updateTaskVibes() {
    const cards = document.querySelectorAll('.task-card');
    cards.forEach(card => {
        const cost = parseInt(card.dataset.cost);
        if (cost <= currentEnergy) {
            card.classList.remove('inactive');
            card.classList.add('active');
        } else {
            card.classList.remove('active');
            card.classList.add('inactive');
        }
    });
}

function addTask() {
    const name = taskInput.value.trim();
    const cost = parseInt(costSelect.value);

    if (!name) return;

    const newTask = {
        id: Date.now(),
        name: name,
        cost: cost
    };

    tasks.push(newTask);
    saveTasks();
    
    // Add to DOM with animation
    const card = createTaskElement(newTask);
    taskList.prepend(card);
    updateTaskVibes();

    // Reset input
    taskInput.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    const card = document.getElementById(`task-${id}`);
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }, 300);
}

function saveTasks() {
    localStorage.setItem('vibe-tasks', JSON.stringify(tasks));
}

// Run init
init();
