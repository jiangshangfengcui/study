var path = require('path');
require(path.resolve(__dirname , '../../css/m_base_v.css'));
require(path.resolve(__dirname , '../../css/categorystyle.css'));

require(path.resolve(__dirname , '../app_icon.js'));
require(path.resolve(__dirname , '../md.js'));
require(path.resolve(__dirname , '../common.js'));
require(path.resolve(__dirname , '../common_share.js'));
require(path.resolve(__dirname , '../zepto.js'));
require(path.resolve(__dirname , '../zepto_animate.js'));
require(path.resolve(__dirname , '../zepto_cookie.js'));
require(path.resolve(__dirname , '../iscroll.js'));



var mallCategory ={
  init: function () {
    $.ajax({
      type: "POST",
      url: "/mallCategory/query",
      dataType: "json",
      data: {},
      success: function (result) {
        if (result.success && result.data) {
          var target = $("#category-sidebar");
          $.each(result.data, function (i, op) {
            target.append("<li data-type=\"" + op.id + "\"><a href=\"javascript:void(0);\">" + op.name + "</a></li>");
          });
        } else {
          qk.dialog.alert(result.message);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          qk.dialog.alert("类目查询失败");
      }
    });
  }
}

var getQueryParam = function () {
  var category = $('.category-sidebar li.current').attr('data-type');

  var page = $("#page").val();

  var price_sale = '';
  if ($('.search-price.arrowup') && $('.search-price.arrowup').length > 0) {
    price_sale = 'asc';
  } else if ($('.search-price.arrowdown') && $('.search-price.arrowdown').length > 0) {
    price_sale = 'desc';
  }

  var stock = 0;
  if ($('.hasstock') && $('.hasstock').length > 0) {
    stock = 1;

  }
  return {
    cat1: category || '',
    stock: stock || '',
    sort: price_sale || '',
    page : page || ''
  };
}

// 单品调取
var sidebarHtml = function (append) {
  var param = getQueryParam();
    /*$('.j_loading').show();*/
    qk.dialog.loading("show");
  $.post('/query', param, function (data) {
      /*$('.j_loading').hide();*/
      qk.dialog.loading("hide");
    if(append){
      //$('#scroller').html('');
      var scrollerChildren = $('#scroller').children();
      for(var i=0; i < scrollerChildren.length -1; i++) {
        $(scrollerChildren[i]).remove();
      }
    }
    if(data.isSuccess && data.data){
        data = data.data;
        $("#page").val(data.page);
        var hmgEle = $(".hmg");
        if(data.searchItems.length>0){
            $('.more_load').off('click');
            $('#scroller').children('.more_load').remove();
            //$('#scroller').children('.hmg').remove();
            var skuIds = [];
            $.each(data.searchItems, function (i, obj) {
                var html = [];
                html.push('<a href="/item.html?itemId=' + obj.itemId + '"><dl class="flexBox">');
                html.push('<dt>');
                html.push('<img src="' + obj.itemImgSrc + '" onerror="this.onerror=null; this.src=\'//static.i360mall.com/h5/images/default_img_100.jpg\'">');
                if (obj.status != 1) {
                    html.push('<i class="sellout">无货</i>');
                }

                html.push('</dt>');
                html.push('<dd class="flex">');
                html.push('<span href="#" class="product-title" style="height: 4.5rem;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">' + obj.itemName + '</span>');
                html.push('<span class="product-price" name="sku_price_'+ obj.itemId +'"></span>');
                html.push('</dd>');
                html.push('</dl></a>');
                //$('#scroller').append(html.join(''));
                $(html.join('')).insertBefore(hmgEle);
                skuIds.push(obj.itemId);
            });
            //$('#scroller').html($('#scroller').html() + '<span class="more_load"><span style="border: 1px solid #ccc;border-radius: 4px;width:80%;height:30px;display:inline-block;line-height:30px;">点击加载更多</span></span>' + '<div class="hmg"></div>');
            var content = '<span class="more_load"><span style="border: 1px solid #ccc;border-radius: 4px;width:80%;height:30px;display:inline-block;line-height:30px;">点击加载更多</span></span>';
            $(content).insertBefore(hmgEle);
            $('.more_load').on('click', function () {
                $("#page").val(Number($("#page").val()) + 1);
                sidebarHtml(false);
            });
            getProductPrice(skuIds.join(','),3);
        }else{
            if ($('#scroller').find(".msg").length == 0) {
                $('.more_load').off('click');
                $('#scroller').children('.more_load').remove();
                //$('#scroller').children('.hmg').remove();
                var pageNum = $("#page").val();
                if(pageNum==null || pageNum ==0){
                    $('#scroller').html($('#scroller').html() + '<p class="msg">' + '抱歉，没有找到符合的商品！' + '</p>' + '<div class="hmg"></div>');
                }else{
                    //$('#scroller').html($('#scroller').html() + '<p class="msg" style="margin-top: 2rem">' + '没有更多商品！' + '</p>' + '<div class="hmg"></div>');
                    var content = '<p class="msg" style="margin-top: 2rem; margin-bottom: 1rem">' + '没有更多商品！' + '</p>';
                    $(content).insertBefore(hmgEle);
                }
                $('#scroller').css('top',parseFloat($('#scroller').css('top')) - 42 + 'px');
            }
        }
    }else{
        qk.dialog.alert(data.message);
    }
  }, 'json');
};

function getProductPrice(skuIds,maxTimes){
    maxTimes--;
    $.ajax({
        type:"post",
        url:"/product/getPrice",
        dataType:"json",
        data : {"skus":skuIds},
        success:function(data){
            if(data && data.isSuccess && data.data){
                var querySkuIds = [];
                for(var i=0;i<data.data.length;i++){
                    if(Number(data.data[i].p)>Number("0.00")){
                        $('[name="sku_price_'+data.data[i].id+'"]').html('￥' + data.data[i].p);
                    }else{
                        $('[name="sku_price_'+data.data[i].id+'"]').html('暂无报价');
                    }
                    querySkuIds.push(data.data[i].id);
                }
                var oldSkuIds = skuIds.split(',');
                for(var i=0;i<oldSkuIds.length;i++){
                    var isExist = false;
                    for(var j=0;j<querySkuIds.length;j++){
                        if(oldSkuIds[i] == querySkuIds[j]){
                            isExist = true;
                            break;
                        }
                    }
                    if(!isExist){
                        $('[name="sku_price_'+oldSkuIds[i]+'"]').html('暂无报价');
                    }
                }
                return;
            }
            if(maxTimes>0){
                getProductPrice(skuIds,maxTimes);
            }
        },
        error:function(data){

        }
    });
};

var search = function () {



  // 分类筛选
  $('.category-sidebar').delegate('li','click', function () {
      $('#scroller').children('.msg').remove();
    $("#page").val("1");
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
    $('.search-price').removeClass('arrowup').removeClass('arrowdown');
    $('.only-available').removeClass('hasstock').removeClass('outstock');
    $('.ordera').addClass('order');
    myScroll.scrollTo(0, 0);
    sidebarHtml(true);

  });

  // 默认
  $('.ordera').on('click', function () {
    $("#page").val("1");
    $(this).addClass('order');
    $('.search-price').removeClass('arrowup').removeClass('arrowdown');
    $('.only-available').removeClass('hasstock').removeClass('outstock');
    myScroll.scrollTo(0, 0);
    sidebarHtml(true);

  });

  // 价格排序
  $('.search-price').on('click', function () {
    $("#page").val("1");
    $('.order').removeClass('order');
    if ($(this).hasClass('arrowup')) {
      $(this).removeClass('arrowup');
      $(this).addClass('arrowdown');
    } else {
      $(this).removeClass('arrowdown');
      $(this).addClass('arrowup');
    }
    myScroll.scrollTo(0, 0);
    sidebarHtml(true);
  });


  // 有货筛选
  $('.only-available').on('click', function () {
    $("#page").val("1");
    if ($(this).hasClass('hasstock')) {
      $(this).removeClass('hasstock');
      $(this).addClass('outstock');
    } else {
      $(this).removeClass('outstock');
      $(this).addClass('hasstock');
    }
    //$(this).addClass('hasstock');
    $('.search-price').removeClass('arrowup').removeClass('arrowdown');
    $('.ordera').removeClass('order');
    myScroll.scrollTo(0, 0);
    sidebarHtml(true);
  })
  sidebarHtml(true);
}
$(function () {
  search();
  qk && qk.sellNav.init();
})

// 滚动
var myScroll;
$("#back-to-top").hide();
function loaded() {
  myScroll = new iScroll('wrapper', {
    hScroll: false,
    vScroll: true,
    bounce: false,//超出反弹
    vScrollbar: false,//是否显示垂直滚动条
    click: true,
    checkDOMChanges: true,//检测内容变化
    lockDirection: true,
    onScrollEnd: function () {
      var offsetTo = $('#scroller').offset().top;
      if (offsetTo < -100) {
        $('#back-to-top').show();
      } else {
        $('#back-to-top').hide();
      }
    }
  });
}

window.addEventListener('load', function () {
  setTimeout(function () {
    loaded();
  }, 100)
}, false);

// 防止点击nav按钮“加载更多”下陷
var hmgFlag = true;
$('.nav-menu').on('click', function() {
  if (hmgFlag) {
    $('.hmg').css('height', '8.5rem');
    $('#back-to-top').css('bottom', "123px");
    hmgFlag = false;
  }else {
    $('.hmg').css('height', '5.3rem');
    $('#back-to-top').css('bottom', "80px");
    hmgFlag = true;
  };
})


//初始化分类
mallCategory.init();

// 获取对象样式
function getStyle(obj, styleName) {
    var oStyle = obj.currentStyle ? obj.currentStyle : window.getComputedStyle(obj, null);
    if (oStyle.getPropertyValue) {
        return oStyle.getPropertyValue(styleName);
    }
    else {
        return oStyle.getAttrbute(styleName);
    }
}

var jap = {
    siteId : 'JA2017_213668', //站点编号，必传字段
    autoLogPv: true  //是否自动上报pv
};
