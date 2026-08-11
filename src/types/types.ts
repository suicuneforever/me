export type GameData = {
  name: string;
  playtimeTwoWeeks: number;
  playtimeForever: number;
  imgUrl: string;
};

export type WindowPosition = {
  top: string;
  left: string;
};

export type WindowSize = {
  width: string;
  height: string;
};

export type WindowVariant = "default" | "compact";

export type DesktopWindow = {
  id: string;
  title: string;
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  variant: WindowVariant;
};

export type Email = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export type Section = {
  title: string;
  id: string;
  isActive: boolean;
};

export type Status = {
  question: string;
  answer: string;
};
