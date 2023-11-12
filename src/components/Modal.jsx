import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import "../styleSheets/modal/modal.css"
import { useDispatch } from "react-redux"
import { actions as quizSettingsActions } from "../redux/reducers/quizSettingsSlice"

const Modal = ({ setDefault }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const defaultButtonHandler = () => {
    dispatch(quizSettingsActions.setToDefault())
    // setDefault(true)
  }
  return (
    <div className="modal">
      <div className="modal__description">
        <p>
          Your Quiz settings are not set, please go back and choose your
          settings or click on default button for applying the default settings.
        </p>
      </div>
      <div className="modal__btns">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={defaultButtonHandler}>Default</button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  setDefault: PropTypes.func,
}

export default Modal
