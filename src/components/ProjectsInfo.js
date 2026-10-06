import React from "react";
import { Link } from "react-router-dom";

const ProjectsInfo = (props) => {
  const selectedItem = props.data.filter(
    (item) => String(item.id) === String(props.id)
  );

  const moreInfo = selectedItem.length
    ? selectedItem.map((item) => {
        const { id, productName, image } = item;
        return (
          <li key={id}>
            <h2>{productName} </h2>
            {image && <img src={image} alt={productName} />}
          </li>
        );
      })
    : "Sorry, something went wrong";

  return (
    <React.Fragment>
      <h3>Product farther infos</h3>
      <ul>{moreInfo}</ul>
      <Link to="/projects" style={{ textDecoration: "none" }}>
        Back
      </Link>
    </React.Fragment>
  );
};

export default ProjectsInfo;
