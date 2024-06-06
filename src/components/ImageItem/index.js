import './index.css'

const ImageItem = props => {
  const {details, onClickImage} = props

  const {id, thumbnailUrl} = details

  const onClickEachImage = () => {
    onClickImage(id)
  }

  return (
    <li key={id} className="imageListItem">
      <button className="imgBtn" onClick={onClickEachImage} type="button">
        <img src={thumbnailUrl} className="thumbnailImg" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
