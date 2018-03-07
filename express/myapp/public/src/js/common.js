// 图片HTTPS
String.prototype.protocol = function(){

    var str = this;

    str = window.isSupportWebp ? (str.replace(/(\.jpg|\.png)/g, ".webp")) : str;

    return str.replace(/http:\/\/p\d\.qh[imgs]{3}/,"https://p.ssl.qhmsg");
};
// 自动适配协议
String.prototype.authorProtocol = function(){

    var str = this.replace("quc.qhimg", "p8.qhimg");

    str = window.isSupportWebp ? (str.replace(/(\.jpg|\.png)/g, ".webp")) : str;

    return str.replace(/http:\/\/p\d\.qh[imgs]{3}/,"https://p.ssl.qhmsg");
};

// 图片剪裁
String.prototype.drImage = function(w, h) {
    var url = this;
    var httpReg = /^http:\/\/p\d*\.qh(img|msg)\.com\//;
    var httpsReg = /^https:\/\/p\d*\.ssl\.qh(img|msg)\.com\//;
    h = h || w;
    
    if( httpReg.test(url) ) {
        return url.replace(httpReg, function(all) {
            return all + 'dr/' + [w, h, '/'].join('_')
        });
    } else if( httpsReg.test(url) ) {
        return url.replace(httpsReg, function(all) {
            return all + 'dr/' + [w, h, '/'].join('_');
        });
    } else {
        return url;
    }
};
try{
    $.ajaxSettings.cache = false;
}catch (err){}
try{
    $.ajaxSetup({
        cache:false
    });
}catch (err){}

//app端请求的userAgent
var appUserAgent = "qikooapp";
function appHideMenu(){
    //如果使用此页面的是app端 隐藏掉头部的返回箭头和菜单图标
    if (navigator.userAgent.toLocaleLowerCase().indexOf(appUserAgent.toLocaleLowerCase()) > 0) {
        $('.mod-sell-nav .nav-menu').hide();
        $('.mod-sell-nav .nav-back').hide();
        $('.mod-sell-nav .nav-menu-box').hide();
        $('#mod-sell-nav-footer').hide();
    }
}
$(document).ready(function(){
    appHideMenu();
});
var qk = {};

// 商城顶部导航条
qk.sellNav = (function(){
    var setCart = function(){
        $.get("/cart/getSkuNum",function(data){
            if(data && data.isSuccess && data.isSuccess==true){
                var showNum = data.data;
                if(data.data==0) {
                    showNum = '';
                    $('.cartnum').hide();
                    $('.mod-sell-nav .nav-menu i').hide();
                    $('#qkNavCart i').hide();
                    $('#carNum').hide();
                    // $('#qkNavCart i').removeClass('cart-count');
                    // $('.mod-sell-nav .nav-menu i').removeClass('msg-pop');
                }else{
                    $('.cartnum').show();
                    $('.mod-sell-nav .nav-menu i').show();
                    $('#qkNavCart i').show();
                    $('#carNum').show();
                    // $('#qkNavCart i').addClass('cart-count');
                    // $(".mod-sell-nav .nav-menu i").addClass('msg-pop');
                }
                $('#qkNavCart i').addClass('cart-count');
                $(".mod-sell-nav .nav-menu i").addClass('msg-pop');
                $('#qkNavCart i').text(showNum);
                $('.cartnum').text(showNum);
                $('#carNum').text(showNum);
            }else{
                $('.cartnum').hide();
                $('.mod-sell-nav .nav-menu i').hide();
                $('#qkNavCart i').hide();
                $('#carNum').hide();
            }
        },'json');
    }

    var init = function(){
        $('.mod-sell-nav .nav-menu').click(function(){
            $('.mod-sell-nav .nav-menu-box').toggle();
        });
        setBack();
        setCart();
    }

    var setBack = function(callback){
        $('.mod-sell-nav .nav-back').unbind("click");
        if(callback){
            $('.mod-sell-nav .nav-back').click(callback);
        }else{
            $('.mod-sell-nav .nav-back').click(function(){
                window.history.go(-1);
                //window.history.back();
                //window.location.href=document.referrer; 
            });
        }
    }

    var title = function(str){
        if(str === undefined){
            return $('.nav-title').html()
        }else{
            $('.nav-title').html(str)
        }
    }

    return {
        init : init,
        title : title,
        setBack : setBack
    }
})();



// 底部切换到电脑版
qk.footer = (function(){
    var init = function(){
        $('.return-to-pc').click(function(){
            $.fn.cookie('display-pc','1')
            location.reload();
        })
    }

    return {
        init : init
    }
})();



// 弹窗
qk.dialog = (function(){
    var eleDialog,eleDialogMain;


    var show = function(cfg){
        cfg = $.extend({
            content : '',
            width: '85%'
        },cfg);

        var html = [
            '<div class="mod-dialog">',
                '<div class="dialog-main">',
                    cfg.content,
                '</div>',
                '<div class="dialog-bg"></div>',
            '</div>'
        ].join('');

        eleDialog = $(html).appendTo('body').height($('body').height());

        eleDialogMain = eleDialog.find('.dialog-main').width(cfg.width);
        eleDialogMain.css({
            marginLeft : -eleDialogMain.width()/2,
            // top : ($(window).height() - eleDialogMain.height())/2
            top : $(window).scrollTop()+($(window).height() - eleDialogMain.height())/2
        })



        // 点击遮罩层任意位置，遮罩层、警告窗关闭
        eleDialog.find('.dialog-bg').height($(document).height()).click(function(){
            hide();
        })



        eleDialog.find('.dialog-close').click(function(){
            hide();
        })

        return eleDialog;
    }

    var hide = function(){
        eleDialog.hide();
    }

    return {
        show : show,
        hide : hide
    }
});


qk.dialog.confirm = function(cfg){
    cfg = $.extend({
        html : '',
        cancelText : '取消',
        okText : '确定',
        sureCallback: null,
        cancelCallback: null
    },cfg);

    var html = [
        '<div class="confirm-content clearfix">',
            cfg.html||'',
        '</div>',
        '<div class="confirm-console flexbox">',
            '<a href="#" onclick="return false;" class="btn-cancel flexitem">'+cfg.cancelText+'</a>',
            '<a href="#" onclick="return false;" class="btn-ok flexitem">'+cfg.okText+'</a>',
        '</div>'
    ].join('');

    var d = new qk.dialog;
    var eleDialog = d.show({
        content : html
    });

    eleDialog.find('.btn-cancel').click(function(){
        var ret = cfg.fnCancel && cfg.fnCancel();

        if(ret !== false){
            d.hide();
        };

        if(cfg.cancelCallback && typeof cfg.cancelCallback == "function"){
            return cfg.cancelCallback();
        };
    });

    eleDialog.find('.btn-ok').click(function(){
        var ret = cfg.fnOk && cfg.fnOk();

        if(ret !== false){
            d.hide();
        };
        if(cfg.sureCallback && typeof eval(cfg.sureCallback) == "function"){
            return cfg.sureCallback;
        };
    });

    return eleDialog;
};

qk.dialog.alert = function(){
    var cfg = {
        html : '',
        okText : '确定'
    };

    if(arguments.length==2){
        cfg = $.extend(cfg,{
            html : arguments[0],
            fnOk : arguments[1]
        })
    }else if(arguments.length==1 && typeof arguments[0] == 'object'){
        cfg = $.extend(cfg,arguments[0]);
    }else if(arguments.length==1){
        cfg = $.extend(cfg,{
            html : arguments[0]
        })
    }

    var html = [
        '<div class="confirm-content clearfix">',
            cfg.html||'',
        '</div>',
        '<div class="confirm-console flexbox">',
            '<a href="#" onclick="return false;" class="btn-ok flexitem">'+cfg.okText+'</a>',
        '</div>'
    ].join('');

    var d = new qk.dialog;
    var eleDialog = d.show({
        content : html
    })

    eleDialog.find('.btn-ok').click(function(){
        var ret = cfg.fnOk && cfg.fnOk();

        if(ret !== false){
            d.hide();
        }
    })

    return eleDialog


};

qk.dialog.loading = function(flag){
    if(!($(".commonMask").length>0)){
        var html = '<div class="commonMask"><img src="//static.i360mall.com/h5/images/loading-img.gif"></div>';
        $("body").prepend(html);
        var maxHeight = null;
        document.documentElement.clientHeight >= $("body").height() ? maxHeight = document.documentElement.clientHeight : maxHeight = $("body").height();
        $(".commonMask").css({
            "height":maxHeight,
            "width":$(window).width(),
            "position":"fixed",
            "background":"rgba(255,255,255,.3)",
            "z-index":1000
        }).on( "touchmove", function (e) {
            // 禁用手指滑动事件
            e.preventDefault();
        });
        var win = $(window);
        $(".commonMask img").css({
            "width":"20%",
            "position":"fixed",
            "top":win.height()/2 - win.height() * 0.2 / 2,
            "left":win.width()/2 - $(".commonMask").width() * 0.2 / 2
        });
        return;
    };
    if(flag == "hide"){
        $(".commonMask").hide();
    };
    if(flag == "show"){
        $(".commonMask").show();
    }
};

qk.passport = (function(){
    var addRandom = function(url){
        var str = url.indexOf('?')>-1?'&':'?';

        url = url.indexOf('#')>-1?url:url+"";

        return url.split('#').join(str + "time=" + (+new Date()))

    }

    var normalLogin = function(jumpurl){
        var href = jumpurl || location.href;
        href = addRandom(href);

        if(href.indexOf(location.origin)!=0){
            href = location.origin + href;
        }
        //var url = "http://i.360.cn/login/wap?src=mpw_qikoo&destUrl=" + encodeURIComponent(href);
        var url = "http://i360mall.com/login?t="+(new Date().getTime())+"&returnUrl=" + encodeURIComponent(href);

        window.location.href = url;
    }

    var login = function(jumpurl){
        var mobilesafe = navigator.userAgent.match(/mobilesafe wallet\/(\d*)/);
        var isAssistant = navigator.userAgent.match(/360appstore/);

        if(mobilesafe && mobilesafe[1]>=111){
            // 手机钱包app中内嵌页面，调用他们的登录功能
            var Util = {
                exec : function(cmdName) {
                    if (window.AndroidWebview) {
                        return window.AndroidWebview[cmdName].apply(AndroidWebview, [].slice.call(arguments, 1));
                    } else {
                        window.console && console.log([].join.call(arguments, '|'));
                        return undefined;
                    }
                }
            }
            window.onLogoutResult = function(){
                Util.exec('login', '6b32a84bec7fcd4dcf80a1386bf07e58');
            }
            Util.exec('logout', '6b32a84bec7fcd4dcf80a1386bf07e58');
        }
        else if (isAssistant){
            try{
                var version = AndroidWebview.getClientInfo();
                version = typeof version == "string" ? JSON.parse(version) : version;
                version = version.version;

                // 手助5.0.77版本开始支持360.com域的联合登录，版本号300050077
                /*
                var versionInfo = version.split(".");
                var baseVersionInfo = [5,0,77];
                var effect = true;
                for (var i = 0 ; i < versionInfo.length; ++i){
                    var nowNumber = parseInt(versionInfo[i], 10);
                    if (nowNumber < baseVersionInfo[i]){
                        effect = false;
                        break;
                    } 

                    if (nowNumber > baseVersionInfo[i]){
                        break;
                    }
                }
                */

                var effect = version + "" >= "300050077"; 

                if (false === effect){
                    normalLogin(jumpurl);
                    return ;
                }

            }
            catch(e){
                normalLogin(jumpurl);
                return;
            }
            if (window.AndroidWebview){
                AndroidWebview.tryLogin("noop");
            }
            else {
                window.console && console.log([].join.call(arguments, '|'));
                return undefined;
            }
        }
        else{
            normalLogin(jumpurl);
        }
    }

    return {
        login : normalLogin
    }
})();

// 购物车相关接口
qk.cart = (function(){
    var getNum = function(fn){
        $.post('/cart/getSkuNum', function(data){
            var num = 0
            if(data && data.isSuccess && data.isSuccess==true && data.data){
                num = data.data;
            }
            fn && fn(num)
        },'json')
    }
    var addCart = function(id, fn){
        $.post('/shop/addtocart',{
            item_id : id,
            num : 1,
            qtoken : $('.qtoken').val(),
            qtoken_timestamp : $('.qtokentimestamp').val()
        },function(data){
            if(data.errno==0){
                fn && fn.apply(this,arguments);
            }else if(data.errno==40001){
                qk.dialog.alert("请登录后再试。",function(){
                    qk.passport.login();
                })
            }else if(data.errno==40005){
                qk.dialog.alert(data.errmsg,function(){
                    window.location.href = "/shop_cart.html"
                })
            }else{
                qk.dialog.alert(data.errmsg)
            }
        },'json')
    }

    return {
        getNum : getNum,
        addCart : addCart
    }
})();

qk.share = (function(){
    var params = function(obj){
        var arr = [];
        $.each(obj,function(key,val){
            arr.push(key+"=" + encodeURIComponent(val))
        });

        return arr.join("&");
    }

    var share = function(config){
        var title = config.title || document.title;
        if(!config.noQikoo && title.toLowerCase().indexOf('@360商城')==-1){
            title = title + '@360商城 ';
        }

        var obj = {
            url : config.url || window.location.href,
            // ralateUid : config.ralateUid || '3672975180',
            type : 'button',
            language : 'zh_cn',
            pic : config.pic || '',
            title : title,
            searchPic : 'true',
            style : 'simple'
        }

        var url = 'http://service.weibo.com/share/share.php?' + params(obj);

        window.open(url)
    }

    return {
        go : share
    }
})();


// 批量商品价格查询（支持单个商品查询,skuIds必须是逗号分隔的字符串）
qk.getPrice = function(skuIds,callBack,maxAjaxTimes){

    maxAjaxTimes && maxAjaxTimes--;

    $.ajax({
        type:"post",
        url:"/product/getPrice",
        dataType:"json",
        data : {"skus":skuIds},
        success:function(data){
            if(data && data.isSuccess && data.data){
                typeof callBack == "function" && callBack(data);
                return;
            }
            if(maxAjaxTimes && maxAjaxTimes>0){
                qk.getPrice(skuIds,callBack,maxAjaxTimes);
            }
        },
        error:function(data){
            qk.dialog.alert("抱歉，网络繁忙，请稍后再试");
        }
    });
};

// 如果是app内打开，自动加载app.css
/*if(window.navigator.userAgent.indexOf('QikooApp')>-1){
    $('<link rel="stylesheet"></link>').appendTo('head').attr('href',{stc: "//static.i360mall.com/h5/css/app.css"}.stc)
}*/

// 获取url中的参数
qk.getUrlParam = function (param) {
    var params = location.search.substr(1).split("&");
    var val = ""
    $.each(params, function (i, str) {
        var arr = str.split('=');
        if (arr[0] == param) {
            val = arr[1]
        }
    })
    return val;
}

// 将来源信息存入cookie，以备下单时记录转化率
qk.pagebar = (function(){
    var currpage,totalpage,eleBox,callback,style;
    var render = function(){
        var tpl = ['<div class="mod-pagebar flexbox '+style+'"><div class="flexitem">'];
        if(currpage > 1){
            tpl.push('<a class="pagebar-step box-left" data-go="'+(currpage-1)+'">上一页</a>');
        }else{
            tpl.push('<a class="pagebar-step box-left pagebar-disabled">上一页</a>');
        }
        tpl.push('</div><div class="flexitem">');
        tpl.push('<label><span>第'+currpage+'/'+totalpage+'页<i></i></span><select>');
        for(var i=1;i<=totalpage;i++){
            if(i==currpage){
                tpl.push('<option value="'+i+'" selected>第'+i+'页</option>');
            }else{
                tpl.push('<option value="'+i+'">第'+i+'页</option>');
            }
        }
        tpl.push('</select></label></div><div class="flexitem">');
        if(currpage < totalpage){
            tpl.push('<a class="pagebar-step box-right" data-go="'+(currpage+1)+'">下一页</a>');
        }else{
            tpl.push('<a class="pagebar-step box-right pagebar-disabled">下一页</a>');
        }
        tpl.push('</div></div>');
        eleBox.html(tpl.join(''));
        bind();
    }
    var bind = function(){
        eleBox.find("a").on("click",function(){
            var pn = $(this).attr('data-go');
            if(pn){
                callback && callback(pn);
            }
        });
        eleBox.find("select").on("change",function(){
            var pn = $(this).val();
            if(pn){
                callback && callback(pn);
            }
        });
    };
    var init = function(cfg){
        currpage = parseInt(cfg.currpage) || 1;
        totalpage = cfg.totalpage || 1;
        eleBox = $(cfg.element);
        callback = cfg.onChange || cfg.onchange;
        style = cfg.style || '';
        if(totalpage!=1){
            render();
        }
    };
    return {
        init : init
    };
})();

// userAgent相关判断
qk.ua = {
    isWeixin : function (){
        return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    },
    inApp:function(){
        return "qikooapp" == navigator.userAgent.toLowerCase().match(/QikooApp/i);
    },
    inAndroid:function(){
        return ("android" == navigator.userAgent.toLowerCase().match(/Android/i)) || ("linux" == navigator.userAgent.toLowerCase().match(/Linux/i));
    },
    inShouWei:function(){
        //手机卫士
        return ("msafe_app" == navigator.userAgent.toLowerCase().match(/msafe_app/i));
    },
    inQLDS:function(){
        //清理大师
        return ("360cleandroid" == navigator.userAgent.toLowerCase().match(/360Cleandroid/i));

    },
    inZhiHuiJia:function(){
        //360智慧家超级app
        return ("ifenglian-web" == navigator.userAgent.toLowerCase().match(/ifenglian-web/i));
    },
    setWeixinHintBar : function (){

        // // 10月11日 2016年  李迪商量 去掉提示
        return ;

        if (!qk.ua.isWeixin()) {
            return ;
        }
        else{
            if ($(".weixin_dia").length == 0){
                $("body").append('<div class="weixin_dia" style="position:fixed;top:0;left:0; width:100%;height:100%;background:rgba(0,0,0,0.8);display:none;z-index: 200;"> <img src="http://p7.qhmsg.com/t019b571dd785c931af.jpg" style="position:absolute;top:0; right:0; width:100%;" /></div>');
            }

            $('.weixin_dia').show();
            $('html').css("height", "100%").css("overflow", "hidden");
        }
    }
}
//自定义弹窗
    var Popup = function () {
        this._init.apply(this, arguments)
    }
    $.extend(Popup.prototype, {
        _init: function (cfg) {
            cfg = cfg || {}, this.mask = $(cfg.mask || ".mask"), this.popup = $(cfg.popup || ".popup"), this.template = cfg.template || "popup-template";
            if (!this.mask.length) {
                this.mask = $('<div class="mask"></div>').appendTo('body');
            }
            if (!this.popup.length) {
                this.popup = $('<div class="popup"></div>').appendTo('body');
            }
            this.bindEvents();
        },
        show: function () {
            this.mask.add(this.popup).show();
            this.resetPos();
        },
        hide: function () {
            this.mask.add(this.popup).hide();
        },
        setContent: function (e, callback) {
            var html = template(this.template, e);
            this.popup.html(html);
            this.show();
            callback && callback(this.popup);
        },
        bindEvents: function () {
            var self = this;
            $(document).on("click", ".btn-close", function (e) {
                e.preventDefault();
                self.hide();
            })
        },
        resetPos: function(){
            var viewportH = window.innerHeight || document.documentElement.clientHeight || 100;
            var top = viewportH-this.popup.height();
            if(this.popup.height()>viewportH/2){
                this.popup.css('position','absolute');
                top +=$('body').scrollTop();
                this.popup.css({
                    left: 0,
                    top : top,
                    width:'100%',
                    marginTop:'0px'
                });
            }else{
                this.popup.css('position','fixed');
                this.popup.css({
                    left: '5%',
                    top : '50%',
                    width:'90%',
                    marginTop:'-'+this.popup.height()/2+'px'
                });
            }
        }
    });


/* 
    调用 h5和商城app中   
    如果嵌入到其他app 不能调起其他app 登录      
 */
    qk.login = function (fnlogin) {
        QHPass.getUserInfo(function () {
            fnlogin && fnlogin();
        }, function () {
            if (navigator.userAgent.indexOf('QikooApp') > -1) {
                window.login_finish = function () {

                    window.location.reload();
                }
                window.bridge && window.bridge.login();

            } else {
                qk.passport.login();
            }
        })

    };

    qk.errorMsg = {
        "error_return":"抱歉，出错了，请稍后再试",
        "error_call":"抱歉，网络繁忙，请稍后再试"
    };

/**
 * 替换图片服务器图片的URL
 * url="jfs/t1/45/52430153/298522/f1faa01a/538429bdN260d118a.jpg"
 * 替换为 url="http://img20.360buyimg.com/test/s100x100_jfs/t1/45/52430153/298522/f1faa01a/538429bdN260d118a.jpg"
 * @param url
 * @param imgSize
 *  ("N0", "图片尺寸为 800*800"),
    ("N1", "图片尺寸为 350*350"),
    ("N2", "图片尺寸为 160*160"),
    ("N3", "图片尺寸为 130*130"),
    ("N4", "图片尺寸为 100*100"),
    ("N5", "图片尺寸为 50*50");

 * @returns {*}
 */
function imageFormat_sys(url, imgSize){
    if(!url){
        console.error("参数异常！");
        return "";
    }

    var index = url.lastIndexOf(".");
    var type = url.substring(index*1 + 1, url.length);
    if(type == "gif" || type == "GIF"){
        console.error("图片格式错误");
            return "";
    }
    var protocol_header = "//";
    var JSS_SERVER_DOMAIN = "m.360buyimg.com";
    var ret_url = protocol_header + JSS_SERVER_DOMAIN + imgSize +"/" + url;
    return ret_url;
}


function isLoginAjax(dom,callback){
    $.ajax({
        url : "/user/userInfo",
        type : "post",
        data : {
        },
        dataType: "json",
        success: function(data){
            if(data.errorCode==0){
                selectDirection(dom);
            }
            if(data.errorCode!=0){
                //此处判定用户是否登录
                if(data.errorCode == 1){
                    return goLogin(data.message);
                }
                //请求失败弹窗
                qk.dialog.alert(data.message);
                return;
            }
            if(data && data.isSuccess){
                if(callback && typeof callback == 'function'){
                    callback();
                }
            }
        },
        error: function(data){
            qk.dialog.alert({"html":"网络请求失败,请稍后再试！"});
        }
    });
}
// 登录
function goLogin(msg) {
    if (!msg) {
        return qk.passport.login();
    }
    qk.dialog.alert({
        html: msg,
        fnOk: function() {
            qk.passport.login();
        }
    });
}
function selectDirection(dom) {
    var dataMonitor = dom.getAttribute("data-monitor");
    switch(dataMonitor) {
        case "h5_goodsdetails_buy_cart" :
        case "h5_allproduct_shopcart_click" :
        case "h5_v1home_menu_shopcart" : location.href = "//m.i360mall.com/shop_cart.html";
            break;
        case "h5_allproduct_order_click" :
        case "h5_home_menu_user" : location.href = "//m.i360mall.com/usercenter.html";
            break;
        default: ;
    }
}