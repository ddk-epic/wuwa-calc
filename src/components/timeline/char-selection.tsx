"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { CharacterConstants } from "@/constants/types";
import { charStatData } from "@/constants/char-data";

function CharacterSelectGroup() {
  return (
    <SelectGroup>
      {Object.entries(charStatData).map(([character, charData]) => (
        <SelectItem key={character} value={charData.id}>
          {charData.name}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

interface SelectCharacterProps {
  team: (null | CharacterConstants)[];
  updateTeam: (index: number, value: string) => void;
}

export default function SelectCharacter(props: SelectCharacterProps) {
  const { team, updateTeam } = props;
  const placeholder = ["DPS", "Slot 2", "Slot 3"];

  return (
    <div className="flex">
      <Select
        value={team[0]?.id}
        onValueChange={(value) => updateTeam(0, value)}
      >
        <SelectTrigger className="bg-gray-200 text-black border-gray-700 border-1 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={placeholder[0]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select
        value={team[1]?.id}
        onValueChange={(value) => updateTeam(1, value)}
      >
        <SelectTrigger className="rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={placeholder[1]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select
        value={team[2]?.id}
        onValueChange={(value) => updateTeam(2, value)}
      >
        <SelectTrigger className="rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={placeholder[2]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
    </div>
  );
}
