$(function(){
	// 初始化玩家的数据
	// let player1 = {nekname:'小明', score: 1000, poker:[]}
	// let player2 = {nekname:'小明', score: 1000, poker:[]}
	// let player3 = {nekname:'小明', score: 1000, poker:[]}

	let names = ['小明', '小红', '小强'];

	let player = [];
	for(let i=0; i<3; i++){
		player.push({nekname:names[i], score: 3000, identity:0, poker:[], selected:{type:0,max:0, poker:[]}});
	}
	// 关于本局游戏数据的集合
	// boss:地主玩家， play:当前回合哪位玩家在出牌
	let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
	// let boss_num = -1;
	// let desktop = [];
	// console.log(player);

	// 第一个阶段：洗牌
	// 第一步：生成牌组HTML代码
	// for(let i=1; i<=54; i++){
	// 	$('.all_poker').append('<li class="back"></li>');
	// }
	let li_html = '';
	// 数据阶段：
	// 第一步：初始化牌组的数据
	// let poker = [10, 0];
	// let poker = {num: 10, color: 0};
	// let all_poker = [{num: 10, color: 0}, {num: 10, color: 1}, {num: 10, color: 2}, {num: 10, color: 3}]
	// 通过循环生成52张除了大小王以外的牌的数据
	let all_poker = [];
	washPoker();
	function washPoker(status){
		for(let i=0; i<54; i++){
			li_html += '<li class="back" style="top:-'+i/5+'px;left:-'+i/5+'px"></li>';
		}
		$('.all_poker').html(li_html);
		for(let i=1; i<=13; i++){
			for(let j=0; j<4; j++){
				all_poker.push({num: i, color: j});
			}
		}
		all_poker.push({num: 14, color: 0});		// 生成小王的数据
		all_poker.push({num: 14, color: 1});		// 生成大王的数据
		// 第二步：绑定洗牌事件
		let click = 0;		// 记录用户点击牌组的次数
		let Oldstatus = true;
		// 由于洗牌的过程中绑定事件的元素会发生改变，导致事件的失效。为了防止事件失效。我们使用监听绑定
		// $('.all_poker li').click(function(){
		$(".mid_top").off('click', '.all_poker li');
		$('.mid_top').on('click', '.all_poker li', function(){
			if(Oldstatus == true){
				audioOther(1);
				// alert('开始洗牌');
				// 调用洗牌动画函数
				claerPoker();

				// 把初始牌组数据打乱
				for(let i=0; i<4; i++){
					all_poker.sort(function(x, y){
						return Math.random()-0.5;
					});
				}
				// console.log(all_poker);
				// 自增点击数
				setTimeout(function(){
					click++;
				},11000);
				Oldstatus = false;
			}else if(click > 0){
				// alert('发牌');
				// audioOther(1);
				// 调用发牌函数
				$(".mid_top").off('click','.all_poker li');
				sendPoker(0);
				$("#mouseMover_girl").show();
				readying();
			}else if(click > 0 && status == true){
				// audioOther(1);
				sendPoker(0);
				status = false;
			}
		});
	}

	// 洗牌动画函数
	function claerPoker(){
		// 1、删除原牌组，并且在这之前先保存该HTML代码
		let all_poker_html = $('.mid_top').html();
		$('.all_poker').remove();

		// 2、生成三组新牌组
		let temp_poker = '';
		for(let i=0; i<6; i++){
			temp_poker += '<ul class="all_poker" style="top:-'+i*275+'px;">';
			for(let j=0; j<9; j++){
				temp_poker += '<li class="back" style="top:-'+j+'px"></li>';
			}
			temp_poker += '</ul>';
		}
		$('.mid_top').html(temp_poker);

		// 3、执行移动牌组的动画
		for(let i=0; i<2; i++){
			$('.all_poker').eq(0).animate({'left':'100px'}, 200).animate({'left':'0px'}, 200);
			$('.all_poker').eq(1).animate({'left':'200px'}, 200).animate({'left':'0px'}, 200);
			$('.all_poker').eq(3).animate({'left':'300px'}, 200).animate({'left':'0px'}, 200);
			$('.all_poker').eq(4).animate({'left':'-100px'}, 200).animate({'left':'0px'}, 200);
			$('.all_poker').eq(5).animate({'left':'-200px'}, 200).animate({'left':'0px'}, 200);
			$('.all_poker').eq(6).animate({'left':'-300px'}, 200).animate({'left':'0px'}, 200);
		}
			let poker_num=54;
			let tt=setInterval(function(){
			if(poker_num<54){
				// $('.all_poker').css(1000);
			$('.back').eq(poker_num).delay(1000).animate({'left':'50px','top':'-50px'}, 500).animate({'left':'100px','top':'-50px'},
			500).animate({'left':'200px','top':'50px'}, 500).animate({'left':'0px','top':'300px'},
			500).animate({'left':'-200px','top':'50px'}, 500).animate({'left':'-100px','top':'-50px'},
			500).animate({'left':'-50px','top':'-50px'}, 500).animate({'left':'0px','top':'0px'}, 500)}
			poker_num--;
			if(poker_num==-1){
			clearInterval(tt);
		}
		},100)

		// 因为需要等动画执行完毕的时间，所以这里要延时执行
		setTimeout(function(){
			// 4、删除临时动画牌组
			$('.all_poker').remove();

			// 5、回复原样
			$('.mid_top').html(all_poker_html);
		}, 11000);
	}

	// 发牌函数
	function sendPoker (number){
		// audioOther(1);
		// setTimeout(function(){
		// 	audioOther(2);
		// },100);
		audioOther(2);
		// setTimeout(function(){
		// 	$("#pokerMusic").attr({'src':''});
		// 	$("#pokerMusic").removeAttr('loop');
		// },2000);
		if(number < 17){
			// console.log(number);
			number++;
			// 把牌发给左边玩家
			// 动画
			// $('.all_poker li:last').animate({'left':'-500px', 'top':'200px'}, 200);

			// setTimeout(function(){
			// 	// 删除发下去牌背
			// 	$('.all_poker li:last').remove();

			// 	// 把牌发给中间玩家
			// 	$('.all_poker li:last').animate({ 'top':'500px'}, 200);

			// 	setTimeout(function(){
			// 		// 删除发下去牌背
			// 		$('.all_poker li:last').remove();

			// 		// 把牌发给右边玩家
			// 		$('.all_poker li:last').animate({'left':'500px', 'top':'200px'}, 200);

			// 		setTimeout(function(){
			// 			// 删除发下去牌背
			// 			$('.all_poker li:last').remove();

			// 			sendPoker(number);
			// 		}, 210);
			// 	}, 210);
			// }, 210);


			// 把牌发给左边玩家
			$('.all_poker li:last').animate({'left':'-500px', 'top':'200px'}, 100, function(){
				// 把总牌组中的最后一张牌的数据，删除并添加到玩家1的手牌数据中
				player[0].poker.push(all_poker.pop());

				// 删除发下去牌背
				$('.all_poker li:last').remove();

				// 生成玩家1当前收到的牌
				let temp = makePoker(player[0].poker[player[0].poker.length-1]);
				$('.play_1').append(temp);
				$('.play_1 li:last').css({'left':number*30+'px'});
				$('.play_1').css({'top':280-number*20+'px'});

				// 把牌发给中间玩家
				$('.all_poker li:last').animate({ 'top':'500px'}, 100, function(){
					// 把总牌组中的最后一张牌的数据，删除并添加到玩家2的手牌数据中
					player[1].poker.push(all_poker.pop());

					// 删除发下去牌背
					$('.all_poker li:last').remove();

					// 生成玩家2当前收到的牌
					let temp = makePoker(player[1].poker[player[1].poker.length-1]);
					$('.play_2').append(temp);
					$('.play_2 li:last').css({'left':number*30+'px'});
					$('.play_2').css({'left':-number*15+'px'});

					// 把牌发给右边玩家
					$('.all_poker li:last').animate({'left':'500px', 'top':'200px'}, 100, function(){
						// 把总牌组中的最后一张牌的数据，删除并添加到玩家3的手牌数据中
						player[2].poker.push(all_poker.pop());

						// 删除发下去牌背
						$('.all_poker li:last').remove();

						// 生成玩家3当前收到的牌
						let temp = makePoker(player[2].poker[player[2].poker.length-1]);
						$('.play_3').append(temp);
						$('.play_3 li:last').css({'left':number*30+'px'});
						$('.play_3').css({'top':280+number*8.2+'px'});

						sendPoker(number);
					});
				});
			});
		}else{
			$("#pokerMusic").attr({'src':''});
			$("#pokerMusic").removeAttr('loop');
			// console.log(player);
			// 牌已经发完了，需要进行排序。所以调用牌的排序函数
			// sortPoker(player[0].poker);
			// sortPoker(player[1].poker);
			// sortPoker(player[2].poker);


			// 通过JQ中的each方法遍历玩家数据，把所有玩家手牌数据进行排序
			$(player).each(function(i){
				sortPoker(player[i].poker);
			})
			// console.log(player);
			// 通过动画把排序好的牌重新生成到页面对应的位置上
			// 所有玩家的动画
			// 三个玩家都调用手牌排序动画函数
			sortPokerAnimate(0);
			sortPokerAnimate(1);
			sortPokerAnimate(2, function(){
				hiddenShow();
				getBoss();
			});
			// // 1、删除原牌
			// $(player).each(function(i){
			// 	$('.play_'+(i+1)+' li').remove();
			// })
			// // $('.play_1 li').remove();
			// // $('.play_2 li').remove();
			// // $('.play_3 li').remove();
			// // 2、生成牌背
			// let temp = '';
			// for(j=0;j<3;j++){
			// 	$(player[j].poker).each(function(i){
			// 	temp += '<li class="back" style="left:'+i*30+'px;"></li>';
			// 	});
			// 	$('.play_'+(j+1)+'').html(temp);
			// }

			// // 等0.3秒后生成新的牌面
			// setTimeout(function(){
			// 	// 删除牌背
			// 	$(player).each(function(i){
			// 		$('.play_'+(i+1)+' li').fadeOut("slow");
			// 	})

			// 	// 循环生成新的牌面
			// 	for(j=0;j<3;j++){
			// 		$(player[j].poker).each(function(i){
			// 		temp = makePoker(player[j].poker[i]);
			// 		$('.play_'+(j+1)+'').append(temp);
			// 		$('.play_'+(j+1)+' li:last').css({'left':i*30+'px'});
			// 		});
			// 	}
			// 	// 调用抢地主阶段的函数
			// 	getBoss();
			// }, 300);
		}
	}

	// 抢地主函数
	function getBoss(get_num, cancel){
		// 1、生成一个0~2之间的随机数，确定由哪位玩家开始抢地主
		// get_num = get_num || Math.round(Math.random()*2);
		if(get_num === undefined){
			get_num = Math.round(Math.random()*2);
		}
		cancel = cancel || 0;
		// console.log(get_num, cancel);

		// 2、让开始抢地主的玩家显示功能按钮
		$('.get_boss').eq(get_num).css({'display':'block'});

		// 3、给抢地主的玩家的按钮绑定对应的事件
		// 3.1、绑定的是抢地主的事件
		$('.get_boss').eq(get_num).find('.get').off('click');
		$('.get_boss').eq(get_num).find('.get').on('click', function(){
			hiddenShow();
			//显示地主与农民分数；
			bossScore(get_num);
			beishu(999);
			// audioOther(1);
			video(999);
			// $(".min_top").off('click','li');
			clockPoker(get_num,30,true);
			// alert('我是地主');
			// 把功能按钮隐藏
			// console.log(get_num);
			audioOther(1);
			setTimeout(function(){
				audioOther(3);
			},100);
			//为当前玩家添加地主头饰
			HPboss(get_num,true);
			$(".pass").fadeOut('fast');
			// alert(123);
			$('.get_boss').eq(get_num).css({'display':'none'});
			player[get_num].identity = 1;		// 给对应玩家设置为地主身份
			game_data.boss = get_num;
			// console.log(game_data.boss);

			// 4、把桌面上留下的三张牌发给地主
			// 4.1、通过简单的动来描述这个过程
			$('.all_poker li').eq(0).animate({'left':'-200px'},500);
			$('.all_poker li').eq(1).animate({'left':'200px'},500, function(){
				// 4.2删除牌背的元素
				$('.all_poker li').remove();

				// 4.3生成三张牌的牌面
				$(all_poker).each(function(i){
					$('.all_poker').append(makePoker(all_poker[i]));
					if (i == 1) {
						$('.all_poker li:last').css({'left':'-200px'});
					}else if(i == 2){
						$('.all_poker li:last').css({'left':'200px'});
					}
				});

				// 4.4 生成的牌进行一个简单移动动画
				$('.all_poker li').animate({'top':'-50px'}, 300);
				$("#mouseMover_girl").animate({'top':'100px'}, 300);

				
				// 4.5 等动画结束后，把剩余的数据放入地主玩家的手牌中
				setTimeout(function(){
					let temp;
					let temp_html = '';
					let num = 17;
					$(all_poker).each(function(i){
						// 把数据放到地主玩家的手牌数据中
						temp = all_poker.pop();
						player[game_data.boss].poker.push(temp);

						// 把牌生成到地主玩家的HTML代码中
						temp_html = makePoker(temp);
						$('.play_'+(game_data.boss+1)).append(temp_html);
						if(game_data.boss == 1){
							$('.play_'+(game_data.boss+1)).css({'left':-(num++ * 15) + 'px'});
						}else if(game_data.boss == 2){
							$('.play_'+(game_data.boss+1)).css({'top':280+num*12+'px'});
						}else{
							$('.play_'+(game_data.boss+1)).css({'top':280-num*22+'px'});
						}

						// 4.6 地主玩家再做一次动画，进行排序
						sortPoker(player[game_data.boss].poker);
						sortPokerAnimate(game_data.boss);
					})
					// 4.7 把当前出牌的玩家设置为地主玩家
					game_data.play = game_data.boss;

					// 5 开始进入出牌阶段
					// 调用出牌函数
					playPoker(game_data.play,0);
				},310);
			});
		});
		// 3.2、绑定不抢地主事件
		$('.get_boss').eq(get_num).find('.cancel').off('click');
		$('.get_boss').eq(get_num).find('.cancel').on('click', function(){
			// alert('我不要');
			audioOther(1);
			setTimeout(function(){
				audioOther(4);
			},100);
			// $("#pokerMusic").attr({'src':'music/不抢.mp3','autoplay':'autoplay'});
			// 把对应玩家抢地主按钮隐藏或删除
			$('.get_boss').eq(get_num).css({'display':'none'});
			// 自调函数
			get_num = ++get_num > 2 ? 0 : get_num;
			// console.log(cancel);
			if( ++cancel == 3){
				// alert('本局流局，请重新开始');
				$("#titleInfo").fadeIn();
				$("#titleInfo").on('click',function(){
					$("#titleInfo").fadeOut();
				})
				$("#infoContent").click('li',function(e){
					e.stopPropagation();
				})
				//清除桌面玩家手牌
				$(".play_poker li").remove();
				all_poker = [];
				for(i=0;i<3;i++){
					player[i].poker = [];
				}
				// console.log(player.poker);
				li_html = '';
				washPoker(true);
			}else{
				getBoss(get_num, cancel);
			}
		});
	}
	let clockTimer;
	//出牌时间限制
	function clockPoker(play,time,status){
		// console.log(game_data.boss);
		if(status == true){
			// console.log(play);
			$(".clockPoker").css({'background':'url(./images/clock.png)','animation':''});
			let $clockPoker = $('.clockPoker').eq(play);
			let $clock = $('.clock').eq(play);
			// console.log($clock);
			$(".clock").html();
			$('.clockPoker').css({'display':'none'});
			$clockPoker.css({'display':'block'});
			//如果时间到了就自动点击pass按钮
			clearInterval(clockTimer);
			clockTimer = setInterval(function(){
				$clock.html(time);
			    --time;
			    // console.log(time);
				if(time < 0){
					clearInterval(clockTimer);
					if(player[play].selected.poker.length == 0){
						if(play == game_data.boss){
							$('.pass').eq(play).off('click');
							$('.pass').eq(play).trigger('click');
						}
					}else{
						$('.play').eq(play).off('click');
						$('.play').eq(play).trigger('click');
					}
				}
				if(time == 8){
					girlInfo(2);

				}
				if(time == 25){
					girlInfo(2);
					if(play != game_data.boss){
						hint(game_data.desktop.max,game_data.desktop.type,game_data.desktop.poker.length,play);
					}
				}
				if(time == 10){
					girlInfo(2);
				}
				if(time == 23){
					if(play != game_data.boss){
						if(player[play].selected.poker.length!=0){
							$('.play').eq(play).off('click');
							$('.play').eq(play).trigger('click');
						}else{
							$('.pass').eq(play).off('click');
							$('.pass').eq(play).trigger('click');
						}
					}
				}
				if(time==4){
					$(".clockPoker").css({'background':'url(./images/clockOut.png)','animation':'clock_run 0.5s linear infinite'});
					girlInfo(1);
					if(status == true){
						audioOther(5);
						// status = false;
						hint(game_data.desktop.max,game_data.desktop.type,game_data.desktop.poker.length,play);
					}
				}
			},1000);
		}else{
			clearInterval(clockTimer);
		}
	}

	// 出牌函数
	function playPoker(play, pass){
		//让人工智能女孩自动转动
		switch(play){
			case 0:
				$("#mouseMover_girl").css({'background-position':'0 0'});
			break;
			case 1:
				$("#mouseMover_girl").css({'background-position':'-406px 0'});
			break;
			case 2:
				$("#mouseMover_girl").css({'background-position':'-812px 0'});
		}
		// 如果已经累加了2次过牌，则桌面牌清空
		if(pass == 2){
			game_data.desktop.type = 0;
			game_data.desktop.max = 0;
			game_data.desktop.poker = [];
			pass = 0;
		}

		let $play_btn = $('.play_btn').eq(play);
		let data_num;

		// 1、对玩家操作的按钮组进处理
		// 1.1 把所玩家的按钮都隐藏
		$('.play_btn').css({'display':'none'});
		// 1.2 把当前出牌玩家的按钮组显示
		$play_btn.css({'display':'block'});

		// 2、解绑对应的事件
		// 2.1、解绑出牌与过牌事件，防止出现重复绑定事件的问题
		$play_btn.off('click', '.play').off('click', '.pass').off('click','.hint');

		// 2.2 解绑选择牌的事件
		$('.play_poker').off('click', 'li');

		// 3、绑定点击牌的事件
		$('.play_poker').unbind('mouseover');
		$('.play_'+(play+1)).mouseover(function(){
			audioOther(7);
		});
		$('.play_'+(play+1)).on('click', 'li', function(){
			audioOther(1);
			// 3.1.1 获取选中牌的数据
			let poker_data = {};
			poker_data.num = $(this).attr('data-num')*1;
			poker_data.color = $(this).attr('data-color')*1;
			// 通过判断当前牌是否有selected这个样式来判断是选中还是取消
			if($(this).attr('class') != 'selected'){
				// 3.1.2 把数据放入当前玩家选择的牌组中
				player[play].selected.poker.push(poker_data);
				// console.log(player[play].selected);

				// 3.1.3 把该牌的样式设选中
				$(this).addClass('selected');
			}else{
				// 取消选中
				// 3.2.1 把点击牌的数据从选中牌的数组中删除
				for(let i=0; i<player[play].selected.poker.length; i++){
					if(player[play].selected.poker[i].num == poker_data.num &&
						player[play].selected.poker[i].color == poker_data.color){
						player[play].selected.poker.splice(i,1);
						break;
					}
				}
				// 3.2.2 把该牌的选中样式去掉
				$(this).removeClass('selected');
				// console.log(player[play].selected);
			}
		})

		// 4、绑定出牌事件
		$play_btn.on('click', '.play', function(){
			// 判断用户有没有选中牌
			if(player[play].selected.poker.length == 0){
				// alert('你没有选牌！');
				gameTitle(1);
			}else{
				// 判断用户选中的牌的牌型是否正确
				if(!checkPoker(player[play].selected)){
					// alert('对不起，您的选牌不符合出牌规则');
					gameTitle(2);
				}else{
					// 判断用户的牌能不能打得过上一个用出得牌组
					if(!checkVS(play)){
						// alert('对不起，你不能这样出牌');
						gameTitle(3);
					}else{
						$(".pass").fadeIn('fast');
						// let video = document.getElementById('video');
						// video.play();
						video(player[play].selected.type);
						audio(player[play].selected.poker,player[play].selected.poker.length);
						// audioMax(player[play].selected.poker,player[play].selected.poker.length);
						// console.log(player[play].selected.poker);
						// console.log(player[play].selected.poker[0].num);
						// console.log(player[play].selected.poker.length);
						// console.log(poker_data.num);
						// console.log(player[play].selected.poker.length);
						// console.log(game_data.desktop.type);
						// console.log(player[play].selected.type);
						// 先把打出的去牌替换掉桌面牌的数据
						game_data.desktop.type = player[play].selected.type;
						game_data.desktop.max = player[play].selected.max;
						beishu(game_data.desktop.type);
						game_data.desktop.poker = [];
						for(let i=0; i<player[play].selected.poker.length; i++){
							game_data.desktop.poker.push({num:0, color:0});

							// for in 语句用于对象的遍历
							for(x in player[play].selected.poker[i]){
								game_data.desktop.poker[i][x] = player[play].selected.poker[i][x]
							}
						}

						// 然后把打出去的牌的数据从玩家手牌数据中删除
						for(let i=0; i<player[play].poker.length; i++){
							for(let j=0; j<player[play].selected.poker.length; j++){
								if(player[play].poker[i].num == player[play].selected.poker[j].num &&
									player[play].poker[i].color == player[play].selected.poker[j].color
									){
									// console.log(i,j);
									player[play].poker.splice(i, 1);
								}
							}
						}

						// 把选中的牌组初始化
						player[play].selected.type = 0;
						player[play].selected.max = 0;
						player[play].selected.poker = [];

						// console.log(player[play]);
						// console.log(game_data);

						// 画面的生成
						// 1、生成桌面牌的HTML代码
						// 1.1 删除原桌面的牌组
						$('.desktop_poker li').animate({'top':'20px','opacity':'1'},500)

						$(game_data.desktop.poker).each(function(i){
							$('.desktop_poker').append(makePoker(game_data.desktop.poker[i]));
							$('.desktop_poker li:last').css({'left':i*20+'px','top':i*10+'px','transform':'rotateZ('+i*5+'deg)'});
						});

						// 2、生新生成玩家手牌的HTML代码
						// 2.1 把手牌全删除
						$('.play_'+(play+1)+' li').remove();
						// 2.2 通过手牌数据重新的生成HTML代码到对应玩家中
						for(i=0;i<player[play].poker.length;i++){
							$('.play_'+(play+1)).append(makePoker(player[play].poker[i]));
							$('.play_'+(play+1)+' li:last').css({'left':i*30+'px'});
							if(play+1 == 2){
								$('.play_'+(play+1)).css({'left':-i*15+'px'});
								// console.log(1);
							}else if(play+1 == 3){
								$('.play_'+(play+1)).css({'top':280+i*8.2+'px'});
								// console.log(2);
							}else{
								$('.play_'+(play+1)).css({'top':280-i*20+'px'});
								// console.log(0);
							}

						}
						// console.log(player[play].poker);

						// 判断胜负
						if(player[play].poker.length == 2 ){
							$("#pokerMusic").attr({'src':'music/我就两张牌了.mp3'});
							// 还没有分出胜负，继续打牌
							play = ++play > 2? 0: play;
							playPoker(play, 0);
							clockPoker(play, 30,true);
						}else if(player[play].poker.length == 1 ){
							$("#pokerMusic").attr({'src':'music/我就一张牌了.mp3'});
							// 还没有分出胜负，继续打牌
							play = ++play > 2? 0: play;
							playPoker(play, 0);
							clockPoker(play, 30,true);
						}else if(player[play].poker.length == 0 ){
							score(player[game_data.boss].poker.length,game_data.boss);
							// alert('你赢了');
							gameTitle(5,game_data.boss);
							$("#pokerMusic").attr({'src':''});
							$("#video").attr({'src':''});
							// $("#gameTitlebg").attr({'display':'none'});
							$("#videoEffect").css({'display':'none'});
							//再来一盘事件
							$("#resetGame").off('click');
							//清除桌面玩家手牌
							$(".play_poker li").remove();
							all_poker = [];
							for(i=0;i<3;i++){
								player[i].poker = [];
							}
							// console.log(player.poker);
							li_html = '';
							washPoker(true);
							clockPoker(play,30,false);
							$("#resetGame").on('click',function(){
								audioOther(1);
								// resetGame();
								$(".get_boss").css({'display':'none'});
								$("#mouseMover_girl").animate({'top':'250px'});
								$(".play_btn").css({'display':'none'});
								$(".clockPoker").css({'display':'none'});
								$("#resetGame").fadeOut();
								$("#gameTitlebg").fadeOut();
								$("#left_score").fadeOut();
								$("#bottom_score").fadeOut();
								$("#right_score").fadeOut();
								$("#gameTitlebg").css({'top':'30%','height':'40%'});
								$("#gameTitle").css({'top':'-100px','left':'88%','opacity':'0','width':'613px','margin-left':'-200px'});
								$("#gameScore").fadeOut();
								$(".clock").html();
								$(".play_poker li").remove();
								$(".desktop_poker li").remove();
								$(".all_Poker li").remove();
								$("#video_img1").css({'background':''})
								$("#video_img2").css({'background':''})
								$('.play_poker').off('click', 'li');
								$('.play_poker').unbind('mouseover');
								all_poker = [];
								game_data.desktop.poker = [];
								for(i=0;i<3;i++){
									player[i].poker = [];
								}
								for(i=0;i<3;i++){
									player[i].selected.type = 0;
									player[i].selected.max = 0;
									player[i].selected.poker = [];
								}
								// for(i=0;i<3;i++){
								//     console.log(player[i].poker);
								// }
								// console.log(game_data.desktop.poker);
								for(i=0;i<3;i++){
									// console.log(player[i].selected.poker);
								}
								li_html = '';
								washPoker(true);
								// console.log(play);
								HPboss(play,false);
								clockPoker(play,30,false);
								// console.log(game_data.play);
								// let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
								game_data.boss = -1;
								game_data.play = -1;
								game_data.desktop.type = 0;
								game_data.desktop.max = 0;
								multiple=[15];
								$("#beishu").html('15');
							})
						}else{
							// 还没有分出胜负，继续打牌
							play = ++play > 2? 0: play;
							playPoker(play, 0);
							clockPoker(play, 30,true);
							// console.log(play);
							return true;
						}
					}
				}
			}
		});

		// 5、绑定过牌事件
		$play_btn.on('click', '.pass', function(){
			//获取所点击牌的添加的方法selected,并且在pass后删除该方法
			text = $('.play_'+(play+1)+' li');
			for(i=0;i<3;i++){
				player[i].selected.type = 0;
				player[i].selected.max = 0;
				player[i].selected.poker = [];
			}
			// console.log(text);
			for(i=0;i<text.length;i++){
				text.removeClass('selected');
			}
			// 3.1 判断能不能过牌
			if(game_data.desktop.poker.length == 0){
				// alert('此时你该出牌！');
				gameTitle(4);
			}else{
				$("#pokerMusic").attr({'src':'music/过（pass）.mp3','autoplay':'autoplay'});
				// 3.2 设置一下位出牌的玩家
				game_data.play = ++play > 2? 0: play;
				// 3.3 调用出牌函数
				playPoker(game_data.play, pass+1);
				clockPoker(game_data.play, 30,true);
				// console.log(game_data.play);
				return true;
			}
		});

		//提示事件
		$play_btn.on('click', '.hint', function(){
			hint(game_data.desktop.max,game_data.desktop.type,game_data.desktop.poker.length,play);
			// console.log(game_data.desktop.max,game_data.desktop.type,game_data.desktop.poker.length);
			// 设置提示按钮函数
			// console.log($('.play_'+(play+1)+' li:last').attr('data-num'));
		});
	}

	//提示函数
	function hint(max,type,length,play){
		let poker_data = {};
		// console.log(type);
		let index = [];
		if(player[play].selected.poker.length == 0){
			switch(length){
				case 0:
				case 1:
					//单张
					if($('.play_'+(play+1)+' li:last').attr('data-num') <= max){
						$('.pass').eq(play).trigger('click');
					}else{
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num > max){
								poker_data.num = $('.play_'+(play+1)+' li').eq(i).attr('data-num')*1;
								poker_data.color = $('.play_'+(play+1)+' li').eq(i).attr('data-color')*1;
								player[play].selected.poker.push(poker_data);
								$('.play_'+(play+1)+' li').eq(i).addClass('selected');
								return;
							}
						}
					}
				break;
				case 2:
					//对子
					for(i=0;i<player[play].poker.length-1;i++){
						if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+1].num){
							$('.play_'+(play+1)+' li').off('click');
							$('.play_'+(play+1)+' li').eq(i).click();
							$('.play_'+(play+1)+' li').eq(i+1).click();
							return;
						}
					}
				break;
				case 3:
					//三张
					for(i=0;i<player[play].poker.length-2;i++){
						if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+2].num){
							$('.play_'+(play+1)+' li').off('click');
							$('.play_'+(play+1)+' li').eq(i).click();
							$('.play_'+(play+1)+' li').eq(i+1).click();
							$('.play_'+(play+1)+' li').eq(i+2).click();
							return;
						}
					}
				break;
				case 4:
					if(type == 4){
						// console.log(type);
						for(i=0;i<player[play].poker.length-3;i++){
							$('.play_'+(play+1)+' li').off('click');
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+2].num){
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								for(j=0;j<player[play].poker.length;j++){
									$('.play_'+(play+1)+' li').off('click');
									if(player[play].poker[j].num != player[play].poker[j+1].num){
										$('.play_'+(play+1)+' li').eq(j).click();
									return;
									}
								}
							}
						}
					}else{
						for(i=0;i<player[play].poker.length-3;i++){
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+3].num){
								$('.play_'+(play+1)+' li').off('click');
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								return;
							}
						}
					}		
					//炸弹
					if(type == 100){
						for(i=0;i<player[play].poker.length-3;i++){
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+3].num){
								$('.play_'+(play+1)+' li').off('click');
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								return;
							}
						}
					}
				break;
				case 5:
					//三带二
					// if(type == 5){
					if(type == 5){
						for(i=0;i<player[play].poker.length-4;i++){
							$('.play_'+(play+1)+' li').off('click');
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+2].num){
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								for(i=0;i<player[play].poker.length-1;i++){
									$('.play_'+(play+1)+' li').off('click');
									if(player[play].poker[i].num == player[play].poker[i+1].num){
										$('.play_'+(play+1)+' li').eq(i).click();
										$('.play_'+(play+1)+' li').eq(i+1).click();
										return;
									}
								}
							}
						}
					}
					//顺子
					if(type==6){
						// console.log(game_data.desktop.poker[1].num);
						// console.log(type);
						// let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num > game_data.desktop.poker[1].num){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 1){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 2){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 3){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 4){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						// console.log(index.length);
						if(index.length == 5){
							// console.log(index.length);
							for(i=0;i<index.length;i++){
								// console.log(i);
								$('.play_'+(play+1)+' li').eq(index[i]).click();
								$('.play_'+(play+1)+' li').off('click');
							}
						}else{
							$('.pass').eq(play).trigger('click');
							$('.pass').eq(play).off('click');
						}
					}
				break;
				case 6:
					//四带二
					if(type == 9){
						for(i=0;i<player[play].poker.length-5;i++){
							$('.play_'+(play+1)+' li').off('click');
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+3].num){
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								for(i=0;i<player[play].poker.length-1;i++){
									$('.play_'+(play+1)+' li').off('click');
									if(player[play].poker[i].num == player[play].poker[i+1].num){
										$('.play_'+(play+1)+' li').eq(i).click();
										$('.play_'+(play+1)+' li').eq(i+1).click();
										return;
									}
								}
							}
						}
					}
				// break;
					//飞机
					if(type == 8){
						for(i=0;i<player[play].poker.length-5;i++){
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+2].num &&
							 player[play].poker[i+3].num == player[play].poker[i+5].num){
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								$('.play_'+(play+1)+' li').eq(i+4).click();
								$('.play_'+(play+1)+' li').eq(i+5).click();
								return;
							}
						}
					}
					//连对
					if(type == 7){
						for(i=0;i<player[play].poker.length-5;i++){
							if(player[play].poker[i].num > max &&
							player[play].poker[i].num == player[play].poker[i+1].num &&
							player[play].poker[i+2].num - player[play].poker[i+1].num == 1 &&
							player[play].poker[i+2].num == player[play].poker[i+3].num && 
							player[play].poker[i+4].num - player[play].poker[i+3].num == 1 &&
							player[play].poker[i+4].num == player[play].poker[i+5].num){
								$('.play_'+(play+1)+' li').off('click');
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								$('.play_'+(play+1)+' li').eq(i+4).click();
								$('.play_'+(play+1)+' li').eq(i+5).click();
								return;
							}
						}
					}
					//顺子
					if(type==6){
						// console.log(game_data.desktop.poker[1].num);
						// console.log(type);
						// let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num > game_data.desktop.poker[1].num){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 1){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 2){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 3){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 4){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 5){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						// console.log(index.length);
						if(index.length == 6){
							for(i=0;i<index.length;i++){
								$('.play_'+(play+1)+' li').off('click');
								// console.log(i);
								$('.play_'+(play+1)+' li').eq(index[i]).click();
							}
						}else{
							$('.pass').eq(play).off('click');
							$('.pass').eq(play).trigger('click');
						}
					}
				break;
				case 7:
					//顺子
					if(type==6){
						// console.log(game_data.desktop.poker[1].num);
						// console.log(type);
						// let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num > game_data.desktop.poker[1].num){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 1){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 2){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 3){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 4){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 5){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 6){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						// console.log(index.length);
						if(index.length == 7){
							for(i=0;i<index.length;i++){
								$('.play_'+(play+1)+' li').off('click');
								// console.log(i);
								$('.play_'+(play+1)+' li').eq(index[i]).click();
							}
						}else{
							$('.pass').eq(play).off('click');
							$('.pass').eq(play).trigger('click');
						}
					}
				break;
				case 8:
					//顺子
					if(type==6){
						// console.log(game_data.desktop.poker[1].num);
						// console.log(type);
						// let game_data = {boss:-1, play:-1, desktop:{type:0,max:0, poker:[]}}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num > game_data.desktop.poker[1].num){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 1){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 2){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 3){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 4){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 5){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 6){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						for(i=0;i<player[play].poker.length;i++){
							if(player[play].poker[i].num - player[play].poker[index[0]].num == 7){
								if(player[play].poker[i].num < 11){
									index.push(i);
									// console.log(index);
									// console.log(1);
									break;
								}
							}
						}
						// console.log(index.length);
						if(index.length == 8){
							for(i=0;i<index.length;i++){
								$('.play_'+(play+1)+' li').off('click');
								// console.log(i);
								$('.play_'+(play+1)+' li').eq(index[i]).click();
							}
						}else{
							$('.pass').eq(play).off('click');
							$('.pass').eq(play).trigger('click');
						}
					}
					//对子
					if(type == 7){
						for(i=0;i<player[play].poker.length-7;i++){
							if(player[play].poker[i].num > max && player[play].poker[i].num == player[play].poker[i+1].num && player[play].poker[i+2].num == player[play].poker[i+3].num && player[play].poker[i+4].num == player[play].poker[i+5].num && player[play].poker[i+6].num == player[play].poker[i+7].num){
								$('.play_'+(play+1)+' li').off('click');
								$('.play_'+(play+1)+' li').eq(i).click();
								$('.play_'+(play+1)+' li').eq(i+1).click();
								$('.play_'+(play+1)+' li').eq(i+2).click();
								$('.play_'+(play+1)+' li').eq(i+3).click();
								$('.play_'+(play+1)+' li').eq(i+4).click();
								$('.play_'+(play+1)+' li').eq(i+5).click();
								$('.play_'+(play+1)+' li').eq(i+6).click();
								$('.play_'+(play+1)+' li').eq(i+7).click();
								return;
							}
						}
					}
				break;
			}
		}else{
			$('.play_'+(play+1)+' li').removeClass('selected');
			for(i=0;i<3;i++){
			player[i].selected.type = 0;
			player[i].selected.max = 0;
			player[i].selected.poker = [];
		}
	}
}

	// 生成牌面的HTML代码的函数
	function makePoker(poker){
		// console.log(poker);
		let colors = [
			{x:-16, y:-226},		// 方块花色的坐标
			{x:-16, y:-8},			// 梅花花色的坐标
			{x:-160, y:-8},			// 红桃花色的坐标
			{x:-160, y:-226},		// 黑桃花色的坐标
		];

		let x, y;
		if(poker.num != 14){
			x = colors[poker.color].x;
			y = colors[poker.color].y;
		}else {
			if(poker.color == 0){
				x = -160;
				y = -8;
			}else {
				x = -16;
				y = -8;
			}
		}
		let html = '<li data-num="'+poker.num+'" data-color="'+poker.color+'" style="width: 125px; height: 175px; background: url(./images/'+poker.num+'.png) '+x+'px '+y+'px;"></li>';
		return html;
	}

	// 牌组排序函数
	function sortPoker(poker_data){
		// arr = [{num:10, color: 0},{num:8, color: 3},{num:8, color: 1},{num:13, color: 3}];
		poker_data.sort(function(x, y){
			if(x.num != y.num){
				return x.num - y.num;
			}else {
				return x.color - y.color;
			}
		});
		return true;
	}

	// 玩家手牌排序动画函数
	// 这个函数中使用了回调函数的方法，可以让动画结束后再按需要执行我们想要执行的语句
	function sortPokerAnimate(play, fun){
		// 1、删除原牌
		$('.play_'+(play+1)+' li').remove();
		// 2、生成牌背
		let temp = '';
		$(player[play].poker).each(function(i){
			temp += '<li class="back" style="left:'+i*30+'px;"></li>';
		});
		$('.play_'+(play+1)).html(temp).fadeIn();


		// 等0.3秒后生成新的牌面
		setTimeout(function(){
			// 删除牌背
			$('.play_'+(play+1)+' li').remove();

			// 循环生成新的牌面
				$(player[play].poker).each(function(i){
					temp = makePoker(player[play].poker[i]);
					$('.play_'+(play+1)+'').append(temp);
					$('.play_'+(play+1)+' li:last').css({'left':i*30+'px'});
				})
			// 判断fun这个值是否有函数传进来，如果有的话，再执行它
			// console.log(typeof fun);
			if(typeof fun == 'function'){
				fun();
			}
		}, 300);
	}

	// 牌型判断的函数
	function checkPoker( data ){
		/*
			牌型判断需要通不同牌张数来各自进行判断的
			牌型代码：
			1 			单张
			2 			对子
			3 			三张
			4  			三带一
			5 			三带二
			6 			顺子
			7  			连对
			8 			飞机
			9 			四带二
			100 		炸弹
			110 		王炸

			1张牌单张
			2.张牌对子
			4.炸弹  三带1
			5张 顺子  三带1对
			6张 顺子 连对  飞机  四带2个        
			7张 顺子
			8张 顺子 连对 飞机
			9张 顺子 飞机
			10张 顺子 连对 飞机
			11张 顺子
			12张 顺子 连对 飞机
			14张 连对
			15张 飞机
			16张 连对 飞机
			18张 连对 飞机
			20张 连对 飞机


		 */
		// 手牌数据重新排序
		sortPoker(data.poker);
		let poker = data.poker;
		// console.log(poker.length);

		// 先判断一次牌子是否为顺子
		if(poker.length >= 5 && poker.length <= 12){
			// console.log(poker[poker.length-1]);
			// alert(123)-----------------------------------为什么会输出两次！！！！！---------------------------//
			// console.log(poker[0].num+1);
			if(checkStraight(poker)){
				data.type = 6;		// 设置牌型为顺子
				data.max = poker[poker.length-1].num;		// 设置牌型判断值
				return true;
				// console.log(poker[poker.length-1]);
			}
		}

		switch(data.poker.length){
			// 没有牌的情况
			case 0:
				return false;
			break;

			// 一张牌的情况
			case 1:
				data.type = 1;		// 设置牌型为单张
				data.max = poker[0].num;		// 设置牌型判断值
				return true;
			break;

			// 两张牌的情况
			case 2:
				// 判断两张牌的点数是否相同
				if(poker[0].num != poker[1].num){
					return false;
				}
				// 判断牌型是对子还是王炸
				if(poker[0].num != 14){
					data.type = 2;		// 设置牌型为对子
					data.max = poker[0].num;		// 设置牌型判断值
				}else{
					data.type = 110;		// 设置牌型为王炸
					data.max = poker[0].num;		// 设置牌型判断值
				}
				return true;
			break;

			// 三张牌的情况
			case 3:
				if(poker[0].num == poker[2].num){
					data.type = 3;		// 设置牌型为三张
					data.max = poker[0].num;		// 设置牌型判断值
					return true;
				}else {
					return false;
				}
			break;

			// 四张牌的情况
			case 4:
				// 先判断是否为炸弹
				if(poker[0].num == poker[3].num){
					data.type = 100;		// 设置牌型为炸弹
					data.max = poker[0].num;		// 设置牌型判断值
					return true;
				}
				// 再判断是否为三带一
				if(poker[0].num == poker[2].num || poker[1].num == poker[3].num){
					data.type = 4;		// 设置牌型为三带一
					data.max = poker[1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			// 五张牌的情况
			case 5:
				// 判断牌型是否为三带二
				if(poker[0].num == poker[2].num && poker[3].num == poker[4].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[4].num
					){
					data.type = 5;		// 设置牌型为三带二
					data.max = poker[2].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;

			// 六张牌的情况
			case 6:
				// 判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				/*
					333444
				 */
				// 判断是否为6张牌的飞机
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[1].num+1 == poker[4].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}

				// 判断是否为四带二
				/*
					444456
					567777
					566667
				 */
				if(poker[0].num == poker[3].num || poker[2].num == poker[5].num || poker[1].num == poker[4].num){
					data.type = 9;		// 设置牌型为四带二
					data.max = poker[2].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 7:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
					// console.log(poker[poker.length-1]);
				}else{
					return false;
				}
			break;
			case 8:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				if(poker[0].num != poker[7].num && poker[1].num == poker[3].num && poker[1].num +1== poker[4].num && poker[4].num== poker[6].num ||
				   poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[0].num +1== poker[3].num && poker[6].num!= poker[7].num	||
				   poker[0].num != poker[1].num && poker[2].num == poker[4].num && poker[5].num == poker[7].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[5].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 9:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为9张牌的飞机
				//333444555
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[1].num+1 == poker[4].num && poker[4].num+1 == poker[7].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 10:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为飞机（三个带一对的飞机）
				//4442255533
				//2233444555
				//4445556677
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[7].num && poker[8].num== poker[9].num && poker[0].num+1== poker[3].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num== poker[9].num && poker[4].num+1== poker[7].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num== poker[9].num  && poker[2].num+1== poker[5].num
					){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 11:
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
			break;
			case 12:
				//最长最大的顺子
				if(checkStraight(poker)){
					data.type = 6;		// 设置牌型为顺子
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				// 判断是否为飞机（三带一的飞机）
				// 123444555655
				// 111222333456
					if(poker[9].num != poker[10].num && poker[10].num != poker[11].num && poker[0].num == poker[2].num && poker[3].num== poker[5].num  && poker[0].num+1== poker[3].num && poker[3].num+1== poker[6].num&& poker[6].num+1== poker[9].num||
					poker[0].num != poker[1].num && poker[0].num != poker[11].num && poker[2].num == poker[4].num && poker[5].num== poker[7].num  && poker[8].num== poker[10].num && poker[2].num+1== poker[5].num&& poker[5].num+1== poker[8].num||
					poker[0].num != poker[11].num && poker[0].num != poker[10].num && poker[1].num == poker[4].num && poker[4].num== poker[7].num  && poker[1].num== poker[3].num && poker[4].num+1== poker[6].num&& poker[7].num+1== poker[9].num||
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[1].num+1 == poker[4].num && poker[4].num+1 == poker[7].num
					){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[8].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 14:
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 15:
				//判断是否为三带一对的飞机   和3个在飞机
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[7].num && poker[8].num== poker[9].num && poker[0].num+1== poker[3].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num== poker[9].num && poker[4].num+1== poker[7].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num== poker[9].num  && poker[2].num+1== poker[5].num ||
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[1].num+1 == poker[4].num && poker[4].num+1 == poker[7].num

					){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 16:
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				// 判断是否为飞机（三带一的飞机）
				// 123444555655
				// 111222333456
					if(poker[9].num != poker[10].num && poker[10].num != poker[11].num && poker[0].num == poker[2].num && poker[3].num== poker[5].num  && poker[0].num+1== poker[3].num && poker[3].num+1== poker[6].num&& poker[6].num+1== poker[9].num||
					poker[0].num != poker[1].num && poker[0].num != poker[11].num && poker[2].num == poker[4].num && poker[5].num== poker[7].num  && poker[8].num== poker[10].num && poker[2].num+1== poker[5].num&& poker[5].num+1== poker[8].num||
					poker[0].num != poker[11].num && poker[0].num != poker[10].num && poker[1].num == poker[4].num && poker[4].num== poker[7].num  && poker[1].num== poker[3].num && poker[4].num+1== poker[6].num&& poker[7].num+1== poker[9].num||
					poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[1].num+1 == poker[4].num && poker[4].num+1 == poker[7].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[8].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 18:
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
					if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[8].num && poker[1].num+1 == poker[4].num && poker[4].num+1 == poker[7].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
			case 20:
				//判断是否为连对
				if(checkPair(poker)){
					data.type = 7;		// 设置牌型为连对
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				//判断是否为三带一对的飞机
				if(poker[0].num == poker[2].num && poker[3].num == poker[5].num && poker[6].num == poker[7].num && poker[8].num== poker[9].num && poker[0].num+1== poker[3].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[3].num && poker[4].num == poker[6].num && poker[7].num== poker[9].num && poker[4].num+1== poker[7].num ||
					poker[0].num == poker[1].num && poker[2].num == poker[4].num && poker[5].num == poker[7].num && poker[8].num== poker[9].num  && poker[2].num+1== poker[5].num){
					data.type = 8;		// 设置牌型为飞机
					data.max = poker[poker.length-1].num;		// 设置牌型判断值
					return true;
				}
				return false;
			break;
		}

		// 判断牌组是否为顺子的函数
		// poker = player[play].selected.poker
		function checkStraight(poker){
			//判断最大值的那张牌不能是2或者是王
			if(poker[poker.length-1].num == 13 || poker[poker.length-1].num == 14){
				return false;
			}

			// 通过循环来判断牌组数据是否为顺子
			for(let i=0; i<poker.length-1; i++){
				if(poker[i].num + 1 != poker[i+1].num){
					return false;
				}
			}
			return true;
		}
		// 判断牌组是否为连对的函数
		function checkPair(poker){
			/*
				33 44 55 66
			 */
			// 通过循环来判断牌组数据是否为连对
			for(let i=0; i<poker.length-3; i += 2){
				if(poker[i].num != poker[i+1].num || poker[i].num+1 != poker[i+2].num || poker[i+2].num != poker[i+3].num){
					return false;
				}
			}
			return true;
		}
	}

	// 出牌时比较两个牌组的方法
	function checkVS(play){
		// 判断必然可以胜出的情况
		if(player[play].selected.type == 110 || game_data.desktop.type == 0){
			return true;
		}

		// 判断必然会输的情况
		if(game_data.desktop.type == 110){
			return false;
		}

		// 判断综合情况
		// 情况1，出的是炸弹，旧面的牌不是炸弹
		if(player[play].selected.type == 100 && game_data.desktop.type !=100){
			return true;
		}

		// 特殊情况大小王对比
		if(player[play].selected.poker[0].num == 14 && game_data.desktop.poker[0].num == 14){
			if(player[play].selected.poker[0].color > game_data.desktop.poker[0].color){
				return true;
			}else{
				return false;
			}
		}

		// 正常情况下两组牌对比的方法
		if(player[play].selected.type != game_data.desktop.type){
			return false;
		}else{
			if(player[play].selected.poker.length != game_data.desktop.poker.length ){
				return false;
			}else{
				if(player[play].selected.max > game_data.desktop.max){
					return true;
				}else{
					return false;
				}
			}
		}
	}
	// 设置一个一维数组数值为1，用于存倍数
	let multiple=[15];
	function beishu(data){
		// dta判断是否加倍数
		if(data==110||data==100||data==8||data==6||data==4||data==5||data==999||data==7){
			// 有上面的牌型每次乘2倍
			multiple[0]=multiple[0]*2;
			// console.log(multiple[0]);
			// 修改html显示倍数效果
			$('#beishu').html(multiple[0]);
			return multiple[0];
		}
	}
	function score(poker,play){
		// console.log(play);
		// 通过地主的牌是否为零来判断谁赢了
		// 如果地主赢了
		if(poker == 0){	
			for(i=0;i<3;i++){
				if(i==play){
					// 地主积分
					 player[i].score = player[i].score+multiple[0]*10;
					$(".scoreEnd").eq(play).html(player[play].score);
					continue;
				}else{
					// 农民积分
					player[i].score = player[i].score-multiple[0]*10/2;
					$(".scoreEnd").eq(i).html(player[i].score);
				}
			}
			audioOther(8);
			$("#C1").html('地主胜利！你赢了');
		}else{
			for(i=0;i<3;i++){
				if(i==play){
					// 地主积分
					player[i].score = player[i].score-multiple[0]*10;
					$(".scoreEnd").eq(play).html(player[play].score);
					// console.log(i);
					continue;
				}else{
					// 农民积分
					player[i].score = player[i].score+multiple[0]*10/2;
					$(".scoreEnd").eq(i).html(player[i].score);
					// console.log(i);
				}
			}
			audioOther(9);
			$("#C1").html('农民胜利！你输了');
		}			
	}
});