import { getSearchResults } from '../api/data.js';
import { html, render } from '../lib.js';
import { getUserData } from '../utils.js';

let ctx = null;

const searchTemplate = () => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            <!--If there are no matches-->
        </div>
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
    <p class="no-result">No result.</p>
`;

const detailsBtnTemplate = (data) => html`
    <div class="btn-group">
        <a href="/details/${data._id}" id="details">Details</a>
    </div>
`;

export async function showSearchPage(ctxInput) {
    ctx = ctxInput;
    ctx.render(searchTemplate());
}

async function onSearch() {
    const input = document.getElementById('search-input').value.trim();
    const searchDiv = document.querySelector('.search-result');

    if (input === '') {
        alert('The search field is required!');
        return;
    }

    render(html`<p style="font-size:50px;color:white;">Loading ...</p>`, searchDiv);
    const data = await getSearchResults(input);
    const userData = getUserData();

    if (data.length === 0) {
        render(noItemsTemplate(), searchDiv);
    } else {
        render(data.map(el => cardTemplate(el, userData)), searchDiv);
    }
}