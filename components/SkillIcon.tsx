"use client";

import React from "react";
import {
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFlask,
  SiFastapi,
  SiSqlite,
  SiPostgresql,
  SiGooglecloud,
  SiPytorch,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiOpenjdk,
  SiC,
  SiLeetcode,
  SiCplusplus,
  SiGit,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { FaDatabase, FaCode, FaCloud, FaServer, FaCogs } from "react-icons/fa";

interface SkillIconProps {
  name: string;
  className?: string;
}

export default function SkillIcon({ name, className = "w-6 h-6" }: SkillIconProps) {
  switch (name) {
    case "SiHtml5":
      return <SiHtml5 className={`${className} text-[#e34f26]`} />;
    case "SiCss3":
    case "SiCss":
      return <SiCss className={`${className} text-[#1572b6]`} />;
    case "SiReact":
      return <SiReact className={`${className} text-[#61dafb]`} />;
    case "SiTailwindcss":
      return <SiTailwindcss className={`${className} text-[#38bdf8]`} />;
    case "SiJavascript":
      return <SiJavascript className={`${className} text-[#f7df1e]`} />;
    case "SiNodedotjs":
      return <SiNodedotjs className={`${className} text-[#339933]`} />;
    case "SiExpress":
      return <SiExpress className={`${className} text-[#ffffff]`} />;
    case "SiPython":
      return <SiPython className={`${className} text-[#3776ab]`} />;
    case "SiFlask":
      return <SiFlask className={`${className} text-[#ffffff]`} />;
    case "SiFastapi":
      return <SiFastapi className={`${className} text-[#009688]`} />;
    case "SiSqlite":
      return <SiSqlite className={`${className} text-[#003b57]`} />;
    case "SiMicrosoftsqlserver":
      return <FaDatabase className={`${className} text-[#cc292b]`} />;
    case "SiPostgresql":
      return <SiPostgresql className={`${className} text-[#4169e1]`} />;
    case "SiGooglecloud":
      return <SiGooglecloud className={`${className} text-[#4285f4]`} />;
    case "SiPytorch":
      return <SiPytorch className={`${className} text-[#ee4c2c]`} />;
    case "SiNumpy":
      return <SiNumpy className={`${className} text-[#013243]`} />;
    case "SiPandas":
      return <SiPandas className={`${className} text-[#150458]`} />;
    case "SiScikitlearn":
      return <SiScikitlearn className={`${className} text-[#f7931e]`} />;
    case "SiOpenjdk":
      return <SiOpenjdk className={`${className} text-[#f89820]`} />;
    case "SiC":
      return <SiC className={`${className} text-[#a8b9cc]`} />;
    case "SiLeetcode":
      return <SiLeetcode className={`${className} text-[#ffa116]`} />;
    case "SiCplusplus":
      return <SiCplusplus className={`${className} text-[#00599c]`} />;
    case "SiGit":
      return <SiGit className={`${className} text-[#f05032]`} />;
    case "SiDocker":
      return <SiDocker className={`${className} text-[#2496ed]`} />;
    case "SiServicenow":
      return <FaCogs className={`${className} text-[#81b5a1]`} />;
    case "SiFigma":
      return <SiFigma className={`${className} text-[#f24e1e]`} />;
    default:
      return <FaCode className={`${className} text-[#00f2fe]`} />;
  }
}
