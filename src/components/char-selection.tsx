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
        <SelectItem key={name.toLowerCase()} value={name.toLowerCase()}>
          {name}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

interface CharacterSelectProps {
  characters: string[];
  updateCharacters: (index: number, value: string) => void;
}

export default function CharacterSelect(props: CharacterSelectProps) {
  const { updateCharacters } = props;
  const characterPlaceholder = ["DPS", "Slot 2", "Slot 3"];

  return (
    <div className="grid grid-cols-3">
      <Select onValueChange={(value) => updateCharacters(0, value)}>
        <SelectTrigger className="w-[170px] bg-gray-200 text-black border-gray-700 border-1 rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
          <SelectValue placeholder={"DPS"} />
        </SelectTrigger>
        <SelectContent>
          <CharacterSelectGroup />
        </SelectContent>
      </Select>
      {characterPlaceholder.splice(1).map((placeholder, index) => (
        <Select
          key={index}
          onValueChange={(value) => updateCharacters(index, value)}
        >
          <SelectTrigger className="w-[170px] rounded-none focus:ring-0 focus:outline-none focus:ring-transparent">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <CharacterSelectGroup />
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
