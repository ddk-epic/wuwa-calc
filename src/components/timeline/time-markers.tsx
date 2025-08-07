import React from "react";

interface TimeMarkersProps {
  maxSequenceTime: number;
}

export default function TimeMarkers({ maxSequenceTime }: TimeMarkersProps) {
  return (
    <>
      {maxSequenceTime > 0 && (
        <div className="relative h-4">
          {Array.from(
            { length: Math.floor(maxSequenceTime / 5) + 1 },
            (_, i) => (
              <div
                key={i}
                className="absolute top-0 text-xs text-muted-foreground"
                style={{
                  left: `${((i * 5) / maxSequenceTime) * 100}%`,
                }}
              >
                <div className="w-px h-2 bg-muted-foreground/30 mb-1" />
                {i * 5}s
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
