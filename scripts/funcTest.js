moves = {
	ROCK:1,
	PAPER:2,
	SCISSORS:3
};
var opponentMoves = [2,2,3,7,1,1,2,2,3,3,1,1,2,2,3,3,1,1,2,2];
function result(a, b) {
    if (a == b) { return 0; }
    if (a == moves.ROCK     && b == moves.SCISSORS ||
        a == moves.PAPER    && b == moves.ROCK ||
        a == moves.SCISSORS && b == moves.PAPER) {
        return 1;
    } else {
        return -1;
    }
};

moveHistory = [

];
function generateRoundHistory(){
	var myMove=1;
	for(var i=0;i<=19;i++){
		var opponentMove = opponentMoves[i];
		myMove+=1;
		if(myMove>3){
			myMove=1;
		}
		var outcome = result(myMove, opponentMove);
		moveHistory.push({opponentMove:opponentMove, myMove:myMove, outcome:outcome});		
	}
	console.log(moveHistory);
};
/**
* isPattern:
*
*check to see if the opponent is using repeated pattern
**/
function isPattern(){
	//begin by find the opponents actions
	var opMoves= getOpponentActions();
	console.log("the opMoves: "+opMoves);
	//then check to see if there is a repeating pattern
	var patternResults = patternDetection(opMoves);
	if(patternResults.patternFound==true){
		console.log("is there a repeating pattern? "+patternResults.patternFound);
	}else{
		//seems there isn't a stationary pattern, check for a pattern of actions
		//did you win, loose or tie last round? check for a pattern of win and loss
		console.log("no repeating pattern found, what about a pattern based on winning or losing?");
		outComePatternResults = outcomeActionCheck(moveHistory[moveHistory.length-2].outcome);
		console.log("does your opponent have a pattern?"+outComePatternResults.patternFound);
		if(outComePatternResults.patternFound==true){
			console.log("when scenario happens, play: "+outComePatternResults.returnMove);
		}
	}
};
/**
* outcomeActionCheck(lastRound)
*
*
**/
function outcomeActionCheck(lastRoundOutcome){
	var returnMove;
	var targetOutcome = lastRoundOutcome;
	for(i=0;i<moveHistory.length-3;i++){
		if(moveHistory[i].outcome == targetOutcome){
			if(!returnMove){
				returnMove = moveHistory[i+1].opponentMove;
			}else{
				if(returnMove!=moveHistory[i+1].opponentMove){
					return {patternFound:false};
				}
			}
		}
	}
	return {patternFound:true, returnMove: whatBeatsIt(returnMove)};
};
/**
* patternDetection(mvString)
*
* take in a string of the opponents moves
**/
function patternDetection(mvString){
	var patternFound = false;
	var longestPattern;
	var positionInPattern;
	var consecutiveRepeats;
	for(var i=3;i<=8;i++){
		var testPattern = mvString.substring(0,i);
		var tempArr = mvString.split(testPattern);
		timesEmpty=0;
		console.log(tempArr);
		for(var j=0;j<tempArr.length;j++){
			if(tempArr[j]!=""){
				console.log(tempArr[j]);
				timesEmpty+=1;
			}
		};
		console.log("timesEmpty:"+timesEmpty);
		console.log("what is the last element of the array:"+tempArr[tempArr.length-1]);
		console.log("what is the whole array:");
		console.log(tempArr);
		console.log("how long is tempArr:"+tempArr.length);
		console.log("yep");
		if(timesEmpty<1 || (timesEmpty==1 && tempArr[tempArr.length-1]!="" && tempArr[tempArr.length-1].length<=9)){
			patternFound = true;
			longestPattern=testPattern;
			positionInPattern=tempArr[tempArr.length-1];
			break;	
		}
	}
	if(patternFound==true){
		console.log("longestPattern: "+longestPattern);
		console.log("positionInPattern: "+positionInPattern);
		nextMove=whatBeatsIt(findNextPatternDigit(longestPattern, positionInPattern));
		console.log(nextMove);
		return {patternFound:true,nextMove:nextMove};
	}else{
		return {patternFound:false};
	}
};
/**
* whatBeatsIt(moveVal)
*
* takes in a move and returns what beats it
**/
function whatBeatsIt(moveVal){
	if(moveVal<3){
		return parseInt(moveVal)+1;
	}else{
		return 1;
	}
}
/**
*FindNextPatternDigit(longestPattern, patternPos)
*
*takes in a pattern, and a test string, then returns what the next move should be
**/
function findNextPatternDigit(longestPattern, patternPos){
	var nextMove = longestPattern.substr(patternPos.length,1);
	return nextMove;
};
/**
* getOpponentActions()
*
* returns a string of the combined moves of the opponent
**/
function getOpponentActions(){
	var acts = "";
	var mvHist = moveHistory.length;
	for(var i=0;i<mvHist-2;i++){
		acts+=moveHistory[i].opponentMove;
	}
	return acts;
};
generateRoundHistory();
isPattern();