import '../style.css';

const modalContainer = document.querySelector('.modal-container');

const newProjectButton = document.querySelector('#add-new-project');
const projectCreateModal = document.querySelector('.create-project-modal');
const closeProjectCreateModal = document.querySelector(
	'#close-project-creation-modal'
);

const newTaskButton = document.querySelector('#add-new-task');
const taskCreateModal = document.querySelector('.create-task-modal');
const closeTaskCreateModal = document.querySelector(
	'#close-task-creation-modal'
);

// New Project Modal
newProjectButton.addEventListener('click', () => {
	modalContainer.classList.add('active');
	projectCreateModal.classList.add('active');
});

closeProjectCreateModal.addEventListener('click', () => {
	modalContainer.classList.remove('active');
	projectCreateModal.classList.remove('active');
});

// New Task Modal
newTaskButton.addEventListener('click', () => {
	modalContainer.classList.add('active');
	taskCreateModal.classList.add('active');
});

closeTaskCreateModal.addEventListener('click', () => {
	modalContainer.classList.remove('active');
	taskCreateModal.classList.remove('active');
});
