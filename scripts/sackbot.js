/*
* Paperboy
* This player plays paper when ahead or after winning, but randomly otherwise.
*/
RPS.Player.Sackbot = function() {
    this.score = 0;
    this.lastResult = null;
    this.moveHistory = [];
};
RPS.Player.Sackbot.NAME = 'Sackbot';

/*
* Choose ROCK, PAPER, or SCISSORS.
*/
RPS.Player.Sackbot.prototype.throwMove = function(){
	var sendMove;
	if(this.moveHistory.length>25){
		//begin by find the opponents actions
		var opMoves= this.getOpponentActions();
		//then check to see if there is a repeating pattern
		var patternResults = this.patternDetection(opMoves);
		if(patternResults.patternFound==true){
			this.moveHistory.push({myMove:patternResults.nextMove});
			return patternResults.nextMove;
		}
		//seems there isn't a stationary pattern, check for a pattern of actions
		//did you win, loose or tie last round? check for a pattern of win and loss
		//console.log("no repeating pattern found, what about a pattern based on winning or losing?");
		outComePatternResults = this.outcomeActionCheck(this.moveHistory[this.moveHistory.length-2].outcome);
		//console.log("does your opponent have a pattern?"+outComePatternResults.patternFound);
		if(outComePatternResults.patternFound==true){
			this.moveHistory.push({myMove:outComePatternResults.nextMove});
			return outComePatternResults.nextMove;
		}
		var sendMove = RPS.randomMove(); 
		this.moveHistory.push({myMove:sendMove});
		return sendMove;
	}
	var sendMove = RPS.randomMove(); 
	this.moveHistory.push({myMove:sendMove});
	return sendMove;	
};
/**
* getOpponentActions()
*
* returns a string of the combined moves of the opponent
**/
RPS.Player.Sackbot.prototype.getOpponentActions = function(){
	var acts = "";
	var mvHist = this.moveHistory.length;
	for(var i=0;i<mvHist-2;i++){
		acts+=this.moveHistory[i].opponentMove;
	}
	return acts;
};
/**
* patternDetection(mvString)
*
* take in a string of the opponents moves
**/
RPS.Player.Sackbot.prototype.patternDetection = function(mvString){
	var patternFound = false;
	var longestPattern;
	var positionInPattern;
	var consecutiveRepeats;
	for(var i=3;i<=8;i++){
		var testPattern = mvString.substring(0,i);
		var tempArr = mvString.split(testPattern);
		var timesEmpty=0;
		for(var j=0;j<tempArr.length;j++){
			if(tempArr[j]!=""){
				timesEmpty+=1;
			}
		};
		if(timesEmpty<1 || (timesEmpty==1 && tempArr[tempArr.length-1]!="" && tempArr[tempArr.length-1].length<=9)){
			patternFound = true;
			longestPattern=testPattern;
			positionInPattern=tempArr[tempArr.length-1];
			break;	
		}
	}
	if(patternFound==true){
		nextMove=RPS.trumps(this.findNextPatternDigit(longestPattern, positionInPattern));
		return {patternFound:true,nextMove:nextMove};
	}else{
		return {patternFound:false};
	}
};
/**
* outcomeActionCheck(lastRound)
*
* takes in what the last round result, checks for historical precendence, an returns likely return move
**/
RPS.Player.Sackbot.prototype.outcomeActionCheck = function(lastRoundOutcome){
	var returnMove;
	var targetOutcome = lastRoundOutcome;
	for(i=0;i<this.moveHistory.length-3;i++){
		if(this.moveHistory[i].outcome == targetOutcome){
			if(!returnMove){
				returnMove = this.moveHistory[i+1].opponentMove;
			}else{
				if(returnMove!=this.moveHistory[i+1].opponentMove){
					return {patternFound:false};
				}
			}
		}
	}
	return {patternFound:true, nextMove:RPS.trumps(returnMove)};
};
/**
*FindNextPatternDigit(longestPattern, patternPos)
*
*takes in a pattern, and a test string, then returns what the next move should be
**/
RPS.Player.Sackbot.prototype.findNextPatternDigit = function(longestPattern, patternPos){
	var nextMove = longestPattern.substr(patternPos.length,1);
	return nextMove;
};
/*
* Receive the results of the last move.
*/
RPS.Player.Sackbot.prototype.addResult = function(result, opponentMove) {
    this.lastResult = result;
    this.score += result;
    this.moveHistory[this.moveHistory.length-1].opponentMove = opponentMove;
    this.moveHistory[this.moveHistory.length-1].outcome=result;
};

