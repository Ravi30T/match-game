import './index.css'

const TabItem = props => {
  const {tabId, name, onClickTab, isActive} = props

  const onClickEachTab = () => {
    onClickTab(tabId)
  }

  const tabActive = isActive ? 'activeTab' : ''

  return (
    <li key={tabId} className="listItem">
      <button
        className={`tabBtn ${tabActive}`}
        type="button"
        onClick={onClickEachTab}
      >
        {name}
      </button>
    </li>
  )
}

export default TabItem
