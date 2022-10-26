import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./bootstrap.min.css"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import "./App.css"
import HomeScreen from "./screens/HomeScreen"
import MovieScreen from "./screens/MovieScreen"
import TvScreen from "./screens/TvScreen"
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3 mt-5">
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/:type/page/:page" element={<HomeScreen />} />
            <Route path="/movie/:id" element={<MovieScreen />} />
            <Route path="/search/:keyword/:page" element={<HomeScreen />} />
            <Route path="/movie" element={<MovieScreen />} />
            <Route path="/tv/:id" element={<TvScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
