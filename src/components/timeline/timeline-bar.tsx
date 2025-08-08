"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TimelineBarProps {
  character: string;
  skillSequence: SequenceSkill[];
  timelineWidth: number;
  maxSequenceTime: number;
  removeSkill: (index: number) => void;
}

export default function TimelineBar(props: TimelineBarProps) {
  const {
    character,
    skillSequence,
    timelineWidth,
    maxSequenceTime,
    removeSkill,
  } = props;

  const getSkillWidth = (castTime: number) => {
    if (maxSequenceTime === 0) return 0;
    return (castTime / timelineWidth) * 100;
  };

  const getSkillPosition = (startTime: number) => {
    if (maxSequenceTime === 0) return 0;
    return (startTime / timelineWidth) * 100;
  };

  return (
    <div className="relative">
      {skillSequence.length > 0 && (
        <div className="relative h-12 bg-muted/20 border border-muted/30 rounded-lg">
          {skillSequence.map((skill, index) => {
            if (character === skill.source.toLowerCase())
              return (
                <div
                  key={`${skill.id}-${index}`}
                  className={`absolute top-0 h-full ${skill.bgColor} ${skill.textColor} rounded-md flex items-center justify-between pl-2 text-xs font-medium border-gray-100 border-2 group cursor-pointer transition-all hover:brightness-110`}
                  style={{
                    left: `${getSkillPosition(skill.startTime)}%`,
                    width: `${getSkillWidth(skill.castTime)}%`,
                    minWidth: "20px",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="font-semibold truncate">
                        {skill.name}
                      </span>
                    </div>
                    <div className="text-xs opacity-85 truncate">
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
              );
          })}
        </div>
      )}
    </div>
  );
}
