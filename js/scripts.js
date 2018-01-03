//Backend Logic
function Player(name, active, totalScore, tempScore) {
  this.name = name;
  this.active = active;
  this.totalScore = totalScore;
  this.tempScore = tempScore;
}

Player.prototype.pass = function(){
  // if (this.tempScore === 0) {
     this.active = !this.active;
    return this.totalScore += this.tempScore;
  // }
  // else {
  //   this.active = !this.active;
  //   return this.totalScore += this.tempScore;
  // }
}
Player.prototype.zero = function(){
  return this.tempScore = 0;
}

Player.prototype.turn = function(rollScore) {
  if (rollScore === 1) {
   this.tempScore = 0;
    return this.pass();
  } else {
    this.tempScore += rollScore;
  }

}

exports.playerModule = Player;
