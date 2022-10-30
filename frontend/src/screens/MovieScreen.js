import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import ReactPlayer from "react-player"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image } from "react-bootstrap"
import { getMovieDetails } from "../action/movieAction"

function MovieScreen() {
  const dispatch = useDispatch()
  const [videoId, setVideoId] = useState("")
  const { id } = useParams()

  const movieDetails = useSelector((state) => state.movieDetails)
  const { loading, movie: details, error } = movieDetails

  const getTrailerId = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
    )

    data.results.map((result) => {
      if (
        (result.type === "Trailer" || result.type === "Teaser") &&
        result.official === true
      ) {
        setVideoId(result.key)
      }
      return ""
    })
  }

  useEffect(() => {
    dispatch(getMovieDetails(id))
    if (!videoId) {
      getTrailerId(id)
    }
  }, [id, dispatch, videoId])

  return (
    <>
      <Link className="btn btn-light mb-3" to="/">
        Go Back
      </Link>
      {loading || Object.keys(details).length === 0 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : Object.keys(details).length > 0 ? (
        <>
          <h1 className="movie-title mb-1"> {details.title} </h1>
          <div className="d-flex justify-content-between my-2 flex-xs-column align-items-center">
            <div className="details">
              <span>{details.release_date}</span>
              <span className="other">Movie</span>
              <span className="other">
                {details.runtime !== undefined && details.runtime} minutes
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
            <Col className="pr-lg-0 pr-md-0" lg={3} md={4} sm={6} xs={12}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                fluid
              />
            </Col>
            <Col lg={9} md={8} sm={6} xs={12} className="trailer">
              {videoId && (
                <ReactPlayer
                  playing={true}
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  loop={true}
                  width="100%"
                  height="100%"
                />
              )}
            </Col>
          </Row>
          <div className="overview">
            <h4>Overview</h4>
            {details.overview}
            <div className="my-1">
              <i>
                <strong>Languages: </strong>

                {details.spoken_languages.map((language, index) => (
                  <span key={index} className="mx-1">
                    {language.english_name}
                  </span>
                ))}
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Country: </strong>
                {details.production_countries.map((country, index) => (
                  <span key={index} className="mx-1">
                    {country.name},
                  </span>
                ))}
              </i>
            </div>
            <div className="my-1">
              <i>
                <strong>Production Companies: </strong>
                {details.production_companies.map((company, index) => (
                  <span key={index} className="mx-1">
                    {company.name},
                  </span>
                ))}
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
      ) : (
        ""
      )}
    </>
  )
}

export default MovieScreen
