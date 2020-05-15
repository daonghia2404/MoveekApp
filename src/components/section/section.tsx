import React from "react";
import "./section.scss";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

import AliceCarousel from "react-alice-carousel";

type Props = {
  title: string;
  children: any;
  style?: any;
  background?: any;
  link: string;
};

export const Section = ({
  style,
  title,
  children,
  background,
  link,
}: Props) => {
  return (
    <div style={style} className="section">
      {background && (
        <div className="background">
          <img src={background} alt="" />
        </div>
      )}
      <div className="section-wrap container">
        <h2 className="title">
          {title}{" "}
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={link}
          >
            SEE ALL
          </Link>
        </h2>
        <div className="section-movie">
          <AliceCarousel
            responsive={{ 0: { items: 6 } }}
            mouseTrackingEnabled={false}
            touchTrackingEnabled={false}
            dotsDisabled
          >
            {children}
          </AliceCarousel>
        </div>
      </div>
    </div>
  );
};
