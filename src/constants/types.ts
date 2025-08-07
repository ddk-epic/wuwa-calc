interface SkillState {
  isInAir: boolean;
  isGroundedForSwap: boolean;

}

interface Skill {
  id: string;
  name: string;
  source: string;
  type: "Basic" | "Heavy" | "Skill" | "Liberation" | "Coord";
  hits: number;
  hitframes: number[];
  castTime: number; // in frames, 60/s
  cooldown: number;
  forte: number; // In percent
  resonance: number;
  concerto: number;
  state: SkillState;
  bgColor: string;
  textColor: string;
}

interface SequenceSkill extends Skill {
  startTime: number;
}
