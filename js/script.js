let pokemonRepository = (function() {
  let pokemonlist = [
    { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
    { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
    { name: "Charmander", height: 0.6, type: ["fire"] }
  ];

  function getAll() {
    return pokemonlist;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon
    ) {
      pokemonlist.push(pokemon);
    } else {
      console.log("Invalid Pokemon");
    }
  }

  return {
    getAll: getAll,
    add: add
  };  
})();



let pokemonlist = [
  { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
  { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
  { name: "Charmander", height: 0.6, type: ["fire"] }
];

let text = "";
let i = 0;

pokemonlist.forEach(function(pokemon) {
  text += pokemon.name + " (height: " + pokemon.height + ") ";
  if (pokemon.height > 1.5) {
    text += "Wow that’s big ";
  }
  text += "<br>"; 
});


document.write(text);
