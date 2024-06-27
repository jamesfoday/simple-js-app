let pokemonRepository = (function () {
  let repository = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["grass", "poison"],
    },
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"],
    },
    {
      name: "Squirtle",
      height: 1,
      types: ["water"],
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
