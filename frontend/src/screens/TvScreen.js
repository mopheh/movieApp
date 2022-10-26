import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image } from "react-bootstrap"

function TvScreen() {
  const [details, setDetails] = useState(0)
  const [videoId, setVideoId] = useState("")
  const { id } = useParams()
  console.log(details)

  const getMovieDetails = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
    )
    setDetails(data)
  }

  const getTrailerId = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
    )

    data.results.map((result) => {
      if (result.type === "Trailer" && result.official === true) {
        setVideoId(result.key)
      }
      return ""
    })
  }
  useEffect(() => {
    if (id) {
      getTrailerId(id)
      getMovieDetails(id)
      getTrailerId(id)
    }
  }, [id])

  return (
    <>
      {details && (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <h1 className="movie-title mb-0"> {details.name} </h1>
          <small className="mb-2 small-text">
            {details.last_episode_to_air === null
              ? `Season ${details.number_of_seasons}`
              : `Season ${details.last_episode_to_air.season_number} Episode ${details.last_episode_to_air.episode_number}`}
          </small>
          <div className="d-flex justify-content-between my-2 align-items-center">
            <div className="details">
              <span>{details.last_air_date}</span>{" "}
              <span className="other">Series</span>{" "}
              <span className="other">
                {details.last_episode_to_air === null
                  ? details.next_episode_to_air.runtime
                  : details.last_episode_to_air.runtime}{" "}
                minutes
              </span>
            </div>
            <div className="genres">
              {details.genres.map((genre) => (
                <span key={genre.id} className=" mx-1 genre-btn">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <Row>
            <Col className="pr-0" lg={3}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                fluid
              />
            </Col>
            <Col lg={9}>
              <ReactPlayer
                playing={true}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                loop={true}
                width="100%"
                height="100%"
              />
            </Col>
          </Row>
          <div className="overview">
            <h4>Overview</h4>
            {details.overview}
            <div className="my-1">
              <i>
                <strong>Languages: </strong>

                {details.spoken_languages.map((language, index) => (
                  <span className="mx-1">
                    {language.english_name}
                    {index === details.spoken_languages.length - 1 ? "" : ","}
                  </span>
                ))}
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Country: </strong>
                {details.production_countries.map((country, index) => (
                  <span>
                    {country.name}{" "}
                    {index === details.production_countries.length - 1
                      ? ""
                      : ","}
                  </span>
                ))}
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Production Companies: </strong>
                {details.production_companies.map((company, index) => (
                  <span className="mx-1">
                    {company.name}
                    {index === details.production_companies.length - 1
                      ? ""
                      : ","}
                  </span>
                ))}
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Next Episode Air: </strong>
                <span className="mx-1">
                  {details.next_episode_to_air === null
                    ? "Nil"
                    : details.next_episode_to_air.air_date}
                </span>
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Status: </strong>
                {details.status}
              </i>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TvScreen
