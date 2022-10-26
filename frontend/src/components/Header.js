import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav } from "react-bootstrap"
import SearchBox from "./Search"
const Header = () => {
  return (
    <header>
      <Navbar
        bg="dark"
        className="px-5"
        expand="lg"
        fixed="top"
        variant="dark"
        collapseOnSelect
      >
        <>
          <LinkContainer to="/">
            <Navbar.Brand>MovieHub</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/tv/page/1">
                <Nav.Link>Tv Shows</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/movie/page/1">
                <Nav.Link>Movies</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/popular">
                <Nav.Link>Popular</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/now">
                <Nav.Link>Showing Now</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
    </header>
  )
}

export default Header
