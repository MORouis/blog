function Layout({ children }) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="listing">Listing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="articles">Articles</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <main>{children}</main>
      </>
    )
  }
export default Layout