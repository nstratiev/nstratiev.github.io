import { login } from '../api/data.js';
import { html } from '../lib.js';

const loginTemplate = () => html`
    <section id="loginPage">
        <form @submit=${onLoginSubmit}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

let ctx = null;

export async function showLoginPage(ctxInput) {
    ctx = ctxInput;
    ctx.render(loginTemplate());
}

async function onLoginSubmit(ev) {
    ev.preventDefault();

    console.log(ev.target);
    const formData = new FormData(ev.currentTarget);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    if (email === '' || password === '') {
        alert('All fields are required!');
        return;
    }

    await login({ email, password });

    ev.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/');
}