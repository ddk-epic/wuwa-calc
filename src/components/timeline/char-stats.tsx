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
import { weaponData } from "@/constants/constants";
import { echoes } from "@/constants/echo-data";

function BuildSelectGroup() {
  return (
    <SelectGroup>
      {["43311 Ele/Ele", "43311 Ele/Atk", "44111 crit/cDMG"].map((build) => (
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
      {weaponData[character.weapon.toLowerCase()] &&
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
      {echoes &&
        echoes.map((echo) => (
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
      {echoes &&
        echoes.map((echo) => (
          <SelectItem key={echo.set} value={echo.set}>
            {echo.set}
          </SelectItem>
        ))}
    </SelectGroup>
  );
}

interface CharStatsProps {
  team: CharacterConstants[];
  charData: Record<string, Character>;
  updateCharData: (
    character: string,
    key: keyof Character,
    value: string | number
  ) => void;
  updateWeaponData: (
    character: string,
    key: keyof Character,
    weaponRank: string
  ) => void;
  updateEchoData: (
    character: string,
    key: keyof Character,
    value: string
  ) => void;
}

function CharStatsForm(props: CharStatsProps) {
  const { team, charData, updateCharData, updateWeaponData, updateEchoData } =
    props;
  return (
    <div className="flex text-xs">
      {/* Character Data Form */}
      <div className="space-y-3">
        {team.map(
          (character, i) =>
            character.name !== "N/A" && (
              <div key={`character-${i}`} className="h-21 flex space-x-1">
                {charStatData[character.name.toLowerCase()] && (
                  <Image
                    src={charStatData[character.name.toLowerCase()].image}
                    alt={`${character} image`}
                    width={105}
                    height={105}
                    className="border"
                  />
                )}
                <div>
                  <div className="flex gap-1 space-y-1">
                    {/* Build */}
                    <div>
                      <Select
                        onValueChange={(value) =>
                          updateCharData(character.name, "build", value)
                        }
                        disabled={team[i].name === "none"}
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
                        onValueChange={(value) =>
                          updateCharData(character.name, "sequence", value)
                        }
                        disabled={team[i].name === "none"}
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
                        onValueChange={(value) =>
                          updateEchoData(character.name, "echo", value)
                        }
                        disabled={team[i].name === "none"}
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
                        onValueChange={(value) =>
                          updateWeaponData(character.name, "weapon", value)
                        }
                        disabled={team[i].name === "none"}
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
                        onValueChange={(value) =>
                          updateCharData(character.name, "weaponRank", value)
                        }
                        disabled={team[i].name === "none"}
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
                        onValueChange={(value) =>
                          updateCharData(character.name, "echoSet", value)
                        }
                        disabled={team[i].name === "none"}
                      >
                        <SelectTrigger className="min-w-52 text-xs rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                          <SelectValue
                            placeholder={charData[character.name]?.echoSet ?? "Echo Set"}
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
