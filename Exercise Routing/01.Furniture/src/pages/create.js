import { html } from '../../node_modules/lit-html/lit-html.js';
import {createItem} from '../api/data.js';

let createTemplate = (submit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createPage(ctx) {
    // console.log('createPage');
    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
            return alert('Missing fields!');
        }

        if (formData.get('make').length < 4 || formData.get('model').length < 4) {
            return alert('Make and Model must be at least 4 symbols long');
        }

        if (formData.get('year') < 1950 || formData.get('year') > 2050) {
            return alert('Year must be between 1950 and 2050');
        }

        if (formData.get('description').length <= 10) {
            return alert('Description must be more than 10 symbols');
        }

        if (formData.get('price') < 0) {
            return alert('Price must be a positive number');
        }

        if (formData.get('img') == '') {
            return alert('Image URL is required');
        }

        data.year = Number(data.year);
        data.price = Number(data.price);
        await createItem(data);
        ctx.page.redirect('/');
    }
}