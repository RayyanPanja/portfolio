const html = document.querySelector('html');
let CURRENT_THEME = localStorage.getItem('theme') || 'light';

const navLinkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
            document.querySelectorAll('.cs-nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector(`[href="#${id}"]`).classList.add('active');
        }
    });
}, {
    threshold: 0.5
});


/**
 * Responsive Navbar Toggle
 */
function toggleNavbar() {
    document.querySelector('.cs-nav-links').classList.toggle('collapsed');
}

/**
 * Toggles the theme of the application between light and dark
 *
 * @remarks
 * This function is called when the theme toggle button is clicked
 * It changes the theme of the application by changing the
 * data-theme attribute of the html element and updating the
 * CURRENT_THEME variable
 * It also toggles the icon of the theme toggle button
 *
 * @throws {Error} if there is an error while storing the theme in local storage
 */
function changeTheme() {
    const newTheme = CURRENT_THEME === 'dark' ? 'light' : 'dark';
    const icon = document.querySelector('#themeIcon');
    if (CURRENT_THEME !== newTheme) {
        html.dataset.theme = newTheme;
        icon.classList.toggle('bi-moon');
        icon.classList.toggle('bi-brightness-high-fill');
        try {
            localStorage.setItem('theme', newTheme);
            CURRENT_THEME = newTheme;
        } catch (error) {
            console.error(error);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {

    /**
     * Theme Manager
     */
    html.dataset.theme = CURRENT_THEME;

    /**
     * Navbar Active Link Manager
     */
    document.querySelectorAll('.cs-nav-link').forEach(navLink => {
        navLink.addEventListener('click', () => {
            document.querySelectorAll('.cs-nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            navLink.classList.add('active');
        });
    });

    document.querySelectorAll('header, section').forEach(section => navLinkObserver.observe(section));

});

