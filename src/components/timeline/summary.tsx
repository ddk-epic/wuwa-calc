import React from "react";

export default function RotationSummary() {
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
    <div className="ml-2">
      <div className="grid grid-cols-5 text-sm">
        <div className="col-span-2 flex">
          <div className="w-15 text-muted-foreground">
            {Object.keys(damageTypes)[0]}:
          </div>
          <div className="ml-2 font-medium text-4xl py-0.5">
            {Object.values(damageTypes)[0]}
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3">
          {Object.entries(damageTypes)
            .slice(1)
            .map(([key, value]) => (
              <div key={key}>
                <span className="text-muted-foreground">{key}:</span>
                <span className="ml-2 font-medium">{value}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-5 pt-6 text-sm">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <span className="text-muted-foreground">text:</span>
            <span className="ml-2 font-medium">value</span>
          </div>
        ))}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <span className="text-muted-foreground">text:</span>
            <span className="ml-2 font-medium">value</span>
          </div>
        ))}
      </div>
    </div>
  );
}
