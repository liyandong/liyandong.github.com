var ff_root="/";var ff_width=970;var ff_height=535;var ff_showlist=0;var ff_second=5;var ff_qvod="http://dl.kuaibo.com/QvodSetup5.exe";var ff_gvod="http://dl.client.baidu.com/BaiduPlayer/BaiduPlayer.exe";var ff_pvod="http://dl.pipi.cn/pipi_3315.exe";var ff_web9="http://download.webplayer9.com/WP9Setup.P2P.exe";var ff_bdhd="http://dl.client.baidu.com/BaiduPlayer/BaiduPlayer.exe";var ff_pplive="";var ff_buffer="http://gengu.sinaapp.com/tip/?t=加载可能需数秒钟，请耐心等待…";var ff_down_a="down_a";var ff_down_b="down_b";var play_qvod="快播高清";var play_bdhd="百度影音";var play_yuku="优酷视频";var play_tudou="土豆视频";var play_qiyi="奇艺高清";var play_pvod="皮皮高清";var play_baofeng="暴风影音";var play_sinahd="新浪视频";var play_sohu="搜狐视频";var play_ku6="酷六视频";var play_qq="腾讯视频";var play_web9="久久影音";var play_gvod="迅播高清";var play_down="影片下载";var play_swf="Swf动画";var play_flv="Flv视频";var play_pptv="PPTV视频";var play_pplive="PPTV直播";var play_letv="乐视视频";var play_cntv="cntv高清";var play_cool="酷播高清";var play_media="Media Player";var play_real="Real Player";
document.write('<style>.FF{background:#000000;font-size:13px;color:#F6F6F6;margin:0px;padding:0px;position:relative;overflow:hidden;width:'+ff_width+'px;height:'+(ff_height+30)+'px;}.FF table{text-align:center;width:100%;}.FF a{color:#F6F6F6;text-decoration:none}.FF a:hover{text-decoration:underline;}.FF a:active{text-decoration:none;}.FF ul,.FF li,.FF h2{margin:0px;padding:0px;list-style:none}.FF .top{text-align:center;width:100%}.FF #topleft,.FF #topright{width:100px;}.FF #topleft{text-align:left;padding-left:5px}.FF #topright{text-align:right;padding-right:5px}.FF #playleft{width:100%;height:100%;overflow:hidden;}.FF #playright{}.FF #list{width:120px;overflow:auto;overflow-x:hidden;scrollbar-face-color:#2c2c2c;scrollbar-arrow-color:#fff;scrollbar-track-color:#a3a3a3;scrollbar-highlight-color:#2c2c2c;scrollbar-shadow-color:#adadad;scrollbar-3dlight-color:#adadad;scrollbar-darkshadow-color:#48486c;scrollbar-base-color:#fcfcfc;text-align:left}.FF #list div{color:#F6F6F6;padding-left:2px;}.FF #list span{height:21px;line-height:21px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.FF #list span a{background:url('+ff_root+'Public/images/player/list.gif) no-repeat 2px 5px;padding-left:15px;display:block;font-size:12px}.FF #list h2{cursor:pointer;font-size:13px;font-family:"宋体";font-weight:normal;height:25px;line-height:25px;background:#333333;padding-left:5px;margin-bottom:1px}.FF #list .h2{color:#666666}.FF #list .h2_on{color:#FFFFFF}.FF #list .ul_on{display:block}.FF #list .list_on{color:#FF0000}</style>');
var $$ = function (value) {
    return document.getElementById(value)
};
var killErrors = function (value) {
    return true
};
window.onerror = null;
window.onerror = killErrors;
var Player = {
'ParentUrl': document.URL,
'ParentServerName': server_name.split("$$$"),
'ParentPlayerName': player_name.split("$$$"),
'Urllist': decodeURIComponent(url_list).split("$$$"),
'Id': '',
'Sid': '',
'Pid': '',
'Url': '',
'NextUrl': '',
'UrlName': '',
'UrlNextName': '',
'ServerUrl': '',
'ServerName': '',
'PlayerName': '',
'LastWebPage': '',
'NextWebPage': '',
'Root': ff_root,
'Buffer': ff_buffer,
'Pase': ff_buffer,
'Width': ff_width,
'Height': ff_height,
'Second': ff_second,
'Down_Gvod': 'http://union.feifeicms.com/install/gvod.html###' + ff_gvod + '###ppvod',
'Show': function () {
        if (ff_showlist == 1) {
            var list_show = 'block'
        } else {
            var list_show = 'none'
        };
        if (this.NextWebPage) {
            var NextWebPage = this.NextWebPage
        } else {
            var NextWebPage = this.ParentUrl
        };
        $$('topleft').innerHTML = '<a href="' + this.LastWebPage + '">上一集</a> <a href="' + NextWebPage + '">下一集</a>';
        $$('topcc').innerHTML = '<div id="playppvod" style="height:26px;line-height:26px;overflow:hidden">正在播放：' + list_name + '\x20' + vod_name + '\x20' + this.UrlName + '</div>';
        $$('topright').innerHTML = '<a href="javascript:void(0)" onClick="Player.ShowList();">开启/关闭列表</a>';
        $$('playleft').innerHTML = '<iframe src="' + this.Buffer + '" id="buffer" name="buffer" width="100%" height="' + this.Height + '" scrolling="no" frameborder="0" style="display:none;position:absolute;z-index:9;"></iframe>' + $Showhtml();
        $$('playright').style.height = this.Height + '\x70\x78';
        $$('playright').innerHTML = '<div id="list" style="display:' + list_show + ';height:' + this.Height + 'px">' + this.CreateList() + '</div>';
        //document.write('<scr' + 'ipt src="http://union.feifeicms.com/top/ff.js" type="text/javascript"></scr' + 'ipt>')
    },
    'BufferHide': function () {
        $$("buffer").style.display = "none"
    },
    'CreateList': function () {
        var count_play = this.ParentPlayerName.length;
        var html = '';
        for (var i = 0; i < count_play; i++) {
            if (this.Sid == i) {
                ul_display = 'display:block';
                h2class = 'h2_on'
            } else {
                ul_display = 'display:none';
                h2class = 'h2'
            };
            var count_urls = this.Urllist[i].split("+++");
            var sid_on;
            var sub_on;
            var html_sub;
            html_sub = '<div style="' + ul_display + '" id="sub' + i + '">';
            for (var j = 0; j < count_urls.length; j++) {
                var href = this.ParentUrl.replace('sid-' + this.Sid + '-pid-' + this.Pid, 'sid-' + i + '-pid-' + (j + 1)).replace(this.Id + '-' + this.Sid + '-' + this.Pid, this.Id + '-' + i + '-' + (j + 1));
                if (this.Sid == i && this.Pid == (j + 1)) {
                    var li_on = ' class="list_on"'
                } else {
                    li_on = ''
                };
                html_sub += '<span><a href="' + href + '" title="' + count_urls[j].split("++")[0] + '" ' + li_on + '>' + count_urls[j].split("++")[0] + '</a></span>'
            };
            html_sub += '</div>';
            html += '<div id="main' + i + '" class="' + h2class + '">';
            html += '<h2 onclick="Player.Tabs(' + i + ',' + (count_play - 1) + ')">>>' + eval('play_' + this.ParentPlayerName[i]) + '</h2>';
            html += html_sub;
            html += '</div>'
        };
        return html
    },
    'ShowList': function () {
        if ($$('list').style.display == "none") {
            $$('list').style.display = "block"
        } else {
            $$('list').style.display = "none"
        }
    },
    'Tabs': function (no, n) {
        var subdisply = $$('sub' + no).style.display;
        for (var i = 0; i <= n; i++) {
            $$('main' + i).className = 'h2';
            $$('sub' + i).style.display = 'none'
        };
        $$('main' + no).className = 'h2_on';
        if (subdisply == 'none') {
            $$('sub' + no).style.display = 'block'
        } else {
            $$('sub' + no).style.display = 'none'
        }
    },
    'Install': function () {
        var downurl = eval('ff_' + this.PlayerName);
        $$("install").innerHTML = '<iframe border="0" src="http://gengu.sinaapp.com/tip/?p=' + this.PlayerName + '&u=' + downurl + '" marginWidth="0" frameSpacing="0" marginHeight="0" frameBorder="0" noResize scrolling="no" width="100%" height="' + this.Height + '" vspale="0"></iframe>';
        $$('install').style.display = 'block'
    },
    'Html': function () {
        document.write('<div class="FF"><table border="0" cellpadding="0" cellspacing="0"><tr><td colspan="2"><table><tr><td width="100" id="topleft"></td><td id="topcc"></td><td width="100" id="topright"></td></tr></table></td></tr><tr><td colspan="2" id="install" style="display:none"></td></tr><tr><td id="playleft" valign="top">&nbsp;</td><td id="playright" valign="top">&nbsp;</td></tr></table></div>')
    },
    'Play': function () {
        this.Html();
        var URL = this.ParentUrl.match(/\d+.*/g)[0].match(/\d+/g);
        var Count = URL.length;
        this.Id = URL[(Count - 3)] * 1;
        this.Sid = URL[(Count - 2)] * 1;
        this.Pid = URL[(Count - 1)] * 1;
        this.ServerName = this.ParentServerName[this.Sid];
        this.PlayerName = this.ParentPlayerName[this.Sid];
        if (this.ServerName) {
            this.ServerUrl = eval('ff_' + this.ServerName)
        };
        var UrlArr = this.Urllist[this.Sid].split("+++");
        this.Pid = Math.min(this.Pid, UrlArr.length);
        this.Url = this.ServerUrl + UrlArr[this.Pid - 1].split("++")[1];
        this.NextUrl = this.ServerUrl + UrlArr[Math.min(this.Pid + 1, UrlArr.length) - 1].split("++")[1];
        this.UrlName = UrlArr[this.Pid - 1].split("++")[0];
        this.UrlNextName = UrlArr[Math.min(this.Pid + 1, UrlArr.length) - 1].split("++")[0];
        var LastPid = Math.max(Math.abs(this.Pid - 1), 1);
        this.LastWebPage = this.ParentUrl.replace('sid-' + this.Sid + '-pid-' + this.Pid, 'sid-' + this.Sid + '-pid-' + LastPid).replace(this.Id + '-' + this.Sid + '-' + this.Pid, this.Id + '-' + this.Sid + '-' + LastPid);
        var NextPid = Math.min(this.Pid + 1, UrlArr.length);
        this.NextWebPage = this.ParentUrl.replace('sid-' + this.Sid + '-pid-' + this.Pid, 'sid-' + this.Sid + '-pid-' + NextPid).replace(this.Id + '-' + this.Sid + '-' + this.Pid, this.Id + '-' + this.Sid + '-' + NextPid);
        if (this.Url == this.NextUrl) {
            this.NextWebPage = ''
        };
    }
}
Player.Play();