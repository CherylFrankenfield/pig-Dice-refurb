//Frontend Logic
$(document).ready(function() {

var player1 = new Player("player1", true, 0, 0);
var player2 = new Player("player2", false, 0, 0);


  $("#roll").click(function() {
    var roll = Math.floor(Math.random() * 6) + 1;

    if (player1.active === true){
      player1.turn(roll);
      $('.turn-box.p1').text(roll);
      $('.turn-score.p1').text(player1.tempScore);
      if (roll === 1) {
        $('.oops.p1').addClass('active').delay(2000).queue(function(next){
            $(this).removeClass('active');
            next();
        });
        player2.active = true;
        $('.turn-box, .turn-score').toggleClass('active');
        $('.turn-box').html("<span style='font-size:.5em'>Your<br>Turn!</span>");
        $('.current-player').toggleClass('other');
        $('#p1-score').text(player1.totalScore)
      }

    } else {
      player2.turn(roll);
      $('.turn-box.p2').text(roll);
      $('.turn-score.p2').text(player2.tempScore);
      if (roll === 1) {
        $('.oops.p2').addClass('active').delay(2000).queue(function(next){
            $(this).removeClass('active');
            next();
        });
        player1.active = true;
        $('.turn-box, .turn-score').toggleClass('active');
        $('.turn-box').html("<span style='font-size:.5em'>Your<br>Turn!</span>");
        $('.current-player').toggleClass('other');
        $('#p2-score').text(player2.totalScore)
      }
    }

  });//Roll click ends
  $("#pass").click(function() {
    player1.pass();
    player1.zero();
    player2.pass();
    player2.zero();
    $('.turn-box, .turn-score').toggleClass('active');
    $('.turn-box').html("<span style='font-size:.5em'>Your<br>Turn!</span>");
    $('.current-player').toggleClass('other');
    $('#p2-score').text(player2.totalScore);
    $('#p1-score').text(player1.totalScore)
  });//Pass click ends
});//Ready ends
