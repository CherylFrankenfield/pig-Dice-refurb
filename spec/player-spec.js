var Player = require('./../js/scripts.js').playerModule;

describe('Player', function () {
  it('should test whether the total score gets the temporary score upon pass', function(){
    var player = new Player("harry", true, 10, 33);
    expect(player.pass()).toEqual(43);
  });

  it('should test whether the player changes upon pass', function(){
    var player = new Player("harry", true, 10, 33);
    expect(player.turn(1)).toEqual(false);
  });

  it('should test that tempScore is reset to zero if player rolls 1', function() {
    var player = new Player("harry", true, 10, 33);
    player.turn(1);
    expect(player.tempScore).toEqual(0);
  });
});
