import { AsciiRenderer, Image } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { STATUSES } from "../../../constants/constants";
import { useWindowStore } from "../../../store/store";
import { Section } from "../../../types/types";
import CursorTrail from "../../general/CursorTrail";
import GlitchButton from "../../general/GlitchButton";
import "./AboutMe.scss";

const PARENT_CLASS = "AboutMe";

const WINDOW_ID = "ABOUT_ME";

const SECTION_CONTENT: Record<
  string,
  { title: string; content?: React.ReactNode }
> = {
  ABOUT: {
    title: "about me",
    content: (
      <>
        <div className={`${PARENT_CLASS}__canvas`}>
          <Canvas camera={{ fov: 10, position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <AsciiRenderer
                invert
                resolution={0.2}
                bgColor="#080808"
                fgColor="#4242ff"
              />
              <Image url="/images/portrait.jpg" />
            </Suspense>
          </Canvas>
        </div>
        <div className={`${PARENT_CLASS}__text`}>
          my name is dani and i'm a fullstack software engineer. i have over 7
          years of experience and found myself mostly to be in the web
          devlopment space. ever since i was young, i have had a passion for art
          and technology, so i often like to find ways where i can combine the
          two in my creations. this website is meant to be a culmination of all
          things i enjoy and what has made me the person i am today. i have
          taken a lot of inspiration from artists and developers i admire, as
          well as inspiration from the early internet age (neopets, myspace,
          deviantart...) which is where i got my start in interests like web dev
          and digital art. thx 4 reading ^_^
        </div>
      </>
    ),
  },
  MUSIC: { title: "music" },
  ART: { title: "art" },
  UPDATES: { title: "updates" },
  TODO_LIST: {
    title: "to-do list",
    content: (
      <div className={`${PARENT_CLASS}__text`}>
        <ul>
          <li>
            <s>create contact me window</s>
          </li>
          <li>finish steam page</li>
          <li>create custom clippy 3d model</li>
          <li>implement window size manipulation</li>
          <li>create about me music section</li>
          <li>create about me art section</li>
          <li>create about me update section</li>
          <li>create about me guestbook section</li>
        </ul>
      </div>
    ),
  },
  GUESTBOOK: { title: "guestbook" },
  CREDITS: {
    title: "credits, inspiration",
    content: (
      <div className={`${PARENT_CLASS}__credits`}>
        <span>
          about me header by{" "}
          <a
            href="https://www.instagram.com/downtowntempo/"
            target="_blank"
            rel="noreferrer"
          >
            downtown tempo
          </a>
        </span>
        <span>
          background from{" "}
          <a href="https://www.fillster.com/" target="_blank" rel="noreferrer">
            fillster.com
          </a>
        </span>

        <span>
          cursor design by{" "}
          <a
            href="https://codepen.io/sarahwfox/pen/pNrYGb"
            target="_blank"
            rel="noreferrer"
          >
            @sarahwfox
          </a>
        </span>
        <span>
          about me fonts from{" "}
          <a
            href="https://int10h.org/oldschool-pc-fonts/"
            target="_blank"
            rel="noreferrer"
          >
            old school pc font resource
          </a>
        </span>
      </div>
    ),
  },
};

const SECTIONS: Section[] = [
  { title: "about", id: "ABOUT", isActive: true },
  { title: "music", id: "MUSIC", isActive: false },
  { title: "art", id: "ART", isActive: false },
  { title: "updates", id: "UPDATES", isActive: false },
  { title: "to-do list", id: "TODO_LIST", isActive: true },
  { title: "guestbook", id: "GUESTBOOK", isActive: false },
  { title: "credits", id: "CREDITS", isActive: true },
];

function AboutMe() {
  const [sectionId, setSectionId] = useState<string>("ABOUT");
  const [isHovering, setIsHovering] = useState(false);
  const { activeWindowId } = useWindowStore();

  const showSparkles = isHovering && activeWindowId === WINDOW_ID;

  return (
    <div
      className={`${PARENT_CLASS}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showSparkles ? <CursorTrail /> : null}
      <div className={`${PARENT_CLASS}__container`}>
        <div className={`${PARENT_CLASS}__header`}>
          <img src="images/Flower_v04.png" alt="header" />
        </div>
        <div className={`${PARENT_CLASS}__body`}>
          <div className={`${PARENT_CLASS}__sidebar`}>
            <div className={`${PARENT_CLASS}__card`}>
              <div className={`${PARENT_CLASS}__links`}>
                <div className={`${PARENT_CLASS}__title`}>menu</div>
                <div className={`${PARENT_CLASS}__divider`}></div>
                {SECTIONS.map((section) => (
                  <GlitchButton
                    section={section}
                    setSectionId={setSectionId}
                    key={section.id}
                  />
                ))}
              </div>
            </div>
            <div className={`${PARENT_CLASS}__card`}>
              <div className={`${PARENT_CLASS}__title`}>status</div>
              <div className={`${PARENT_CLASS}__divider`}></div>
              {STATUSES.map((status) => (
                <div
                  className={`${PARENT_CLASS}__status-text`}
                  key={status.question}
                >
                  <span className={`${PARENT_CLASS}__status-text-question`}>
                    {status.question}
                  </span>
                  <span className={`${PARENT_CLASS}__status-text-answer`}>
                    {status.answer}
                  </span>
                </div>
              ))}
            </div>
            <div className={`${PARENT_CLASS}__card`}>
              <div className={`${PARENT_CLASS}__title`}>visitors</div>
              <div className={`${PARENT_CLASS}__divider`}></div>
              <div className={`${PARENT_CLASS}__visitor-container`}>
                <div className={`${PARENT_CLASS}__visitor-counter`}>
                  0001337
                </div>
                <div className={`${PARENT_CLASS}__visitor-text`}>
                  <span className={`${PARENT_CLASS}__visitor-subtext`}>
                    you are visitor
                  </span>
                  <span>#1,337</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${PARENT_CLASS}__content`}>
            <div className={`${PARENT_CLASS}__card`}>
              welcome to my site &lt;3 i created this as a means to up my dev
              skills and to create my own mark on the world wide web. feel free
              to click the links around in this window as well as the icons on
              the desktop to learn more about me! thanks for visiting~
            </div>
            <div className={`${PARENT_CLASS}__card`}>
              <div className={`${PARENT_CLASS}__section`}>
                <div className={`${PARENT_CLASS}__title`}>
                  {SECTION_CONTENT[sectionId].title}
                </div>
                <div className={`${PARENT_CLASS}__divider`}></div>
                {SECTION_CONTENT[sectionId].content}
              </div>
            </div>
          </div>
        </div>
        <div className={`${PARENT_CLASS}__divider`}></div>
      </div>
    </div>
  );
}

export default AboutMe;
