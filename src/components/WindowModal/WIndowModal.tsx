import './WindowModal.scss';

const PARENT_CLASS = 'WindowModal';

type WindowModalProps = {
  open: boolean;
  children: React.ReactNode;
  title: string;
  closeFn: () => void;
};

function WindowModal({ open, children, title, closeFn }: WindowModalProps) {
  if (!open) return null;
  return (
    <div className={`${PARENT_CLASS}__wrapper`}>
      <div className={`${PARENT_CLASS}__outer-container`}>
        <div className={`${PARENT_CLASS}__inner-container`}>
          <div className={`${PARENT_CLASS}__header`}>
            {title}
            <div className={`${PARENT_CLASS}__header__icons`}>
              <button className="min" />
              <button className="max" />
              <button className="close" onClick={closeFn} />
            </div>
          </div>
          <div className={`${PARENT_CLASS}__outer-content`}>
            <div className={`${PARENT_CLASS}__inner-content`}>{children}</div>
          </div>
          <div className={`${PARENT_CLASS}__footer`}>(c) dani jaramillo*~*~</div>
        </div>
      </div>
    </div>
  );
}

export default WindowModal;
