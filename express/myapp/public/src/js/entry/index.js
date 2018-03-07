var path = require('path');
require(path.resolve(__dirname, '../../css/index-v.css'));
require(path.resolve(__dirname, '../../css/m_base_v.css'));
require(path.resolve(__dirname, '../../css/search.css'));
require(path.resolve(__dirname, '../../css/style.css'));
require(path.resolve(__dirname, '../../css/swiper.css'));

require(path.resolve(__dirname, '../app_icon.js'));
require(path.resolve(__dirname, '../md.js'));
require(path.resolve(__dirname, '../common.js'));
require(path.resolve(__dirname, '../common_share.js'));
require(path.resolve(__dirname, '../countdown.list.js'));
require(path.resolve(__dirname, '../echo.js'));
require(path.resolve(__dirname, '../search.js'));
require(path.resolve(__dirname, '../zepto.js'));
require(path.resolve(__dirname, '../zepto_animate.js'));
require(path.resolve(__dirname, '../zepto_cookie.js'));

$(window).scroll(function(){var e=$(window).height(),t=$("body").scrollTop();t>e?$("#back-to-top").show():$("#back-to-top").hide()});

var jap = {
    siteId : 'JA2017_213668', //站点编号，必传字段
    autoLogPv: true  //是否自动上报pv
};

window.indexPage = (function(){
    var startmarquee = function(lh,speed,delay) {
        if($("#marqueebox a").length<2)
            return;
        var p=false;
        var t;
        var o=document.getElementById("marqueebox");
        o.innerHTML+=o.innerHTML;
        o.style.marginTop=0;
        o.mouseenter=function(){p=true;}
        o.mouseleave=function(){p=false;}
        function start(){
            t=setInterval(scrolling,speed);
            if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
        }
        function scrolling(){
            if(parseInt(o.style.marginTop)%lh!=0){
                o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
                if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
            }else{
                clearInterval(t);
                setTimeout(start,delay);
            }
        }
        setTimeout(start,delay); //指定暂停时间(开始，延迟)
    };
    return {
        startmarquee : startmarquee
    }
})();
function IndexPage() {
    this.config_url = {
        "INIT_BODY": "/index/body"
    }
}
IndexPage.prototype.init_lunbotu=function () {
    var mySwiper = new Swiper ('.swiper-container-2', {
        loop: true,
        autoplay: 2000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    })
}

IndexPage.prototype.init_body = function () {
    var self = this;
    qk.dialog.loading("show");
    $.ajax({
        url: self.config_url.INIT_BODY,
        type: "get",
        dataType: "json",
        success: function (data) {
            qk.dialog.loading("hide");
            if (data && data.isSuccess && data.data) {
                $("#body_div").html(data.data);
                self.init_lunbotu();
                indexPage.startmarquee(16,20,1500);
            }
        }
    });
}


$(document).ready(function () {
    qk && qk.sellNav.init();
    var dexPage = new IndexPage();
    dexPage.init_body();
});