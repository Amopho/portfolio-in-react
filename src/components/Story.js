import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "../data.json";
import Stories from "../story.json";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Story = () => {
  const [projects, setProjects] = useState(Projects);
  console.log(process.env);
  return (
    <Router>
      {/* <!-- About me part --> */}
      <section class="story-container" id="scroll">
        {/* 
        <div class="my-story">
          <div class="photo">
            <img
              src={`${process.env.PUBLIC_URL}/${Stories[0].img}`}
              alt="Home university"
            />
          </div>
          <div class="text">
            <h3>My Story</h3>
            <p>
              Hi there! As an animal scientist, I have written my Ph.D. thesis
              in this field. During my candidature, I have faced multiple
              challenges in researching animal physiology of nutrition, as well
              as the nutritional value of feeds and raw materials. I also had
              the privilege of teaching students of animal breeding and
              veterinary on domestic animals' diverse nutritional systems. Here
              is to present and share what I mastered during my academic life.
              And I’ve been learning ever since.
            </p>
            <div class="story-button">
              <button>
                <a href="./contact.html">Let's get to know us</a>
              </button>
            </div>
          </div>
        </div> */}

        {/* <div class="my-story">
          <div class="photo">
            <img
              src={`${process.env.PUBLIC_URL}/${Stories[1].img}`}
              alt="Chemical analysis"
            />
          </div>
          <div class="text">
            <h3>My Project</h3>
            <p>
              I'm always working on something. Most of the time, it's getting
              results for my clients. But sometimes, it's a personal project
              that lets me explore new concepts and ideas. Check out my attempt
              of Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis repellendus, distinctio accusantium quam maxime
              consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Consectetur aut voluptates provident? Quibusdam, pariatur
              aspernatur et officia fuga enim placeat voluptate neque sit
              corrupti iusto architecto sunt id dolore autem.
            </p>
            <div class="story-button">
              <button>
                <a href="./contact.html">Let's get to know us</a>
              </button>
            </div>
          </div>
        </div> */}
        <Card style={{ width: "25vh" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[0].img}`}
            alt="Hand with soaking water"
            fluid
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[0].heading}`}</h3>
            </Card.Title>
            <Card.Text>
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[0].description}`}</p>
            </Card.Text>
            <div class="story-button">
              <Button variant="primary">
                <a href="./contact.html">Let's get to know us</a>
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "25vh" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[1].img}`}
            alt="Hand with soaking water"
            fluid
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[1].heading}`}</h3>
            </Card.Title>
            <Card.Text>
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[1].description}`}</p>
            </Card.Text>
            <div class="story-button">
              <Button variant="primary">
                <a href="./contact.html">Let's get to know us</a>
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "25vh" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[2].img}`}
            alt="Hand with soaking water"
            fluid
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[2].heading}`}</h3>
            </Card.Title>
            <Card.Text>
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[2].description}`}</p>
            </Card.Text>
            <div class="story-button">
              <Button variant="primary">
                <a href="./contact.html">Read More</a>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </section>
    </Router>
  );
};

export default Story;
