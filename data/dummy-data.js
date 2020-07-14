import SaveRolls from "../model/SavedRolls";

const ROLLS = [
  new SaveRolls("Espada", [
    {
      title: "Ataque de espada",
      numDice: 1,
      typeDice: "D20",
      mod: 3,
      advDesv: true,
    },
    {
      title: "Dano",
      numDice: 2,
      typeDice: "D6",
      mod: 5,
      advDesv: false,
    },
  ]),
  new SaveRolls("Fireball", [
    {
      title: "Save throw",
      numDice: 1,
      typeDice: "D20",
      mod: 0,
      advDesv: false,
    },
    {
      title: "Dano",
      numDice: 3,
      typeDice: "10",
      mod: 0,
      advDesv: false,
    },
  ]),
];

export default ROLLS