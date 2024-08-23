import "./style.css";
import { adjustContainer } from "./scripts/projectContainerOverflow";
import { collapseSidebar } from "./scripts/navbarCollapse";

const collapseNavBar = (() => {
    collapseSidebar();
})();

adjustContainer();