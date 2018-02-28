var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//sections
// - circle (game piece)
//- cell
// row of cells
// gameboard
//game message
// restart button

// step 1  create the circle/ game piece to be used
function Circle(props) {
  var style = {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "100%",
    paddingTop: "98%"
  };
  return React.createElement("div", { style: style });
}
/*
ReactDOM.render(
<Circle/>, document.getElementById('root')

)
*/
function Cell(props) {
  var style = {
    height: 50,
    width: 50,
    border: "1px solid black",
    backgroundColor: "yellow"
  };
  return React.createElement(
    "div",
    { style: style, onClick: function onClick() {
        return props.handleClick(props.row, props.col);
      } },
    React.createElement(Circle, { cell: props.cell })
  );
}
/*
ReactDOM.render(
<Cell/>, document.getElementById('root')
)
*/

//Step3 create compoent to represenet row of cells
function Row(props) {
  var style = {
    display: "flex"
  };
  var cells = [];
  for (var i = 0; i < 7; i++) {
    cells.push(React.createElement(Cell, { key: i, cell: props.cells[i], row: props.row, col: i, handleClick: props.handleClick }));
  }

  return React.createElement(
    "div",
    { style: style },
    cells
  );
}
/*
ReactDOM.render(
<Row />, document.getElementById('root')
)*/

//step 4 Create gameboard
function Board(props) {
  var rows = [];
  for (var i = 5; i >= 0; i--) {
    // pass state to row; also clickhandler
    //rows.push(<Row/>)

    rows.push(React.createElement(Row, { key: i, row: i, cells: props.cells[i], handleClick: props.handleClick }));
  }
  return React.createElement(
    "div",
    null,
    rows
  );
}
/*
ReactDOM.render(<Board/>, document.getElementById('root'))
*/

//Create Game "component" to encompass everything
///////////////////////////////////////////////////
//Game State - keep track of everything
//- which player's turn, boolean black/red
//- cell's piece state: empty, black, red
// - which player won: none, black, red
// empty grid w/ 2D array ...??

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    //initiall state settings with 2D array
    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    var cells = [];
    for (var i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0));
    } // for loop
    // initial state of constructor
    _this.state = { player: false, cells: cells, winner: 0 };
    return _this;
  } // end constructor(props)

  //  handleClick method


  _createClass(Game, [{
    key: "handleClick",
    value: function handleClick() {
      console.log('clicked');
      this.handleClick = this.handleClick.bind(this);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          " Blacks Turn"
        ),
        React.createElement(Board, { cells: this.state.cell, handleClick: this.handleClick }),
        React.createElement(
          "button",
          null,
          "Restart"
        )
      );
    }
  }]);

  return Game;
}(React.Component); // class

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));