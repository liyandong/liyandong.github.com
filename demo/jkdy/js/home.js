var FF = {
	//初始化前端js
	'Home': {
		'Url': document.URL,
		'Tpl': 'defalut',
		'Channel': '',
		'GetChannel': function ($sid){
			if($sid == '1') return 'vod';
			if($sid == '2') return 'news';
			if($sid == '3') return 'special';
		},
		'Js': function() {
			//获取频道名
			this.Channel = this.GetChannel(Sid);
			//加入收藏夹
			$("#fav").click(function(){
				var url = window.location.href;					 
				try{
					window.external.addFavorite(url,document.title);
				}catch(err){
					try{
						window.sidebar.addPanel(document.title, url,"");
					}catch(err){
						alert("请使用Ctrl+D为您的浏览器添加本站到书签，谢谢");
					}
				}
			});
		}
	},
	//监听顶踩操作事件
	'UpDown': {
		'Vod': function($ajaxurl) {
			if($("#Up").length || $("#Down").length){
				this.Ajax($ajaxurl,'vod','');
			}
			$('.Up').click(function(){					
				FF.UpDown.Ajax($ajaxurl,'vod','up');
			});
			$('.Down').click(function(){
				FF.UpDown.Ajax($ajaxurl,'vod','down');
			});
		},
		'News': function($ajaxurl) {
			if($("#Digup").length || $("#Digdown").length){
				this.Ajax($ajaxurl,'news','');
			}else{
				FF.UpDown.Show($("#Digup_val").html()+':'+$("#Digdown_val").html(),'news');
			}
			$('.Digup').click(function(){
				FF.UpDown.Ajax($ajaxurl,'news','up');
			});
			$('.Digdown').click(function(){					
				FF.UpDown.Ajax($ajaxurl,'news','down');
			});
		},		
		'Ajax': function($ajaxurl,$model,$ajaxtype){
			$.ajax({
				type: 'get',
				url: $ajaxurl+'-type-'+$ajaxtype,
				timeout: 5000,
				dataType:'json',
				success:function($html){
					if(!$html.status){
						alert($html.info);
					}else{
						FF.UpDown.Show($html.data,$model);
						//if($ajaxtype){alert($html.info);}
					}
				}
			});
		},
		'Show': function ($html,$model){
			if($model == 'vod'){
				$(".Up>span").html($html.split(':')[0]);
				$(".Down>span").html($html.split(':')[1]);
			}else if($model = 'news'){
				var Digs = $html.split(':');
				var sUp = parseInt(Digs[0]);
				var sDown = parseInt(Digs[1]);
				var sTotal = sUp+sDown;
				var spUp=(sUp/sTotal)*100;
				var spUp = Math.round(spUp*10)/10;
				var spDown = 100-spUp;
				var spDown = Math.round(spDown*10)/10;
				if(sTotal!=0){
					$('#Digup_val').html(sUp);
					$('#Digdown_val').html(sDown);
					$('#Digup_sp').html(spUp+'%');
					$('#Digdown_sp').html(spDown+'%');
					$('#Digup_img').width(parseInt((sUp/sTotal)*55));
					$('#Digdown_img').width(parseInt((sDown/sTotal)*55));
				}				
			}
		}
	},
	//监听评分事件
	'Gold': {
		'Default': function($ajaxurl){
			if($(".Goldnum").length || $(".Golder").length){
				$.ajax({
					type: 'get',
					url: $ajaxurl,
					timeout: 5000,
					dataType:'json',
					error: function(){
						$("p.gold").html('非常抱歉，评分部分加载出错！');
					},
					success: function($html){
						FF.Gold.Show($ajaxurl,$html.data,'');
					}
				});
			}
		},
		'Show': function($ajaxurl,$html,$status){
			//去除与创建title提示
			$(".Goldtitle").remove();
			$(".Gold").after('<span class="Goldtitle" style="width:'+$(".Gold").width()+'px"></span>');
			$(".Goldtitle").css({margin:'20px 0 0 -95px'});
			if($status == 'onclick'){
				$(".Goldtitle").html('评分成功！');
				$(".Goldtitle").show();
				$status = '';
			}
			//展示星级>评分>评分人
			$(".Gold").html(FF.Gold.List($html.split(':')[0]));
			$(".Goldnum").html($html.split(':')[0]);
			$(".Golder").html($html.split(':')[1]);
			//鼠标划过
			$(".Gold>span").mouseover(function(){
				$id = $(this).attr('id')*1;
				$(".Goldtitle").html(FF.Gold.Title($id*2));
				$(".Goldtitle").show();
				//刷新星级图标
				$bgurl = $(this).css('background-image');
				for(i=0;i<5;i++){
					if(i>$id){
						$(".Gold>#"+i+"").css({background:$bgurl+" 41px 0 repeat"});
					}else{
						$(".Gold>#"+i+"").css({background:$bgurl});
					}
				}
			});
			//鼠标移出
			$(".Gold>span").mouseout(function(){
				//去除title提示	
				$(".Goldtitle").hide();
				//刷新星级图标
				$score = $html.split(':')[0]*1/2;
				$id = $(this).attr('id')*1;
				$bgurl = $(this).css('background-image');
				for(i=0;i<5;i++){
					if(i<Math.round($score)){
						if(i == parseInt($score)){
							$(".Gold>#"+i+"").css({background:$bgurl+" 20px 0 repeat"});
						}else{
							$(".Gold>#"+i+"").css({background:$bgurl});
						}
					}else{
						$(".Gold>#"+i+"").css({background:$bgurl+" 41px 0 repeat"});
					}
				}
			});
			//鼠标点击
			$(".Gold>span").click(function(){
				$.ajax({
					type: 'get',
					url: $ajaxurl+'-type-'+(($(this).attr('id')*1+1)*2),
					timeout: 5000,
					dataType:'json',
					error: function(){
						$(".Goldtitle").html('评分失败!');
					},
					success: function($html){
						if(!$html.status){
							//alert($html.info);
							$(".Goldtitle").html($html.info);
							$(".Goldtitle").show();
						}else{
							FF.Gold.Show($ajaxurl,$html.data,'onclick');
						}
					}
				});
			});
		},
		//星级评分展示
		'List': function($score){
			var $html = '';
			var $score = $score/2;
			for(var i = 0 ; i<5; i++){
				var classname = 'all';
				if(i < $score && i<Math.round($score)){
					if(i == parseInt($score)){
						var classname = 'half';
					}
				}else{
					var classname = 'none';
				}
				$html += '<span id="'+i+'" class="'+classname+'"></span>';// title="'+this.GoldTitle(i*2)+'"
			}
			return $html;
		},
		//提示信息
		'Title': function($score){//星级鼠标浮层提示信息
			var array_str = ['很差！','一般！','不错！','很好！','力荐！'];
			var $score = parseFloat($score);
			if($score < 2.0) return array_str[0];
			if($score>=2.0 && $score<4.0) return array_str[1];
			if($score>=4.0 && $score<6.0) return array_str[2];
			if($score>=6.0 && $score<8.0) return array_str[3];
			if($score>=8.0) return array_str[4];
		}
	},
	//图片延时加载 FF.Lazyload.Box('frame'); <img class="lazy" data-original="{$ppvod.vod_picurl}" src="/images/blank.gif" alt="xx" />
	'Lazyload':{
		'Show': function(){
			$("img.lazy").lazyload();
		},
		//指定ID范围内的效果
		'Box': function($xxx){
			$("img.lazy").lazyload({         
				 container: $($xxx)
			});	
		}
	},
	//Cookie FF.Cookie.Set(name,value,days);
	'Cookie': {
		'Set': function(name,value,days){
			var exp = new Date();
			exp.setTime(exp.getTime() + days*24*60*60*1000);
			var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			document.cookie=name+"="+escape(value)+";path=/;expires="+exp.toUTCString();
		},
		'Get': function(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){
				return unescape(arr[2]);
				return null;
			}
		},
		'Del': function(name){
			var exp = new Date();
			exp.setTime(exp.getTime()-1);
			var cval = this.Get(name);
			if(cval != null){
				document.cookie = name+"="+escape(cval)+";path=/;expires="+exp.toUTCString();
			}
		}
	}
}
var pagego = function($url,$total){
	$page = document.getElementById('page').value;
	if($page>0 && ($page<=$total)){
		$url=$url.replace('{!page!}',$page);
		if($url.split('index-1')){
			$url=$url.split('index-1')[0];
		}
		top.location.href = $url;
	}
	return false;
}
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('x k$=[\'\',\'#\',\'G\',\'#y\',\'<t>1B。</t>\',\'#y\',\'#y\',\'#y\',\'G\',\'<S D="y" 1g="y" 1h="1i:1t;1z:1A;">\',\'<1d><K>1x</K><a A="Z:1e(0)" 1b="n.p.T();">1y</a> | <a A="Z:1e(0)" 1b="n.p.J();">1o</a></1d>\',\'<t D="1l">\',\'<t D="1m">\',\'<I D="1r">[<a A="\',\'">\',\'</a>]<a A="\',\'" X="\',\'">\',\'</a></I><I D="1q"><K 1p="1s"><a A="\',\'" X="\',\'">\',\'</a></K></I></t>\',\'<t>1n。</t>\',\'</S>\',\'#\',\'G\',\'{V:[{"v":"\',\'","F":"\',\'","u":"\',\'","E":"\',\'","w":"\',\'","z":"\',\'","C":"\',\'"},\',\'{"v":"\',\'","F":"\',\'","u":"\',\'","E":"\',\'","w":"\',\'","z":"\',\'","C":"\',\'"},\',\',\',"]}",\'{V:[{"v":"\',\'","F":"\',\'","u":"\',\'","E":"\',\'","w":"\',\'","z":"\',\'","C":"\',\'"}]}\',\'G\'];x n={\'p\':{\'m\':k$[0],\'H\':W,\'1u\':o(a){l.1a(a);$(k$[1]+a).U(o(){n.p.N()},o(){n.p.R();})},\'T\':o(){L.M.1w(k$[2]);$(k$[3]).q(k$[4])},\'N\':o(){$(k$[5]).1v()},\'J\':o(){$(k$[6]).1k()},\'R\':o(){$(k$[7]).U(o(){n.p.H=1j;n.p.N()},o(){n.p.H=W;n.p.J()});s(n.p.H){n.p.J()}},\'1a\':o(a){x b=[];s(l.m){b=l.m}B{x c=L.M.Y(k$[8]);s(c!=1c){b=O(c)}};q=k$[9];q+=k$[10];s(b.Q>0){P($i=0;$i<b.Q;$i++){s($i%2==1){q+=k$[11]}B{q+=k$[12]};q+=k$[13]+b[$i].C+k$[14]+b[$i].z+k$[15]+b[$i].u+k$[16]+b[$i].v+k$[17]+b[$i].v+k$[18]+b[$i].E+k$[19]+b[$i].w+k$[20]+b[$i].w+k$[21]}}B{q+=k$[22]};q+=k$[23];$(k$[24]+a).1f(q);},\'2b\':o(a,b,c,d,e,f,g,h,i){x h=h-2;x j=L.M.Y(k$[25]);s(j!=1c){l.m=O(j);P($i=0;$i<l.m.Q;$i++){s(l.m[$i].u==c){l.m.1K($i,1)}};r=k$[26]+a+k$[27]+b+k$[28]+c+k$[29]+d+k$[1E]+e+k$[1R]+f+k$[1T]+g+k$[1L];P($i=0;$i<=h;$i++){s(l.m[$i]){r+=k$[1N]+l.m[$i].v+k$[1O]+l.m[$i].F+k$[1M]+l.m[$i].u+k$[1P]+l.m[$i].E+k$[1S]+l.m[$i].w+k$[1Q]+l.m[$i].z+k$[1F]+l.m[$i].C+k$[1C]}B{1D;}};r=r.1G(0,r.1J(k$[1H]));r+=k$[1I]}B{r=k$[1U]+a+k$[2c]+b+k$[2d]+c+k$[1X]+d+k$[1V]+e+k$[1Z]+f+k$[1Y]+g+k$[2a]};l.m=O(r);L.M.1W(k$[2e],r,i)}}}',62,139,'||||||||||||||||||||_|this|Json|MY|function|History|html|jsonstr|if|dd|vod_readurl|vod_name|played_jiname|var|history_box|list_name|href|else|list_url|class|played_url|vod_picurl|FF_Cookie|Display|div|Hide|span|FF|Cookie|Show|eval|for|length|FlagHide|dl|Clear|hover|video|true|title|Get|javascript|||||||||||Create|onclick|undefined|dt|void|after|id|style|display|false|hide|odd|even|暂无观看记录|关闭|align|ddR|ddL|right|none|List|show|Del|我们帮您记录了一周内最近的8部观看记录|清空|position|absolute|已清空观看记录|41|break|30|40|substring|42|43|lastIndexOf|splice|33|36|34|35|37|39|31|38|32|44|48|Set|47|50|49|||||||||||51|Insert|45|46|52'.split('|'),0,{}))
$(document).ready(function(){
	//系统初始化
	FF.Home.Js();
	//延时加载
	FF.Lazyload.Show();	
	//历史记录
	MY.History.List('history');
	//影视顶踩初始化
	FF.UpDown.Vod('http://'+siteDomain+'/index.php?s=Updown-'+FF.Home.Channel+'-id-'+Id);
	//新闻顶踩初始化
	FF.UpDown.News('http://'+siteDomain+'/index.php?s=Updown-'+FF.Home.Channel+'-id-'+Id);
	//积分初始化
	FF.Gold.Default('http://'+siteDomain+'/index.php?s=Gold-'+FF.Home.Channel+'-id-'+Id);
});