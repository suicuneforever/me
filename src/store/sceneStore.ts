import { create } from "zustand";

// TODO move
export enum View {
  Intro = "intro",
  Computer = "computer",
  Room = "room",
}

interface SceneState {
  view: View;
  setView: (view: View) => void;
}

export const useSceneStore = create<SceneState>()((set) => ({
  view: View.Intro,
  setView: (view) => set({ view }),
}));
