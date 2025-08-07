"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TimelineBarProps {
  skillSequence: SequenceSkill[];
  totalSequenceTime: number;
  removeSkill: (index: number) => void;
}

export default function TimelineBar(props: TimelineBarProps) {
  const { skillSequence, totalSequenceTime, removeSkill } = props;

  const getSkillWidth = (castTime: number) => {
    if (totalSequenceTime === 0) return 0;
    return Math.max((castTime / totalSequenceTime) * 100, 2); // Minimum 2% width
  };

  const getSkillPosition = (startTime: number) => {
    if (totalSequenceTime === 0) return 0;
    return (startTime / totalSequenceTime) * 100;
  };

  return (
    <div className="relative">
      {skillSequence.length === 0 ? (
        <div className="h-16 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground bg-muted/10">
          No skills in sequence. Click &quot;Add Skill&quot; to get started.
        </div>
      ) : (
        <div className="relative h-16 bg-muted/20 border border-muted/30 rounded-lg overflow-hidden">
          {skillSequence.map((skill, index) => (
            <div
              key={`${skill.id}-${index}`}
              className={`absolute top-0 h-full ${skill.color} rounded-sm flex items-center justify-between pl-2 text-white text-xs font-medium group cursor-pointer transition-all hover:brightness-110`}
              style={{
                left: `${getSkillPosition(skill.startTime)}%`,
                width: `${getSkillWidth(skill.castTime)}%`,
                minWidth: "60px",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-semibold truncate">{skill.name}</span>
                </div>
                <div className="text-xs opacity-90 truncate">
                  {skill.castTime}s
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity size-6 p-0 hover:bg-white/20"
                onClick={() => removeSkill(index)}
              >
                <X className="w-2 h-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
