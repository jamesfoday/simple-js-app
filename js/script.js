let pokemonlist = [
  { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
  { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
  { name: "Charmander", height: 0.6, type: ["fire"] }
];

let text = "";
let i = 0;
for (; i < pokemonlist.length; i++) {
  text += pokemonlist[i].name + " (height: " + pokemonlist[i].height + ") ";
  if (pokemonlist[i].height > 1.5) {
    text += "Wow that’s big ";
  }
}
document.write(text);