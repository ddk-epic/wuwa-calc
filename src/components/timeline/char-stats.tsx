import React from "react";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { charStatData } from "@/constants/char-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Character, CharacterConstants } from "@/constants/types";
import { builds, weaponData } from "@/constants/constants";
import { echoes } from "@/constants/echo-data";

function BuildSelectGroup() {
  return (
    <SelectGroup>
      {builds.map((build) => (
        <SelectItem key={build} value={build}>
          {build}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

function SequenceSelectGroup() {
  return (
    <SelectGroup>
      {["0", "1", "2", "3", "4", "5", "6"].map((seq) => (
        <SelectItem key={seq} value={seq}>
          {seq}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

function WeaponSelectGroup({ character }: { character: CharacterConstants }) {
  return (
    <SelectGroup>
      {character.weapon.toLowerCase() &&
        weaponData[character.weapon.toLowerCase()].map((weapon) => (
          <SelectItem key={weapon.name} value={weapon.name}>
            {weapon.name}
          </SelectItem>
        ))}
    </SelectGroup>
  );
}

function RankSelectGroup() {
  return (
    <SelectGroup>
      {["1", "2", "3", "4", "5"].map((seq) => (
        <SelectItem key={seq} value={seq}>
          {seq}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

function EchoSelectGroup() {
  return (
    <SelectGroup>
      {Object.values(echoes).map((echo) => (
        <SelectItem key={echo.name} value={echo.name}>
          {echo.name}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

function EchoSetSelectGroup() {
  return (
    <SelectGroup>
      {Object.values(echoes).map((echo) => (
        <SelectItem key={echo.set} value={echo.set}>
          {echo.set}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

interface CharStatsProps {
  team: (null | CharacterConstants)[];
  charData: Record<string, Character>;
  updateCharacterData: (
    character: string,
    key: keyof Character,
    value: string | number
  ) => void;
}

function CharStatsForm(props: CharStatsProps) {
  const { team, charData, updateCharacterData } =
    props;
  return (
    <div className="flex text-xs">
      {/* Character Data Form */}
      <div className="space-y-3">
        {team.map((character, i) =>
          character ? (
            <div key={`character-${i}`} className="h-21 flex space-x-1">
              {
                <Image
                  src={charStatData[character.id]?.image}
                  alt={`${character} image`}
                  width={105}
                  height={105}
                  className="border"
                />
              }
              <div>
                <div className="flex gap-1 space-y-1">
                  {/* Build */}
                  <div>
                    <Select
                      value={charData[character.id]?.build}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "build", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-56 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Build"} />
                      </SelectTrigger>
                      <SelectContent>
                        <BuildSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Sequence */}
                  <div>
                    <Select
                      value={charData[character.id]?.sequence}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "sequence", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-13 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"S"} />
                      </SelectTrigger>
                      <SelectContent className="min-w-8">
                        <SequenceSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Echo */}
                  <div>
                    <Select
                      value={charData[character.id]?.echo.name}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "echo", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-52 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Echo"} />
                      </SelectTrigger>
                      <SelectContent>
                        <EchoSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-1">
                  {/* Weapon */}
                  <div>
                    <Select
                      value={charData[character.id]?.weapon.name}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "weapon", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-56 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Weapon"} />
                      </SelectTrigger>
                      <SelectContent>
                        <WeaponSelectGroup {...props} character={character} />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Rank */}
                  <div>
                    <Select
                      value={charData[character.id]?.weaponRank}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "weaponRank", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-13 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"R"} />
                      </SelectTrigger>
                      <SelectContent className="min-w-8">
                        <RankSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Echo Set */}
                  <div>
                    <Select
                      value={charData[character.id]?.echoSet}
                      onValueChange={(value) =>
                        updateCharacterData(character.id, "echoSet", value)
                      }
                      disabled={team[i]?.name === null}
                    >
                      <SelectTrigger className="min-w-52 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue
                          placeholder={
                            charData[character.id]?.echoSet ?? "Echo Set"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <EchoSetSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={`character-${i}`}
              className="bg-muted h-21 min-w-145 rounded-xs"
            ></div>
          )
        )}
      </div>
      <div className="ml-6 px-3 py-2 flex-1 border">settings</div>
    </div>
  );
}

export default function CharStats(props: CharStatsProps) {
  return (
    <Card className="py-0 rounded-none bg-background">
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="settings">
            <AccordionTrigger>Character Settings:</AccordionTrigger>
            <AccordionContent>
              <CharStatsForm {...props} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
