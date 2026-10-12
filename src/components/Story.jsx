import Stories from "../story.json";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Story = () => {
  return (
    <div>
      <section className="story-container" id="scroll">
        {Stories.map((story) => {
          const button = (
            <Button as="a" variant="primary" href={story.link.href}>
              {story.link.label}
            </Button>
          );

          return (
            <Card key={story.id}>
              <Card.Img
                variant="top"
                src={`${import.meta.env.BASE_URL}${story.img}`}
                alt={story.title}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title className="text">
                  <h3>{story.heading}</h3>
                </Card.Title>
                <Card.Text as="div">
                  <p className="lead">{story.description}</p>
                </Card.Text>
                <div className="story-button">{button}</div>
              </Card.Body>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Story;
