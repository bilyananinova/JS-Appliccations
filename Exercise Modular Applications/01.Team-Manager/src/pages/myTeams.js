import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyTeams } from '../api/data.js';

let myTeamsTemplate = (result) => html`
<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>

    ${sessionStorage.getItem('token') != null ?
        html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` : ''}

    ${result.map(team => teamTemplate(team, counter))}


</section>`;

let teamTemplate = (team, counter) => html`
    < article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${counter(team._id)} Members</span>
            <div><a href="/details/${team._id}" class="action">See details</a></div>
        </div>
        </article>`;


export async function myTeamsPage(ctx) {
    let result = await getMyTeams()
    console.log(result);
    ctx.render(myTeamsTemplate(result))

    function counter(teamId) {
        let result = members.filter(m => m.teamId == teamId);
        return result.length;
    }

}
