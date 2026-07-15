import './Desktop.scss';
import WindowModal from '../WindowModal';
import { useWindowStore } from '../../store/store';
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
};

const DESKTOP_ICONS: Icon[] = [
  { title: 'about me', id: 'ABOUT_ME', path: '/icons/aboutme.png' },
  { title: 'resume', id: 'RESUME', path: '/icons/resume.png' },
  { title: 'myspace', id: 'MYSPACE', path: '/icons/myspace.png' },
  // TODO make icon
  { title: 'steam', id: 'STEAM', path: '/icons/steam.jpg' },
  { title: 'contact me', id: 'CONTACT_ME', path: '/icons/contactme.png' },
  { title: '???', id: 'MYSTERY', path: '/icons/mystery.png' },
];

const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  ABOUT_ME: <AboutMe />,
  RESUME: <Resume />,
  MYSPACE: <MySpace />,
  STEAM: <Steam />,
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
    <div className={`${PARENT_CLASS}__container`}>
      <div className={`${PARENT_CLASS}__icons`}>
        {DESKTOP_ICONS.map((desktopIcon) => {
          return (
            <div className="icon" key={desktopIcon.title} onClick={() => openWindow(desktopIcon.id, desktopIcon.title)}>
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
        <div className="start-button">Start</div>
        {windows.map((window) =>
          window.id === activeWindowId ? (
            <div className="button--active" key={window.id} onClick={() => setActiveWindow(window.id)}>
              <div className="checkerboard">
                <img src={DESKTOP_ICONS.find((w) => w.id === window.id)?.path} />
                {window.title}
              </div>
            </div>
          ) : (
            <div className="button" key={window.id} onClick={() => setActiveWindow(window.id)}>
              <img src={DESKTOP_ICONS.find((w) => w.id === window.id)?.path} />
              {window.title}
            </div>
          ),
        )}
        <div className="time">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Desktop;
