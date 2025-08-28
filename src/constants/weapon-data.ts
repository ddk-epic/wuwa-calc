import { type } from "os";
import { Weapon } from "./types";

export const weapons: Record<string, Weapon> = {
  "Stringmaster (5☆)": {
    name: "Stringmaster (5☆)",
    type: "Rectifier",
    attack: 40,
    mainStat: "Crit",
    mainStatAmount: 0.08,
    buff: "Electric Amplification",
  },
  "Stellar Symphony (5☆)": {
    name: "Stellar Symphony (5☆)",
    type: "Rectifier",
    attack: 33,
    mainStat: "Energy Regen",
    mainStatAmount: 0.1712,
    buff: "Astral Envolvement",
  },
  "Blazing Brilliance (5☆)": {
    name: "Blazing Brilliance (5☆)",
    type: "Sword",
    attack: 47,
    mainStat: "Crit Dmg",
    mainStatAmount: 0.108,
    buff: "Crimson Phoenix",
  },
  "Red Spring (5☆)": {
    name: "Red Spring (5☆)",
    type: "Sword",
    attack: 47,
    mainStat: "Crit",
    mainStatAmount: 0.054,
    buff: "Beyond the Cycle",
  },
  "Emerald of Genesis (5☆)": {
    name: "Emerald of Genesis (5☆)",
    type: "Sword",
    attack: 47,
    mainStat: "Crit",
    mainStatAmount: 0.054,
    buff: "Emerald of Genesis",
  },
};
