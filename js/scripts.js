let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer= document.getElementById("modal-container");

  function getAll(){
    return pokemonList;
}

  function loadList (){
  return fetch(apiUrl).then(function(response){
    return response.json();
  }).then(function(json){
    json.results.forEach(function(item){
      let pokemon = {
        name: item.name,
        detailsUrl: item.url,
      };
      add(pokemon);
    });
  }).catch(function(e){
    console.error(e);
  })
}

  function add(pokemon) {
      if (
      typeof pokemon === "object" && 
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

   function addListItem(pokemon){
    let pokemonList= document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button= document.createElement("button");
    button.innerText=pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function() {
      showDetails(pokemon);
    })
  };
     
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch( function (e) {
      console.error(e);        
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log (pokemon);
    });
  }

  function showModal (pokemon) {
    modalContainer.innerHTML="";
    let modal= document.createElement ("div"); 
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.classList.add("modal-close");
    closeButtonElement.innerText="Close";
    closeButtonElement.addEventListener("click",hideModal);

    let titleElement= document.createElement ("h1");
    titleElement.innerText = pokemon.name;

    let contentElement= document.createElement ("p");
    contentElement.innerText = "Height:" pokemon.height + "meters";

    let imageElement = document.createElement ("img");
    imageElement.setAttribute("src", pokemon.imageUrl);
    imageElement.src=pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);

    modalContainer.classList.add("is-visible"); 
  }

  function hideModal(
    modalContainer.classList.remove("is-visible");
  )

  window.addEventListener("keydown",(e)=>{
    if (e.key==="Escape" && modalContainer.classList.contains ("is-visible")){
      hideModal();
    }
  })

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

    return{
      add: add,
      getAll: getAll,
      addListItem:addListItem,
      loadList:loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
})();

  pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
    	pokemonRepository.addListItem(pokemon);
    });  
  }); 
 


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