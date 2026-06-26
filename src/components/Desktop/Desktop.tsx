import { useState } from 'react';
import './Desktop.scss';
import WindowModal from '../WindowModal';
import { useWindowStore } from '../../store/store';
import AboutMe from '../AboutMe';
import Resume from '../Resume';
import MySpace from '../MySpace';
import ContactMe from '../ContactMe';
import Mystery from '../Mystery';

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
  { title: 'contact me', id: 'CONTACT_ME', path: '/icons/contactme.png' },
  { title: '???', id: 'MYSTERY', path: '/icons/mystery.png' },
];

const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  ABOUT_ME: <AboutMe />,
  RESUME: <Resume />,
  MYSPACE: <MySpace />,
  CONTACT_ME: <ContactMe />,
  MYSTERY: <Mystery />,
};

function Desktop() {
  const { windows, openWindow, closeWindow } = useWindowStore();

  return (
    <div className={`${PARENT_CLASS}__container`}>
      <div className={`${PARENT_CLASS}__icons`}>
        {DESKTOP_ICONS.map((desktopIcon) => {
          return (
            <div className="icon" key={desktopIcon.title} onClick={() => openWindow(desktopIcon.id)}>
              <img src={desktopIcon.path} />
              <label>{desktopIcon.title}</label>
            </div>
          );
        })}
      </div>

      {windows.map((window) => (
        <WindowModal key={window.id} title={window.id} closeFn={() => closeWindow(window.id)}>
          {WINDOW_COMPONENTS[window.id]}
        </WindowModal>
      ))}

      <div className={`${PARENT_CLASS}__start-bar`}>
        <div className={`${PARENT_CLASS}__start-bar button`}>Start</div>
      </div>
    </div>
  );
}

export default Desktop;
