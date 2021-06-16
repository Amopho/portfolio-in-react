import React from "react";
import { Link } from "react-router-dom";

const ProjectsInfo = (props) => {
  const selectedItem = props.data.filter((item) => item.id == props.id);
  console.log(selectedItem);

  const moreInfo = selectedItem.length
    ? selectedItem.map((item) => {
        const { id, productName, icon, image, inventory, price } = item;
        return (
          <li key={id}>
            <h2>{productName} </h2>
            <img>{image}</img>
          </li>
        );
      })
    : "Sorry, something went wrong";

  return (
    <React.Fragment>
      <h3>Product farther infos</h3>
      <ul>{moreInfo}</ul>
      <Link to="/product" style={{ textDecoration: "none" }}>
        Back
      </Link>
    </React.Fragment>
  );
};

export default ProjectsInfo;
