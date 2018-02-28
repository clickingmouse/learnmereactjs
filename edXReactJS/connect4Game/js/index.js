
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
    { style: style },
    React.createElement(Circle, null)
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
    cells.push(React.createElement(Cell, null));
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
    rows.push(React.createElement(Row, null));
  }
  return React.createElement(
    "div",
    null,
    rows
  );
}

ReactDOM.render(React.createElement(Board, null), document.getElementById('root'));