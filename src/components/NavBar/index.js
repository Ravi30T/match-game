import './index.css'

const NavBar = props => {
  const {score, timer} = props

  return (
    <nav className="navContainer">
      <li className="nav-list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          className="websiteLogo"
          alt="website logo"
        />
      </li>

      <div className="score-timer-Container">
        <li className="nav-list-item">
          <div className="scoreContainer">
            <p className="scoreHeading">
              Score: <span className="score"> {score} </span>
            </p>
          </div>
        </li>

        <li className="nav-list-item">
          <div className="timerContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              className="timerLogo"
              alt="timer"
            />
            <p className="timer"> {timer} sec </p>
          </div>
        </li>
      </div>
    </nav>
  )
}

export default NavBar
