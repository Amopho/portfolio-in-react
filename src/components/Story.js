import React, { useState } from "react";
import Projects from "../data.json";
import Stories from "../story.json";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Story = () => {
  const [projects, setProjects] = useState(Projects);
  console.log(process.env);
  return (
    <div>
      {/* <!-- About me part --> */}
      <section className="story-container" id="scroll">
        <Card style={{ width: "30%" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[0].img}`}
            alt="Hand with soaking water"
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[0].heading}`}</h3>
            </Card.Title>
            <Card.Text as="div">
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[0].description}`}</p>
            </Card.Text>
            {/* <div className="story-button"> */}
            <Button as={Link} variant="primary" to="/contact">
              Let's get to know us
            </Button>
            {/* </div> */}
          </Card.Body>
        </Card>
        <Card style={{ width: "30%" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[1].img}`}
            alt="Hand with soaking water"
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[1].heading}`}</h3>
            </Card.Title>
            <Card.Text as="div">
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[1].description}`}</p>
            </Card.Text>
            <div className="story-button">
              <Button as={Link} variant="primary" to="/contact">
                Let's get to know us
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/${Stories[2].img}`}
            alt="Hand with soaking water"
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title className="text">
              <h3>{`${process.env.PUBLIC_URL}${Stories[2].heading}`}</h3>
            </Card.Title>
            <Card.Text as="div">
              <p className="lead">{`${process.env.PUBLIC_URL}${Stories[2].description}`}</p>
            </Card.Text>
            <div className="story-button">
              <Button as={Link} variant="primary" to="/blog">
                Read More
              </Button>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default Story;
