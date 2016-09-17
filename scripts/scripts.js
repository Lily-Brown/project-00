$(document).ready(function() {

	// On click, if Game is still in session, send Board the space and make move
	function handleEvent(event){
		if(!newGame.gameWon) {
			gameBoard.setSpace(event);
			newGame.makeMove(event,gameBoard);
		}
	}
	
	// On Reset, re-initalize everything
	function resetGame(event) {
		$('#wrapper').empty(); // Clears old board
		newGame = new Game(2); // Initalizes game with 2 players
		newGame.initalizeDisplayBoard(); // Adds div HTML to page
		gameBoard = new Board();
		newGame.players[0].color="purple";
		newGame.players[1].color="blue";
		$('h1').html("CONNECT 4!  ");
		$('h1').removeAttr("id");
		$('.box').on('click',handleEvent);	
		$('#resetButton').on('click',resetGame);
	}	

	// Game Constructor
	// Should initialize first player's isTurn=true;
	function Game(numberOfPlayers) {
		this.players=[];
		this.winner;
		this.gameWon=false;
		for(var i=0;i<numberOfPlayers;i++){
			this.players[i]= new Player();
		}
		this.players[0].isTurn=true;		
	}

	// Creates HTML board on page
	Game.prototype.initalizeDisplayBoard = function() {
		for(var i=0;i<6;i++) {
		  var rowId="starter"+i;
		  var element="<div class='headbox "+rowId+" row_"+(i+1)+"''></div>"; 
		  $('#wrapper').append(element);
		  for(var j=0;j<7;j++) {
		  	 var rowElement="<div class='box row_"+(i+1)+" col_"+(j+1)+"'></div>";
		  	 newRowId=".starter"+i;
		  	 $(newRowId).append(rowElement);
		  }
		}
	};

	// Player tries to place Marker, Game checks for Win state
	Game.prototype.makeMove = function(event,gameBoard){
		var nextTurn;
		if(this.players[0].isTurn) {
			nextTurn = gameBoard.placeMarker(event,this.players[0]);
			if(nextTurn) {
				this.players[1].myTurn();
				this.players[0].endTurn();
			}
		}
		else {
			nextTurn = gameBoard.placeMarker(event,this.players[1]);
			if(nextTurn){
				this.players[0].myTurn();
				this.players[1].endTurn();
			}
		}
		if (gameBoard.isWin()) {
			var color=this.winner;
			this.gameWon=true;
			$('h1').html(color.toUpperCase()+" WINS!  ");
			$('h1').attr("id",color+"Text");
		}
	}

	// Board Constructor
	function Board() {
		this.board=[];
		this.space;
		// Initalizing board to array of null values
		for(var i=0;i<7;i++) {
		  this.board[i]=[];
		  for(var j=0;j<6;j++) {
		     this.board[i][j]= null;
		  }
		}
	}

	// Using the event, figure out which space on the board was clicked
	Board.prototype.setSpace = function(event){
		var toParse = event.target.className;
		var row = toParse.substring((toParse.indexOf("row_"))+4,(toParse.indexOf("row_")+5))
		var col = toParse.substring((toParse.indexOf("col"))+4,(toParse.indexOf("col_")+5))
		this.space = [row-1, col-1];
	}

	// Check for Valid Move and update Board.space
	Board.prototype.isValidMove = function() {
		var row=this.space[0];
		var col=this.space[1];
		// If space is empty
		if (this.board[col][row]==null) {
			//If space is not in the bottom row
			if(row!=5) {
				// Check that spot below is not null
				if(this.board[col][row+1]==null) {
					// Move down rows checking for non-null value
					for(var i=row+1;i<6;i++){
						// Update Board.space to be lowest position in this column that isn't null
						if(this.board[col][i]!=null) {	
							this.space[0]=i-1;
							return true;
						}
						else if(i==5){
							this.space[0]=5;
						}
					}
					return true;
				}

			}
			return true; 
		}
		// If space is not empty, Not a Valid Move
		else {
			return false;
		}
	}

	// Check if there is a Win State
	Board.prototype.isWin = function() {
		if(this.fourInARow()||this.fourInAColumn()||this.fourLeftDiagonally()||this.fourRightDiagonally()) {
			return true;
		}
		else {
			return false;
		}
	}

	// Game winning logic - four in a row
	Board.prototype.fourInARow = function() {
		for(row=0; row<7;row++){
			for(col=0;col<3;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col+1][row]) &&
		           (this.board[col][row] == this.board[col+2][row]) &&
		           (this.board[col][row] == this.board[col+3][row])) {
		               newGame.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four in a column
	Board.prototype.fourInAColumn = function() {
		for(row=0; row<3;row++){
			for(col=0;col<7;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col][row+1]) &&
		           (this.board[col][row] == this.board[col][row+2]) &&
		           (this.board[col][row] == this.board[col][row+3])) {
		               newGame.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four right diagonally
	Board.prototype.fourRightDiagonally = function() {
		for(row=0; row<3;row++){
			for(col=0;col<4;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col+1][row+1]) &&
		           (this.board[col][row] == this.board[col+2][row+2]) &&
		           (this.board[col][row] == this.board[col+3][row+3])) {
		               newGame.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four left diagonally
	Board.prototype.fourLeftDiagonally = function() {
		for(row=0; row<3;row++){
			for(col=3;col<7;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col-1][row+1]) &&
		           (this.board[col][row] == this.board[col-2][row+2]) &&
		           (this.board[col][row] == this.board[col-3][row+3])) {
		               newGame.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Player places a marker on the board
	Board.prototype.placeMarker = function(event,player){
		// If Valid move
		if(this.isValidMove(this.space)) {
			// Set space to player's color
			this.board[this.space[1]][this.space[0]] = player.color;
			// Update the view to be the correct player's Marker
			var targetString=".row_"+(this.space[0]+1)+".col_"+(this.space[1]+1);
			event.target=$(targetString);
			event.target[0].className+=" "+player.color;		
			return true;
		}
		else {
			return false;
		}
	}

	// Player Constructor
	function Player() {
		this.isTurn=false;
		this.color;	
	}


	// Changes player's turn State to true and Update View;
	Player.prototype.myTurn = function () {
		this.isTurn=true;
		if(this.color=="purple") {
			$("#playerOne")[0].className="playerTurn";
		}
		else {
			$("#playerTwo")[0].className="playerTurn";
		}
	}

	// Changes player's turn State to false and Update View;
	Player.prototype.endTurn = function() {
		this.isTurn=false;
		if(this.color=="purple") {
			$("#playerOne").removeClass("playerTurn");
		}
		else {
			$("#playerTwo").removeClass("playerTurn");
		}
	}

	// --> BEGIN GAME!! <-- //
	newGame = new Game(2); // Initalize Game with 2 players
	newGame.initalizeDisplayBoard(); // Adds div HTML to page
	gameBoard = new Board(); // Initialize Board
	newGame.players[0].color="purple";
	newGame.players[1].color="blue";

	// Setup Event Listeners
	$('.box').on('click',handleEvent);	
	$('#resetButton').on('click',resetGame);
})



