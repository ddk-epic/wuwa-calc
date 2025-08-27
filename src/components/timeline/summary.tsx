import React from "react";
import { calculateDamage } from "@/lib/calculations";
import { CharacterConstants, SequenceSkill } from "@/constants/types";

interface RotationSummaryProps {
  team: (null | CharacterConstants)[];
  skillSequence: SequenceSkill[];
}

export default function RotationSummary(props: RotationSummaryProps) {
  const { team, skillSequence } = props;

  const damageTypes = {
    "Total Damage": 215296,
    Basic: 15237,
    Skill: 47295,
    Coord: 3458,
    Heavy: 73893,
    Liberation: 34586,
    Other: 1272,
  };

  const rowHeaders = [
    "Damage Breakdown",
    "Total",
    team[0]?.name,
    team[1]?.name,
    team[2]?.name,
  ];

  const damageBreakdown = {
    Total: [134702.4533, 751232.2777, 37349.28383],
    Normal: [0, 17870.66253, 487633.2007],
    Heavy: [1522699.78, 54411.27038, 74238.35211],
    Skill: [0, 0, 0],
    Liberation: [0, 22512.86353, 22249.26641],
    Intro: [0, 0, 61987.8257],
    Outro: [1454291.576, 72831.66623, 66679.99417],
    Echo: [0, 0, 0],
    Other: [3111693.81, 918858.7403, 750137.923],
  };

  return (
    <div className="ml-2">
      <div className="grid grid-cols-5 text-sm">
        <div className="col-span-2 flex">
          <div className="w-24 text-muted-foreground">
            {Object.keys(damageTypes)[0]}:
          </div>
          <div className="font-mono ml-4 font-medium text-4xl py-0.5">
            {Object.values(damageTypes)[0]}
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-5 py-0.5">
            <span className="text-muted-foreground">DPS&nbsp;(Opener):</span>
            <span className="font-mono ml-5 font-medium">57395</span>
          </div>
          <div className="grid grid-cols-5">
            <span className="text-muted-foreground">DPS (Loop):</span>
            <span className="font-mono ml-5 font-medium">59481</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 pt-6 text-sm">
        {/* Damage Breakdown Headers */}
        {rowHeaders.map((header, index) => (
          <div key={`header-${index}`}>
            <span className="text-muted-foreground">
              {header
                ? header.charAt(0).toUpperCase() + header.slice(1)
                : "N/A"}
            </span>
          </div>
        ))}
        {/* Damage Breakdown Content */}
        {Array.from({ length: 5 }, (_, i) => {
          const type = Object.keys(damageBreakdown)[i];
          const values = Object.entries(damageBreakdown)[i][1];
          return (
            <React.Fragment key={i}>
              <div className="py-0.5">
                <span className="text-muted-foreground">{type}</span>
              </div>
              <div className="py-0.5">
                <span className="font-mono font-medium">
                  {values.reduce((acc, value) => acc + value, 0).toFixed(0)}
                </span>
              </div>
              {values.map((damage, dIndex) => (
                <div key={`${i}-${dIndex}`} className="py-0.5">
                  <span className="font-mono font-medium">
                    {damage.toFixed(0)}
                  </span>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
      <div className="font-mono pt-6 text-sm">
        {/* Damage */}
        <span className="text-muted-foreground">Damage</span>
        {skillSequence.map((skill, index) => (
          <div key={`damage-${index}`}>
            <span className="font-mono font-medium">
              {/* {calculateDamage(skill.source, charData, skill).toFixed(2)} */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
