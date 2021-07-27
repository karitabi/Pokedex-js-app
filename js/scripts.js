let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector(".modal");
  

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
  function getAll(){
      return pokemonList;
	}
  function addListItem(pokemon){
    let pokemonList= document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button= document.createElement("button");
    button.innerText=pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    })
  }
  
  function loadList (){
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e){
      console.error(e)
    })
  }
      
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);        
    });
  }
  
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  };
  
  function showModal(pokemon) {
    modalContainer.innerHTML= " ";

    let modal = document.createElement ("div");
    modal.classList.add("modal");
  
    let closeButtonElement = document.createElement("button");
  
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);
    
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;  
  
    let contentElement = document.createElement("p");
    contentElement.innerText = pokemon.height 
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add("is-visible");
   
  }
  
  	function hideModal(){
    modalContainer.classList.remove("is-visible");
  }
  
    window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();  
    }
  });
  
   modalContainer.addEventListener("click", (e) => {
    	let target = e.target;
    	if (target === modalContainer) {
      hideModal();
    }
  });
 

    return{
      add:add,
      getAll:getAll,
      addListItem:addListItem,
      loadList:loadList,
      loadDetails:loadDetails,
      showDetails:showDetails, 
      showModal:showModal,
      hideModal:hideModal
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


/* new code */ 

/* let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container"); 

  function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  
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
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e)
    })
  };
  
  function addListItem(pokemon){
    let pokemonList= document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listItem.classList.add('.list-group-item','list-group-item-action');
    let button= document.createElement("button");
    button.innerText=pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.setAttribute('data-target','#pokemonModal','data-toggle','modal');
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    })
  } 

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [...details.types];
    }).catch(function(e) {
      console.error(e);        
    });
  };

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then ( function () {
        let modalBody = $(".modal-body");
        let modalHeader = $(".modal-header");
        let modalTitle= $("modal-title");

        modalTitle.empty();
        modalBody.empty();

        let pokeName = $("<h1>" + poke.name + "<h1>");
        let pokeHeight = $("<p>" + poke.height + "<p>");
        let pokeImage = $("<img class='modal-img'");
         pokemonImage.attr('src',pokemon.imageUrl);
        let pokeTypes = document.createElement("ul");
        let types = "Type: ";
        poke.types.forEach(function(item){
          types +="<li>" + item.type.name + "</li>"
        });

        pokeTypes.innerHTML = types;
  
        modalTitle.appendChild(pokeName);
        modalBody.appendChild(pokeImage);
        modalBody.appendChild(pokeHeight);
        modalBody.appendChild(pokeType);
      
        $('#pokemonModal').modal('toggle')
    });
  };
  
 
 
 function hideModal(){
    modalContainer.classList.remove("is-visible");
  }
  
    window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
   modalContainer.addEventListener('click', (e) => {
    	let target = e.target;
    	if (target === modalContainer) {
   	   hideModal();
    }
  }); 
  
   
    return {
      getAll: getAll,
      add: add,
      loadList:loadList,
      addListItem:addListItem,
      loadDetails: loadDetails,
      showDetails: showDetails,
      hideModal:hideModal
    };
})();

  pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
    	pokemonRepository.addListItem(pokemon);
    });  
  }); 
 */






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
	console.log(userList) */