import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/i18n";

import iceKing from "@/public/images/characters/ice-king.webp";
import silver from "@/public/images/characters/silver.webp";
import elf from "@/public/images/characters/elf.webp";
import roommate from "@/public/images/characters/roommate.webp";
import racer from "@/public/images/characters/racer.webp";
import don from "@/public/images/characters/don.webp";
import rancher from "@/public/images/characters/rancher.webp";
import ceo from "@/public/images/characters/ceo.webp";
import boyfriend from "@/public/images/characters/boyfriend.webp";
import summer from "@/public/images/characters/summer.webp";
import muse from "@/public/images/characters/muse.webp";
import guard from "@/public/images/characters/guard.webp";

// Placeholder cast. Art comes from the Figma draft; names and hooks are sample copy.
export type Character = {
  id: string;
  image: StaticImageData;
  name: Localized;
  hook: Localized;
  tags: Localized<string[]>;
};

export const characters: Character[] = [
  {
    id: "ice-king",
    image: iceKing,
    name: { en: "The Ice King – Arranged Marriage", zh: "冰封之王 · 契约婚姻" },
    hook: {
      en: "Three marriages, and he waited through every one.",
      zh: "三次婚约，他每一次都在等你。",
    },
    tags: { en: ["Fantasy", "Royalty"], zh: ["奇幻", "王室"] },
  },
  {
    id: "silver",
    image: silver,
    name: { en: "Ren – Childhood Friend", zh: "阿烬 · 青梅竹马" },
    hook: {
      en: "Feared by generals and assassins alike — helpless only around you.",
      zh: "令将军和刺客都畏惧，却唯独拿你没办法。",
    },
    tags: { en: ["Historical", "Anime"], zh: ["古风", "动漫"] },
  },
  {
    id: "elf",
    image: elf,
    name: { en: "Aelric – The Exiled Elf", zh: "艾瑞克 · 流放的精灵" },
    hook: {
      en: "He traded his crown for one night under your roof.",
      zh: "他用王冠，换了在你屋檐下的一夜。",
    },
    tags: { en: ["Fantasy", "Slow burn"], zh: ["奇幻", "慢热"] },
  },
  {
    id: "roommate",
    image: roommate,
    name: { en: "Brother's Roommate", zh: "哥哥的室友" },
    hook: {
      en: "He has exactly one rule he cannot break: never touch his best friend's sister.",
      zh: "他唯一不能破的规矩：绝不碰兄弟的妹妹。",
    },
    tags: { en: ["Modern", "Forbidden"], zh: ["现代", "禁忌"] },
  },
  {
    id: "don",
    image: don,
    name: { en: "Don Valerio", zh: "瓦莱里奥阁下" },
    hook: {
      en: "Everyone rushes to light his cigarette. He only waits for yours.",
      zh: "所有人都抢着为他点烟，他只等你那一支。",
    },
    tags: { en: ["Mafia", "Dark"], zh: ["黑帮", "暗黑"] },
  },
  {
    id: "racer",
    image: racer,
    name: { en: "Jax – Midnight Racer", zh: "杰克斯 · 午夜车手" },
    hook: {
      en: "Faster than the law. Slower only for you.",
      zh: "快过法律，只为你放慢。",
    },
    tags: { en: ["Modern", "Rebel"], zh: ["现代", "叛逆"] },
  },
  {
    id: "muse",
    image: muse,
    name: { en: "Elena – The Muse", zh: "埃琳娜 · 缪斯" },
    hook: {
      en: "A painter's muse who would rather paint you.",
      zh: "画家的缪斯，却只想画你。",
    },
    tags: { en: ["Romance", "Art"], zh: ["恋爱", "艺术"] },
  },
  {
    id: "rancher",
    image: rancher,
    name: { en: "Bram – Minotaur Rancher", zh: "布拉姆 · 牛角牧场主" },
    hook: {
      en: "Gentle hands, terrible manners, and a farm that needs saving.",
      zh: "温柔的手，糟糕的脾气，和一座需要拯救的牧场。",
    },
    tags: { en: ["Fantasy", "Comedy"], zh: ["奇幻", "喜剧"] },
  },
  {
    id: "ceo",
    image: ceo,
    name: { en: "Mr. Shen – The CEO", zh: "沈总" },
    hook: {
      en: "Your new boss. First rule: no one leaves before he does.",
      zh: "你的新上司。第一条规矩：他不走，谁也别想走。",
    },
    tags: { en: ["Office", "Enemies to lovers"], zh: ["职场", "欢喜冤家"] },
  },
  {
    id: "boyfriend",
    image: boyfriend,
    name: { en: "Leo – Long Distance", zh: "里奥 · 异地恋" },
    hook: {
      en: "He sends you a selfie every morning. Today's is from your doorstep.",
      zh: "每天早上发你一张自拍。今天的背景，是你家门口。",
    },
    tags: { en: ["Modern", "Sweet"], zh: ["现代", "甜宠"] },
  },
  {
    id: "summer",
    image: summer,
    name: { en: "Cal – Summer Fling", zh: "卡尔 · 夏日恋曲" },
    hook: {
      en: "Lifeguard by day. Trouble by night.",
      zh: "白天是救生员，晚上是大麻烦。",
    },
    tags: { en: ["Modern", "Flirty"], zh: ["现代", "撩"] },
  },
  {
    id: "guard",
    image: guard,
    name: { en: "Nox – Bodyguard", zh: "诺克斯 · 贴身保镖" },
    hook: {
      en: "Hired to protect you. Not hired to fall for you.",
      zh: "受雇保护你，可没受雇爱上你。",
    },
    tags: { en: ["Action", "Protective"], zh: ["动作", "守护"] },
  },
];
