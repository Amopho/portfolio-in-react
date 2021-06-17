import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data from "../data.json";

const Home = () => {
  const [data, setData] = useState(Data);
  console.log(process.env);
  return (
    <Router>
      <img src={`${process.env.PUBLIC_URL}/${data[0].img}`} alt="Sushi" />
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
      <div class="section-button">
        <button>
          <a href="./contact.html"> Let's get to know us</a>
        </button>
      </div>
      <div class="go-down">
        <a href="#scroll" class="arrow-button">
          <span>
            <i class="fas fa-arrow-down"></i> IoArrowDownCircleSharp
          </span>
        </a>
      </div>
    </Router>
  );
};

export default Home;
