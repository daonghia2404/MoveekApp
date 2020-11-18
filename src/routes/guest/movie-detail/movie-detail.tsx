// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./movie-detail.scss";

import { Section } from "components/section/section";
import { Poster } from "components/poster/poster";
import { Loader } from "components/loader/loader";
import { GuestLayout } from "routes/guest/guest-layout";
import {
  VoteIcon,
  PeoplesIcon,
  StarFillIcon,
  StarIcon,
  StarHalfIcon,
  WebIcon,
  CountryIcon,
  CalendarIcon,
  ClockIcon,
  PriceIcon,
  PopularityIcon,
  GridIcon,
} from "components/icons/icons";
import MockupPoster from "assets/images/poster-mockup.jpg";

import AliceCarousel from "react-alice-carousel";
import { Button, Pagination } from "rsuite";
import classNames from "classnames";
import IMDb from "assets/images/imdb.png";

import LogoPanel from "assets/images/logo-panel.png";
import User from "assets/images/avatar-user.png";

export const MovieDetail = (params: any) => {
  const ID = params.match.params.id;
  const API_KEY = "6434393eb85c0d17f40be4663df87e11";

  const [activePage, setActivePage] = useState(1);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [review, setReview] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    const getDetailMovie = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/${ID}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setDetail(data));
    };
    getDetailMovie();

    const getVideoMovie = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${ID}/videos?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setVideo(data));
    };
    getVideoMovie();

    const getTrending = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setTrending(data.results));
    };
    getTrending();
    window.scrollTo(0, 0);
  }, [ID]);

  useEffect(() => {
    const getReviewMovie = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${ID}/reviews?api_key=${API_KEY}&page=${activePage}`
      )
        .then((res) => res.json())
        .then((data) => setReview(data));
    };
    getReviewMovie();
  }, [ID, activePage]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, [ID]);

  const handleSelect = (eventKey: any) => {
    setActivePage(eventKey);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <GuestLayout>
      <Loader loaded={loaded} />
      {detail.length !== 0 && (
        <div className="movie-detail">
          <div className="movie-banner">
            <div className="movie-backdrop">
              <img
                src={`https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`}
                alt=""
              />
            </div>
            <div className="banner-wrap container">
              <div className="movie-poster">
                {detail.poster_path === null ? (
                  <img src={MockupPoster} alt="" />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                    alt=""
                  />
                )}
              </div>
              <div className="movie-buttons">
                <Button color="red">WATCH NOW</Button>
                <Button color="blue">TRAILER</Button>
                <Button color="green">DOWNLOAD</Button>
              </div>
            </div>
          </div>

          <div className="movie-content">
            <div className="movie-content-wrap container">
              <h1 className="title">{detail.title || detail.name}</h1>
              <ul className="movie-info">
                <li>
                  <strong>Genres: </strong>
                  <GridIcon />
                  {detail.genres.length !== 0 ? (
                    detail.genres.map((item: any) => (
                      <span key={item.id}>{item.name}</span>
                    ))
                  ) : (
                    <span>No Genres</span>
                  )}
                </li>
                <li>
                  <strong>Rating: </strong>
                  <VoteIcon />
                  {Math.floor(detail.vote_average / 2) < 1 && <StarIcon />}
                  {Math.floor(detail.vote_average / 2) >= 1 && <StarFillIcon />}
                  {Math.floor(detail.vote_average / 2) >= 2 && <StarFillIcon />}
                  {Math.floor(detail.vote_average / 2) >= 3 && <StarFillIcon />}
                  {Math.floor(detail.vote_average / 2) >= 4 && <StarFillIcon />}
                  {Math.floor(detail.vote_average / 2) >= 5 && <StarFillIcon />}

                  {(detail.vote_average / 2) %
                    Math.floor(detail.vote_average / 2) >=
                    0.5 && <StarHalfIcon />}
                </li>
                <li>
                  <strong>IMDb: </strong>
                  <img src={IMDb} style={{ width: `40px` }} alt="" />{" "}
                  {detail.vote_average}
                </li>
                <li>
                  <strong>Votes: </strong> <PeoplesIcon />
                  {detail.vote_count}
                </li>
                <li>
                  <strong>Popularity: </strong> <PopularityIcon />
                  {detail.popularity}
                </li>
                <li>
                  <strong>Homepage: </strong> <WebIcon />{" "}
                  {detail.homepage === "" ? (
                    <p>No Website</p>
                  ) : (
                    <a
                      href={`${detail.homepage}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {detail.homepage}
                    </a>
                  )}
                </li>
                <li>
                  <strong>Release Date: </strong> <CalendarIcon />{" "}
                  {detail.release_date}
                </li>
                <li>
                  <strong>Status: </strong>{" "}
                  <span
                    className={classNames("status", {
                      released: detail.status === "Released",
                    })}
                  >
                    {detail.status}
                  </span>
                </li>
                <li>
                  <strong>Runtime: </strong> <ClockIcon /> {detail.runtime}{" "}
                  (Min)
                </li>
                <li>
                  <strong>Budget: </strong> <PriceIcon />
                  {detail.budget === 0
                    ? "No Public"
                    : numberWithCommas(detail.budget) + "$"}
                </li>
                <li>
                  <strong>Revenue: </strong> <PriceIcon />
                  {detail.revenue === 0
                    ? "No Public"
                    : numberWithCommas(detail.revenue) + "$"}
                </li>
                <li>
                  <strong>Country: </strong> <CountryIcon />
                  {detail.production_countries.length > 0
                    ? detail.production_countries.map(
                        (item: any, index: any) => (
                          <span key={index}>{item.name}</span>
                        )
                      )
                    : "No"}
                </li>
              </ul>
              <div className="overview">
                <h2 className="title">Overview</h2>
                <p>{detail.overview}</p>
              </div>
              <div className="trailer">
                <h2 className="title">Trailer</h2>
                {video.length !== 0 &&
                  (video.results.length === 0 ? (
                    <p className="text-center">NO VIDEO</p>
                  ) : (
                    <iframe
                      title={video.results[0].name}
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${video.results[0].key}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ))}
              </div>
              <div className="production-companies">
                <h2 className="title">Production Companies</h2>
                {detail.length !== 0 &&
                detail.production_companies.length === 0 ? (
                  <p className="text-center">NO COMPANIES</p>
                ) : (
                  <AliceCarousel
                    autoPlayInterval={4000}
                    autoPlay
                    responsive={{ 0: { items: 4 } }}
                    mouseTrackingEnabled
                    dotsDisabled
                    buttonsDisabled
                  >
                    {detail.production_companies.map((item: any) => (
                      <div key={item.id} className="companies-item">
                        <div className="companies-logo">
                          {item.logo_path === null ? (
                            <img src={LogoPanel} alt="" />
                          ) : (
                            <img
                              src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                              alt=""
                            />
                          )}
                        </div>
                        <h4>{item.name}</h4>
                      </div>
                    ))}
                  </AliceCarousel>
                )}
              </div>
              {review.length !== 0 && (
                <div className="reviews">
                  <h2 className="title">Reviews</h2>
                  <div className="reviews-items">
                    {review.results.length === 0 ? (
                      <p className="text-center">NO REVIEWS.</p>
                    ) : (
                      review.results.map((item: any, index: any) => (
                        <div key={index} className="review-item">
                          <img src={User} alt="" />
                          <div className="content">
                            <h6 className="name">{item.author}</h6>
                            <p>{item.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="pagination d-flex justify-content-end">
                    <Pagination
                      prev
                      next
                      size="lg"
                      ellipsis={true}
                      maxButtons={5}
                      pages={review.total_results}
                      activePage={activePage}
                      onSelect={handleSelect}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div></div>
      {trending.length !== 0 && (
        <Section
          link="/section-detail/trending"
          isLoading={trending.length === 0 ? true : false}
          title="Trending"
        >
          {trending.map((item: any) => (
            <Poster
              key={item.id}
              id={item.id}
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              name={item.title || item.name}
              genreID={item.genre_ids}
              vote={item.vote_average}
            />
          ))}
        </Section>
      )}
    </GuestLayout>
  );
};
