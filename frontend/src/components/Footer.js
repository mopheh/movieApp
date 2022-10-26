import React from "react"

function Footer() {
  return (
    <footer className="p-5 text-center">
      <h3>MovieHub</h3>{" "}
      <p>
        Here you can watch movies online for free in high quality without being
        bothered by advertisements. All series videos are hosted on a sharing
        website, provided by 3rd parties not affiliated with MovieHub or its
        server.
      </p>
      <span>
        Copyright {new Date().getFullYear()} © MovieHub. All Rights Reserved.
      </span>
    </footer>
  )
}

export default Footer
