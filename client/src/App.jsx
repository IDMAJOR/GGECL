import React, { useState, useEffect, useRef } from "react";

// Define audio constraints
const audioConstraints = {
  audio: true,
  video: false,
};

// Main GroupCall component
const App = () => {
  const [peerConnections, setPeerConnections] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [userId, setUserId] = useState(null); // Unique ID for each user

  const joinCall = () => {};
  return (
    <div>
      <button onClick={joinCall}>Join Call</button>

      {/* Display local audio */}
      <audio srcObject={localStream} autoPlay muted />

      {/* Display remote audio streams */}
      {Object.keys(remoteStreams).map((userId) => (
        <audio key={userId} srcObject={remoteStreams[userId]} autoPlay />
      ))}
    </div>
  );
};

export default App;
