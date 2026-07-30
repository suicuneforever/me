import { useState } from 'react';
import CursorTrail from '../CursorTrail';
import { useWindowStore } from '../../store/store';
import './AboutMe.scss';
import GlitchButton from '../GlitchButton';

const PARENT_CLASS = 'AboutMe';
const WINDOW_ID = 'ABOUT_ME';

type Status = {
  question: string;
  answer: string;
};

const STATUSES: Status[] = [
  { question: 'mood', answer: 'motivated' },
  { question: 'hear', answer: 'wannacry - ninajirachi & porter robinson' },
  { question: 'read', answer: 'i who have never known men - jacqueline harpman' },
  { question: 'play', answer: 'monster hunter: wilds' },
  { question: 'make', answer: 'this website' },
];

// TODO move?
export type Section = {
  title: string;
  id: string;
  isActive: boolean;
};

const SECTIONS: Section[] = [
  { title: 'about', id: 'ABOUT', isActive: true },
  { title: 'interests', id: 'INTERESTS', isActive: false },
  { title: 'music', id: 'MUSIC', isActive: false },
  { title: 'art', id: 'ART', isActive: false },
  { title: 'updates', id: 'UPDATES', isActive: false },
  { title: 'to-do list', id: 'TODO_LIST', isActive: false },
  { title: 'guestbook', id: 'GUESTBOOK', isActive: false },
  { title: 'credits', id: 'CREDITS', isActive: true },
];

function AboutMe() {
  const [sectionId, setSectionId] = useState<string>('ABOUT');
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
        <div className={`${PARENT_CLASS}__sidebar`}>
          <div className={`${PARENT_CLASS}__card`}>
            <div className={`${PARENT_CLASS}__links`}>
              <div className={`${PARENT_CLASS}__title`}>menu</div>
              <div className={`${PARENT_CLASS}__divider`}></div>
              {SECTIONS.map((section) => (
                <GlitchButton section={section} setSectionId={setSectionId} />
              ))}
            </div>
          </div>
          <div className={`${PARENT_CLASS}__card`}>
            <div className={`${PARENT_CLASS}__title`}>status</div>
            <div className={`${PARENT_CLASS}__divider`}></div>
            {STATUSES.map((status) => (
              <div className={`${PARENT_CLASS}__status-text`} key={status.question}>
                <span className={`${PARENT_CLASS}__status-text-question`}>{status.question}</span>
                <span className={`${PARENT_CLASS}__status-text-answer`}>{status.answer}</span>
              </div>
            ))}
          </div>
          <div className={`${PARENT_CLASS}__card`}>
            <div className={`${PARENT_CLASS}__title`}>visitors</div>
            <div className={`${PARENT_CLASS}__divider`}></div>
            <div className={`${PARENT_CLASS}__visitor-container`}>
              <div className={`${PARENT_CLASS}__visitor-counter`}>0001337</div>
              <div className={`${PARENT_CLASS}__visitor-text`}>
                <span className={`${PARENT_CLASS}__visitor-subtext`}>you are visitor</span>
                <span>#1,337</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${PARENT_CLASS}__body`}>
          <div className={`${PARENT_CLASS}__card`}>
            welcome to my site &lt;3 i created this as a means to up my dev skills and to create my own mark on the
            world wide web. feel free to click the links around in this window as well as the icons on the desktop to
            learn more about me! thanks for visiting~
          </div>
          <div className={`${PARENT_CLASS}__card`}>
            <div className={`${PARENT_CLASS}__section`}>
              {sectionId === 'ABOUT' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>about me</div>
                  <div className={`${PARENT_CLASS}__divider`}></div>
                  <div className={`${PARENT_CLASS}__text`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </>
              ) : null}
              {sectionId === 'INTERESTS' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>interests</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'MUSIC' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>music</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'ART' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>art</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'UPDATES' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>updates</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'TODO_LIST' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>to-do list</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'GUESTBOOK' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>guestbook</div>
                  <img src="/images/underconstruction.gif" />
                </>
              ) : null}
              {sectionId === 'CREDITS' ? (
                <>
                  <div className={`${PARENT_CLASS}__title`}>credits, inspiration</div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

//https://int10h.org/oldschool-pc-fonts/
//https://codepen.io/sarahwfox/pen/pNrYGb
//https://miserabledolly.net/home
//https://www.fillster.com/
