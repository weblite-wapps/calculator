// modules
import React from "react"
import PropTypes from "prop-types"

class Buttons extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

  render() {
    const {
      clearVal, performOp, typeNumbers, handleDot, handleEquals,
    } = this.props

    return (
      <div className="buttons-wrapper">
        <button
          id="clear"
          className="buttons"
          value="AC"
          onClick={clearVal}
        >
          AC
        </button>
        <button
          id="divide"
          className="buttons"
          value="/"
          onClick={() => performOp("/")}
        >
          /
        </button>
        <button
          id="multiply"
          className="buttons"
          value="x"
          onClick={() => performOp("*")}
        >
          x
        </button>
        <button
          id="seven"
          className="buttons nbr"
          value="7"
          onClick={typeNumbers}
        >
          7
        </button>
        <button
          id="eight"
          className="buttons nbr"
          value="8"
          onClick={typeNumbers}
        >
          8
        </button>
        <button
          id="nine"
          className="buttons nbr"
          value="9"
          onClick={typeNumbers}
        >
          9
        </button>
        <button
          id="subtract"
          className="buttons"
          value="-"
          onClick={() => performOp("-")}
        >
          -
        </button>
        <button
          id="four"
          className="buttons nbr"
          value="4"
          onClick={typeNumbers}
        >
          4
        </button>
        <button
          id="five"
          className="buttons nbr"
          value="5"
          onClick={typeNumbers}
        >
          5
        </button>
        <button
          id="six"
          className="buttons nbr"
          value="6"
          onClick={typeNumbers}
        >
          6
        </button>
        <button
          id="add"
          className="buttons"
          value="+"
          onClick={() => performOp("+")}
        >
          +
        </button>
        <button
          id="one"
          className="buttons nbr"
          value="1"
          onClick={typeNumbers}
        >
          1
        </button>
        <button
          id="two"
          className="buttons nbr"
          value="2"
          onClick={typeNumbers}
        >
          2
        </button>
        <button
          id="three"
          className="buttons nbr"
          value="3"
          onClick={typeNumbers}
        >
          3
        </button>
        <button
          id="zero"
          className="buttons nbr"
          value="0"
          onClick={typeNumbers}
        >
          0
        </button>
        <button
          id="decimal"
          className="buttons"
          value="."
          onClick={handleDot}
        >
          .
        </button>
        <button
          id="equals"
          className="buttons"
          value="="
          onClick={handleEquals}
        >
          =
        </button>
      </div>
    )
  }
}

Buttons.propTypes = {
  clearVal: PropTypes.func.isRequired,
  performOp: PropTypes.func.isRequired,
  typeNumbers: PropTypes.func.isRequired,
  handleDot: PropTypes.func.isRequired,
  handleEquals: PropTypes.func.isRequired,
}

export default Buttons