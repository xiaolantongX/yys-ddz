//开场动画与细节处理
//-------------------------------------游戏动画Start----------------------------------------------//
// 开场动画CSS样式与动画样式
$("#banner_main").fadeIn(2000);

//2秒后加载进入游戏按钮
setTimeout(function(){
	$("#enter").fadeIn();
},2000);

//点击进入游戏按钮进入游戏
$("#enter").click(function(){
	audioOther(1);
	// $("#Start_banner").fadeOut("slow");
	$("#enterGame").css({'display':'block'});
	$("#juese_left").animate({'left':'0'},800,function(){
		$("#Start_banner").fadeOut();
		$("#juese_left_bg").animate({'right':'-50%','opacity':'1'},1000,function(){
			$("#juese_left").animate({ 'left': '-50%' }, 1000);
			
		});
	});
	$("#juese_right").animate({'right':'0'},800,function(){
		$("#juese_right_bg").animate({'left':'-50%','opacity':'1'},1000,function(){
			$("#juese_right").animate({'right':'-50%'},1000,function(){
				$("#enterGame").fadeOut("fast");
			});
		});
	});
	setTimeout(function(){
		$("#juese_min").css({'display':'block'});
	},1800)
	setTimeout(function(){
		$("#juese_min_title").fadeIn('fast');
	},3000)
	setTimeout(function(){
		$("#juese_min").animate({'opacity':'0','top':'-100px'},2000,function(){
			$("#juese_min").fadeOut();
			$("#all_poker").fadeIn();
		});
	},3200)
})

// 控制开场动画
// $("#Start_banner").css({'display':'none'});

//云（上）开场动画
setTimeout(function(){
	$("#Start_buttom span:eq(0)").animate({"top":"50%"},500);
},1000);
$("#Start_buttom span:eq(1)").fadeIn('slow');

//mouseover音乐按钮显示左右两侧动画
$("#musicButton").mouseover(function(){
	$("#music_left").fadeIn();
	$("#music_right").fadeIn();
})
$("#musicButton").mouseout(function(){
	$("#music_left").fadeOut();
	$("#music_right").fadeOut();
})

// 进度条
$("#loading p").animate({'width':'200px'},2000);
//游戏开始后,添加一个mouseMover事件,触发图片动态效果！
$(document).mousemove(function(e){
		// $(document).attr('title',e.pageX + ", " + e.pageY);
			if(e.pageX<624){
				$("#mouseMover_girl").css({'background-position':'0 0'});
			}else if(e.pageX>1310){
				$("#mouseMover_girl").css({'background-position':'-812px 0'});
			}else if(e.pageX>624 && e.pageX<900){
				$("#mouseMover_girl").css({'background-position':'-203px 0'});
			}else if(e.pageX>1000 && e.pageX<1310){
				$("#mouseMover_girl").css({'background-position':'-609px 0'});
			}else{
				$("#mouseMover_girl").css({'background-position':'-406px 0'});
			}
});

//更换壁纸
$("#changeBgone li").click(function(){
	audioOther(1);
	// console.log($(this).attr('index'));
	let num=$(this).attr('index');
	$("body").css({'background-image':'url(./images/scene'+num+'.png)'});
})
$("#changeBgtwo li").click(function(){
	audioOther(1);
	// console.log($(this).attr('index'));
	let num=$(this).attr('index');
	$("body").css({'background-image':'url(./images/scene'+num+'.png)'});
})

//触发作者简介按钮(游戏原声);
//作者简介
$("#musicButton").click(function(){
	audioOther(1);
	$("#musicZZ").fadeIn();
	$("#musicBox").animate({'left':'50%','opacity':'1'},200);
})
$("#musicZZ").click(function(){
	audioOther(1);
	// e.stopPropagation();
	$("#musicBox").animate({'left':'30%','opacity':'0'},200,function(){
		$("#musicZZ").fadeOut('slow');
		$("#musicBox").css({'left':'70%'});
	})
})
$("#musicPlay").click(function(){
	audioOther(1);
})
$("#musicBox").click(function(e){
	e.stopPropagation();
})
$("#BGM").click(function(){
	audioOther(1);
})
// let girl_index;
// $("#girlFunction").on('click',function(){
// 	girl_index = Math.round(Math.random()*+1);
// 	$("#girlFunction").find('div').eq(girl_index).fadeIn('slow');
// 	// console.log(1);
// })
//-------------------------------------游戏动画end----------------------------------------------//
// -------------------------头像选择start------------------------- //
let left_HPnum = Math.round(Math.random()*5+1);
$("#left_HP img").attr({'src':'./images/HP0'+left_HPnum+'.png'});
let min_HPnum = Math.round(Math.random()*5+4);
$("#min_HP img").attr({'src':'./images/HP0'+min_HPnum+'.png'});
let right_HPnum = Math.round(Math.random()*5+10);
$("#right_HP img").attr({'src':'./images/HP'+right_HPnum+'.png'});
// -------------------------头像选择end------------------------- //

//---------------------jquery控制样式---------------------//
$(".clockPoker").eq(0).css({'left':'24%'});
$(".clockPoker").eq(1).css({'left':'60%','top':'485px'});
$(".clockPoker").eq(2).css({'right':'24%'});

$(".get_bossbg").eq(0).css({'left':'445px'});
$(".get_bossbg").eq(1).css({'left':'58%','bottom':'530px'});
$(".get_bossbg").eq(2).css({'right':'555px'});

$(".play_btn").eq(0).css({'left':'435px'});
$(".play_btn").eq(1).css({'left':'35%','bottom':'378px'});
$(".play_btn").eq(2).css({'right':'435px'});

$(".play_btn").on('click','input',function(){
	audioOther(1);
})
//---------------------jquery控制样式---------------------//

// --------------------隐藏抢地主时玩家的手牌,进行随机抢地主-------------------- //
// hiddenShow();
function hiddenShow(){
	if($(".play_poker li img").length>0){
		$(".play_poker li img").remove();
	}else{
		$(".play_poker li").append("<img class='hiddenShow'></img>");
	}
}
// --------------------隐藏显示农民手牌-------------------- //

// --------------------获取时间----------------------//
time();
function time(){
    let Nowtime = new Date(),
    time=Nowtime.toLocaleTimeString();
    return time;
}
setInterval(function () {
    $("#time").text(time);
},1000);
// --------------------获取时间----------------------//
// 游戏视频
function video(data){
	// $("#videoEffect").fadeIn();
	$("#video").attr({'autoplay':'autoplay'});
	$("#video").on('ended',function(){
		$("#videoEffect").fadeOut();
		$("#video_img1").animate({'right':'-618px'}).css({'right':'-618px'});
		$("#video_img2").animate({'right':'-618px'}).css({'right':'-618px'});
	});
	switch(data){
		case 110:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/王炸.mp4'});
			$("#video_img2").css({'background':'url(images/王炸.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/王炸type.png)no-repeat'});
		break;
		case 100:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/炸弹.mp4'});
			$("#video_img2").css({'background':'url(images/炸弹.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/炸弹type.png)no-repeat'});
		break;
		case 7:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/对子.mp4'});
			$("#video_img2").css({'background':'url(images/对子.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/连对.png)no-repeat'});
		break;
		case 8:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/飞机.mp4'});
			$("#video_img1").css({'background':'url(images/飞机.png)no-repeat'});
			$("#video_img1").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/飞机type.png)no-repeat'});
		break;
		case 6:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/顺子.mp4'});
			$("#video_img2").css({'background':'url(images/顺子.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/顺子type.png)no-repeat'});
		break;
		case 4:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/3带一或3带二.mp4'});
			$("#video_img2").css({'background':'url(images/带子.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/三带一.png)no-repeat'});
		break;
		case 5:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/3带一或3带二.mp4'});
			$("#video_img2").css({'background':'url(images/带子.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':'url(images/三带二.png)no-repeat'});
		break;
		case 999:
			$("#videoEffect").fadeIn();
			$("#video").attr({'src':'video/地主.mp4'});
			$("#video_img2").css({'background':'url(images/地主name.png)no-repeat'});
			$("#video_img2").animate({'right':'0'},500);
			$("#video_type").css({'background':''});
		break;
	}	
}
// 地主头像特效
function HPboss(data,status){
	let HP;
	let HPnum;
	if(status == true){
		switch(data){
			case 0:
				HP = $("#left_HP img").attr('src');
				// console.log(HP.substring(11,13));
				HPnum = HP.substring(11,13);
				$("#left_HP img").attr({'src':'./images/HP'+HPnum+'_'+HPnum+'.png'});
				$("#left_HP").append('<div><img src="./images/HP.png" alt="地主"></div>');
				$("#min_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
				$("#right_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
			break;
			case 1:
				HP = $("#min_HP img").attr('src');
				// console.log(HP.substring(11,13));
				HPnum = HP.substring(11,13);
				$("#min_HP img").attr({'src':'./images/HP'+HPnum+'_'+HPnum+'.png'});
				$("#left_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
				$("#min_HP").append('<div><img src="./images/HP.png" alt="地主"></div>');
				$("#right_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
			break;
			case 2:
				HP = $("#right_HP img").attr('src');
				// console.log(HP.substring(11,13));
				HPnum = HP.substring(11,13);
				$("#right_HP img").attr({'src':'./images/HP'+HPnum+'_'+HPnum+'.png'});
				$("#left_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
				$("#min_HP").append('<div><img src="./images/HPend.png" alt="农民"></div>');
				$("#right_HP").append('<div><img src="./images/HP.png" alt="地主"></div>');
			break;
		}
	}else{
		$("#left_HP div").remove();
		$("#min_HP div").remove();
		$("#right_HP div").remove();
	}
}
// 主要音频
function audio(data_select,data_length){
	// console.log(data_num);
	// console.log(data_length);
	$("#pokerMusic").attr({'autoplay':'autoplay'});
	if(data_length == 1){
		$("#pokerMusic").attr({'src':'music/'+data_select[0].num+'.mp3'});
	}
	if(data_select[0].num == 14 && data_select[0].color){
		$("#pokerMusic").attr({'src':'music/14.mp3'});
	}
	if(data_select[0].num == 14 && data_select[0].color){
		$("#pokerMusic").attr({'src':'music/15.mp3'});
	}
	if(data_length == 2){
		$("#pokerMusic").attr({'src':'music/对'+data_select[0].num+'.mp3'});
	}
	if(data_length == 2 && data_select[0].num == 14){
		$("#pokerMusic").attr({'src':'music/王炸.mp3'});
	}
	if(data_length == 3){
		$("#pokerMusic").attr({'src':'music/3个'+data_select[0].num+'.mp3'});
	}
	if(data_length == 4){
		if(data_select[0].num == data_select[3].num){
			$("#pokerMusic").attr({'src':'music/炸弹.mp3'});
		}else{
			$("#pokerMusic").attr({'src':'music/3带1.mp3'});
		}
	}
	if(data_length == 5){
		if((data_select[0].num == data_select[2].num && data_select[3].num == data_select[4].num) ||  (data_select[0].num == data_select[1].num && data_select[2].num == data_select[4].num)){
			$("#pokerMusic").attr({'src':'music/3带1对.mp3'});
		}else{
			$("#pokerMusic").attr({'src':'music/顺子.mp3'});
		}
		
	}
	if(data_length == 6){
		if(data_select[0].num == data_select[1].num && data_select[2].num == data_select[3].num && data_select[4].num == data_select[5].num && data_select[1].num != data_select[2].num && data_select[3].num != data_select[4].num){
			$("#pokerMusic").attr({'src':'music/连对.mp3'});
		}
		if(data_select[0].num == data_select[2].num && data_select[3].num == data_select[5].num && data_select[2].num != data_select[3].num){
			$("#pokerMusic").attr({'src':'music/飞机.mp3'});
		}
		if(data_select[0].num == data_select[3].num || data_select[2].num == data_select[5].num){
			$("#pokerMusic").attr({'src':'music/4带2.mp3'});
		}
		else{
			$("#pokerMusic").attr({'src':'music/顺子.mp3'});
		}
	}
}
// 游戏音频
function audioOther(type){
	$("#pokerMusic").attr({'autoplay':'autoplay'});
	$("#pokerMusicS").attr({'autoplay':'autoplay'});
	if(type == 1){
		$("#pokerMusic").attr({'src':'music/点击的声音.mp3'});
		// $("#pokerMusicS").attr({'src':'music/点击的声音.mp3'});
	}
	if(type == 2){
		$("#pokerMusic").attr({'loop':'loop'});
		$("#pokerMusic").attr({'src':'music/发牌声.mp3'});
	}
	if(type == 3){
		$("#pokerMusic").attr({'src':'music/抢地主.mp3'});
	}
	if(type == 4){
		$("#pokerMusic").attr({'src':'music/不抢.mp3'});
	}
	if(type == 5){
		$("#pokerMusic").attr({'src':'music/警告声.mp3'});
	}
	if(type == 6){
		$("#pokerMusic").attr({'src':'music/牌打不过的音效.mp3'});
	}
	if(type == 7){
		$("#pokerMusicS").attr({'src':'music/选牌声.mp3'});
	}
	if(type == 8){
		$("#pokerMusicS").attr({'src':'music/赢了音效2.mp3'});
	}
	if(type == 9){
		$("#pokerMusicS").attr({'src':'music/输了音效2.mp3'});
	}
}
// 人工智能
function girlInfo(type){
	let index = Math.round(Math.random()*5);
	switch(type){
		case 1:
			$("#girlFunction div:last").fadeIn();
			setTimeout(function(){
				$("#girlFunction div:last").fadeOut();
			},5000);
		break;
		case 2:
			$("#girlFunction div").eq(index).fadeIn();
			setTimeout(function(){
				$("#girlFunction div").eq(index).fadeOut();
			},5000);
		break;
	}
}
// 游戏提示
function gameTitle(type,score){
	if(type<5){
		$("#gameTitlebg").fadeIn();
		$("#gameTitle").animate({'left':'50%','opacity':'1'},1000,function(){
			setTimeout(function(){
				$("#gameTitle").animate({'left':'12%','opacity':'0'},1000,function(){
					$("#gameTitle").css({'left':'88%'});
				});
			},500)
			setTimeout(function(){
				$("#gameTitlebg").fadeOut();
			},499);
		});
	}else{
		// console.log(score);
		boss_Score = $(".scoreEnd").eq(score).html();
		// console.log(boss_Score);
		// left: 50%;
		// top: 20%;
		// margin-left: -538px;
		$("#gameTitlebg").css({'top':'0','height':'100%'});
		$("#gameTitle").css({'left':'10%','top':'20%','bottom':'none','width':'1076px','margin-left':'-538px'});
		$("#gameTitlebg").fadeIn();
		$("#gameTitle").animate({'left':'50%','opacity':'1'},1000,function(){
			$("#resetGame").fadeIn();
			$("#gameScore").fadeIn();
			$("#C3").html("0");
			timerID = setInterval(function(){
				if(Number($("#C3").html()) == boss_Score) {
					clearInterval(timerID);
				}else{
					if(Number(boss_Score) < 0){
						$("#C3").html(Number($("#C3").html()) - 1);
					}
					if(Number(boss_Score) > 0){
						$("#C3").html(Number($("#C3").html()) + 1);
					}
					
				}
			},1);
		});
		// $("#gameTitlebg").css({'top':'30%','height':'40%'});
		// $("#gameTitle").css({'top':'none','left':'88%','bottom':'-44px','opacity':'0'});
	}
	switch(type){
		case 1:
			$("#gameTitle").css({'background':'url(images/提示1.png)no-repeat'});
		break;
		case 2:
			$("#gameTitle").css({'background':'url(images/提示2.png)no-repeat'});
		break;
		case 3:
			$("#gameTitle").css({'background':'url(images/提示3.png)no-repeat'});
		break;
		case 4:
			$("#gameTitle").css({'background':'url(images/提示4.png)no-repeat'});
		break;
		case 5:
			$("#gameTitle").css({'background':'url(images/提示5.png)no-repeat'});
		break;
	}
}
// 加载玩家头像
function readying(){
	$("#left_HP").animate({'left':'45px'},500);
	$("#right_HP").animate({'right':'45px'},500);
	$("#min_HP").animate({'bottom':'40px'},500);
}
// 加载玩家头像
function bossScore(play){
	$("#left_score").fadeIn();
	$("#bottom_score").fadeIn();
	$("#right_score").fadeIn();
	$("aside").eq(play).css({'background':'url(images/bossScore.png)no-repeat'});
}