// @ts-igrone
// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./banner.scss";
import { Button } from "rsuite";
import { Carousel } from "rsuite";
import { Link } from "react-router-dom";

export const Banner = () => {
  const API_KEY = "6434393eb85c0d17f40be4663df87e11";
  const [topFiveTrending] = useState([]);
  useEffect(() => {
    const getTrending = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i < 5; i++) {
            topFiveTrending.push(
              data.results[Math.floor(Math.random() * data.results.length)]
            );
          }
        });
    };
    getTrending();
  }, [topFiveTrending]);

  return (
    <div className="home-banner">
      <div className="overlay">
        <h2>Welcome back!</h2>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime</h3>
        <Link to="/section-detail/search">
          {" "}
          <Button color="red">DISCOVER NOW</Button>
        </Link>
      </div>
      {topFiveTrending.length !== 0 && (
        <Carousel
          placement="bottom"
          shape="dot"
          autoplay
          autoplayInterval={5000}
        >
          {topFiveTrending.map((item: any) => (
            <img
              key={item.id}
              src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
              alt=""
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};
