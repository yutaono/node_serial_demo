$(function(){

	var socket = io.connect(window.location.hostname);

	socket.on('connect', function(){
		socket.emit('msg update');
	});

	$('#button').click(function(){
		socket.emit('msg click');
		console.log('btn click')
	});

	$('#play').click(function(){
		var audio = document.getElementById("weapon");
		audio.play();
	});

	$('#pause').click(function(){
		var audio = document.getElementById("weapon");
		audio.pause();
	});

	var winW = $(window).width();
	// var winH = $(window).height();
	$('#mock').css({
		'width': winW,
	});

	var img1 = "images/01.jpg";
	var img2 = "images/02.jpg";
	var audio = new Audio("mp3/04 Weapon of Choice.mp3")

	$('#mock').click(function(){
		if($(this).attr('src')===img1){
			audio.play();
			$(this).attr("src",img2);
		} else {
			audio.currentTime = 0;
			audio.pause();
			$(this).attr("src",img1);

		}
		$(this).fadeIn();
	});

});