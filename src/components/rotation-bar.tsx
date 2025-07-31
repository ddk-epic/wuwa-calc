"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Clock } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  castTime: number; // in seconds
  cooldown: number;
  manaCost: number;
  type: "damage" | "heal" | "buff" | "debuff";
  color: string;
}

interface SequenceSkill extends Skill {
  startTime: number;
}

const availableSkills: Skill[] = [
  {
    id: "fireball",
    name: "Fireball",
    description: "Launches a blazing projectile",
    castTime: 2.5,
    cooldown: 8,
    manaCost: 40,
    type: "damage",
    color: "bg-red-500",
  },
  {
    id: "heal",
    name: "Greater Heal",
    description: "Restores significant health",
    castTime: 3.0,
    cooldown: 12,
    manaCost: 60,
    type: "heal",
    color: "bg-green-500",
  },
  {
    id: "shield",
    name: "Arcane Shield",
    description: "Creates protective barrier",
    castTime: 1.5,
    cooldown: 15,
    manaCost: 35,
    type: "buff",
    color: "bg-blue-500",
  },
  {
    id: "lightning",
    name: "Lightning Bolt",
    description: "Instant electrical damage",
    castTime: 1.0,
    cooldown: 5,
    manaCost: 25,
    type: "damage",
    color: "bg-yellow-500",
  },
  {
    id: "curse",
    name: "Weakness Curse",
    description: "Reduces enemy strength",
    castTime: 2.0,
    cooldown: 20,
    manaCost: 30,
    type: "debuff",
    color: "bg-purple-500",
  },
  {
    id: "teleport",
    name: "Blink",
    description: "Instant movement ability",
    castTime: 0.5,
    cooldown: 10,
    manaCost: 20,
    type: "buff",
    color: "bg-cyan-500",
  },
  {
    id: "meteor",
    name: "Meteor Strike",
    description: "Devastating area attack",
    castTime: 4.0,
    cooldown: 30,
    manaCost: 80,
    type: "damage",
    color: "bg-orange-500",
  },
  {
    id: "regeneration",
    name: "Regeneration",
    description: "Healing over time effect",
    castTime: 1.8,
    cooldown: 25,
    manaCost: 45,
    type: "heal",
    color: "bg-emerald-500",
  },
];

export default function RotationBar() {
  const [skillSequence, setSkillSequence] = useState<SequenceSkill[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const actualSequenceTime = skillSequence.reduce(
    (total, skill) => Math.max(total, skill.startTime + skill.castTime),
    0
  );
  const totalSequenceTime = Math.ceil(actualSequenceTime / 5) * 5; // Round up to nearest 5-second interval

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

  const clearSequence = () => {
    setSkillSequence([]);
  };

  const getSkillWidth = (castTime: number) => {
    if (totalSequenceTime === 0) return 0;
    return Math.max((castTime / totalSequenceTime) * 100, 8); // Minimum 8% width
  };

  const getSkillPosition = (startTime: number) => {
    if (totalSequenceTime === 0) return 0;
    return (startTime / totalSequenceTime) * 100;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "damage":
        return "⚔️";
      case "heal":
        return "💚";
      case "buff":
        return "🛡️";
      case "debuff":
        return "💀";
      default:
        return "✨";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skill Sequence Builder</h1>
          <p className="text-muted-foreground">
            Plan your character's ability rotation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={clearSequence}
            disabled={skillSequence.length === 0}
          >
            Clear All
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Choose a Skill</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <Card
                    key={skill.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addSkill(skill)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${skill.color} mt-1 flex-shrink-0`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">
                              {getTypeIcon(skill.type)}
                            </span>
                            <h3 className="font-semibold text-sm">
                              {skill.name}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {skill.description}
                          </p>
                          <div className="flex gap-2 text-xs">
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {skill.castTime}s
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              CD: {skill.cooldown}s
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              MP: {skill.manaCost}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
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
            <div className="relative">
              {skillSequence.length === 0 ? (
                <div className="h-16 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground bg-muted/10">
                  No skills in sequence. Click "Add Skill" to get started.
                </div>
              ) : (
                <div className="relative h-16 bg-muted/20 border border-muted/30 rounded-lg overflow-hidden">
                  {skillSequence.map((skill, index) => (
                    <div
                      key={`${skill.id}-${index}`}
                      className={`absolute top-0 h-full ${skill.color} rounded-sm flex items-center justify-between px-2 text-white text-xs font-medium group cursor-pointer transition-all hover:brightness-110`}
                      style={{
                        left: `${getSkillPosition(skill.startTime)}%`,
                        width: `${getSkillWidth(skill.castTime)}%`,
                        minWidth: "60px",
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-xs">
                            {getTypeIcon(skill.type)}
                          </span>
                          <span className="font-semibold truncate">
                            {skill.name}
                          </span>
                        </div>
                        <div className="text-xs opacity-90 truncate">
                          {skill.castTime}s cast
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-white/20"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Time Markers */}
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
