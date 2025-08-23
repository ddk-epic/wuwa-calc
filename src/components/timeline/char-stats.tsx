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
import { CharacterConstants } from "@/constants/types";
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
}

function CharStatsForm(props: CharStatsProps) {
  const { team } = props;
  return (
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
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-56 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Build"} />
                      </SelectTrigger>
                      <SelectContent>
                        <BuildSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Sequence */}
                  <div>
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-13 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"S"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SequenceSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Echo */}
                  <div>
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-56 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
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
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-56 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Weapon"} />
                      </SelectTrigger>
                      <SelectContent>
                        <WeaponSelectGroup {...props} character={character} />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Rank */}
                  <div>
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-13 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"R"} />
                      </SelectTrigger>
                      <SelectContent>
                        <RankSelectGroup />
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Echo Set */}
                  <div>
                    <Select>
                      {/* <Select onValueChange={(value) => updateProfile(0, value)}> */}
                      <SelectTrigger className="min-w-56 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
                        <SelectValue placeholder={"Echo Set"} />
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
  );
}

export default function CharStats(props: CharStatsProps) {
  return (
    <Card className="py-0 rounded-none bg-background">
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Character Data:</AccordionTrigger>
            <AccordionContent>
              <CharStatsForm {...props} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
