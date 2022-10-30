import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MovieCarousel from "../components/MovieCarousel"
import { useParams, useNavigate } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { Pagination } from "@mui/material"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"
import { listMovies } from "../action/movieAction"
import Loader from "../components/Loader"
import Message from "../components/Message"

function HomeScreen() {
  const dispatch = useDispatch()

  const { page: pageId, type, keyword } = useParams()
  const search_type = type ? type : "all"
  const [page, setPage] = useState(pageId)

  const navigate = useNavigate()

  const movieList = useSelector((state) => state.movieList)
  const { loading, movies, error } = movieList
  const pages = useSelector((state) => state.pages)

  useEffect(() => {
    dispatch({
      type: "API_KEY_SUCCESS",
      payload: "235ba309beb6b48e95dc065bc6ac50cf",
    })
    setPage(pageId)
    if (keyword) {
      dispatch(listMovies(page, search_type, keyword))
    } else {
      dispatch(listMovies(page, search_type, keyword))
    }
  }, [pageId, dispatch, page, search_type, keyword])

  const handleChange = (event, value) => {
    if (keyword) {
      navigate(`/search/${keyword}/${value}`)
    } else {
      navigate(`/${search_type}/page/${value}`)
    }
  }

  return (
    <>
      {!pageId && (
        <Row>
          <Col lg={12} sm={12}>
            <MovieCarousel />
          </Col>
        </Row>
      )}
      <section className="latest">
        <h3>
          {keyword
            ? `Search results for '${keyword}'`
            : search_type === "all" || search_type === "movie"
            ? "Latest Movies"
            : "Latest Series"}
        </h3>
        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error} </Message>
          ) : (
            <MovieCard data={movies} pageId={pageId} />
          )}
        </Row>
        {!pageId ? (
          <Link to={`/${search_type}/page/1`} className="btn btn-primary">
            Show more...
          </Link>
        ) : (
          <Pagination
            count={Number(pages)}
            className="pagination"
            color="primary"
            onChange={handleChange}
            page={Number(pageId)}
          />
        )}
      </section>
    </>
  )
}

export default HomeScreen
