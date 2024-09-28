import { useState } from "react";
import Header from "./component/Header";
import Meme from "./component/Meme";
import WindowTracker from "./component/WindowTracker";

function App() {
  const [show, isSHow] = useState(true);

  function toggle() {
    isSHow((prevShow) => !prevShow);
  }

  return (
    <>
      <Header />
      <Meme />

      <br />
      <hr />
      <div className="container">
        <button className="window-button" onClick={toggle}>
          Toggle WindowTracker
        </button>
        {show && <WindowTracker />}
      </div>
    </>
  );
}

export default App;
