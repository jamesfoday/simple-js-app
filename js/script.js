let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Adds a new Pokémon to the list
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Returns all Pokémon in the list
  function getAll() {
    return pokemonList;
  }

  // Creates a list item for each Pokémon and appends it to the DOM
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item"); // Add Bootstrap list-group-item class

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "button-class"); // Add Bootstrap button classes
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    // Event listener for showing Pokémon details
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Fetches the Pokémon list from the API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Fetches details for a given Pokémon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        return details;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Displays details for a given Pokémon
  function showDetails(item) {
    loadDetails(item).then(function () {
      let pokemonImage = document.getElementById("pokemon-image");
      let pokemonName = document.getElementById("pokemon-name");
      let pokemonHeight = document.getElementById("pokemon-height");

      // Set the content of the modal
      pokemonImage.src = item.imageUrl;
      pokemonName.innerText = `Name: ${item.name}`;
      pokemonHeight.innerText = `Height: ${item.height}`;
    });
  }

  // Publicly accessible methods
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Load the Pokémon list and add them to the DOM
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
