import { projects } from './projects';

export function checkIfProjectExists(projectName) {
	let projectNameMatches = 0;

	projects.forEach((project) => {
		if (project.name == projectName) {
			projectNameMatches += 1;
		}
	});

	if (projectNameMatches == 0) {
		return false;
	} else {
		return true;
	}
}
