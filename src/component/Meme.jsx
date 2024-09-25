import { useState } from "react";
import memeData from "../assets/memesData.js";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState(memeData);

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMemeData) => ({
      ...prevMemeData,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          className="form-input"
          type="text"
          placeholder="Top text"
          onChange={handleChange}
          name="topText"
        ></input>

        <input
          className="form-input"
          type="text"
          placeholder="Bottom text"
          onChange={handleChange}
          name="bottomText"
        ></input>

        <button onClick={getMemeImage} className="form-button">
          Get a new meme image 🖼
        </button>

        <div className="meme">
          <img className="meme-image" src={meme.randomImage} />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}

export default Meme;
