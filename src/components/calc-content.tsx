"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { availableSkills } from "@/constants/constants";
import TimelineBar from "./timeline/timeline-bar";
import SelectSkill from "./timeline/skill-selection";
import TimeMarkers from "./timeline/time-markers";

export default function CalculatorContent() {
  const [skillSequence, setSkillSequence] = useState<SequenceSkill[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentSequenceTime = skillSequence.reduce(
    (total, skill) => Math.max(total, skill.startTime + skill.castTime),
    0
  );
  const totalSequenceTime = Math.ceil(currentSequenceTime / 10) * 10; // Round up to nearest 5-second interval

  const addSkill = (skill: Skill) => {
    const startTime =
      skillSequence.length > 0
        ? Math.max(...skillSequence.map((s) => s.startTime + s.castTime))
        : 0;

    const newSkill: SequenceSkill = {
      ...skill,
      startTime,
    };

    setSkillSequence([...skillSequence, newSkill]);
    setIsDialogOpen(false);
  };

  const removeSkill = (index: number) => {
    const newSequence = skillSequence.filter((_, i) => i !== index);
    const recalculatedSequence: SequenceSkill[] = [];

    for (let i = 0; i < newSequence.length; i++) {
      let startTime = 0;
      if (i > 0) {
        const prev = recalculatedSequence[i - 1];
        startTime = prev.startTime + prev.castTime;
      }

      recalculatedSequence.push({
        ...newSequence[i],
        startTime,
      });
    }

    setSkillSequence(recalculatedSequence);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skill Sequence Builder</h1>
          <p className="text-muted-foreground">
            Plan your character&apos;s ability rotation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSkillSequence([])} // clear
            disabled={skillSequence.length === 0}
          >
            Clear All
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </Button>
            </DialogTrigger>
            <SelectSkill Skills={availableSkills} addSkill={addSkill} />
          </Dialog>
        </div>
      </div>

      {/* Timeline Container */}

      <Card>
        <CardContent className="px-6">
          <h3 className="font-semibold mb-3">Rotation Sequence</h3>
          <div className="space-y-4">
            {/* Timeline Header */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Skill Sequence Timeline</span>
              {totalSequenceTime > 0 && (
                <span>Total Duration: {totalSequenceTime.toFixed(1)}s</span>
              )}
            </div>

            {/* Timeline Bar */}
            <TimelineBar
              skillSequence={skillSequence}
              totalSequenceTime={totalSequenceTime}
              removeSkill={removeSkill}
            />

            {/* Time Markers */}
            <TimeMarkers totalSequenceTime={totalSequenceTime} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-[1fr_2fr] gap-6">
        {/* Skill Sequence */}
        {skillSequence.length > 0 && (
          <Card>
            <CardContent className="px-4 space-y-1">
              <div className="grid grid-cols-[4fr_1fr] w-full items-center px-2">
                <h3 className="font-semibold mb-3">Rotation</h3>
                <h3 className="text-right font-semibold mb-3">Time</h3>
              </div>
              {skillSequence.map((skill, index) => (
                <div
                  key={`${skill.id}-${index}`}
                  className={`${skill.color} rounded-sm flex items-center justify-between text-white text-xs font-medium group cursor-pointer transition-all hover:brightness-110`}
                >
                  <div className="grid grid-cols-[4fr_1fr] w-full items-center p-2">
                    <div className="font-semibold">{skill.name}</div>
                    <div className="text-right">{skill.castTime}s</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Sequence Summary */}
        {skillSequence.length > 0 && (
          <Card>
            <CardContent className="px-4">
              <h3 className="font-semibold mb-3">Sequence Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Skills:</span>
                  <span className="ml-2 font-medium">
                    {skillSequence.length}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Total Forte Cost:
                  </span>
                  <span className="ml-2 font-medium">
                    {skillSequence.reduce(
                      (total, skill) => total + skill.forte,
                      0
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Total Cast Time:
                  </span>
                  <span className="ml-2 font-medium">
                    {skillSequence
                      .reduce((total, skill) => total + skill.castTime, 0)
                      .toFixed(2)}
                    s
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
