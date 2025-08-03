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
  const totalSequenceTime = Math.ceil(currentSequenceTime / 5) * 5; // Round up to nearest 5-second interval

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
    // Recalculate start times
    const recalculatedSequence = newSequence.map((skill, i) => ({
      ...skill,
      startTime:
        i > 0 ? newSequence[i - 1].startTime + newSequence[i - 1].castTime : 0,
    }));
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
        <CardContent className="p-6">
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

      {/* Sequence Summary */}
      {skillSequence.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Sequence Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Skills:</span>
                <span className="ml-2 font-medium">{skillSequence.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Mana Cost:</span>
                <span className="ml-2 font-medium">
                  {skillSequence.reduce(
                    (total, skill) => total + skill.manaCost,
                    0
                  )}{" "}
                  MP
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Avg Cast Time:</span>
                <span className="ml-2 font-medium">
                  {(
                    skillSequence.reduce(
                      (total, skill) => total + skill.castTime,
                      0
                    ) / skillSequence.length
                  ).toFixed(1)}
                  s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
