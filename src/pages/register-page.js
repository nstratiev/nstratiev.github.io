import { register } from '../api/data.js';
import { html } from '../lib.js';

let ctx = null;

const registerTemplate = () => html`
    <section id="registerPage">
        <form @submit=${onRegisterSubmit}>
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export async function showRegisterPage(ctxInput) {
    ctx = ctxInput;
    ctx.render(registerTemplate());
}

async function onRegisterSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('conf-pass').trim();

    if (email === '' || password === '' || rePass === '') {
        alert('All fields are required!');
        return;
    }

    if (rePass !== password) {
        alert('Password don\'t match!');
        return;
    }

    await register({ email, password });

    ev.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/');
}