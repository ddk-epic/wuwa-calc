"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillData } from "@/constants/constants";
import TimelineBar from "./timeline/timeline-bar";
import SelectSkill from "./timeline/skill-selection";
import TimeMarkers from "./timeline/time-markers";
import SelectCharacter from "./char-selection";
import RotationSummary from "./timeline/summary";
import { Noto_Sans } from "next/font/google";

const FontMono = Noto_Sans({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function CalculatorContent() {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [characters, setCharacters] = useState(["", "", ""]);
  const [skillSequence, setSkillSequence] = useState<SequenceSkill[]>([]);

  const currentSequenceTime = skillSequence.reduce(
    (total, skill) => Math.max(total, skill.startTime + skill.castTime),
    0
  );
  const maxSequenceTime = Math.max(
    Math.ceil(currentSequenceTime / 10) * 10,
    10
  ); // Round up to nearest 10-second interval
  const timelineWidth = Math.min(maxSequenceTime, 30);
  const isScrollable = maxSequenceTime > 30;
  const timeline = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!timeline.current) return;
    timeline.current.scrollLeft = 0;
  }, [isScrollable]);

  const addSkill = (skill: Skill) => {
    const startTime =
      skillSequence.length > 0
        ? Math.max(...skillSequence.map((s) => s.startTime + s.castTime))
        : 0;

    const newSkill: SequenceSkill = {
      ...skill,
      startTime,
    };
    const newSequence = [...skillSequence, newSkill];

    setSkillSequence(newSequence);
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

  const handleCharacterChange = (index: number, value: string) => {
    const updatedArr = [...characters];
    updatedArr[index] = value.toLowerCase();
    setCharacters(updatedArr);
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
        <div>
          <SelectCharacter updateCharacters={handleCharacterChange} />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSkillSequence([])} // clear
            disabled={skillSequence.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Timeline Container */}

      <Card>
        <CardContent className="px-6">
          <div className="flex justify-between">
            <h3 className="font-semibold mb-3">Rotation Sequence</h3>
            {characters[0] && (
              <h3 className="font-semibold mb-3">
                {characters[0].charAt(0).toUpperCase() + characters[0].slice(1)}
                &apos;s Team
              </h3>
            )}
          </div>
          <div>
            {/* Timeline Header */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Skill Sequence Timeline</span>
              {
                <span>
                  Total Duration:{" "}
                  {skillSequence.length > 0
                    ? currentSequenceTime.toFixed(2) + "s"
                    : "-"}
                </span>
              }
            </div>
          </div>
          <div className="flex w-full">
            {/* Character Portraits */}
            <div className="mt-2 border-t rounded-none">
              {characters.map((character, index) => (
                <div
                  key={index}
                  className="w-8 h-12 flex justify-center items-center text-2xl font-bold border-b border-x"
                >
                  {character.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            {/* Scrollable Block */}
            <div
              ref={timeline}
              className={`flex-1 pb-3 ${
                isScrollable ? "overflow-x-auto" : "overflow-hidden"
              }`}
            >
              {/* Timeline Bar */}
              <div className="pt-2 pb-1">
                {characters.map((character, index) => (
                  <TimelineBar
                    key={index}
                    character={character}
                    skillSequence={skillSequence}
                    timelineWidth={timelineWidth}
                    maxSequenceTime={maxSequenceTime}
                    removeSkill={removeSkill}
                  />
                ))}
              </div>

              {/* Time Markers */}
              <TimeMarkers
                timelineWidth={timelineWidth}
                maxSequenceTime={maxSequenceTime}
              />
            </div>
            {/* Add Skill Button */}
            <div className="mt-2 border-t">
              {characters.map((character, index) => (
                <div key={index} className="h-12">
                  <Popover
                    open={openPopovers[character] || false}
                    onOpenChange={(open) =>
                      setOpenPopovers((prev) => ({
                        ...prev,
                        [character]: open,
                      }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="secondary"
                        className="w-8 h-12 border-b border-x rounded-none hover:bg-background"
                        disabled={character === ""}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-0">
                      <h4 className="p-2 font-semibold text-sm">
                        {character.charAt(0).toUpperCase() + character.slice(1)}
                      </h4>
                      <SelectSkill
                        fontMono={FontMono}
                        skills={skillData[character]}
                        addSkill={addSkill}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-[1fr_2fr] gap-6">
        {/* Skill Sequence Column */}
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
                  className={`${skill.bgColor} ${skill.textColor} rounded-sm flex items-center justify-between text-xs font-medium group cursor-pointer transition-all hover:brightness-110`}
                >
                  <div className="grid grid-cols-[4fr_1fr] w-full items-center py-1 px-2">
                    <div className="font-semibold">{skill.name}</div>
                    <div className="text-right">
                      <span className={`${FontMono.className}`}>
                        {skill.startTime.toFixed(2)}s
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {skillSequence.length > 0 && (
          <Card>
            <CardContent className="px-3">
              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger
                    value="summary"
                    className="text-md font-semibold mb-4"
                  >
                    Summary
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="text-md font-semibold mb-4"
                  >
                    Details
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="px-1">
                  {/* Sequence Summary */}
                  <RotationSummary
                    skillSequence={skillSequence}
                    currentSequenceTime={currentSequenceTime}
                  />
                </TabsContent>
                {/* Sequence Details */}
                <TabsContent value="details" className="px-1">
                  Details
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
