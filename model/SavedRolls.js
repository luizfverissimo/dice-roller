class SavedRolls {
  constructor (title, rolls) {
    this.title = title,
    this.rolls = rolls
  }
}

export default SavedRolls

/* 
rolls = [
  {
    title,
    numDice,
    typeDice,
    mod,
    advDesv
  },
  {
    title: "Ataque de espada",
    numDice: 1,
    typeDice: "D20",
    advDesv: true
  },
  {
    title: "Dano",
    numDice: 1,
    typeDice: "D8",
    advDesv: false
  }
]

*/