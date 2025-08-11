import React from "react";

interface RotationSummaryProps {
  skillSequence: SequenceSkill[];
  currentSequenceTime: number;
}

export default function RotationSummary(props: RotationSummaryProps) {
  const { skillSequence, currentSequenceTime } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <span className="text-muted-foreground">Total Skills:</span>
        <span className="ml-2 font-medium">{skillSequence.length}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Total Forte Cost:</span>
        <span className="ml-2 font-medium">
          {skillSequence
            .reduce((total, skill) => total + skill.forte, 0)
            .toFixed(2)}
        </span>
      </div>
      <div>
        <span className="text-muted-foreground">Total Cast Time:</span>
        <span className="ml-2 font-medium">
          {currentSequenceTime.toFixed(2)}s
        </span>
      </div>
    </div>
  );
}
