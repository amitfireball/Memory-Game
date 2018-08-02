//variables initilizers

var rank1 = 20;
var	rank2 = 16;
var rank3 = 10;
var	match = 0;
var Clicks = 0;
var	delay = 400;
var	second = 0;
/*
 * Create a list that holds all of your cards
 */
let cards = ['bolt', 'bomb', 'diamond', 'bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'bomb', 'diamond','bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o'],
	shown = [],
	time,
	totalbox = cards.length/2;


	
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// First function to be call to initilize the game pattern sequence
function Game() 
{
	let fluck = shuffle(cards);
	$('.Playground').empty();
	match = 0;
	Clicks = 0;
	$('.Clicks').text('0');
	$('.score-icon').removeClass('fa-thumbs-down').addClass('fa-star');
	for (var i = 0; i < fluck.length; i++) 
	{
		$('.Playground').append($('<li class="box"><i class="fa fa-' + fluck[i] + '"></i></li>'))
	}
	event_Listener();
	restart_timer(time);
	second = 0;
	$('.seconds').text(`${second}`)
	shown = [];
};

//timer stats to run
function timer(){
	time = setInterval(function () 
	{
		$('.seconds').text(`${second}`)
		second = second + 1
	},900);
}

//timer will be reset
function restart_timer(seconds) 
{
	if (seconds) {
		clearInterval(seconds);
	}
}


//calling of function when cards need to be shuffle

function shuffle(array) 
{
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) 
	{
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
// calling of function when all cards match 
function game_over(Clicks, score) 
{
	swal(
	{
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Completed the quiz!',
		text: 'With ' + Clicks + ' Moves and ' + score + ' Stars in ' + second + ' Seconds.\n Woooooo!',
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonBorder: '2px solid #4CAF50',
		confirmButtonText: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			Game();
		}
	})
}
// calling os Score and ratings
function rating(moves) 
{
	var rating = 3;
	if (moves > rank3 && moves < rank2) {
		$('.fa-star').eq(2).removeClass('fa-star').addClass('fa-thumbs-down');
		rating = 3;
	} else if (moves > rank2 && moves < rank1) {
		$('.fa-star').eq(1).removeClass('fa-star').addClass('fa-thumbs-down');
		rating = 2;
	} else if (moves > rank1) {
		$('.fa-star').eq(0).removeClass('fa-star').addClass('fa-thumbs-down');
		rating = 1;
	}
	return { score: rating };
};

// calling of function when reset button clicks
$('.PlayAgain').bind('click', function () {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'You need to be a surrender',
		text: "Are you sure",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#02ccba',
		cancelButtonColor: '#f95c3c',
		confirmButtonText: 'Yes, Please!!!',
	}).then(function (isConfirm) 
	{
		if (isConfirm) {
			Game();
		}
	})
});

var event_Listener = function () {
	// cards open and shows image
	$('.Playground').find('.box').bind('click', function () 
	{
		var $this = $(this)
		if ($this.hasClass('show') || $this.hasClass('match')) { return true; }
		var box = $this.context.innerHTML;
		$this.addClass('open show');
		shown.push(box);
		if(Clicks < 1 && shown.length == 1){
    timer();
}
		// Compare card whit last open
		if (shown.length > 1) 
		{
			if (box === shown[0]) 
			{
				$('.Playground').find('.open').addClass('match animated infinite rubberBand');
				setTimeout(function () 
				{
					$('.Playground').find('.match').removeClass('open show animated infinite rubberBand');
				}, delay);
				match++;
			} else 
			{
				$('.Playground').find('.open').addClass('notmatch animated infinite wobble');
				setTimeout(function () 
				{
					$('.Playground').find('.open').removeClass('animated infinite wobble');
				}, delay / 1.5);
				setTimeout(function () 
				{
					$('.Playground').find('.open').removeClass('open show notmatch animated infinite wobble');
				}, delay);
			}
			shown = [];
			Clicks++;
			rating(Clicks);
			$('.Clicks').html(Clicks);
		}
		// Game over when all cards match
		if (totalbox === match) {
			rating(Clicks);
			var score = rating(Clicks).score;
			setTimeout(function () {
				game_over(Clicks, score);
			}, 500);
		}
	});
};

Game();