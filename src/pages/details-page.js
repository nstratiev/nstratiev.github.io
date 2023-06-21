import { deleteItem, getById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

let ctx = null;

const detailsTemplate = (data, isOwner) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${data.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">
    
                    <h1>Name: ${data.name}</h1>
                    <h3>Artist: ${data.artist}</h3>
                    <h4>Genre: ${data.genre}</h4>
                    <h4>Price: $${data.price}</h4>
                    <h4>Date: ${data.releaseDate}</h4>
                    <p>Description: ${data.description}</p>
                </div>
                <!-- Only for registered user and creator of the album-->
                ${isOwner === false ? null : authorControlsTemplate(data)}
            </div>
        </div>
    </section>
`;

const authorControlsTemplate = (data) => html`
    <div class="actionBtn">
        <a href="/edit/${data._id}" class="edit">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
    </div>
`;

export async function showDetailsPage(ctxInput) {
    ctx = ctxInput;
    const itemId = ctx.params.entryId;
    const userData = getUserData();

    ctx.render(html`<p style="font-size:50px;color:white;">Loading ...</p>`);

    const data = await getById(itemId);
    const isOwner = userData && userData._id === data._ownerId;

    ctx.render(detailsTemplate(data, isOwner));
}

async function onDelete() {
    const entryId = ctx.params.entryId;
    const choice = confirm('Are you sure you want to delete the item?');

    if (choice === false) {
        return;
    }

    await deleteItem(entryId);

    ctx.page.redirect('/catalog');
}
