"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { charConstData, skillData, totalBuffMap } from "@/constants/constants";
import TimelineBar from "./timeline/timeline-bar";
import SelectSkill from "./timeline/skill-selection";
import TimeMarkers from "./timeline/time-markers";
import SelectCharacter from "./timeline/char-selection";
import RotationSummary from "./timeline/summary";
import MatrixTable from "./timeline/matrix-table";
import { usePersistedState } from "@/hooks/usePersistedState";
import {
  Character,
  CharacterConstants,
  SequenceSkill,
  Skill,
} from "@/constants/types";
import TimelineTable from "./timeline/timeline-table";
import CharStats from "./timeline/char-stats";
import { charStatData } from "@/constants/char-data";
import { weapons } from "@/constants/weapon-data";
import { echoes } from "@/constants/echo-data";

export default function CalculatorContent() {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});
  const [team, setTeam] = usePersistedState<(null | CharacterConstants)[]>(
    "team",
    [null, null, null]
  );
  const [charData, setCharData] = usePersistedState<Record<string, Character>>(
    "charData",
    {}
  );
  const [skillSequence, setSkillSequence] = usePersistedState<SequenceSkill[]>(
    "skills",
    []
  );

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
    const lastSkill = skillSequence[skillSequence.length - 1];

    const startTime = lastSkill ? lastSkill.startTime + lastSkill.castTime : 0;

    const newSkill: SequenceSkill = {
      ...skill,
      startTime,
    };

    setSkillSequence([...skillSequence, newSkill]);
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

  const handleSelectTeam = (index: number, characterId: string) => {
    const updatedArr = [...team];
    updatedArr[index] = charStatData[characterId];
    setTeam(updatedArr);
    setCharData({
      ...charData,
      [characterId]: charConstData[characterId],
    });
  };

  const updateCharData = (
    character: string,
    key: keyof Character,
    value: string | number
  ) => {
    const updatedCharacter = { ...charData[character], [key]: value };
    setCharData({ ...charData, [character]: updatedCharacter });
  };

  const updateWeaponData = (
    character: string,
    key: keyof Character,
    value: string
  ) => {
    const getWeapon =
      key === "weapon"
        ? weapons.find((weapon) => weapon.name === value)
        : undefined;
    const updatedCharacter = { ...charData[character], [key]: getWeapon };
    setCharData({ ...charData, [character]: updatedCharacter });
  };

  const updateEchoData = (
    character: string,
    key: keyof Character,
    value: string
  ) => {
    const getEcho =
      key === "echo" ? echoes.find((echo) => echo.name === value) : undefined;
    const updatedCharacter = {
      ...charData[character],
      [key]: getEcho,
    };
    setCharData({ ...charData, [character]: updatedCharacter });
  };

  const clear = () => {
    setSkillSequence([]);
    setCharData({});
  };

  return (
    <div className="min-w-[1120px] max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="grid grid-cols-3">
        <div>
          <h1 className="text-2xl font-bold">Skill Sequence Builder</h1>
          <p className="text-muted-foreground">
            Plan your character&apos;s ability rotation
          </p>
        </div>
        <div className="w-[510px] pt-2">
          <SelectCharacter team={team} updateTeam={handleSelectTeam} />
        </div>
        <div className="justify-self-end pt-2.5">
          <Button
            variant="outline"
            onClick={clear}
            disabled={skillSequence.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats Accordion */}
      <CharStats
        team={team}
        charData={charData}
        updateCharData={updateCharData}
        updateWeaponData={updateWeaponData}
        updateEchoData={updateEchoData}
      />

      {/* Timeline Container */}
      <Card>
        <CardContent className="px-6">
          <div className="flex justify-between">
            <h3 className="font-semibold mb-3">Rotation Sequence</h3>
            <h3 className="font-semibold mb-3">
              {team[0]?.id ? team[0].name + "'s " : "no "}
              Team
            </h3>
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
          <div className={`flex w-full ${isScrollable ? "pb-0" : "pb-3"}`}>
            {/* Character Portraits */}
            <div className="mt-2 border-t rounded-none">
              {team.map((character, index) => (
                <div
                  key={index}
                  className="relative size-12 flex justify-center items-center text-2xl font-bold border-b border-x"
                >
                  {character && charStatData[character.id] && (
                    <Image
                      src={charStatData[character.id].image}
                      alt={`${character} image`}
                      width={120}
                      height={120}
                      style={{
                        objectFit: "cover",
                        transform: "scale(1.05)",
                      }}
                    />
                  )}
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
                {team.map((character, index) => (
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
              {team.map((character, index) => (
                <div key={index} className="h-12">
                  <Popover
                    open={openPopovers[index] || false}
                    onOpenChange={(open) =>
                      setOpenPopovers((prev) => ({
                        ...prev,
                        [index]: open,
                      }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="secondary"
                        className="w-8 h-12 border-b border-x rounded-none hover:bg-background"
                        disabled={character === null}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-0">
                      <h4 className="p-2 font-semibold text-sm">
                        {character?.name}
                      </h4>
                      {character && (
                        <SelectSkill
                          skills={skillData[character.id]}
                          addSkill={addSkill}
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-[2fr_5fr] gap-6">
        {
          <>
            {/* Left Tab */}
            <Card className="min-h-86">
              {skillSequence.length > 0 && (
                <TimelineTable skillSequence={skillSequence} />
              )}
            </Card>

            {/* Right Tab */}
            <Card>
              {skillSequence.length > 0 && (
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
                        team={team}
                        skillSequence={skillSequence}
                      />
                    </TabsContent>
                    {/* Sequence Details */}
                    <TabsContent value="details" className="px-1">
                      <MatrixTable data={totalBuffMap} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          </>
        }
      </div>
    </div>
  );
}
