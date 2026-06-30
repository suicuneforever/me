import { useCallback, useEffect, useRef, useState } from 'react';
import './WindowModal.scss';

const PARENT_CLASS = 'WindowModal';

type WindowModalProps = {
  children: React.ReactNode;
  title: string;
  closeFn: () => void;
};

function WindowModal({ children, title, closeFn }: WindowModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  // State to keep track of the popup's position
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Ref to store the initial mouse position when dragging starts
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Ref to store the popup element
  // This is the element we are moving
  const dragRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startPosition.current.x,
        y: e.clientY - startPosition.current.y,
      });
    },
    [isDragging],
  );

  // Function to handle the end of a drag event
  const onMouseUp = () => {
    setWindowPosition({ x: position.x, y: position.y });
    setIsDragging(false);
  };

  // Function to handle the start of a drag event
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    startPosition.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // Effect to add and clean up event listeners for dragging
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <>
      {isDragging ? (
        <div
          className={`${PARENT_CLASS}__drag-box`}
          ref={dragRef}
          onClick={(e) => e.stopPropagation()} // to prevent event delegation to the overlay
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          <div className="hoz-drag checkerboard"></div>
          <div className="vert-drag-container">
            <div className="vert-drag checkerboard"></div>
            <div className="vert-drag checkerboard"></div>
          </div>
          <div className="hoz-drag checkerboard"></div>
        </div>
      ) : null}
      <div
        className={`${PARENT_CLASS}__wrapper`}
        style={{ transform: `translate(${windowPosition.x}px, ${windowPosition.y}px)` }} //to move out popup
      >
        <div className={`${PARENT_CLASS}__outer-container`}>
          <div className={`${PARENT_CLASS}__inner-container`}>
            <div className={`${PARENT_CLASS}__header`} onMouseDown={onMouseDown}>
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
    </>
  );
}

export default WindowModal;
