import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../../features/notificationSlice";
import "./Notification.css";

const Notification = () => {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.notification);

  const sendNotification = (type, message) => {
    dispatch(setNotification({ type, message }));
  };

  useEffect(() => {
    if (type && message) {
      notification[type]({
        message: type.charAt(0).toUpperCase() + type.slice(1),
        description: message,
        duration: 3,
      });

      dispatch(clearNotification());
    }
  }, [type, message, dispatch]);

  return (
    <div>
      <button
        onClick={() =>
          sendNotification("success", "Uğurla əməliyyat tamamlandı!")
        }
      >
        Uğur bildirişi
      </button>
      <button onClick={() => sendNotification("error", "Xəta baş verdi!")}>
        Səhv bildirişi
      </button>
      <button
        onClick={() => sendNotification("warning", "Bu, xəbərdarlıqdır!")}
      >
        Xəbərdarlıq
      </button>
      <button onClick={() => sendNotification("info", "Məlumat bildirişi!")}>
        Məlumat bildirişi
      </button>
    </div>
  );
};

export default Notification;
