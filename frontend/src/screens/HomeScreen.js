import React, { useEffect, useState } from "react"
import MovieCarousel from "../components/MovieCarousel"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Row, Col } from "react-bootstrap"
import { Pagination } from "@mui/material"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"

function HomeScreen() {
  const [data, setData] = useState([])
  const [pages, setPages] = useState("")
  const { page: pageId, type, keyword } = useParams()
  const search_type = type ? type : "all"
  const [page, setPage] = useState(pageId)
  const navigate = useNavigate()

  const fetchMovies = async (page, type) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=235ba309beb6b48e95dc065bc6ac50cf&page=${
        page || 1
      }`
    )
    setData(data.results)
    setPages(data.total_pages)
  }
  const fetchKeyword = async (page, keyword) => {
    console.log(keyword)
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US&include_adult=true&query=${keyword}&page=${
        page || 1
      }`
    )

    setData(data.results)
    setPages(data.total_pages)
  }

  useEffect(() => {
    setPage(pageId)
    if (keyword) {
      fetchKeyword(page, keyword)
    } else {
      fetchMovies(page, search_type)
    }
  }, [pageId, page, search_type, keyword])

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
          <MovieCard data={data} pageId={pageId} />
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
