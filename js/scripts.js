let pokemonRepository = (function (){

  pokemonList = [ 
      {number: 1, 
       name: 'Bulbasaur', 
       height:2.4, 
       type: ['grass','Poison']},
      
      {numer: 2, 
       name: 'Ivysaur', 
       height:3.3, 
       type: ['grass','Poison']},

      {number: 3, 
      name: 'Venusaur', 
      height:6.7, 
      type: ['grass','Poison']}
];

  function add(pokemon){
      pokemonList.push(pokemon);
    }
	function getAll(){
      return pokemonList;
	  }

   return{
   getAll: getAll,
   add: add
   }
  })();

  console.log(pokemonRepository.getAll());
  pokemonRepository.add({number:'4', name:'Charmander', height:'2', type:'lizard'});
  console.log(pokemonRepository.getAll());
  pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' - ' + pokemon.height + ', ')
  })

/* for (let i= 0; i<pokemonList.length; i++){
      if (pokemonList[i].height<3){
      document.write("<p>" + pokemonList[i].name+" - " + "Height: " + pokemonList[i].height + " - This is a tiny pokemon!")
    }	else if(pokemonList[i].height>=3 && pokemonList[i].height <5){
      document.write("<p>" + pokemonList[i].name+" - " + "Height: " + pokemonList[i].height + " - This is an average pokemon!")
    } else if(pokemonList[i].height <= 6){
      document.write("<p>" + pokemonList[i].name+" - " + "Height: " + pokemonList[i].height + " - Wow! This is a big pokemon!")
    } else {document.write("<p>" + pokemonList[i].name+" - " + "Height: " + pokemonList[i].height + " - This is a Giant pokemon!")}
}

console.log (pokemonRepository.getAll))
pokemonList.forEach(function(userList){
	console.log(userList)
}); */ 
    