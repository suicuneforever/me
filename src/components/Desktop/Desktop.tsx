import './Desktop.scss';
import WindowModal from '../WindowModal';
import { Position, useWindowStore } from '../../store/store';
import AboutMe from '../AboutMe';
import Resume from '../Resume';
import MySpace from '../MySpace';
import ContactMe from '../ContactMe';
import Mystery from '../Mystery';
import { useEffect, useState } from 'react';
import Steam from '../Steam';

const PARENT_CLASS = 'Desktop';

type Icon = {
  title: string;
  id: string;
  path: string;
  position: Position;
};

// TODO refactor
const DESKTOP_ICONS: Icon[] = [
  { title: 'about me', id: 'ABOUT_ME', path: '/icons/aboutme.png', position: { top: '5rem', left: '15rem' } },
  { title: 'resume', id: 'RESUME', path: '/icons/resume.png', position: { top: '4rem', left: '13rem' } },
  // TODO make icon
  { title: 'steam', id: 'STEAM', path: '/icons/steam95.jpg', position: { top: '7rem', left: '18rem' } },
  // { title: 'myspace', id: 'MYSPACE', path: '/icons/myspace.png', position: { top: '6rem', left: '17rem' } },
  { title: 'contact me', id: 'CONTACT_ME', path: '/icons/contactme.png', position: { top: '10rem', left: '12rem' } },
  // { title: '???', id: 'MYSTERY', path: '/icons/mystery.png', position: { top: '5rem', left: '15rem' } },
];

const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  ABOUT_ME: <AboutMe />,
  RESUME: <Resume />,
  STEAM: <Steam />,
  MYSPACE: <MySpace />,
  CONTACT_ME: <ContactMe />,
  MYSTERY: <Mystery />,
};

function Desktop() {
  const [time, setTime] = useState(new Date());
  const { windows, activeWindowId, openWindow, setActiveWindow, closeWindow } = useWindowStore();

  // TODO refactor?
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div>NOTE: THIS WEBSITE IS CURRENTLY A WORK IN PROGRESS</div>
      <div className={`${PARENT_CLASS}__container`}>
        <div className={`${PARENT_CLASS}__icons`}>
          {DESKTOP_ICONS.map((desktopIcon) => {
            return (
              <div
                className={`${PARENT_CLASS}__icon`}
                key={desktopIcon.title}
                onClick={() => openWindow(desktopIcon.id, desktopIcon.title, desktopIcon.position)}
              >
                <img src={desktopIcon.path} />
                <label>{desktopIcon.title}</label>
              </div>
            );
          })}
        </div>

        {windows.map((window) => (
          <WindowModal key={window.id} windowData={window} closeFn={() => closeWindow(window.id)}>
            {WINDOW_COMPONENTS[window.id]}
          </WindowModal>
        ))}

        <div className={`${PARENT_CLASS}__start-bar`}>
          <div className={`${PARENT_CLASS}__start-button`}>Start</div>
          {windows.map((window) =>
            window.id === activeWindowId ? (
              <div
                className={`${PARENT_CLASS}__window-button ${PARENT_CLASS}__window-button--active`}
                key={window.id}
                onClick={() => setActiveWindow(window.id)}
              >
                <div className={`${PARENT_CLASS}__checkerboard`}>
                  <img src={DESKTOP_ICONS.find((w) => w.id === window.id)?.path} />
                  {window.title}
                </div>
              </div>
            ) : (
              <div
                className={`${PARENT_CLASS}__window-button`}
                key={window.id}
                onClick={() => setActiveWindow(window.id)}
              >
                <img src={DESKTOP_ICONS.find((w) => w.id === window.id)?.path} />
                {window.title}
              </div>
            ),
          )}
          <div className={`${PARENT_CLASS}__time`}>{formattedTime}</div>
        </div>
      </div>
    </>
  );
}

export default Desktop;
