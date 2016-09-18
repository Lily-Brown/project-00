$(document).ready(function() {

	var playerArray = [ {"Twilight Sparkle":"purple"},{"Princess Luna":"blue"}];

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
		newGame = new Game(playerArray.length); // Initalizes game with 2 players
		newGame.initalizeDisplayBoard(); // Adds div HTML to page
		gameBoard = new Board();
		playerArray.forEach(function(value,index) {
			for(key in value) {
				newGame.players[index].name=key;
				newGame.players[index].color=value[key];
			}
		});
		reinitializeHTML();
	}	

	function reinitializeHTML() {
		$('h1').html("CONNECT 4!  ");
		$('h1').removeAttr("id");
		$('.box').on('click',handleEvent);	
		$('#resetButton').on('click',resetGame);
		// Always need to initialize player1 as First Player 
		$('#player1').attr('class','playerTurn'); 
		// Loop through the rest of the players -- Scalable, in theory. Not for this board.
		for(var i=1;i<newGame.players.length;i++) { 
			var queryString = "#player"+(i+1);
			$(queryString).attr('class','hideBorder'); 
		}
		
	}

	// Game Constructor
	function Game(numberOfPlayers) {
		this.players=[];
		this.winner;
		this.gameWon=false;
		for(var i=0;i<numberOfPlayers;i++){
			this.players[i]= new Player();
		}
		// Should initialize first player's isTurn=true;
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
		// Always need to initialize player1 as First Player 
		$('#player1').attr('class','playerTurn'); 
		// Loop through the rest of the players -- Scalable, in theory. Not for this board.
		for(var i=1;i<newGame.players.length;i++) { 
			var queryString = "#player"+(i+1);
			$(queryString).attr('class','hideBorder'); 
		}
	};

	// Player tries to place Marker, Game checks for Win state
	Game.prototype.makeMove = function(event,gameBoard){
		var validMove;
		var player=this.players
		for(var i=0;i<player.length;i++){
			if(player[i].isTurn) {
				validMove = gameBoard.placeMarker(event,player[i]);
				if(i!=player.length-1) {
					if(validMove) {
							player[i].endTurn();
							player[i+1].myTurn();
					}				
				}
				else {
					if(validMove) {
							player[i].endTurn();
							player[0].myTurn();
					}						
				}
			}
		}
		if (gameBoard.isWin()) {
			var winningColor=this.winner;
			this.gameWon=true;
			this.players.forEach(function(player, index) {
				if(winningColor==player.color) {
					$('h1').html(player.name.toUpperCase()+" WINS!  ");
				}
			});
			$('h1').attr("id",winningColor+"Text");
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
			for(col=0;col<4;col++) {
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
		this.name;
		this.isTurn=false;
		this.color;	
	}

	// Changes player's turn State to true and Update View;
	Player.prototype.myTurn = function () {
		this.isTurn=true;
		var playersArray=newGame.players;
		for(var i=0;i<playersArray.length;i++) {
			var playerElement="#player"+(i+1);
			if(playersArray[i].isTurn) {
				$(playerElement).attr('class','playerTurn');
			}
			else {
				$(playerElement).attr('class','hideBorder');
			}
		}
	}

	// Changes player's turn State to false and Update View;
	Player.prototype.endTurn = function() {
		this.isTurn=false;
	}

	// --> BEGIN GAME!! <-- //
	newGame = new Game(2); // Initalize Game with 2 players
	newGame.initalizeDisplayBoard(); // Adds div HTML to page
	gameBoard = new Board(); // Initialize Board
	playerArray.forEach(function(value,index) {
		for(key in value) {
			newGame.players[index].name=key;
			newGame.players[index].color=value[key];
		}
	});
	// Setup Event Listeners
	$('.box').on('click',handleEvent);	
	$('#resetButton').on('click',resetGame);
})