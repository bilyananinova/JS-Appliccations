import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = () => html`
<section class="create">
    <form action="#" method="post">
        <fieldset>
            <legend>Add new Pet</legend>
            <p class="field">
                <label for="name">Name</label>
                <span class="input">
                    <input type="text" name="name" id="name" placeholder="Name" />
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea rows="4" cols="45" type="text" name="description" id="description"
                        placeholder="Description"></textarea>
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageURL" id="image" placeholder="Image" />
                    <span class="actions"></span>
                </span>
            </p>
            <p class="field">
                <label for="category">Category</label>
                <span class="input">
                    <select type="text" name="category">
                        <option>Cat</option>
                        <option>Dog</option>
                        <option>Parrot</option>
                        <option>Reptile</option>
                        <option>Other</option>
                    </select>
                    <span class="actions"></span>
                </span>
            </p>
            <input class="button" type="submit" class="submit" value="Add Pet" />
        </fieldset>
    </form>
</section>`;

export async function createPage(ctx) {
    console.log('createPage');

    ctx.render(createTemplate(submit));

}