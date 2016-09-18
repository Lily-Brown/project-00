<html>
<h1>Project 00 - Connect Four</h1>

<h2>Technical Requirements</h2>

<p>Per Class Guidelines, the application must:
<ul>
<li>Render a beautiful game in the browser and be easy to use</li>
<li>Design logic for winning & visually display which player won</li>
<li>Include separate HTML / CSS / JavaScript files</li>
<li>Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles</li>
<li>Use Javascript or jQuery for DOM manipulation</li>
<li>Use OOP Design (at least 2 custom Constructors)</li>
<li>Deploy your game online, where the rest of the world can access it using bitballoon</li>
<li>Use semantic markup for HTML and CSS (adhere to best practices)</li>
</ul>
</p>

<h2>Connect Four Basics</h2>
<p>Rules:
<ul>
<li>Connect Four has inherently two players</li>
<li>Each Player picks a Column and their Marker falls to the bottom-most row</li>
<li>The first Player to get Four in a Row either: horizonally, vertically or diagonally wins</li>
</ul>
</p>

<h2>My Connect Four Constructors</h2>

<h3>Game</h3>
<p>Properties:
<ul>
<li>winner -- stores winner of the current game</li>
<li>gameWon -- boolean that stores whether the game is in progress or not. If true, stops more moves from being made</li>
<li>players -- array of Players with associated key/value pairs of "player-name"/"color"</BR>
* first player in this array initalized with property isTurn=true</li>
</ul>
</p>
<p>Methods:
<ul>
<li>initalizeDisplayBoard -- initalizes display elements on page</li>
<li>makeMove -- Player tries to place Marker, Game checks for Win state</li>
</ul>
</p>

<h3>Board</h3>
<p>Properties:
<ul>
<li>board -- array that initalizes to be full of null values</li>
<li>space -- stores the value of the current space clicked on by the user</li>
</ul>
</p>
<p>Methods:
<ul>
<li>setSpace -- using the event, figure out which space on the board was clicked</li>
<li>isValidMove -- check for Valid Move and update Board.space</li>
<li>isWin -- check if there is a Win State</li>
<li>fourInARow -- game winning logic - four in a row</li>
<li>fourInAColumn - game winning logic - four in a column</li>
<li>fourRightDiagonally -- game winning logic - four right diagonally</li>
<li>fourLeftDiagonally -- game winning logic - four left diagonally</li>
<li>placeMarker - Player places a marker on the board, checks if move is valid, then updates view</li>
</ul>
</p>

<h3>Player</h3>
<p>Properties:
<ul>
<li>name -- Player's name for display</li>
<li>color -- color for board</li>
<li>isTurn -- inializes to false, keeps track of which Player's turn it is</li>
</ul>
<p>
<p>Methods:
<ul>
<li>myTurn -- changes player's turn State to true and Update View</li>
<li>endTurn -- changes player's turn State to false and Update View</li>
</ul>
</body>
</html>