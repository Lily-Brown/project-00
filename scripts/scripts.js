$(document).ready(function() {

	// On a click event, determine who's turn it is and have Player place marker
	// Check if winState
	function handleEvent(event){
		newGame.setSpace(event);
		newGame.makeMove(event);
	}

	// Game Constructor
	// Should initialize a board full of null values, set first player's isTurn=true;
	function Game(numberOfPlayers) {
		this.resetButton=false;
		this.board=[];
		this.players=[];
		this.winner;
		this.space;

		// Initalizing board and first player state
		for(var i=0;i<6;i++) {
		  this.board[i]=[];
		  for(var j=0;j<7;j++) {
		     this.board[i][j]= null;
		  }
		}
		for(var i=0;i<numberOfPlayers;i++){
			this.players[i]= new Player();
		}
		this.players[0].isTurn=true;		
	}

	// Creates HTML board on page
	Game.prototype.initalizeBoard = function() {
		for(var i=0;i<7;i++) {
		  var rowId="starter"+i;
		  var element="<div class='headbox "+rowId+" row_"+(i+1)+"''></div>"; 
		  $('#wrapper').append(element);
		  for(var j=0;j<6;j++) {
		  	 var rowElement="<div class='box row_"+(i+1)+" col_"+(j+1)+"'></div>";
		  	 newRowId=".starter"+i;
		  	 $(newRowId).append(rowElement);
		  }
		}
	};

	Game.prototype.makeMove = function(event){
		this.setSpace(event);
		var nextTurn;
		if(this.players[0].isTurn) {
			nextTurn = this.placeMarker(event,this.players[0]);
			if(nextTurn) {
				this.players[1].myTurn();
				this.players[0].endTurn();
			}
		}
		else {
			nextTurn = this.placeMarker(event,this.players[1]);
			if(nextTurn){
				this.players[0].myTurn();
				this.players[1].endTurn();
			}
		}
		if (this.isWin()) {
			alert(this.winner +" won!")
		}
	}

	// Using the event, figure out which space on the board was clicked
	Game.prototype.setSpace = function(event){
		var toParse = event.target.className;
		var row = toParse.substring((toParse.indexOf("row_"))+4,(toParse.indexOf("row_")+5))
		var col = toParse.substring((toParse.indexOf("col"))+4,(toParse.indexOf("col_")+5))
		this.space = [row-1, col-1];
	}

	// Make sure space is a valid move
	Game.prototype.isValidMove = function() {
		var row=this.space[0];
		var col=this.space[1];
		// If space is empty
		if (this.board[col][row]==null) {
			//If space is not in the bottom row
			if(row!=6) {
				// Check that spot below it is not null
				if(this.board[col][row+1]==null) {
					return false;
				}
			}
			return true; 
		}
		else {
			alert("This spot is taken!");
			return false;
		}
	}

	// Check if there is a Win State
	Game.prototype.isWin = function() {
		if(this.fourInARow()||this.fourInAColumn()||this.fourLeftDiagonally()||this.fourRightDiagonally()) {
			return true;
		}
		else {
			return false;
		}
	}

	// Game winning logic - four in a row
	Game.prototype.fourInARow = function() {
		for(row=0; row<7;row++){
			for(col=0;col<3;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col+1][row]) &&
		           (this.board[col][row] == this.board[col+2][row]) &&
		           (this.board[col][row] == this.board[col+3][row])) {
		               this.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four in a column
	Game.prototype.fourInAColumn = function() {
		for(row=0; row<4;row++){
			for(col=0;col<6;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col][row+1]) &&
		           (this.board[col][row] == this.board[col][row+2]) &&
		           (this.board[col][row] == this.board[col][row+3])) {
		               this.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four right diagonally
	Game.prototype.fourRightDiagonally = function() {
		for(row=0; row<4;row++){
			for(col=0;col<3;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col+1][row+1]) &&
		           (this.board[col][row] == this.board[col+2][row+2]) &&
		           (this.board[col][row] == this.board[col+3][row+3])) {
		               this.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Game winning logic - four left diagonally
	Game.prototype.fourLeftDiagonally = function() {
		for(row=0; row<4;row++){
			for(col=3;col<6;col++) {
				if((this.board[col][row] != null) &&
		           (this.board[col][row] == this.board[col-1][row+1]) &&
		           (this.board[col][row] == this.board[col-2][row+2]) &&
		           (this.board[col][row] == this.board[col-3][row+3])) {
		               this.winner = this.board[col][row];
		               return true;
		        }
			}
		}
		return false;
	}

	// Player places a marker on the board
	Game.prototype.placeMarker = function(event,player){
		if(this.isValidMove(this.space)) {
			this.board[this.space[1]][this.space[0]] = player.color;
			event.target.className+=" "+player.color;		
			return true;
		}
		else {
			alert("Not a valid move!");
			return false;
		}
	}

	// Player Constructor
	function Player() {
		this.isTurn=false;
		this.color;
	}


	// Changes player's turn State to true;
	Player.prototype.myTurn = function () {
		this.isTurn=true;
	}

	// Changes player's turn State to false;
	Player.prototype.endTurn = function() {
		this.isTurn=false;
	}


	// --> BEGIN GAME!! <-- //
	newGame = new Game(2); //Initalize game with 2 players
	newGame.initalizeBoard(); // Adds div HTML to page
	newGame.players[0].color="red";
	newGame.players[1].color="blue";

	$('.box').on('click',handleEvent);

})
