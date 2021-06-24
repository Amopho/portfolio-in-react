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
        <Card style={{ width: "30%" }}>
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
            {/* <div class="story-button"> */}
            <Button variant="primary">
              <a href="./contact.html">Let's get to know us</a>
            </Button>
            {/* </div> */}
          </Card.Body>
        </Card>
        <Card style={{ width: "30%" }}>
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
        <Card style={{ width: "30%" }}>
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
