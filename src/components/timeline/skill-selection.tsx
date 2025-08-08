"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface SelectSkillProps {
  Skills: Skill[];
  addSkill: (skill: Skill) => void;
}

export default function SelectSkill(props: SelectSkillProps) {
  const { Skills, addSkill } = props;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Choose a Skill</DialogTitle>
      </DialogHeader>
      <div className="max-h-94 space-y-2 pr-2 overflow-y-auto">
        {Skills.map((skill) => (
          <Card
            key={skill.id}
            className="cursor-pointer hover:shadow-md transition-shadow p-2 mx-2"
            onClick={() => addSkill(skill)}
          >
            <CardContent className="px-1">
              <div className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${skill.bgColor} mt-1 flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">
                      {skill.type}: {skill.name}
                    </h3>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {skill.castTime}s
                    </Badge>
                    {skill.cooldown !== 0 && (
                      <Badge variant="outline" className="text-xs">
                        CD: {skill.cooldown}s
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DialogContent>
  );
}
