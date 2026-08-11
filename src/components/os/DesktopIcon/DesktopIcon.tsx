import { memo } from "react";
import { DesktopWindow } from "../../../types/types";
import "./DesktopIcon.scss";

const PARENT_CLASS = "DesktopIcon";

interface DesktopIconProps {
  window: DesktopWindow;
  onOpen: (window: DesktopWindow) => void;
}

function DesktopIcon({ window, onOpen }: DesktopIconProps) {
  return (
    <div
      className={`${PARENT_CLASS}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(window)}
    >
      <img src={window.icon} alt={window.title} />
      <label>{window.title}</label>
    </div>
  );
}

export default memo(DesktopIcon);
