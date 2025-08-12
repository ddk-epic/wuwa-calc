import { camellya, sanhua, shorekeeper } from "./char-data";
import {
  camellya_skills,
  sanhua_skills,
  shorekeeper_skills,
} from "./skill-data";

export const characters: string[] = [
  "Encore",
  "Camellya",
  "Sanhua",
  "Shorekeeper",
];
export const skillData: Record<string, Skill[]> = {
  camellya: camellya_skills,
  sanhua: sanhua_skills,
  shorekeeper: shorekeeper_skills,
};

export const charData: Record<string, Character> = {
  camellya: camellya,
  sanhua: sanhua,
  shorekeeper: shorekeeper,
};
