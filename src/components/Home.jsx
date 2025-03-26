import React, { useState } from "react";
import VideoCall from "./VideoCall";

function Home() {
  const [roomName, setRoomName] = useState(null);

  const createRoom = () => {
    const randomRoom = "room-" + Math.floor(Math.random() * 10000);
    setRoomName(randomRoom);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Jitsi Video Call</h1>
      {!roomName ? (
        <button onClick={createRoom}>Create & Join Video Call</button>
      ) : (
        <VideoCall roomName={roomName} />
      )}
    </div>
  );
}

export default Home;