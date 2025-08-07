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
  const characterPlaceholder = ["Character 1", "Character 2", "Character 3"];

  return (
    <div className="grid grid-cols-3">
      {characterPlaceholder.map((placeholder, index) => (
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
