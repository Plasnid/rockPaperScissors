/*
*  Sackbot
*  still determining a strategy
*/

RPS.Player.Sackbot = function(){
	this.currentMove= null;
	this.score = 0;
	this.lastResult = null;
	this.moveHistory = [];
	this.repeatingPatternDetected = false;
	this.opponentPattern=[];
};
RPS.Player.Sackbot.NAME = 'Sackbot';

RPS.Player.Sackbot.prototype.throwMove=function(){
	var myMove;
	if(this.moveHistory.length()<10){
		myMove = this.playSequential();
	}else{
		this.repeatingPatternDetected = findRepeatingPattern();
		this.winLossPatternDetected = findWinLossPattern();
	}
	moveHistory.push({'myMove':myMove});
	this.currentMove = myMove;
	return this.currentMove;
};

RPS.Player.Sackbot.prototype.addResult=function(result, opponentMove){
	if(this.moveHistory.length>0){
		var prevMove = this.moveHistory.length()-2;
		this.moveHistory[prevMove].opponentMove =opponentMove;
		this.moveHistory[prevMove].result = result;
	}

};
//playing sequential to find out if opponents have a pattern of moves
RPS.Player.Sackbot.prototype.playSequential=function(){
	var mv = this.currentMove;
	switch(mv)
	{
		case null:
			mv=1;
			break;
		case 3:
			mv=1;
			break;
		default:
			mv+=1;
			break;
	}
	return mv;
};
RPS.Player.Sackbot.prototype.opponentOutcome = function(){
	var historyLength = this.moveHistory.length();
	var resultsArr = {};
	if(historyLength>2){
		for(var i=0;i<history.length();i++){

		};
	};
};
RPS.Player.Sackbot.prototype.findRepeatPattern=function(){};