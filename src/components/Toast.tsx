import React, { useState, useEffect } from "react";
import closeIcon from "../icons/close-icon.svg";

interface ToastProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  icon?: JSX.Element;
  timeout?: number;
}

const Toast: React.FC<ToastProps> = ({
  text,
  bgColor,
  textColor,
  icon,
  timeout,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => setVisible(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed top-10 m-6 p-4 rounded-xl ${bgColor} ${textColor} flex items-center`}
      role="alert"
    >
      {icon && <div className="mr-3">{icon}</div>}
      <span className="flex-grow">{text}</span>
      <button className="right-2 top-2" onClick={() => setVisible(false)}>
        {closeIcon}
      </button>
    </div>
  );
};

export default Toast;
