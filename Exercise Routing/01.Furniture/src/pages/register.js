import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (submit, invalidMail, invalidPassword, invalidRepassword) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidMail == true ? ' is-invalid' : '') + (invalidMail == false ? ' is-valid' : '')} id="email" type="text"
                    name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (invalidPassword == true ? ' is-invalid' : '') + (invalidPassword == false ? ' is-valid' : '')} id="password" type="password"
                    name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${'form-control' + (invalidRepassword == true ? ' is-invalid' : '') + (invalidRepassword == false ? ' is-valid' : '')} id="rePass" type="password"
                    name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export async function registerPage(ctx) {
    // console.log('registerPage');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('rePass').trim();

        if (email == '' || password == '' || rePass == '') {
            ctx.render(registerTemplate(submit, email == '', password == '', rePass == ''));
            return alert('All field are required!');
        } else if (password != rePass) {
            ctx.render(registerTemplate(submit, false, true, true));
            return alert('Password don\'t match!');
        } else {
            await register(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/');
        }
    }
}
