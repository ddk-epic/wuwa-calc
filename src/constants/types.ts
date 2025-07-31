interface Skill {
  id: string;
  name: string;
  description: string;
  castTime: number; // in seconds
  cooldown: number;
  manaCost: number;
  type: "damage" | "heal" | "buff" | "debuff";
  color: string;
}

interface SequenceSkill extends Skill {
  startTime: number;
}