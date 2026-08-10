import gsap from "gsap";
import { Dispatch, SetStateAction, useRef } from "react";
import { lettersAndSymbols } from "../../../utils/utils";
import { Section } from "../../apps/AboutMe/AboutMe";
import "./GlitchButton.scss";

type GlitchButtonProps = {
  section: Section;
  setSectionId: Dispatch<SetStateAction<string>>;
};

const PARENT_CLASS = "GlitchButton";

function GlitchButton({ section, setSectionId }: GlitchButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const shuffleChars = () => {
    if (buttonRef.current) {
      let chars = Array.from(buttonRef.current.children);
      chars.forEach((char, position) => {
        gsap.killTweensOf(char);
        gsap.fromTo(
          char,
          {
            opacity: 0,
          },
          {
            duration: 0.03,
            innerHTML: () =>
              lettersAndSymbols[
                Math.floor(Math.random() * lettersAndSymbols.length)
              ],
            repeat: 3,
            repeatRefresh: true,
            opacity: 1,
            repeatDelay: 0.05,
            onComplete: () =>
              gsap.set(char, {
                innerHTML: section.title[position],
                delay: 0.03,
              }),
          },
        );
      });
    }
  };

  return (
    <button
      className={
        section.isActive
          ? `${PARENT_CLASS} ${PARENT_CLASS}--active`
          : `${PARENT_CLASS} ${PARENT_CLASS}--disabled`
      }
      disabled={!section.isActive}
      key={section.id}
      onClick={() => setSectionId(section.id)}
      onMouseEnter={shuffleChars}
      ref={buttonRef}
    >
      {section.title.split("").map((char: string, index: number) => (
        <span key={`${section.id} ${index}`}>{char}</span>
      ))}
    </button>
  );
}

export default GlitchButton;
