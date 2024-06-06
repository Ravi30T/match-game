import {Component} from 'react'

import NavBar from '../NavBar'

import TabItem from '../TabItem'

import ImageItem from '../ImageItem'

import GameResult from '../GameResult'

import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsList: props.tabsList,
      imagesList: props.imagesList,
      activeTabId: props.tabsList[0].tabId,
      scoreVal: 0,
      timer: 60,
      gameOver: false,
      randomImageUrl: props.imagesList[0].imageUrl,
      randomImgID: props.imagesList[0].id,
    }
  }

  componentDidMount() {
    this.updatingTimer()
  }

  onClickTabItem = value => {
    this.setState({activeTabId: value})
  }

  filterEachCategoryImages = () => {
    const {imagesList, activeTabId} = this.state

    const filterAllImages = imagesList.filter(
      each => each.category === activeTabId,
    )

    return filterAllImages
  }

  findRandomImage = () => {
    const {imagesList} = this.state

    const getRandomNum = Math.ceil(Math.random() * imagesList.length)

    const randomImageId = imagesList[getRandomNum].id

    const findRandomImage = imagesList.filter(each => each.id === randomImageId)

    const randomImage = findRandomImage[0].imageUrl

    this.setState({randomImgID: randomImageId, randomImageUrl: randomImage})
  }

  updatingTimer = () => {
    this.newCount = setInterval(() => {
      const {timer} = this.state
      console.log(timer === 0)

      if (timer > 0) {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
        }))
      } else if (timer === 0) {
        console.log('stop')
        clearInterval(this.newCount)
        this.setState(prevState => ({
          gameOver: !prevState.gameOver,
        }))
      }
    }, 1000)
  }

  onClickRandomImg = id => {
    const {randomImgID} = this.state

    if (randomImgID === id) {
      this.setState(
        prevState => ({
          scoreVal: prevState.scoreVal + 1,
        }),
        this.findRandomImage,
      )
    } else {
      clearInterval(this.newCount)
      this.setState(prevState => ({
        gameOver: !prevState.gameOver,
      }))
    }
  }

  onClickRestartGame = () => {
    const {tabsList} = this.props

    this.findRandomImage()
    this.setState({
      scoreVal: 0,
      timer: 60,
      gameOver: false,
      activeTabId: tabsList[0].tabId,
    })

    this.updatingTimer()
  }

  render() {
    const {
      scoreVal,
      timer,
      tabsList,
      activeTabId,
      gameOver,
      randomImageUrl,
    } = this.state

    const filterImages = this.filterEachCategoryImages()

    return (
      <>
        <div className="bgContainer">
          <div>
            <ul className="navBarList">
              <NavBar score={scoreVal} timer={timer} />
            </ul>
          </div>

          {gameOver ? (
            <div className="gameOverContainer">
              <GameResult
                score={scoreVal}
                onClickRestart={this.onClickRestartGame}
              />
            </div>
          ) : (
            <div className="mainContainer">
              <div className="randomImagesContainer">
                <img src={randomImageUrl} className="randomImg" alt="match" />
              </div>

              <ul className="tabsList">
                {tabsList.map(each => (
                  <TabItem
                    key={each.tabId}
                    tabId={each.tabId}
                    name={each.displayText}
                    onClickTab={this.onClickTabItem}
                    isActive={each.tabId === activeTabId}
                  />
                ))}
              </ul>

              <div className="imagesContainer">
                <ul className="imagesListContainer">
                  {filterImages.map(each => (
                    <ImageItem
                      key={each.id}
                      details={each}
                      onClickImage={this.onClickRandomImg}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Home
