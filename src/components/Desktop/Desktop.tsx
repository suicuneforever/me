import { useState } from 'react';
import './Desktop.scss';
import WindowModal from '../WindowModal';

const PARENT_CLASS = 'Desktop';

type Icon = {
  title: string;
  path: string;
};

const DESKTOP_ICONS: Icon[] = [
  { title: 'about me', path: 'src/assets/icons/aboutme.png' },
  { title: 'resume', path: 'src/assets/icons/resume.png' },
  { title: 'myspace', path: 'src/assets/icons/myspace.png' },
  { title: 'contact me', path: 'src/assets/icons/contactme.png' },
  { title: '???', path: 'src/assets/icons/mystery.png' },
];

function Desktop() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={`${PARENT_CLASS}__container`}>
      <div className={`${PARENT_CLASS}__icons`}>
        {DESKTOP_ICONS.map((desktopIcon) => {
          return (
            <div className="icon" key={desktopIcon.title} onClick={() => setModalOpen(true)}>
              <img src={desktopIcon.path} />
              <label>{desktopIcon.title}</label>
            </div>
          );
        })}
      </div>

      <WindowModal open={modalOpen} title="My Resume" closeFn={() => setModalOpen(false)}>
        <p>resume</p>
      </WindowModal>
      <div className={`${PARENT_CLASS}__start-bar`}>
        <div className={`${PARENT_CLASS}__start-bar button`}>Start</div>
      </div>
    </div>
  );
}

export default Desktop;
