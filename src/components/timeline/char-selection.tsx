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
import { characters } from "@/constants/constants";

function CharacterSelectGroup() {
  return (
    <SelectGroup>
      {characters.map((name) => (
        <SelectItem key={name} value={name}>
          {name}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

interface SelectCharacterProps {
  team: string[];
  updateTeam: (index: number, value: string) => void;
}

export default function SelectCharacter(props: SelectCharacterProps) {
  const { team, updateTeam } = props;
  const placeholder = ["DPS", "Slot 2", "Slot 3"];

  return (
    <div className="flex">
      <Select onValueChange={(value) => updateTeam(0, value)}>
        <SelectTrigger className="bg-gray-200 text-black border-gray-700 border-1 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={team[0] || placeholder[0]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateTeam(1, value)}>
        <SelectTrigger className="rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={team[1] || placeholder[1]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateTeam(2, value)}>
        <SelectTrigger className="rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={team[2] || placeholder[2]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
    </div>
  );
}
