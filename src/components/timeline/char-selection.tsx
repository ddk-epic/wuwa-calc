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
  updateCharacters: (index: number, value: string) => void;
}

export default function SelectCharacter(props: SelectCharacterProps) {
  const { updateCharacters } = props;
  const placeholder = ["DPS", "Slot 2", "Slot 3"];

  return (
    <div className="flex">
      <Select onValueChange={(value) => updateCharacters(0, value)}>
        <SelectTrigger className="bg-gray-200 text-black border-gray-700 border-1 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={placeholder[0]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateCharacters(1, value)}>
        <SelectTrigger className="rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={placeholder[1]} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateCharacters(2, value)}>
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
