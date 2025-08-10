import React from "react";

interface TimeMarkersProps {
  timelineWidth: number;
  maxSequenceTime: number;
}

export default function TimeMarkers(props: TimeMarkersProps) {
  const { timelineWidth, maxSequenceTime } = props;

  const markerInterval = 5;
  const arrayLength = Math.floor(maxSequenceTime / markerInterval) + 1;
  return (
    <>
      {maxSequenceTime > 0 && (
        <div className="relative h-4">
          {Array.from({ length: arrayLength }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 text-xs text-muted-foreground"
              style={{
                left: `${((i * markerInterval) / timelineWidth) * 100}%`,
              }}
            >
              <div className="w-px h-2 bg-muted-foreground/30 mb-1" />
              {i * markerInterval}s
            </div>
          ))}
        </div>
      )}
    </>
  );
}
