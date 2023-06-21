import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { showCatalogPage } from './pages/catalog-page.js';
import { showCreatePage } from './pages/create-page.js';
import { showDetailsPage } from './pages/details-page.js';
import { showEditPage } from './pages/edit-page.js';
import { showHomePage } from './pages/home-page.js';
import { showLoginPage } from './pages/login-page.js';
import { showRegisterPage } from './pages/register-page.js';
import { showSearchPage } from './pages/search.js';
import { getUserData } from './utils.js';


const root = document.getElementById('main-content');
const userBtnsGroup = document.querySelectorAll('li.user');
const guestBtnsGroup = document.querySelectorAll('li.guest');

document.getElementById('logout-btn').addEventListener('click', onLogout);

page(contextDecoration);
page('/', showHomePage);
page('/catalog', showCatalogPage);
page('/search', showSearchPage);
page('/details/:entryId', showDetailsPage);
page('/edit/:entryId', showEditPage);
page('/create', showCreatePage);
page('/login', showLoginPage);
page('/register', showRegisterPage);
page.start();

updateNavigation();

function contextDecoration(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNavigation = updateNavigation;

    next();
}

async function onLogout() {
    await logout();

    updateNavigation();
    page.redirect('/');
}

function updateNavigation() {
    const userData = getUserData();

    if (userData !== null) {
        userBtnsGroup.forEach(el => el.style.display = 'inline-block');
        guestBtnsGroup.forEach(el => el.style.display = 'none');
    } else {
        userBtnsGroup.forEach(el => el.style.display = 'none');
        guestBtnsGroup.forEach(el => el.style.display = 'inline-block');
    }
}