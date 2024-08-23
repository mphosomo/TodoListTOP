const navbar = document.querySelector('aside');
const navbarCollapseButtons = document.querySelectorAll('.sidebar-toggle');

function collapseSidebar() {
    navbarCollapseButtons.forEach(button => {
        button.addEventListener('click', () => {
            navbar.classList.toggle('closed');
        });
    });
}

collapseSidebar();