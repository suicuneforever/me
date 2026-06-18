import { useState } from 'react';
import './Desktop.scss';
import WindowModal from '../WindowModal';

const PARENT_CLASS = 'Desktop';

function Desktop() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={`${PARENT_CLASS}__container`}>
      <div className={`${PARENT_CLASS}__icons`}>
        <div className="icon" onClick={() => setModalOpen(true)}>
          <div className="image" />
          <label>My Resume</label>
        </div>
      </div>

      <WindowModal open={modalOpen}>
        <p>resume</p>
      </WindowModal>
      <div className={`${PARENT_CLASS}__startBar`} />
    </div>
  );
}

export default Desktop;
