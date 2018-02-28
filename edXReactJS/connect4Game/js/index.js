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
  //change color based on state
  var color = "white";
  if (props.cell == 1) {
    color = "black";
  } else if (props.cell == 2) {
    color = "red";
  }

  var style = {
    backgroundColor: color,
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
  return (
    //<div style = {style}>
    //      <Circle/>
    React.createElement(
      "div",
      { style: style, onClick: function onClick() {
          return props.handleClick(props.row, props.col);
        } },
      React.createElement(Circle, { cell: props.cell })
    )
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

    //cells.push(<Cell/>)
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
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  } // end constructor(props)

  // find availableRow method
  // to see the piece drop down to bottom
  // start bottom row of colum and return indx of empty cell


  _createClass(Game, [{
    key: "findAvailableRow",
    value: function findAvailableRow(col) {
      for (var i = 0; i < 6; i++) {
        if (this.state.cells[i][col] == 0) {
          return i;
        }
      }
      return -1;
    } // findAvailableRow
    // below really lacks psuedo codes...

  }, {
    key: "checkDiagonal",
    value: function checkDiagonal(row, col) {
      //find right and left tops
      var c = this.state.cells;
      var val = this.state.player ? 2 : 1;
      var rR = row;
      var cR = col;
      while (rR < 5 && cR < 6) {
        rR++;
        cR++;
      }

      while (rR >= 3 && cR >= 3) {
        if (c[rR][cR] == val && c[rR - 1][cR - 1] == val && c[rR - 2][cR - 2] == val && c[rR - 3][cR - 3] == val) {
          return 1;
        }
        rR--;
        cR--;
      }

      var rL = row;
      var cL = col;

      while (rL < 5 && cL > 0) {
        rL++;
        cL--;
      }

      while (rL >= 3 && cL <= 3) {
        if (c[rL][cL] == val && c[rL - 1][cL + 1] == val && c[rL - 2][cL + 2] == val && c[rL - 3][cL + 3] == val) {
          return 1;
        }
        rL--;
        cL++;
      }
      return 0;
    }
  }, {
    key: "checkHorizontal",
    value: function checkHorizontal(row, col) {
      var c = this.state.cells;
      var i = 6;
      var val = this.state.player ? 2 : 1;

      while (i >= 3) {
        if (c[row][i] == val && c[row][i - 1] == val && c[row][i - 2] == val && c[row][i - 3] == val) {
          return 1;
        }
        i--;
      }
      return 0;
    }
  }, {
    key: "checkVertical",
    value: function checkVertical(row, col) {
      var c = this.state.cells;
      var i = row;
      var val = this.state.player ? 2 : 1;

      if (i >= 3) {
        if (c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val) {
          return 1;
        }
      }
      return 0;
    }
  }, {
    key: "checkVictory",
    value: function checkVictory(row, col) {
      return this.checkVertical(row, col) || this.checkHorizontal(row, col) || this.checkDiagonal(row, col);
    }

    //  handleClick method
    // (add row),col, to get details
    // step 5, addd alternate player functionality

  }, {
    key: "handleClick",
    value: function handleClick(row, col) {
      var _this2 = this;

      if (this.state.winner) return;
      console.log('row:' + row + "| col:" + col);
      console.log(this.state.cells);
      //shallow copy of 2D array
      var temp = [];
      for (var i = 0; i < 6; i++) {
        temp.push(this.state.cells[i].slice());
        //console.log(temp)
      } // for
      //updatae temp state base on row
      var newRow = this.findAvailableRow(col);
      temp[newRow][col] = this.state.player ? 1 : 2;

      // set value based on player this.state.player?1:2
      //temp[row][col]=this.state.player?1:2
      // add alternate player functionality::player:!this.state.player
      // call back for winner
      this.setState({ cells: temp, player: !this.state.player }, function () {
        if (_this2.checkVictory(newRow, col) > 0) {
          console.log("win");
          _this2.setState({ winner: _this2.state.player ? 2 : 1 });
        }
      });
      console.log(temp);
    } //handleClick

    //restart method

  }, {
    key: "restart",
    value: function restart() {
      var cells = [];
      for (var i = 0; i < 6; i++) {
        cells.push(new Array(7).fill(0));
      }
      this.setState({ player: false, cells: cells, winner: 0 });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          " ",
          this.state.player ? "Black Turn" : "Red Turn"
        ),
        React.createElement(Board, { cells: this.state.cells, handleClick: this.handleClick }),
        React.createElement(
          "button",
          { onClick: function onClick() {
              return _this3.restart();
            } },
          "Restart"
        )
      );
    }
  }]);

  return Game;
}(React.Component); // class

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));