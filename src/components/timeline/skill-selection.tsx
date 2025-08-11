"use client";

import React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

interface SelectSkillProps {
  fontMono: NextFontWithVariable;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
}

export default function SelectSkill(props: SelectSkillProps) {
  const { fontMono, skills, addSkill } = props;

  return (
    <div className="max-h-94 space-y-1 pt-0 pb-2 overflow-y-auto">
      {skills &&
        skills.map((skill) => (
          <Card
            key={skill.id}
            className="p-1 mx-2 rounded-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => addSkill(skill)}
          >
            <CardContent className="px-1">
              <div className="flex justify-between items-center">
                {/* left side */}
                <div className="max-w-54 flex gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${skill.bgColor} mt-1 flex-shrink-0`} // dot
                  />
                  <h3
                    title={`${skill.type}: ${skill.name}`}
                    className="font-semibold text-sm truncate"
                  >
                    {skill.type}: {skill.name}
                  </h3>
                </div>
                {/* right side */}
                <div className="flex flex-shrink-0 text-xs items-center gap-0.5">
                  <Badge variant="secondary" className="text-xs opacity-85">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className={`${fontMono.className}`}>
                      {skill.castTime.toFixed(2)}s
                    </span>
                  </Badge>
                  {skill.cooldown ? (
                    <Badge
                      variant="outline"
                      className="w-14 text-xs opacity-85"
                    >
                      CD:{" "}
                      <span className={`${fontMono.className}`}>
                        {skill.cooldown}s
                      </span>
                    </Badge>
                  ) : (
                    <div className="w-14"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
