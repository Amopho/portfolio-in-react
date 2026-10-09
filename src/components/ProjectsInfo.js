import React from "react";

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
            {image && (
              <img
                src={`${process.env.PUBLIC_URL || ""}/${image}`}
                alt={productName}
              />
            )}
          </li>
        );
      })
    : <li>Sorry, something went wrong</li>;

  return (
    <React.Fragment>
      <h3>Product farther infos</h3>
      <ul>{moreInfo}</ul>
      <a href={`${process.env.PUBLIC_URL || ""}/#projects`} style={{ textDecoration: "none" }}>
        Back
      </a>
    </React.Fragment>
  );
};

export default ProjectsInfo;
