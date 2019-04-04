// modules
import React from "react"
// components
import Buttons from './Buttons'

const isOperator = /[*/+-]/;
const hasDecimal = /[.]/;
const endsWithOperator = /[*/+-]$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curVal: 0,
      formula: "",
      evaluated: false,
      lastResult: ""
    }
    this.clearVal = this._clearVal.bind(this);
    this.typeNumbers = this._typeNumbers.bind(this);
    this.handleKeyDown = this._handleKeyDown.bind(this);
    this.performOp = this._performOp.bind(this);
    this.handleEquals = this._handleEquals.bind(this);
    this.handleDot = this._handleDot.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  _clearVal() {
    this.setState({
      curVal: 0,
      formula: "",
      lastResult: "",
      evaluated: false
    })
  }

  _typeNumbers(e, val) {
    // debugger;
    // this.setState({ evaluated: false });
    if (this.state.evaluated === true) {
      this.setState({
        curVal: val || e.target.value,
        formula: val || e.target.value,
        evaluated: false
      })
    } else if (
      (val || e.target.value) === 0 &&
      this.state.curVal === 0 &&
      this.state.formula === ""
    ) {
      this.setState({
        formula: 0
      })
    } else if (
      //if initial val was 0 but i want another digit to start my formula before clicking operator
      this.state.curVal === 0 &&
      this.state.formula === 0
    ) {
      this.setState({
        curVal: /(0[.0-9].*)$/.test(this.state.curVal)
          ? this.state.curVal + (val || e.target.value)
          : val || e.target.value,
        formula: /(0[.0-9].*)$/.test(this.state.curVal)
          ? this.state.curVal + (val || e.target.value)
          : val || e.target.value
      })
    } else {
      this.setState({
        curVal:
          this.state.curVal === "0" || isOperator.test(this.state.curVal)
            ? val || e.target.value
            : this.state.curVal + (val || e.target.value),
        formula:
          this.state.curVal === "0" && (val || e.target.value) === "0"
            ? this.state.formula
            : /([^.0-9]0)$/.test(this.state.formula)
            ? this.state.formula.slice(0, -1) + (val || e.target.value)
            : this.state.formula + (val || e.target.value)
      })
    }
  }

  _handleKeyDown(e) {
    let { key } = e;

    if (/\d/.test(key)) {
      e.preventDefault();
      this.typeNumbers(null, key);
    } else if (isOperator.test(key)) {
      e.preventDefault();
      this.performOp(key);
    } else if (key === ".") {
      e.preventDefault();
      this.handleDot();
    } else if (key === "Backspace") {
      e.preventDefault();
      this.clearVal();
    } else if (key === "Delete") {
      e.preventDefault();
      this.clearVal();
    }
    if (key === "Enter") {
      key = "=";
      e.preventDefault();
      this.handleEquals();
      console.log(key);
    }
  }

  _performOp(nextOperator) {
    if (this.state.evaluated) {
      this.setState({
        formula: this.state.lastResult + nextOperator,
        curVal: nextOperator,
        evaluated: false
      })
      console.log("performop here? nextOperator");
    } else {
      if (endsWithOperator.test(this.state.formula)) {
        this.setState({
          curVal: nextOperator,
          formula: this.state.formula.slice(0, -1) + nextOperator
        });
      } else {
        this.setState({
          curVal: nextOperator,
          formula: this.state.formula + nextOperator
        })
      }
    }
  }

  _handleEquals() {
    let form = this.state.formula;
    if (endsWithOperator.test(form)) {
      form = form.slice(0, -1);
    }
    form = form.replace(/x/g, "*").replace(/‑/g, "-");
    // eslint-disable-next-line
    let calcTotal = Math.round(100000000 * eval(form)) / 100000000;
    this.setState({
      curVal: calcTotal.toString(),
      formula: form.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + calcTotal,
      lastResult: calcTotal,
      evaluated: true
    })
    
  }

  _handleDot() {
    if (this.state.curVal === 0 && this.state.evaluated) {
      this.setState({
        curVal: "0.",
        formula: "0.",
        evaluated: false
      })
    } else if (isOperator.test(this.state.curVal)) {
      this.setState({
        curVal: "0.",
        formula: this.state.formula + "0."
      })
    } else if (!hasDecimal.test(this.state.curVal)) {
      this.setState({
        curVal: this.state.curVal + ".",
        formula: this.state.formula + "."
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="calc-container">
          <div className="header-wrapper">
            {" "}
            <div className="calc-name">Reactsio</div>
            <div className="solar">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="display-wrapper">
            <div className="formula">
              {String(this.state.formula).substring(0, 21)}
            </div>
            <div id="display" className="display">
              {String(this.state.curVal).substring(0, 15)}
            </div>
          </div>
          <Buttons
            clearVal={this.clearVal}
            typeNumbers={this.typeNumbers}
            performOp={this.performOp}
            handleEquals={this.handleEquals}
            handleDot={this.handleDot}
          />
        </div>
      </div>
    )
  }
}

export default App