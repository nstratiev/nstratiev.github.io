import { getAllItems } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

let ctx = null;

const catalogTemplate = (data, userData) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        <!--No albums in catalog-->
        ${data.length === 0 ? noItemsTemplate() : data.map(el => cardTemplate(el, userData))}
    </section>
`;

const cardTemplate = (data, userData) => html`
    <div class="card-box">
        <img src=${data.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${data.name}</p>
                <p class="artist">Artist: ${data.artist}</p>
                <p class="genre">Genre: ${data.genre}</p>
                <p class="price">Price: $${data.price}</p>
                <p class="date">Release Date: ${data.releaseDate}</p>
            </div>
    
            ${userData === null ? null : detailsBtnTemplate(data)}
        </div>
    </div>
`;

const noItemsTemplate = () => html`
    <p>No Albums in Catalog!</p>
`;

const detailsBtnTemplate = (data) => html`
    <div class="btn-group">
        <a href="/details/${data._id}" id="details">Details</a>
    </div>
`;

export async function showCatalogPage(ctxInput) {
    ctx = ctxInput;
    const userData = getUserData();

    ctx.render(html`<p style="font-size:50px;color:white;">Loading ...</p>`);
    const data = await getAllItems();

    ctx.render(catalogTemplate(data, userData));
}
