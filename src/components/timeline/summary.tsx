import React from "react";

interface RotationSummaryProps {
  skillSequence: SequenceSkill[];
  currentSequenceTime: number;
}

export default function RotationSummary(props: RotationSummaryProps) {
  // const { skillSequence, currentSequenceTime } = props;
  const damageTypes = {
    "Total Damage": 215296,
    Basic: 15237,
    Skill: 47295,
    Coord: 3458,
    Heavy: 73893,
    Liberation: 34586,
    Other: 1272,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 text-sm">
      <div className="flex items-start">
        <div className="w-15 ml-2 text-muted-foreground top-0">
          {Object.keys(damageTypes)[0]}:
        </div>
        <div className="ml-2 font-medium text-4xl py-0.5">
          {Object.values(damageTypes)[0]}
        </div>
      </div>
      <div className="grid grid-cols-3">
        {Object.entries(damageTypes)
          .slice(1)
          .map(([key, value]) => (
            <div>
              <span className="text-muted-foreground border-b border-transparent">
                {key}:
              </span>
              <span className="ml-2 font-medium">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
