import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { actions as quizSettingsActions } from "../redux/reducers/quizSettingsSlice"
import categories from "../categories.json"
import "../styleSheets/category-page/category-page.css"

const CategoryPage = ({ isCategorySet }) => {
  // const [toggleView, setToggleView] = useState();
  const dispatch = useDispatch()
  const updateCategoryInStore = (key) => {
    dispatch(quizSettingsActions.setCategory(key))
  }
  const selectCategory = (key) => {
    updateCategoryInStore(key)
    isCategorySet(true)
  }
  const categoryElements = categories.map((category) => {
    return (
      <div
        onClick={() => selectCategory(category.key)}
        className="category-item"
        key={category.key}
      >
        {/* <div className="category-item__border-underlay">
          <div className="category-item__content">{category.value}</div>
        </div> */}
        {category.value}
      </div>
    )
  })
  // let toggleView = false
  const changeCategoryView = (e) => {
    const target = e.currentTarget
    let toggle = false
    let view = toggle ? "list" : "tile"

    return () => {
      target.classList.remove(view)
      toggle = !toggle
      target.classList.add(view)
      // return view
    }
    // toggleView = !toggleView
  }
  // ${toggleView ? "list" : "tile"}
  return (
    <div className="category-page">
      <div className={`category-grid ${toggleView ? "list" : "tile"}`}>
        {categoryElements}
      </div>
      <div
        className="listViewChangeButton"
        onClick={(e) => changeCategoryView}
      ></div>
    </div>
  )
}

CategoryPage.propTypes = {
  isCategorySet: PropTypes.func,
}

export default CategoryPage
