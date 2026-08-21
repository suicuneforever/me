import { useState } from "react";
import { DESKTOP_WINDOWS } from "../../../constants/constants";
import { useSceneStore, View } from "../../../store/sceneStore";
import { useWindowStore } from "../../../store/windowStore";
import AboutMe from "../../apps/AboutMe";
import ContactMe from "../../apps/ContactMe";
import Resume from "../../apps/Resume";
import Steam from "../../apps/Steam";
import Clock from "../../general/Clock";
import DesktopIcon from "../DesktopIcon";
import WindowModal from "../WindowModal";
import "./Desktop.scss";

const PARENT_CLASS = "Desktop";

const WINDOW_COMPONENTS: Record<string, React.ReactNode> = {
  ABOUT_ME: <AboutMe />,
  RESUME: <Resume />,
  STEAM: <Steam />,
  CONTACT_ME: <ContactMe />,
};

function Desktop() {
  const { windows, activeWindowId, openWindow, setActiveWindow, closeWindow } =
    useWindowStore();
  const { setView } = useSceneStore();
  const [showStartMenu, setShowStartMenu] = useState(false);

  return (
    <div
      className={`${PARENT_CLASS}__container`}
      onClick={(e) => {
        e.stopPropagation();
        //TODO
        showStartMenu && setShowStartMenu(false);
      }}
    >
      <div className={`${PARENT_CLASS}__icons`}>
        {DESKTOP_WINDOWS.map((window) => (
          <DesktopIcon key={window.title} window={window} onOpen={openWindow} />
        ))}
      </div>

      {windows.map((window) => (
        <WindowModal
          key={window.id}
          desktopWindow={window}
          onClose={closeWindow}
        >
          {WINDOW_COMPONENTS[window.id]}
        </WindowModal>
      ))}

      <div className={`${PARENT_CLASS}__start-bar`}>
        <div
          className={`${PARENT_CLASS}__start-button ${showStartMenu ? PARENT_CLASS + "__start-button-pressed" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setShowStartMenu(!showStartMenu);
          }}
        >
          Start
        </div>
        {showStartMenu && (
          <div className={`${PARENT_CLASS}__start-menu`}>
            <div className={`${PARENT_CLASS}__start-menu-banner`}>
              DaniJaramillo
            </div>
            <div className={`${PARENT_CLASS}__start-menu-buttons`}>
              <div className={`${PARENT_CLASS}__start-menu-divider`}></div>
              <div
                className={`${PARENT_CLASS}__start-menu-button`}
                onClick={(e) => {
                  e.stopPropagation();
                  setView(View.Room);
                }}
              >
                <img src="/icons/shutdown.png" />
                <span>
                  <u>S</u>hut Down...
                </span>
              </div>
            </div>
          </div>
        )}
        {windows.map((window) =>
          window.id === activeWindowId ? (
            <div
              className={`${PARENT_CLASS}__window-button ${PARENT_CLASS}__window-button--active`}
              key={window.id}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setActiveWindow(window.id);
              }}
            >
              <div className={`${PARENT_CLASS}__checkerboard`}>
                <img
                  src={DESKTOP_WINDOWS.find((w) => w.id === window.id)?.icon}
                  alt={window.title}
                />
                {window.title}
              </div>
            </div>
          ) : (
            <div
              className={`${PARENT_CLASS}__window-button`}
              key={window.id}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setActiveWindow(window.id);
              }}
            >
              <img
                src={DESKTOP_WINDOWS.find((w) => w.id === window.id)?.icon}
                alt={window.title}
              />
              {window.title}
            </div>
          ),
        )}
        <div className={`${PARENT_CLASS}__time`}>
          <Clock />
        </div>
      </div>
    </div>
  );
}

export default Desktop;
