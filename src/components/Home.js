import React, { useState } from "react";
import Data from "../data.json";
import Story from "./Story";
import { Link } from "react-router-dom";

import { FiArrowDownCircle } from "react-icons/fi";

const Home = () => {
  const [data, setData] = useState(Data);
  console.log(process.env);
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/${data[0].img}`}
        alt="Pink glasses"
      />
      <div className="text">
        <h1>Hi, I am Alina!</h1>
        <p>
          I’m an expert in my field but I wouldn’t be where I am without those
          who've helped me along the way. That’s why I love connecting with
          like-minded people and using my passion and skills to make a
          difference.
        </p>
        <br />
        <p>
          I am a P.h.D. in Animal Science specialized in animal nutrition and
          quality of feed materials. In 2020 I got a fantastic opportunity to
          join a web development training and as a result, it enabled me to add
          programming skills to my researcher's toolkit. Please, join me in my
          journey of making animal feed a better more balanced remedy for caring
          for our four-legged friends as well as helping our planet to have it
          easier with us humans living on her surface.
        </p>
      </div>
      <div className="section-button">
        <button>
          <Link to="contact"> Let's get to know us</Link>
        </button>
      </div>
      <div className="go-down">
        <a href="#scroll" className="arrow-button">
          <span>
            <FiArrowDownCircle />
          </span>
        </a>
      </div>
      <Story />
    </div>
  );
};

export default Home;
