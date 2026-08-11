import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowStore } from "../../../store/store";
import { DesktopWindow } from "../../../types/types";
import "./WindowModal.scss";

const PARENT_CLASS = "WindowModal";

type WindowModalProps = {
  desktopWindow: DesktopWindow;
  children: React.ReactNode;
  closeFn: () => void;
};

function WindowModal({ desktopWindow, children, closeFn }: WindowModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { activeWindowId, setActiveWindow } = useWindowStore();

  // State to keep track of the popup's position
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [windowPosition, setWindowPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Ref to store the initial mouse position when dragging starts
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Ref to store the popup element
  // This is the element we are moving
  const dragRef = useRef<HTMLDivElement | null>(null);

  const isActive = activeWindowId === desktopWindow.id;

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
  const onMouseUp = useCallback(() => {
    setWindowPosition({ x: position.x, y: position.y });
    setIsDragging(false);
  }, [position]);

  // Function to handle the start of a drag event
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveWindow(desktopWindow.id);
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    startPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Effect to add and clean up event listeners for dragging
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <>
      {isDragging ? (
        <div
          className={`${PARENT_CLASS}__drag-box`}
          ref={dragRef}
          onClick={(e) => e.stopPropagation()} // to prevent event delegation to the overlay
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: desktopWindow.size.width,
            height: desktopWindow.size.height,
            top: desktopWindow.position.top,
            left: desktopWindow.position.left,
          }}
        >
          <div
            className={`${PARENT_CLASS}__drag-box-horizontal ${PARENT_CLASS}__checkerboard`}
          ></div>
          <div className={`${PARENT_CLASS}__drag-box-vertical-container`}>
            <div
              className={`${PARENT_CLASS}__drag-box-vertical ${PARENT_CLASS}__checkerboard`}
            ></div>
            <div
              className={`${PARENT_CLASS}__drag-box-vertical ${PARENT_CLASS}__checkerboard`}
            ></div>
          </div>
          <div
            className={`${PARENT_CLASS}__drag-box-horizontal ${PARENT_CLASS}__checkerboard`}
          ></div>
        </div>
      ) : null}
      <div
        className={`${PARENT_CLASS}__wrapper`}
        style={{
          transform: `translate(${windowPosition.x}px, ${windowPosition.y}px)`,
          width: desktopWindow.size.width,
          height: desktopWindow.size.height,
          zIndex: isActive ? 10 : 0,
          top: desktopWindow.position.top,
          left: desktopWindow.position.left,
        }}
        onClick={() => setActiveWindow(desktopWindow.id)}
      >
        <div className={`${PARENT_CLASS}__outer-container`}>
          <div className={`${PARENT_CLASS}__inner-container`}>
            <div
              className={`${PARENT_CLASS}__header`}
              style={{ backgroundColor: isActive ? "#0000a3" : "#808080" }}
            >
              <div
                className={`${PARENT_CLASS}__title`}
                onMouseDown={onMouseDown}
              >
                {desktopWindow.title}
              </div>
              <div className={`${PARENT_CLASS}__icons`}>
                <button
                  className={`${PARENT_CLASS}__icon-button ${PARENT_CLASS}__icon-button--min`}
                />
                <button
                  className={`${PARENT_CLASS}__icon-button ${PARENT_CLASS}__icon-button--max`}
                />
                <button
                  className={`${PARENT_CLASS}__icon-button ${PARENT_CLASS}__icon-button--close`}
                  onClick={closeFn}
                />
              </div>
            </div>
            {desktopWindow.variant === "compact" ? (
              <div>{children}</div>
            ) : (
              <>
                <div className={`${PARENT_CLASS}__outer-content`}>
                  <div className={`${PARENT_CLASS}__inner-content`}>
                    {children}
                  </div>
                </div>
                <div className={`${PARENT_CLASS}__footer`}>
                  (c) dani jaramillo*~*~
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WindowModal;
