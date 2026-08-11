import { DESKTOP_WINDOWS } from "../../../constants/constants";
import { useWindowStore } from "../../../store/store";
import AboutMe from "../../apps/AboutMe";
import ContactMe from "../../apps/ContactMe";
import Resume from "../../apps/Resume";
import Steam from "../../apps/Steam";
import Clock from "../../general/Clock";
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

  return (
    <>
      <div>NOTE: THIS WEBSITE IS CURRENTLY A WORK IN PROGRESS</div>
      <div className={`${PARENT_CLASS}__container`}>
        <div className={`${PARENT_CLASS}__icons`}>
          {DESKTOP_WINDOWS.map((window) => {
            return (
              <div
                className={`${PARENT_CLASS}__icon`}
                key={window.title}
                onClick={() => openWindow(window)}
              >
                <img src={window.icon} />
                <label>{window.title}</label>
              </div>
            );
          })}
        </div>

        {windows.map((window) => (
          <WindowModal
            key={window.id}
            desktopWindow={window}
            closeFn={() => closeWindow(window.id)}
          >
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
                  <img
                    src={DESKTOP_WINDOWS.find((w) => w.id === window.id)?.icon}
                  />
                  {window.title}
                </div>
              </div>
            ) : (
              <div
                className={`${PARENT_CLASS}__window-button`}
                key={window.id}
                onClick={() => setActiveWindow(window.id)}
              >
                <img
                  src={DESKTOP_WINDOWS.find((w) => w.id === window.id)?.icon}
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
    </>
  );
}

export default Desktop;
