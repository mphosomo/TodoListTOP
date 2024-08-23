const navbar = document.querySelector('aside');
const navbarCollapseButtons = document.querySelectorAll('.sidebar-toggle');
const navBarCollapseButtonFromSidebar = document.querySelector('#navbar-toggle-from-sidebar');
const navbarCollapseButtonFromMain = document.querySelector('#navbar-toggle-from-main');

const collapseSidebar = (function() {
    navbarCollapseButtons.forEach(button => {
        button.addEventListener('click', () => {
            navbar.classList.toggle('closed');
        });
    });
})();

const displayMainPageSideBar = (function() {
    navBarCollapseButtonFromSidebar.addEventListener('click', () => {
        navbarCollapseButtonFromMain.style.left = '20px';
    })

    navbarCollapseButtonFromMain.addEventListener('click', () => {
        navbarCollapseButtonFromMain.style.left = '-100%';
    })
})();