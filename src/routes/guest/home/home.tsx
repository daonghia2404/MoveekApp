// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./home.scss";
import { Banner } from "components/banner/banner";
import { Section } from "components/section/section";
import { GuestLayout } from "routes/guest/guest-layout";
import { Button } from "rsuite";
import { Poster } from "components/poster/poster";
import { Loader } from "components/loader/loader";

export const Home = () => {
  const API_KEY = "6434393eb85c0d17f40be4663df87e11";
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upComing, setUpComing] = useState([]);

  useEffect(() => {
    const getNowPlaying = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setNowPlaying(data.results));
    };
    getNowPlaying();

    const getUpComing = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setUpComing(data.results));
    };
    getUpComing();

    const getTrending = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setTrending(data.results));
    };
    getTrending();

    const getTopRated = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setTopRated(data.results));
    };
    getTopRated();

    const getPopular = async () => {
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setPopular(data.results));
    };
    getPopular();
  }, []);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <GuestLayout>
      <Loader loaded={loaded} />
      <div className="homepage">
        <Banner />
        <div className="homepage-main">
          <Section link="/section-detail/now-playing" title="Now Playing">
            {nowPlaying.map((item: any) => (
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

          <Section
            link="/section-detail/trending"
            background={
              nowPlaying.length !== 0 &&
              `http://image.tmdb.org/t/p/w1280${
                nowPlaying[Math.floor(Math.random() * nowPlaying.length)]
                  .backdrop_path
              }`
            }
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

          <Section link="/section-detail/top-rated" title="Top Rated">
            {topRated.map((item: any) => (
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

          <Section
            link="/section-detail/popular"
            background={
              nowPlaying.length !== 0 &&
              `http://image.tmdb.org/t/p/w1280${
                nowPlaying[Math.floor(Math.random() * nowPlaying.length)]
                  .backdrop_path
              }`
            }
            title="Popular"
          >
            {popular.map((item: any) => (
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

          <Section link="/section-detail/upcoming" title="Upcoming">
            {upComing.map((item: any) => (
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

          <div className="join-us">
            <div className="join-us-wrap container">
              <div className="row">
                <div className="col-lg-7 col-12">
                  <h2>Join Today</h2>
                  <p>
                    Get access to maintain your own{" "}
                    <em>custom personal lists</em>,{" "}
                    <em>track what you've seen</em> and search and filter for{" "}
                    <em>what to watch next</em> —regardless if it's in theatres,
                    on TV or available on popular streaming services like .{" "}
                  </p>
                  <Button color="red">SIGN UP</Button>
                </div>
                <div className="col-lg-5 col-12">
                  <ul>
                    <li>Enjoy TMDb ad free</li>
                    <li>Maintain a personal watchlist</li>
                    <li>
                      Filter by your subscribed streaming services and find
                      something to watch
                    </li>
                    <li>Log the movies and TV shows you've seen</li>
                    <li>Build custom lists</li>
                    <li>Contribute to and improve our database</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};
