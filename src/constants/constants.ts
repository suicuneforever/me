import { DesktopWindow, Status, WindowSize } from "../types/types";

const DEFAULT_SIZE: WindowSize = { width: "60rem", height: "50rem" };
const COMPACT_SIZE: WindowSize = { width: "35rem", height: "33rem" };

export const DESKTOP_WINDOWS: DesktopWindow[] = [
  {
    title: "about me",
    id: "ABOUT_ME",
    icon: "/icons/aboutme.png",
    position: { top: "4rem", left: "10rem" },
    size: DEFAULT_SIZE,
    variant: "default",
  },
  {
    title: "resume",
    id: "RESUME",
    icon: "/icons/resume.png",
    position: { top: "5rem", left: "8rem" },
    size: DEFAULT_SIZE,
    variant: "default",
  },
  {
    title: "steam",
    id: "STEAM",
    icon: "/icons/steam95.png",
    position: { top: "7rem", left: "13rem" },
    size: DEFAULT_SIZE,
    variant: "default",
  },
  {
    title: "contact me",
    id: "CONTACT_ME",
    icon: "/icons/contactme.png",
    position: { top: "10rem", left: "7rem" },
    size: COMPACT_SIZE,
    variant: "compact",
  },
];

export const CONTACT_TABS = [
  { id: "EMAIL", label: "Email" },
  { id: "LINKS", label: "Links" },
];

export const CONTACT_LINKS = [
  {
    href: "https://github.com/suicuneforever",
    icon: "icons/github.png",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/danijaramillo/",
    icon: "icons/linkedin.png",
    label: "LinkedIn",
  },
];

export const STATUSES: Status[] = [
  { question: "mood", answer: "motivated" },
  { question: "hear", answer: "wannacry - ninajirachi & porter robinson" },
  {
    question: "read",
    answer: "i who have never known men - jacqueline harpman",
  },
  { question: "play", answer: "monster hunter: wilds" },
  { question: "make", answer: "this website" },
];
