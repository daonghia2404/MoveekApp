// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./section-detail.scss";
import { GuestLayout } from "routes/guest/guest-layout";
import { Input, Button } from "rsuite";
import { Pagination } from "rsuite";
import { Poster } from "components/poster/poster";
import { Loader } from "components/loader/loader";
import { useHistory } from "react-router-dom";
import { searching, pageTo } from "redux/action";
import { connect } from "react-redux";

const SectionDetail = ({ searchValue, dispatch, match, currentPage }) => {
  let history = useHistory();
  const type = match.params.type;
  const API_KEY = "6434393eb85c0d17f40be4663df87e11";
  const [sectionAPI, setSectionAPI] = useState([]);
  const [activePage, setActivePage] = useState(currentPage);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState(searchValue);

  const handleSelect = (eventKey: any) => {
    setLoaded(false);
    setActivePage(eventKey);
    dispatch(pageTo(eventKey));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getSectionAPIs = async () => {
      if (type === "trending") {
        await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => setSectionAPI(data));
      } else if (type === "search") {
        await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${activePage}`
        )
          .then((res) => res.json())
          .then((data) => setSectionAPI(data));
      } else {
        await fetch(
          `https://api.themoviedb.org/3/movie/${type.replace(
            // eslint-disable-next-line no-useless-escape
            /\-/,
            "_"
          )}?api_key=${API_KEY}&page=${activePage}`
        )
          .then((res) => res.json())
          .then((data) => setSectionAPI(data));
      }
    };
    getSectionAPIs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, type, searchValue]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, [activePage]);

  const onChange = (value) => {
    setSearch(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoaded(false);
    if (search !== "") {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${1}`
      )
        .then((res) => res.json())
        .then((data) => setSectionAPI(data));
      history.push("/section-detail/search");
      dispatch(searching(search));
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  };

  return (
    <GuestLayout>
      <Loader loaded={loaded} />
      <div className="search-banner">
        <div className="banner-wrap container">
          <h1 className="title">Welcome</h1>
          <h4>
            Millions of movies, TV shows and people to discover. Explore now.
          </h4>
          <form onSubmit={onSubmit} action="#">
            <Input
              onChange={onChange}
              value={search}
              placeholder="Search for a movie, tv show, person,...."
            />
            <Button color="red">Search</Button>
          </form>
        </div>
      </div>

      <div className="search-result">
        <div className="search-result-wrap container">
          {/* eslint-disable-next-line no-useless-escape */}
          <h2 className="title">{type.replace(/\-/, " ")}</h2>
          <div className="row">
            {!sectionAPI.errors &&
              sectionAPI.length !== 0 &&
              sectionAPI.results.map((item: any) => (
                <Poster
                  key={item.id}
                  id={item.id}
                  image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  name={item.title || item.name}
                  genreID={item.genre_ids}
                  vote={item.vote_average}
                />
              ))}
          </div>
          {sectionAPI.errors ? (
            <p className="text-center">NO RESULTS WERE FOUND.</p>
          ) : (
            type !== "trending" && (
              <div className="pagination d-flex justify-content-center">
                <Pagination
                  prev
                  last
                  next
                  first
                  size="lg"
                  ellipsis={true}
                  maxButtons={5}
                  boundaryLinks={true}
                  pages={sectionAPI.total_pages}
                  activePage={activePage}
                  onSelect={handleSelect}
                />
              </div>
            )
          )}
        </div>
      </div>
    </GuestLayout>
  );
};

const mapStateToProps = (state: any) => ({
  searchValue: state.SearchText,
  currentPage: state.CurrentPage,
});

export default connect(mapStateToProps)(SectionDetail);
