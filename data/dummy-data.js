import SaveRolls from "../model/SavedRolls";

const ROLLS = [
  new SaveRolls("id1", "Espada", [
    {
      id: 'roll1',
      title: "Ataque de espada",
      numDice: 1,
      typeDice: "D20",
      mod: 3,
      advDesv: true,
    },
    {
      id: 'roll2',
      title: "Dano",
      numDice: 2,
      typeDice: "D6",
      mod: 5,
      advDesv: false,
    },
  ]),
  new SaveRolls("id2", "Fireball", [
    {
      id: 'roll1',
      title: "Save throw",
      numDice: 1,
      typeDice: "D20",
      mod: 0,
      advDesv: false,
    },
    {
      id: 'roll2',
      title: "Dano",
      numDice: 3,
      typeDice: "D10",
      mod: 0,
      advDesv: false,
    },
  ]),
  new SaveRolls("id3", "Super Roll", [
    {
      id: 'roll1',
      title: "Save throw",
      numDice: 1,
      typeDice: "D20",
      mod: 3,
      advDesv: false,
    },
    {
      id: 'roll2',
      title: "Dano",
      numDice: 3,
      typeDice: "D10",
      mod: -2,
      advDesv: false,
    },
    {
      id: 'roll3',
      title: "Habilidade",
      numDice: 1,
      typeDice: "D12",
      mod: 10,
      advDesv: false,
    },
    {
      id: 'roll4',
      title: "Tiro Certeiro",
      numDice: 3,
      typeDice: "D4",
      mod: 0,
      advDesv: false,
    },
  ]),
];

export default ROLLS;
