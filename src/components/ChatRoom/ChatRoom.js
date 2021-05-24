import "./ChatRoomStyle.css";
import "firebase/firestore";
import firebase from "../../firebase";
import { useRef, useState } from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import FetchVideoStream from "./FetchVideoStream";

const fireStore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const ChatRoom = () => {
  const [callButton, setCallButton] = useState(true);
  const [answerButton, setAnswerButton] = useState(true);
  const [webcamButton, setWebcamButton] = useState(false);
  const [hangupButton, setHangupButton] = useState(true);
  const [callInput, setCallInput] = useState("");

  const remoteVideoRef = useRef(null);
  const webcamVideoRef = useRef(null);

  return (
    <div className="ChatRoom">
      <h2>We are in the ChatRoom</h2>
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video ref={webcamVideoRef} autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video ref={remoteVideoRef} autoPlay playsInline></video>
        </span>
      </div>

      <button
        onClick={() =>
          FetchVideoStream(
            localStream,
            remoteStream,
            pc,
            webcamVideoRef,
            remoteVideoRef,
            setCallButton,
            setAnswerButton,
            setWebcamButton
          )
        }
        disabled={webcamButton}
      >
        Start webcam
      </button>
      <h2>2. Create a new Call</h2>
      <button
        onClick={() => {
          CreateRoom(fireStore, pc, setHangupButton, setCallInput);
        }}
        disabled={callButton}
      >
        Create Call (offer)
      </button>

      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>

      <input
        value={callInput}
        onChange={(event) => setCallInput(event.target.value)}
      />
      <button
        onClick={() => JoinRoom(callInput, pc, fireStore)}
        disabled={answerButton}
      >
        Answer
      </button>

      <h2>4. Hangup</h2>

      <button
        onClick={() => {
          const stream = webcamVideoRef.current.srcObject;
          const tracks = stream.getTracks();

          tracks.forEach(function (track) {
            track.stop();
          });
          webcamVideoRef.current.srcObject = null;
          remoteVideoRef.current.srcObject = null;
          localStream = null;
          remoteStream = null;
        }}
        //disabled={hangupButton}
      >
        Hangup
      </button>
    </div>
  );
};

export default ChatRoom;
