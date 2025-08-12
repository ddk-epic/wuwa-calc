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

export const totalBuffMapKeys = [
  "Atk%",
  "Hp%",
  "Def%",
  "ER",
  "Crit",
  "cDmg",
  "No",
  "He",
  "Sk",
  "Lib",
  "All",
  "NoDe",
  "HeDe",
  "SkDe",
  "LibDe",
  "AllDe",
  "Gl",
  "Fu",
  "El",
  "Ae",
  "Sp",
  "Ha",
  "Spc",
  "Deep",
  "Multi",
  "Res",
  "IgnDef",
  "Atk",
  "Hp",
  "Def",
  "ERM",
  "Outro",
  "FRM",
  "Co",
  "CoDe",
  "Phys",
];

export const totalBuffMap = [
  [
    0, 0, 0, 0, 0, 0, 0.13, 0.15, 0.17, 0, 0.21, 0.23, 0, 0.27, 0.29, 0.31,
    0.33, 0.35, 0, 0.4, 0.42, 0.44, 0.46, 0, 0, 0.52, 0.54, 0.56, 0.58, 0.6,
    0.63, 0, 0.67, 0.69, 0.71, 0.73,
  ],
  [
    0, 0, 0, 0, 0, 0, 0.13, 0.15, 0.17, 0.19, 0.21, 0, 0.25, 0.27, 0.29, 0.31,
    0.33, 0.35, 0, 0.4, 0, 0.44, 0.46, 0, 0.5, 0, 0, 0, 0.58, 0.6, 0, 0, 0.67,
    0, 0, 0.73,
  ],
  [
    0, 0, 0, 0, 0, 0, 0.13, 0.15, 0.17, 0.19, 0.21, 0.23, 0.25, 0, 0.29, 0.31,
    0, 0.35, 0.38, 0.4, 0.42, 0.44, 0.46, 0, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6,
    0.63, 0.65, 0.67, 0.69, 0.71, 0.73,
  ],
  [
    0.17, 0.19, 0.21, 0, 0.25, 0.27, 0.29, 0.31, 0.33, 0.35, 0, 0.4, 0, 0.44,
    0.46, 0, 0.5, 0, 0, 0, 0.58, 0.6, 0.46, 0, 0.5, 0, 0, 0, 0.58, 0.6, 0, 0,
    0.67, 0, 0, 0.73,
  ],
];
