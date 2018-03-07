var Search = (function SearchClosure() {
  var CONFIG = {
    searchUrl: '/query', // 商品查询接口地址
    suggestUrl:  '/hotWords', // 热词接口地址
    predictUrl: '', // 预测关键词接口地址
    predictDelay: 500 // 预测关键词查询提交延时(ms)
  };

  /**
   * 搜索控件原型
   * 这个是主入口，其他都是组件
   * @param {string} selector 包裹对象的选择器
   * @constructor
   */

  function Search(selector) {
    this.$wrapper = $(selector);
    this.bar = new Bar(this, this.$wrapper.find('.bar'));
    this.suggester = new Suggester(this, this.$wrapper.find('.fixsearch-suggester'));
    this.predictor = new Predictor(this, this.$wrapper.find('.fixsearch-predictor'));
    this.result = $('.search-result').length === 1 ? new Result(this, $('.search-result')) : null;
  }

  /**
   * 注册事件委托
   * @param {string} event 事件名
   * @param {string} selector 事件触发限定选择器
   * @param {Function} handler 事件处理函数
   * @todo 添加这个方法就是为了实现事件统一委托，让代码看起来更OO。但似乎这样依然不够优雅，应该有更好的方案
   */

  Search.prototype.regEvent = function (event, selector, handler) {
    this.$wrapper.on(event, selector, handler);
  };

  /**
   * 输入栏原型（包括返回按钮、输入框和搜索按钮）
   * @param {Search} _search 父级指针
   * @param {jQuery | Zepto} $wrapper 包裹对象
   * @constructor
   */

  function Bar(_search, $wrapper) {
    this._search = _search;
    this.$wrapper = $wrapper;
    this.$input = $wrapper.find('input');
    this.$search = $wrapper.find('.js-btn-search');

    /* 事件注册 */

    _search.regEvent('focus', 'input', function (ev) {
      var suggester = this._search.suggester;
      if (suggester.lastUpdate === 0) suggester.fetch();
      this.setActive(true);
      if (!this.getKeyword()) this._search.predictor.hide();
      suggester.show();
    }.bind(this));

    //_search.regEvent('input', 'input', function (ev) {
    //  var predictor = this._search.predictor;
    //  if (predictor.timer !== null) {
    //    clearTimeout(predictor.timer);
    //    predictor.timer = null;
    //  }
    //  if (this.getKeyword()) {
    //    predictor.timer = setTimeout(function () {
    //      predictor.show().fetch();
    //    }, CONFIG.predictDelay);
    //  } else {
    //    predictor.hide();
    //  }
    //}.bind(this));

    _search.regEvent('click', '.js-btn-back', function () {
      if (this._search.result) location.href = '/';
      else {
        this._search.bar.setActive(false).$input.val('');
        this._search.suggester.hide();
        this._search.predictor.hide();
      }
    }.bind(this));

    _search.regEvent('click', '.js-btn-search', function (ev) {
      var keyword = this.getKeyword();
      /** if (this._search.result){
        $(".grid").html("");
        ev.stopPropagation();
        this._search.suggester.hide();
        new Result(_search, $('.search-result'));
      }else{ */
        location.href = '/search.html?q=' + keyword;
      //}

    }.bind(this));

    _search.regEvent('keypress', 'input', function (ev) {
      // `KeyboardEvent.which`不符合当前规范，因此优先使用规范建议的`key`
      if ((ev.key && ev.key === 'Enter') || ev.which === 13) {
        this._search.bar.$search.click();
      }
    }.bind(this));
  }

  /**
   * 设置输入栏的活跃状态
   * @param {Boolean} active 设置/取消活跃状态
   * @returns {Bar}
   */

  Bar.prototype.setActive = function (active) {
    this.$wrapper.toggleClass('active', active);
    return this;
  };

  /**
   * 设置输入栏关键词
   * @param {string} keyword 关键词
   * @param {Boolean?} goSearch 是否自动触发搜索动作
   * @returns {Bar}
   */

  Bar.prototype.setKeyword = function (keyword, goSearch) {
    this.$input.val(keyword);
    if (goSearch) this.$search.click();
    return this;
  };

  /**
   * 获取输入栏关键词
   * @returns {string} `trim()`后的关键词
   */

  Bar.prototype.getKeyword = function () {
    return this.$input.val().trim();
  };

  /**
   * 热词原型
   * @param {Search} _search 父级指针
   * @param {jQuery | Zepto} $wrapper 包裹对象
   * @constructor
   */

  function Suggester(_search, $wrapper) {
    this._search = _search;
    this.$wrapper = $wrapper;
    this.$ul = $wrapper.find('ul');
    this.lastUpdate = 0;
    this.data = null;
    this.fetch();

    /* 事件注册 */

    _search.regEvent('click', '.suggest', function (ev) {
      this._search.bar.setKeyword($(ev.target).text(), true);
    }.bind(this));
  }

  /**
   * 显示热词界面
   * @returns {Suggester}
   */

  Suggester.prototype.show = function () {
    this.$wrapper.show();
    return this;
  };

  /**
   * 隐藏热词界面
   * @returns {Suggester}
   */

  Suggester.prototype.hide = function () {
    this.$wrapper.hide();
    return this;
  };

  /**
   * 获取热词数据
   */

  Suggester.prototype.fetch = function () {
    // TODO: 数据缓存更新机制
    $.ajax({
      url: CONFIG.suggestUrl,
      success: function (json) {
        this.lastUpdate = Date.now();
        this.data = _json(json).data;
        this.render();
      }.bind(this)
    });
  };

  /**
   * 渲染热词元素
   * @returns {Suggester}
   */

  Suggester.prototype.render = function () {
    var list = [];
    for (var hw in this.data) {
      if($.trim(this.data[hw].name) != ""){
        list.push($('<li class="suggest">').text(this.data[hw].name));
      }
    }
    this.$ul.html('').append(list);
    return this;
  };

  /**
   * 关键词预测原型
   * @param {Search} _search 父级指针
   * @param {jQuery | Zepto} $wrapper 包裹对象
   * @constructor
   */

  function Predictor(_search, $wrapper) {
    this._search = _search;
    this.$wrapper = $wrapper;
    this.$ul = $wrapper.find('ul');
    this.data = null;
    this.timer = null;

    /* 事件注册 */

    _search.regEvent('click', '.prediction', function (ev) {
      this._search.bar.setKeyword($(ev.currentTarget).find('span').text(), true);
    }.bind(this));
  }

  /**
   * 显示预测界面
   * @returns {Predictor}
   */

  Predictor.prototype.show = function () {
    this.$wrapper.show();
    return this;
  };

  /**
   * 隐藏预测界面
   * @returns {Predictor}
   */

  Predictor.prototype.hide = function () {
    this.$wrapper.hide();
    return this;
  };

  /**
   * 获取预测数据
   */

  Predictor.prototype.fetch = function () {
    $.ajax({
      url: CONFIG.predictUrl + '?q=' + this._search.bar.getKeyword(),
      dataType: 'jsonp',
      success: function (json) {
        // TODO: 预测数据缓存机制
        this.data = _json(json).data;
        this.render();
      }.bind(this)
    });
  };

  /**
   * 渲染预测元素
   * @returns {Predictor}
   */

  Predictor.prototype.render = function () {
    var keyword = this._search.bar.getKeyword();
    var list = [];
    var key;
    for (key in this.data) {
      if (!Object.prototype.hasOwnProperty.call(this.data, key)) continue;
      var prediction = key.replace(keyword, '<strong>' + keyword + '</strong>');
      list .push(
          $('<li class="prediction icon-search">')
              .append(
                  $('<span>').html(prediction),
                  $('<em>').text('约' + this.data[key] + '件')
              )
      );
    }
    this.$ul.html('').append(list);
    return this;
  };

  /**
   * 查询结果原型
   * @param {Search} _search 父级指针
   * @param {jQuery | Zepto} $wrapper 包裹对象
   * @constructor
   */

  function Result(_search, $wrapper) {

    this._search = _search;
    this.$wrapper = $wrapper;
    this.$empty = $wrapper.find('.empty-prompt');
    this.$grid = $wrapper.find('.grid');
    this.toolbar = new ResultToolbar(this, $wrapper.find('.toolbar'));
    this.param = _param();
    this.isLoading = false;
    this.prevLoading = 0;
    this.noMore = false;
    if (this.param.q) _search.bar.setKeyword(this.param.q);
    this.toolbar.state(this.param);
    this.fetch();

    /* 事件注册 */

    this.toolbar.$wrapper.on('click', 'button', function (ev) {
      var $target = $(ev.currentTarget);
      switch ($target.attr('data-type')) {
        case 'default':
          this.param.sort = null;
          break;
        case 'price':
          this.param.sort = this.param.sort === 'asc' ? 'desc' : 'asc';
          break;
        case 'availability':
          this.param.stock = +this.param.stock ? 0 : 1;
          break;
      }
      this.noMore = false;
      this.param.page=1;
      this.toolbar.state(this.param);
      $('.nomore').hide();
      this.fetch();
    }.bind(this));

    $(document).on('scroll.search-result.more', this.more.bind(this));
  }

  /**
   * 获取查询结果数据
   */
  var isAvailable = true;
  var pageState = 1;

  Result.prototype.fetch = function (append) {
    /*if(this.noMore==true){
      return;
    }*/
    $.ajax({
      url: CONFIG.searchUrl,
      dataType: 'json',
      data: this.param,
      success: function (data) {
        if(data && data.isSuccess && data.data){
            this.data = data.data;
            if(this.data.totalCount !== 0){
              //var count = 0;
              $.each(this.data.searchItems, function(index, item){
                item.status == 1 ? isAvailable = true : isAvailable = false;
                //if(item.price < 0) count++;
              })
              //count == this.data.totalCount ? isAvailable = false : isAvailable = true;
            } 
            this.render(append);
            this.isLoading = false;
        }else{
            qk.dialog.alert(data.message);
        }
      }.bind(this)
    });
  };

  /**
   * 获取更多结果数据（用于无限滚动）
   * 基于`Result.prototype.fetch`实现
   */

  Result.prototype.more = function () {
    var delay = 200;
    var now = Date.now();
    var nearBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - $(window).height();

    if (!this.prevLoading || now - this.prevLoading > delay) {
      if (!this.isLoading && !this.noMore && nearBottom) {
        this.isLoading = true;
        this.param.page = (this.param.page || 1) + 1;
        this.fetch(true);
      }
      this.prevLoading = now;
    }
    //noMore();
  };


  function renderList(list, gridEl,append){

    var items = [], box = [];
    var skuIds = [];
    list.forEach(function(item, i){
      skuIds.push(item.itemId);
      if(i%2 == 0){
        box = [item];
      }else{
        box.push(item);
        items.push(box);
        box = [];
      }
    });

    if(box.length){
      items.push(box);
    }

    if(!append){
      gridEl.html('');
    }
    items.forEach(function (array, idx) {

      var left, right, el = $("<div/>").addClass("rows");

      new ResultItem(array[0]).$wrapper.addClass('col1').appendTo(el);

      if(array[1]){
        new ResultItem(array[1]).$wrapper.addClass('col2').appendTo(el);
      }
      gridEl.append(el);
    });
    if(skuIds.length>0){
        getProductPrice(skuIds.join(','),3);
    }
  }

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
                      if($('[name="sku_price_'+data.data[i].id+'"]').length>1){
                        console.log(data.data[i].id);
                      }
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
                qk.dialog.alert("抱歉，网络繁忙，请稍后再试");
            }
        });
    };

  /**
   * 渲染查询结果元素
   * 不会清空容器内容（总是追加），因此可以用于无限滚动。这么实现是因为考虑到需要清空容器的时候可以直接刷新页面。
   */

  Result.prototype.render = function (append) {
    var keyWord = $("#search_keyword").val();
    //this.toolbar.state(this.param);
    var param = {q: ''}, gridEl = this.$grid;
    if(this.data.totalCount==0){
      if(isAvailable){
        this.toolbar.hide();
      }
      gridEl.html('');
      this.$empty.show().find('.prompt').text('您搜的“' + keyWord + '”没有找到');
    }else{
        if (this.data.searchItems && this.data.searchItems.length>0) {
            this.$empty.hide();
            renderList(this.data.searchItems, gridEl,append);
        } else {
            this.noMore = true;
            noMore();
        }
    }
  };

  /**
   * 搜索工具原型
   * @param {Result} _result 父级指针
   * @param {jQuery | Zepto} $wrapper 包裹对象
   * @constructor
   */

  function ResultToolbar(_result, $wrapper) {
    this._result = _result;
    this.$wrapper = $wrapper;
    this._state = {
      sort: 'default',
      filterByStock: false
    };
  }

  /**
   * 隐藏搜索工具
   * @returns {ResultToolbar}
   */

  ResultToolbar.prototype.hide = function () {
    this.$wrapper.hide();
    return this;
  };

  /**
   * 设置/获取搜索参数
   * 需要注意的是这里的搜索参数不一定与URL中的格式相同（虽然其实没必要这样做）
   * @param {Object?} stateObj 新搜索参数
   * @returns {ResultToolbar | Object} 提供参数时返回自身，否则返回当前的搜索参数
   */

  ResultToolbar.prototype.state = function (stateObj) {

    if (stateObj) {
      this._state.sort = stateObj.sort || this._state.sort;
      this._state.filterByStock = stateObj.stock;

      this.$wrapper.find('.sort.active').removeClass('active');
      if (this._state.sort !== 'default') {
        this.$wrapper.find('[data-type=price]')
            .attr('data-value', this._state.sort)
            .addClass('active');
      } else {
        this.$wrapper.find('[data-type=default]').addClass('active');
      }

      this.$wrapper.find('.filter').attr('data-value', this._state.filterByStock || 0);

      return this;
    } else return $.extend({}, this._state);
  };

  /**
   * 查询结果（商品元素）原型
   * 添加这个原型是为了方便以后可能的扩展
   * @param {Object} data 商品数据
   * @constructor
   */

  function ResultItem(data) {
    this.$wrapper = $('<a>').attr({
      href: '/item.html?itemId=' + data.itemId,
      target: '_self'
    });
    this.$wrapper.append($('<img>').attr('src', data.itemImgSrc));
      $('img').error(function(){
      $(this).attr('src',"//static.i360mall.com/h5/images/default_img_100.jpg");
     })
    this.$wrapper.append($('<span>').text(data.itemName));
    this.$wrapper.append($('<em name="sku_price_'+data.itemId+'">').text(""));
    if (data.status != 1) {
      this.$wrapper.append($('<strong>').text('无货'));
    }
    // FIXME: 为了绕开flex布局临时加了一层div，回头要整理这里的逻辑
    this.$wrapper = $('<div class="item">').append(this.$wrapper);
  }

  /**
   * 将参数转换为对象
   * @param json
   * @returns {Object}
   * @private
   */

  function _json(json) {
    return typeof json === 'string' ? JSON.parse(json) : json;
  }

  /**
   * 解析URL中的参数
   * @returns {Object}
   * @private
   */

  function _param() {
    var param = {};
    location.search.slice(1).split('&').forEach(function (el) {
      var tokens = el.split('=');
      param[tokens[0]] = tokens[1] ? decodeURI(tokens[1]) : "";
    });
    return param;
  }

  /**
   * 将参数转换为URL Querystring（`?`及以后的部分）
   * @param {Object} obj 需要转换的对象
   * @returns {string}
   * @private
   */

  function _querystring(obj) {
    var str = '';
    var key;
    for (key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      str += '&' + key + '=' + encodeURI(obj[key]);
    }
    return '?' + str.slice(1);
  }

  return Search;
}());

var h5search = new Search('.fixsearch');
