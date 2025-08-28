import {
  camellya_skills,
  sanhua_skills,
  shorekeeper_skills,
} from "./skill-data";
import { Skill, Weapon } from "./types";
import { weapons } from "./weapon-data";

export const weaponData: Record<string, Weapon[]> = {
  greatsword: Object.values(weapons).filter(
    (weapon) => weapon.type === "Greatsword"
  ),
  sword: Object.values(weapons).filter((weapon) => weapon.type === "Sword"),
  pistol: Object.values(weapons).filter((weapon) => weapon.type === "Pistol"),
  gauntlet: Object.values(weapons).filter(
    (weapon) => weapon.type === "Gauntlet"
  ),
  rectifier: Object.values(weapons).filter(
    (weapon) => weapon.type === "Rectifier"
  ),
};

export const skillData: Record<string, Skill[]> = {
  camellya: camellya_skills,
  sanhua: sanhua_skills,
  shorekeeper: shorekeeper_skills,
};

export const builds = [
  "43311 Ele/Ele",
  "43311 Ele/Atk",
  "43311 Ele/ER",
  "44111 crit/cDMG",
];

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
