import '../style.css';

const newProjectButton = document.querySelector('#add-new-project');
const modalContainer = document.querySelector('.modal-container');
const closeProjectCreateModal = document.querySelector(
	'#close-project-creation-modal'
);

newProjectButton.addEventListener('click', () => {
	modalContainer.classList.add('active');
});

closeProjectCreateModal.addEventListener('click', () => {
	modalContainer.classList.remove('active');
});
