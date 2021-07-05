fetch ('https://pokeapi.co/api/v2/pokemon/').then (function(reponse){
	return reponse.json();
}).then(function(pokemonList){
	console.log(pokemonList);
}).catch(function () {
}); 