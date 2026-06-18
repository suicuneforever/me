import './WindowModal.scss';

const PARENT_CLASS = 'WindowModal';

type WindowModalProps = {
  open: boolean;
  children: React.ReactNode;
};

function WindowModal({ open, children }: WindowModalProps) {
  if (!open) return null;
  return (
    <div className={`${PARENT_CLASS}__wrapper`}>
      <div className={`${PARENT_CLASS}__outer-container`}>
        <div className={`${PARENT_CLASS}__inner-container`}>
          <div className={`${PARENT_CLASS}__outer-content`}>
            <div className={`${PARENT_CLASS}__inner-content`}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WindowModal;
