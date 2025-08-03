import React from "react";

interface TimeMarkersProps {
  totalSequenceTime: number;
}

export default function TimeMarkers({ totalSequenceTime }: TimeMarkersProps) {
  return (
    <>
      {totalSequenceTime > 0 && (
        <div className="relative h-4">
          {Array.from(
            { length: Math.floor(totalSequenceTime / 5) + 1 },
            (_, i) => (
              <div
                key={i}
                className="absolute top-0 text-xs text-muted-foreground"
                style={{
                  left: `${((i * 5) / totalSequenceTime) * 100}%`,
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
