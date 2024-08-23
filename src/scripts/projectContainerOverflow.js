const projectContainer = document.querySelector('.project-container');
const maxChildrenBeforeOverflow = 3;

export function adjustContainer() {
    if(projectContainer.children.length > maxChildrenBeforeOverflow) {
        projectContainer.style.overflowY = 'auto';
        projectContainer.style.height = '150px';
    } else {
        projectContainer.style.overflowY = 'hidden';
    }
}