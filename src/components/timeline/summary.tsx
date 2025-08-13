import React from "react";

interface RotationSummaryProps {
  characters: string[];
}

export default function RotationSummary({ characters }: RotationSummaryProps) {
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
    characters[0],
    characters[1],
    characters[2],
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
          <div className="w-15 text-muted-foreground">
            {Object.keys(damageTypes)[0]}:
          </div>
          <div className="ml-4 font-medium text-4xl py-0.5">
            {Object.values(damageTypes)[0]}
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3">
          {Object.entries(damageTypes)
            .slice(1)
            .map(([type, value]) => (
              <div key={type}>
                <span className="text-muted-foreground">{type}:</span>
                <span className="ml-2 font-medium">{value}</span>
              </div>
            ))}
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
              <div>
                <span className="text-muted-foreground">{type}</span>
              </div>
              <div>
                <span className="font-medium">
                  {values.reduce((acc, value) => acc + value, 0).toFixed(0)}
                </span>
              </div>
              {values.map((damage, dIndex) => (
                <div key={`${i}-${dIndex}`}>
                  <span className="font-medium">{damage.toFixed(0)}</span>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
