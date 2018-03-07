//分享功能




//app 调用h5   通用函数
window.get_share_message = function () {
    return {
        web_page_url: 'http://mall.360.com',
        title: document.title,
        description: "我在#360商城#发现了一个好东东!",
        thumb_image_url: "http://p5.qhmsg.com/t01e30b91493c90f946.jpg"
    }
}

window.show_app_share = function(){
    if(qk.ua.inApp()){
        var shareData = window.get_share_message();
        window.bridge && window.bridge.show_share_dialog(shareData.web_page_url, shareData.title, shareData.description, shareData.thumb_image_url);
    }
}


;(function () {
    //更改分享

    var href = location.href;



    var result = get_share_message();
    //{
    //    web_page_url: location.href,
    //    title: document.title,
    //    description: "我在#360商城#发现了一个好东东!",
    //    thumb_image_url: "http://p3.qhmsg.com/t01775061c979cfd92a.png"
    //}
    
    if (
        href.indexOf('/ac/')>-1||  //活动
        href.indexOf('/shop/item?item_id=') > -1 || //详情页
        href.indexOf('/rush/item?item_id=') > -1 || //抢购详情页
        href.indexOf('/activity/') > -1 || //预约
        href.indexOf('/try?season=') > -1 //试用        
        ) {

        result.web_page_url = location.href;
        result.title = document.title;        

    } else if (href.indexOf('/duobao/detail?batch_no=') > -1) //一元夺宝详情
    {

        result.web_page_url = location.href;
        result.title = document.title;
        result.description = '一元也能夺大奖，有货有料就在360商城';

    } else if ( //一元夺宝
        href.indexOf('/duobao/') > -1 ||  //一元夺宝首页
        href.indexOf('/duobaopay') >-1//一元夺宝支付页        
        ) {

        result.web_page_url = 'http://mall.360.com/duobao';
        result.title = document.title;
        result.description = '一元也能夺大奖，有货有料就在360商城';

    }

    window.get_share_message = function () {
        return result;
    }

})();

$(function(){
    if(qk.ua.isWeixin()){
        window.wx && wx.config({
            debug: false,
            appId: jweixin["appId"],
            timestamp: jweixin["timestamp"],
            nonceStr: jweixin["nonceStr"],
            signature: jweixin["signature"],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        });

        window.wx && wx.ready(function () {
            var shareData =function(){
                var apiData = window.get_share_message();
                return {
                    title:apiData.title,
                        desc:apiData.description,
                    link:apiData.web_page_url,
                    imgUrl:apiData.thumb_image_url,
                    success:apiData.success || function(){}
                }
            }

            window.wx && wx.onMenuShareTimeline(shareData());
            window.wx && wx.onMenuShareAppMessage(shareData());
            window.wx && wx.onMenuShareQQ(shareData());
            window.wx && wx.onMenuShareWeibo(shareData());
            window.wx && wx.onMenuShareQZone(shareData());
        });
    }
});
