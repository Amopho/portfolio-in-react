import Data from "../data.json";

import { FiArrowDownCircle } from "react-icons/fi";

const Home = () => {
  return (
    <div>
      <div className="home-images">
        <img
          className="home-image"
          src={`${import.meta.env.BASE_URL}img/Nice Tense.png`}
          alt="HOWOOO — a haul of joy for a green paw print"
        />
        <img
          className="home-image"
          src={`${import.meta.env.BASE_URL}${Data[0].img}`}
          alt="Pink glasses"
        />
      </div>
      <div className="hero-intro">
        <div className="hero-intro__content">
          <h1 className="section-heading">Hi, I am Allie!</h1>
          <p className="section-intro">
            I’m an expert in my field but I wouldn’t be where I am without those
            who've helped me along the way. That’s why I love connecting with
            like-minded people and using my passion and skills to make a
            difference.
          </p>
          <p className="section-intro">
            I am a P.h.D. in Animal Science specialized in animal nutrition and
            quality of feed materials. In 2020 I got a fantastic opportunity to
            join a web development training and as a result, it enabled me to add
            programming skills to my researcher's toolkit. Please, join me in my
            journey of making animal feed a better more balanced remedy for caring
            for our four-legged friends as well as helping our planet to have it
            easier with us humans living on her surface.
          </p>
          <a href="#about" className="section-action">Let's get to know us</a>
          <div className="go-down">
            <a href="#scroll" className="arrow-button" aria-label="Go to Story, Project and Mission">
              <span>
                <FiArrowDownCircle />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
