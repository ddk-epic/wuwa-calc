import { echoes } from "./echo-data";
import { weapons } from "./weapon-data";

export const camellya: Character = {
  name: "Camellya",
  sequenceChain: 0,
  weapon: weapons.find((weapon) => weapon.name.includes("Red Spring"))!,
  echo: echoes.find((echo) => echo.name.includes("Nightmare: Crownless"))!,
  build: "43311 Ele/Ele",
  element: "Havoc",
  maxForte: 100,
  maxForte2: 0,
  attack: 36,
  defense: 95,
  health: 826,
  crit: 5 + 40.5 + 24.3,
  critDmg: 150 + 80.5 + 16 + 44,
};

export const sanhua: Character = {
  name: "Sanhua",
  sequenceChain: 0,
  weapon: weapons.find((weapon) => weapon.name.includes("Emerald of Genesis"))!,
  echo: echoes.find((echo) => echo.name.includes("Impermanence Heron"))!,
  build: "43311 Ele/Ele",
  element: "Glacio",
  maxForte: 100,
  maxForte2: 0,
  attack: 22,
  defense: 77,
  health: 805,
  crit: 5 + 40.5 + 24.3,
  critDmg: 150 + 80.5 + 44,
};

export const shorekeeper: Character = {
  name: "Shorekeeper",
  sequenceChain: 0,
  weapon: weapons.find((weapon) => weapon.name.includes("Stellar Symphony"))!,
  echo: echoes.find((echo) => echo.name.includes("Fallacy of No Return"))!,
  build: "43311 Ele/ER",
  element: "Spectro",
  maxForte: 5,
  maxForte2: 0,
  attack: 23,
  defense: 90,
  health: 1337,
  crit: 5,
  critDmg: 150 + 80.5,
};
