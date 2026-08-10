import { AsciiRenderer, Image } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useWindowStore } from "../../../store/store";
import CursorTrail from "../../general/CursorTrail";
import GlitchButton from "../../general/GlitchButton";
import "./AboutMe.scss";

const PARENT_CLASS = "AboutMe";
const WINDOW_ID = "ABOUT_ME";

type Status = {
  question: string;
  answer: string;
};

const STATUSES: Status[] = [
  { question: "mood", answer: "motivated" },
  { question: "hear", answer: "wannacry - ninajirachi & porter robinson" },
  {
    question: "read",
    answer: "i who have never known men - jacqueline harpman",
  },
  { question: "play", answer: "monster hunter: wilds" },
  { question: "make", answer: "this website" },
];

// TODO move?
export type Section = {
  title: string;
  id: string;
  isActive: boolean;
};

const SECTIONS: Section[] = [
  { title: "about", id: "ABOUT", isActive: true },
  { title: "interests", id: "INTERESTS", isActive: false },
  { title: "music", id: "MUSIC", isActive: false },
  { title: "art", id: "ART", isActive: false },
  { title: "updates", id: "UPDATES", isActive: false },
  { title: "to-do list", id: "TODO_LIST", isActive: false },
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
          <img src="images/Flower_v04.png" />
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
                {sectionId === "ABOUT" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>about me</div>
                    <div className={`${PARENT_CLASS}__divider`}></div>
                    <div className={`${PARENT_CLASS}__canvas`}>
                      <Canvas
                        camera={{
                          fov: 10,
                          position: [0, 0, 5],
                        }}
                      >
                        <Suspense fallback={null}>
                          <AsciiRenderer
                            invert={true}
                            resolution={0.2}
                            bgColor="#080808"
                            fgColor="#4242ff"
                          />
                          <Image url="/images/portrait.jpg" />
                        </Suspense>
                      </Canvas>
                    </div>
                    <div className={`${PARENT_CLASS}__text`}>
                      my name is dani and i'm a fullstack software engineer. i
                      have over 7 years of experience and found myself mostly to
                      be in the web devlopment space. ever since i was young, i
                      have had a passion for art and technology, so i often like
                      to find ways where i can combine the two in the things i
                      create. this website is meant to be a culmination of all
                      things i enjoy and what has made me the person i am today.
                      i have taken a lot of inspiration from artists and
                      developers i admire, as well as inspiration from the early
                      internet age (neopets, myspace, deviantart...) which is
                      where i got my start in things like web dev and digital
                      art. thx 4 reading ^_^
                    </div>
                  </>
                ) : null}
                {sectionId === "INTERESTS" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>interests</div>
                  </>
                ) : null}
                {sectionId === "MUSIC" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>music</div>
                  </>
                ) : null}
                {sectionId === "ART" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>art</div>
                  </>
                ) : null}
                {sectionId === "UPDATES" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>updates</div>
                  </>
                ) : null}
                {sectionId === "TODO_LIST" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>to-do list</div>
                  </>
                ) : null}
                {sectionId === "GUESTBOOK" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>guestbook</div>
                  </>
                ) : null}
                {sectionId === "CREDITS" ? (
                  <>
                    <div className={`${PARENT_CLASS}__title`}>
                      credits, inspiration
                    </div>
                  </>
                ) : null}
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

//https://int10h.org/oldschool-pc-fonts/
//https://codepen.io/sarahwfox/pen/pNrYGb
//https://miserabledolly.net/home
//https://www.fillster.com/
