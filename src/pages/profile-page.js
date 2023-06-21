import { html, until } from '../lib.js';

let ctx = null;

const profileTemplate = (data) => html`
`;

const cardTemplate = (data) => html`
`;

const noItemsTemplate = () => html`
`;

export async function showProfilePage(ctxInput) {
    console.log('Profile page');
    // ctx = ctxInput;

    // ctx.render(html`<p style="font-size:50px;color:white;">Loading ...</p>`);

}
