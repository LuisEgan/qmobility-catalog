import React, { useState } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import "./styles.scss";

interface ICard {
  imgSource: string;
  title: string;
  description: string;
}

const EVECard = (props: ICard) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { imgSource, title, description } = props;

  return (
    <div className="card-container flex justify-center">
      <Card
        hoverable
        style={{ width: 180 }}
        cover={(
          <img
            alt="eVe"
            src={imgSource}
            style={isLoaded ? { opacity: 1 } : { opacity: 0, height: "100px" }}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

EVECard.defaultProps = {};

export default EVECard;
