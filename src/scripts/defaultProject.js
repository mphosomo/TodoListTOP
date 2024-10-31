import { Project } from './project.js';
import { adjustContainer } from './projectContainerOverflow.js';
import { projects } from './projects.js';
import bulletPoint from '../assets/images/bullet-point.png';

const projectContainer = document.querySelector('.project-container');

const defaultProject = (function () {
	const newProject = new Project(
		'Demo Project',
		'This Project is a demo project to get you to understand how to use TooDue. Welcome!'
	);

	projects.push(newProject);
	console.log(projects);

	const projectDiv = document.createElement('div');
	projectDiv.classList.add('project');
	projectDiv.id = 0;

	const leftDiv = document.createElement('div');
	leftDiv.classList.add('left');
	const img = document.createElement('img');
	img.src = bulletPoint;
	img.setAttribute('alt', 'Project image');
	leftDiv.appendChild(img);

	const middleDiv = document.createElement('div');
	middleDiv.classList.add('middle');
	const projectNameP = document.createElement('p');
	projectNameP.classList.add('project-name');
	projectNameP.innerText = newProject.getName();
	middleDiv.appendChild(projectNameP);

	const rightDiv = document.createElement('div');
	rightDiv.classList.add('right');
	rightDiv.id = 'task-count';
	const countP = document.createElement('p');
	countP.classList.add('count');
	countP.innerText = 0;
	rightDiv.appendChild(countP);

	projectDiv.append(leftDiv, middleDiv, rightDiv);
	projectContainer.appendChild(projectDiv);

	adjustContainer();
})();
