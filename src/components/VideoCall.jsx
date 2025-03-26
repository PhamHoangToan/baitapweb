import React, { useEffect, useRef, useState } from "react";

const VideoCall = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);
  const [jitsi, setJitsi] = useState(null);

  useEffect(() => {
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        startMeeting();
      } else {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => startMeeting();
        document.body.appendChild(script);
      }
    };

    const startMeeting = () => {
      if (jitsi) return; // Tránh tạo trùng Jitsi Meet API

      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        width: "100%",
        height: 500,
        parentNode: jitsiContainerRef.current,
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsi(api);
    };

    loadJitsiScript();

    return () => {
      if (jitsi) {
        jitsi.dispose();
      }
    };
  }, [roomName]);

  return <div ref={jitsiContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default VideoCall;