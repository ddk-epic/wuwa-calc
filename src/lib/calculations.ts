import { echoes } from "@/constants/echo-data";
import {
  BonusStats,
  Character,
  CharacterData,
  CharacterConstants,
  SequenceSkill,
} from "@/constants/types";
import { weapons } from "@/constants/weapon-data";

export function constructCharBase(
  character: CharacterConstants,
  charSetting: Character
) {
  const bonusData: BonusStats = {
    "Flat Attack": 0, // bonusStats from user input
    "Flat Health": 0,
    "Flat Defense": 0,
    Attack: 0.182,
    Health: 0,
    Defense: 0,
    "Energy Regen": 0.2,
    Crit: 0.405,
    "Crit Dmg": 0.81,
    Basic: 0,
    Heavy: 0,
    Skill: 0,
    Liberation: 0,
    /* Element */
    Aero: 0,
    Electro: 0,
    Fusion: 0,
    Glacio: 0,
    Havoc: 0,
    Spectro: 0,
  };

  const bonusStatsArray = Object.entries(bonusData).map(([key, value]) => [
    key,
    value,
  ]) as [keyof BonusStats, number][];

  const characterData: CharacterData = {
    /* character */
    name: character.id,
    sequence: charSetting?.sequence ?? "0",
    weapon: charSetting?.weapon ?? weapons[character.weapon],
    weaponRank: charSetting?.weaponRank ?? "1",
    echo: charSetting?.echo ?? echoes[character.echo],
    echoSet: charSetting?.echoSet ?? echoes[character.echo].set,
    build: charSetting?.build ?? "43311 Ele/Ele",
    element: character.element,
    maxForte: character.maxForte,
    maxForte2: character.maxForte2,
    /* stats */
    attack: character.baseAtk,
    defense: character.baseDef,
    health: character.baseHp,
    crit: 5,
    critDmg: 150,
    bonusStats: bonusStatsArray,
    dCond: new Map([
      ["Forte", 0],
      ["Concerto", 0],
      ["Resonance", 200],
    ]),
  };
  return characterData;
}

export function calculateDamage(
  activeCharacter: string,
  charData: Record<string, Character>,
  sequenceSkill: SequenceSkill
) {
  const levelCap = 90;
  const enemyDefense = 792 + 8 * 100; // enemy level
  const defenseMultiplier =
    (800 + levelCap * 8) / (enemyDefense + 800 + levelCap * 8);
  const damageMultiplier = 1 * defenseMultiplier;

  const damage = sequenceSkill.damage;
  const crit = Math.min(charData[activeCharacter].crit, 1);
  const critMultiplier =
    charData[activeCharacter].critDmg -
    crit +
    crit * charData[activeCharacter].critDmg;

  const totalDamage = damage * critMultiplier * damageMultiplier;
  return totalDamage;
}
