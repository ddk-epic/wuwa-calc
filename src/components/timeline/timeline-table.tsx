import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SequenceSkill } from "@/constants/types";

interface TimelineTableProps {
  skillSequence: SequenceSkill[];
}

export default function TimelineTable({ skillSequence }: TimelineTableProps) {
  return (
    <Card>
      <CardContent className="px-4">
        <h3 className="font-semibold px-1 mb-4">Rotation</h3>
        {/* Timeline Table Headers */}
        <div className="space-y-1">
          <div className="text-muted-foreground flex text-left text-sm font-normal pl-1 rounded">
            <div className="basis-8/12 mb-1">Action</div>
            <div title="Time" className="basis-2/12 mb-1 pr-2.5 text-right">
              Time
            </div>
            <div title="Energy" className="basis-1/12 mb-1 pr-1 text-right">
              En.
            </div>
            <div title="Concerto" className="basis-1/12 mb-1 text-right">
              Con.
            </div>
          </div>
          {/* Timeline Table Content */}
          {skillSequence.map((skill, index) => (
            <div
              key={`skill-${index + 1}`}
              className="flex rounded space-x-0.5 text-xs"
            >
              <div
                title={`${skill.type}: ${skill.name}`}
                className={`basis-8/12 ${skill.bgColor} ${skill.textColor} flex-1 rounded-xs font-semibold truncate p-1`}
              >
                {skill.type}: {skill.name}
              </div>
              <div className="font-mono bg-gray-600 rounded-xs basis-2/12 py-1 pr-1 text-right">
                {skill.startTime.toFixed(2)}s
              </div>
              <div className="font-mono bg-gray-600 rounded-xs basis-1/12 p-1 text-right">
                100
              </div>
              <div className="font-mono bg-gray-600 rounded-xs basis-1/12 p-1 text-right">
                100
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
