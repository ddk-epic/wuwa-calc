import { Character, SequenceSkill } from "@/constants/types";

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
