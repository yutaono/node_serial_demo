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
		// var audio = document.getElementById("weapon");
		// audio.play();
		bgm_rockyou.play();
		global_mode = 3;
		mode_change(global_mode);
	});

	$('#uma_play').click(function(){
		se_uma_ashioto.play();
	});

	$('#hihin_play').click(function(){
		se_uma_hihin.play();
	});

	$('#pause').click(function(){
		var audio = document.getElementById("weapon");
		audio.pause();
	});

	$('#test').click(function(){
		socket.emit('toplay mp3', '440Hz-5sec.mp3');
	});

	$('#stop').click(function(){
		bgm_rockyou.pause();
	});

	//
	// About Status
	//
	//
	var currentMode = 0;
	var currentSoundStatus = {
		leftOrRight: 'L',
		centerOrBack: 'C',
		mp3FileNum: '0',
		push_id: '000'
	};
	var soundDB = {
		se_chapunR: 'mp3/SE_chapunRight.mp3',
		se_chapunL: 'mp3/SE_chapunLeft.mp3',
		se_zun: 'mp3/SE_zun.mp3',
		se_cha: 'mp3/SE_cha.mp3',
		se_uma_hihin: 'mp3/SE_uma_hihin.mp3',
		se_uma_ashioto: 'mp3/SE_uma_ashioto.mp3',
		se_kaeru: 'mp3/SE_kaeru.mp3',
		bgm_ame: 'mp3/BGM_ame_zaa.mp3',
		bgm_rockyou: 'mp3/WeWillRockYou.mp3',
		se_gandam_r: 'mp3/se_gandamr.wav',
		se_gandam_l: 'mp3/se_gandaml.wav'
	};

	var bgm_ame = new Audio(soundDB.bgm_ame);
	var bgm_rockyou = new Audio(soundDB.bgm_rockyou);
	var se_chapunR = new Audio(soundDB.se_chapunR);
	var se_chapunL = new Audio(soundDB.se_chapunL);
	var se_zun = new Audio(soundDB.se_zun);
	var se_cha = new Audio(soundDB.se_cha);
	var se_kaeru = new Audio(soundDB.se_kaeru);
	var se_uma_hihin = new Audio(soundDB.se_uma_hihin);
	var se_uma_ashioto = new Audio(soundDB.se_uma_ashioto);
	var se_gandam_r = new Audio(soundDB.se_gandam_r);
	var se_gandam_l = new Audio(soundDB.se_gandam_l);

	var currentLeftSound = new Audio();
	var currentRightSound = new Audio();

	function allStop(){
		bgm_ame.pause();
		// bgm_ame.currentTime = 0;
		bgm_rockyou.pause();
		// bgm_rockyou.currentTime = 0;
		se_chapunR.pause();
		// se_chapunR.currentTime = 0;
		se_chapunL.pause();
		// se_chapunL.currentTime = 0;
		se_zun.pause();
		se_cha.pause();

		currentRightSound = null;
		currentLeftSound = null;
	}

	var getStatusTimer = setInterval( function() {
		socket.emit('post soundStatus');
		socket.emit('post modeStatus');
	}, 10);


	var global_mode = 0;

	$('#mode0').click(function(){
		global_mode = 0;
		mode_change(global_mode);
	});
	$('#mode1').click(function(){
		global_mode = 1;
		mode_change(global_mode);
	});
	$('#mode2').click(function(){
		global_mode = 2;
				mode_change(global_mode);
	});
	$('#mode3').click(function(){
		global_mode = 3;
		mode_change(global_mode);
	});

	function mode_change(mode){
		if(currentMode != mode){
			allStop();
			currentMode = mode;
		}

		if(currentMode==0){
			$('#modeStatus').css('background-color', 'white');
			$('#modeStatus').text('modeStatus: '+mode+'  なし');

		} else if(currentMode==1){
			$('#modeStatus').css('background-color', 'skyblue');
			$('#modeStatus').text('modeStatus: '+mode+'  雨');
			currentLeftSound = se_chapunL;
			currentRightSound = se_kaeru;
			bgm_ame.play();

		} else if(currentMode==2){
			$('#modeStatus').css('background-color', 'green');
			$('#modeStatus').text('modeStatus: '+mode+'  馬');
			currentLeftSound = se_gandam_l;
			currentRightSound = se_gandam_r;

		} else if(currentMode==3){
			$('#modeStatus').css('background-color', 'red');
			$('#modeStatus').text('modeStatus: '+mode+'  We Will Rock You');
			currentLeftSound = se_cha;
			currentRightSound = se_zun;
		}
	}

	socket.on('get modeStatus', function(mode){
		mode = global_mode;
		mode_change(mode);
	});

	function compSoundStatus(current, getted){
		if(current.leftOrRight==getted.leftOrRight){
			if(current.centerOrBack==getted.centerOrBack){
				if(current.mp3FileNum==getted.mp3FileNum){
					return true;
				}
			}
		}
		return false;
	}

	function substitutionSoundStatus(current, getted){
		current.leftOrRight = getted.leftOrRight;
		current.centerOrBack = getted.centerOrBack;
		current.mp3FileNum = getted.mp3FileNum;
	}

	// currentSoundStatus
	// 	leftOrRight: 'L',
	// 	centerOrBack: 'C',
	// 	mp3FileNum: '0'
	// var current_push_id = '000';
	var changeFlag = false;

	socket.on('get soundStatus', function(sound){
		// console.log(sound.push_id);
		if(currentSoundStatus.push_id == sound.push_id){
			// console.log(sound);
		} else {
			if(sound.leftOrRight==='L'){
				currentRightSound.pause();
				currentLeftSound.loop = false;
				currentLeftSound.play();
			} else if(sound.leftOrRight==='R') {
				currentLeftSound.pause();
				currentRightSound.loop = false;
				currentRightSound.play();
			}
			currentSoundStatus.push_id = sound.push_id;
		}
	});


	//
	// for mock
	//
	//
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