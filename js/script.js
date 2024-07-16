let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-class");

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
            detailsUrl: item.url
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
      let modal = document.getElementById('pokemon-modal');
      let closeButton = document.getElementById('close-button');
      let pokemonImage = document.getElementById('pokemon-image');
      let pokemonName = document.getElementById('pokemon-name');
      let pokemonHeight = document.getElementById('pokemon-height');

      // Set the content of the modal
      pokemonImage.src = item.imageUrl;
      pokemonName.innerText = `Name: ${item.name}`;
      pokemonHeight.innerText = `Height: ${item.height}`;

      // Show the modal
      modal.style.display = 'block';

      // Close the modal when the close button is clicked
      closeButton.onclick = function () {
        modal.style.display = 'none';
      };

      // Close the modal when clicking outside of the modal
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

      // Close the modal when pressing the Escape key
      window.onkeydown = function (event) {
        if (event.key === "Escape") {
          modal.style.display = 'none';
        }
      };
    });
  }

  // Publicly accessible methods
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Load the Pokémon list and add them to the DOM
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
