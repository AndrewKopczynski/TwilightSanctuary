// 2021-AUG-16
const tokens = canvas.tokens.controlled;

if (tokens.length > 0)
{
	tokens.forEach(UpdateTempHP);
}
else
{
	ui.notifications.warn("No Tokens are selected!");
}

function UpdateTempHP(token)
{
	let actor = token.actor;
	let { attributes } = actor.data.data;
	let current_tempHP = attributes.hp.temp;
	
	// Input the token name of your cleric here.
	// Alternatively, set current_level to a constant instead.
	let current_level = game.actors.getName("ClericName").data.data.details.level;
	
	// Roll Twilight Sanctuary temporary hit points
	let healRoll = new Roll(`1d6 + ${current_level}[cleric level]`).roll();
	healRoll.toMessage({
		user: game.user._id,
		speaker: ChatMessage.getSpeaker(),
		flavor: `Twilight Sanctuary - Temporary Hit Points`
	});
	
	// Check if new roll is higher than old temp HP
	let new_tempHP = parseInt(healRoll.total);
	if (current_tempHP > new_tempHP)
	{
		new_tempHP = current_tempHP;
	}
	
	// Set the temp HP
	actor.update
	({
		"data.attributes.hp.temp": new_tempHP,
	});
}