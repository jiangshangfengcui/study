(function() {
	template.helper('maskFormat', function (str,phone) {
		str = str || phone || '0000';
		var re1 = /^.{1}/,re2 = /.{1}$/;
		var arr1 = str.match(re1),arr2 = str.match(re2);
		var result = arr1[0]+'***'+arr2[0];
		return result;
	});
	var ZouMa = function(cotainer) {
		this.maxLength = 6; //最低显示数
		this.step = 2000;//计时器间隔时间
		this.ul = $(cotainer).find("ul");
		var handId;//计时器id
		var self = this;
		this.start = function () {

			if (self.ul.children().length < this.maxLength) {
				//self.ul.append(self.ul.children().clone()); //低于最低显示数，复制拼凑滚动
				return; //低于最低显示数，则不滚动
			}
			handId = setInterval(self.run, self.step);
		}
		this.run = function () {
			var img = self.ul.children().eq(0);
			var height = img.children().eq(0).height();
			img.animate({ "marginTop": (-1 * height) + "px" }, 600, function () {
				$(this).css("margin-top", "auto").appendTo(self.ul);
			});
		}
	}
	var Popup = function() {
		this._init.apply(this, arguments)
	}
	$.extend(Popup.prototype, {
		_init: function(cfg) {
			cfg = cfg || {}, this.mask = $(cfg.mask || ".mask"), this.popup = $(cfg.popup || ".popup"), this.template = cfg.template || "popup-template";
			if(!this.mask.length){
				this.mask=$('<div class="mask"></div>').appendTo('body');
			}
			if(!this.popup.length){
				this.popup=$('<div class="popup"></div>').appendTo('body');
			}
			this.bindEvents();
		},
		show: function() {
			this.mask.add(this.popup).show();
			this.resetPos();
		},
		hide: function() {
			this.mask.add(this.popup).hide();
		},
		setContent: function(e,callback) {
			var html = template(this.template, e);
			this.popup.html(html);
			this.show();
			callback && callback(this.popup);
		},
		bindEvents: function() {
			var self = this;
			$(document).on( "click",".btn-close", function(e) {
				e.preventDefault();
				self.hide();
			})
		},
		resetPos: function(){
			var left = ($(window).width()-this.popup.width())/2;
			var viewportH = window.innerHeight || document.documentElement.clientHeight || 100;
			var isFixed = (this.popup.css('position')==='fixed');
			var top = (viewportH-this.popup.height())/2;
			if(isFixed){
				this.popup.css({
					left: '50%',
					top : '50%',
					marginLeft:'-'+this.popup.width()/2+'px',
					marginTop:'-'+this.popup.height()/2+'px'
				});
			}else{
				top +=$('body').scrollTop();
				this.popup.css({
					left: left,
					top : top
				});
			}
		}
	});
	var Lottery = function (config) {
		config = config || {};
		this.activeId = config.activeId;
		this.chance = config.chance || 0;

		var self = this;
		
		if(config.qid){
			this.setMID(config.qid);
		}
		if(window.QHPass){
	        QHPass.getUserInfo(function(user){
	           if(user && user.qid) self.setMID(user.qid);
	        });
	    }

		this.setMobile(config.mobile);
		this.api = config.drawer || "uc";
		this.beginTime=0;
		var url = "http://lottery.mobilem.360.cn/turntable/" + this.api;
		this.drawUrl="/prize/prizedraw?callback=?";
		this.feedbackUrl = "/prize/drawlotterytpl?callback=?";
		this.validatePhoneUrl=('uc'==ActivityConfig.drawer?'/prize/drawcheckmobile?callback=?':'/prize/checkmobile?callback=?')

		this.addChanceUrl = "/prize/sharedrawaddnums?callback=?";
		this.getChanceUrl = url + "/getcurtimes?jscallback=?";
		this.allLuckInfoUrl = url + "/drawlist?jscallback=?";
		//this.myLuckInfoUrl = url + "/praiselist?jscallback=?";
		this.myLuckInfoUrl = "/prize/myDrawLottery?callback=?";
		this.getAllPrizesUrl = url + "/getprizes?jscallback=?";
		this.getDrawNumUrl = url + "/alldrawnum?jscallback=?";
		this.getAddressUrl = url + "/getaddress?jscallback=?";
		this.getScheduleUrl = url + "/schedule?jscallback=?";
	}
	$.extend(Lottery.prototype, {
		_request: function(cfg) {
			var param = {
					active: this.activeId,
					mid: this.getMID(),
					mnlogin:this.api,
					mobile:this.getMobile(),
					__: (new Date).getTime()
				};
			$.extend(param, cfg.data || {});
			$.ajax({
				type: 'get',
				url: cfg.url,
				data: param,
				dataType: "jsonp",
				success: function(t) {
					//console.log('success',cfg.url,'param',param,'response',t);
					t && (t.status == "ok"|| t.status == 0) ? cfg.onSuccess && cfg.onSuccess(t.data) : cfg.onError && cfg.onError(t && (t.data || t.msg),t.status,t);
					cfg.onComplete && cfg.onComplete(t);
				},
				error: function(data) {
					//console.error('error',cfg.url,data);
					cfg.onError && cfg.onError();
				}
			});
			return this;
		},
		//抽奖
		run: function() {
			var self = this;
			this.chance = Math.max(0, this.chance - 1);
			if (this.addChanceLocked) {
				setTimeout(function() {
					self.run();
				}, 100);
				return;
			}
			this._request({
				url: this.drawUrl,
				onSuccess: function(data) {
					self.showResult(data);
				},
				onError: function(data,status,t) {
					if('end'==data){
						self.alreadyEnd();
						return;
					}
					if('nostart'==data){
						self.notBegin();
						return;
					}
					if('notimes'==data){
						self.noTimes(t.weibo,t.weixin);
						return;
					}
					if('400019'==status || '400016'==status || '400030' ==status){
						self.showValidPhoneDialog();
						return;
					}
					self.showResult({
						drawtype: "-1",
						prizeid:"-1"
					});
				}
			})
		},
		setMID:function(qid){
			this.qid=qid;
		},
		getMID: function() {
			return this.qid;
		},
		setMobile: function(mobile) {
			this.mobile=mobile;
		},
		getMobile: function() {
			return this.mobile;
		},
		needLogin: function() {
			return this.api=='uc';
		},
		//获取当前活动时间
		getSchedule: function(callback) {
			var self = this;
			return this._request({
				url: this.getScheduleUrl,
				onSuccess: function(n) {
					callback && callback(n.msg);
				}
			});
		},
		//获取用户当前的抽奖次数
		getChance: function(callback) {
			if(this.getMID()){
				var self = this;
				return this._request({
					url: this.getChanceUrl,
					onSuccess: function(n) {
						self.chance = n;
						self.updateChance(self.chance);
						callback && callback(n);
					},
					onError: function(data) {
						self.chance = 0;
						self.updateChance(self.chance);
						callback && callback(0);
					}
				});
			}
		},
		//添加抽奖机会
		addChance: function(type,success, error) {
			var self = this;
			self.addChanceLocked = true;
			return this._request({
				url: this.addChanceUrl,
				data: {
					type: type
				},
				onSuccess: function(data) {
					self.chance = data|0;
					self.updateChance(self.chance);
					success && success(data)
				},
				onError: error,
				onComplete: function(e) {
					self.addChanceLocked = false;
				}
			});
		},
		//所有奖品信息
		getAllPrizes:function(callback){
			this._request({
				url: this.getAllPrizesUrl,
				data: {},
				onSuccess: function(data){
					var orderIndex=0;
					var prizelist={};
					$.each(data,function(i,obj){
						$.each(obj,function(i,prize){
							prize.showOrder=orderIndex;
							prizelist[prize.prizeid]=prize;
							orderIndex++;
							callback && callback(prizelist);
						});
					});
				}
			})
		},
		//所有奖品的获奖列表
		getAllLuckInfo: function(callback, activeid) {
			var param = {};
			activeid && (param.active = activeid);
			return this._request({
				url: this.allLuckInfoUrl,
				data: param,
				onSuccess: callback
			})
		},
		//所有中奖总次数
		getDrawNum:function(callback,activeid){
			var param = {};
			activeid && (param.active = activeid);
			return this._request({
				url: this.getDrawNumUrl,
				data: param,
				onSuccess: callback
			})
		},
		//用户自己的获奖列表
		getMyLuckInfo: function(success) {
			return this._request({
				url: this.myLuckInfoUrl,
				onSuccess: success,
				onError: function(){
					success && success([]);
				}
			})
		},
		showResult: function(e) {
			e.drawtype == "-1" ? this.lostPrize(e) : this.winPrize(e);
			this.handleResult(e);
		},
		//获取用户的信息
		getInfo: function(callback) {
			return this._request({
				url: this.getAddressUrl,
				onSuccess: callback
			})
		},
		//添加用户的信息
		sendInfo: function(form,data,success, error) {
			if(!form) return;
			var eles = form.elements;
			var errmsgs = this._validate(form,
				{
					addressCode :/^\d+$/
				},
				{
					consignee_add_province:{
						addressCode: "请选择省"
					},
					consignee_add_city:{
						addressCode: "请选择市"
					},
					consignee_add_county:{
						addressCode: "请选择区/县"
					}
				});
			if (errmsgs.length) {
				error && error(errmsgs[0].tip);
				return;
			}
			var param = {
				prizeid:eles.prizeid.value,
				accepter: eles.accepter.value,
				address: eles.address.value,
				phone: eles.phone.value,
				provinceCode: eles.consignee_add_province ? eles.consignee_add_province.value : '',
				cityCode: eles.consignee_add_city ? eles.consignee_add_city.value : '',
				countyCode: eles.consignee_add_county ? eles.consignee_add_county.value : '',
				ischange:eles.ischange.value,
				sendtime: 1
			};
			param = $.extend(param,data || {});
			return this._request({
				url: this.feedbackUrl,
				data: param,
				onSuccess: success,
				onError: error
			});
		},
		// 验证手机号
		validatePhone:function(form, success, error) {
			if(!form) return;
			var eles = form.elements;
			var errmsgs = this._validate(form,
				{},
				{
					phoneCode:{
						filled: "请输入验证码",
					}
				});
			if (errmsgs.length) {
				error && error(errmsgs[0].tip);
				return;
			}
			var param = {
				mobile: eles.phone.value,
				code: eles.phoneCode.value
			};
			var self = this;
			return this._request({
				url: this.validatePhoneUrl,
				data: param,
				onSuccess: function(data){
					'base'==ActivityConfig && self.setMID(data.mid);
					self.setMobile(data.mobile);
					success && success(data);
				},
				onError: error
			})
		},
		_validate: function(e, r, m) {
			var defaultRules={
				filled: /\S+/,
				phone: /^1\d{10}$/i
			},defaultMsgs={
				accepter: {
					filled: "您尚未填写姓名"
				},
				phone: {
					filled: "您尚未填写手机号码",
					phone: "您填写的手机号码有误"
				},
				address: {
					filled: "您尚未填写收货地址"
				}
			}
			var rules = $.extend(defaultRules,r),
				mssages = $.extend(defaultMsgs,m),
				errmsgs = [];
			for (var i in mssages) {
				var ele = e.elements[i];
				if (!ele) continue;
				var value = $.trim(ele.value);
				for (var r in mssages[i]) {
					var rule = rules[r];
					if (!rule) continue;
					rule.lastIndex = 0;
					rule.test(value) || errmsgs.push({
						el: ele,
						tip: mssages[i][r]
					})
				}
			}
			return errmsgs;
		},
		showValidPhoneDialog:function(){},
		winPrize: function() {},
		lostPrize: function() {},
		notBegin:function(){},
		alreadyEnd:function(){},
		noTimes:function(){},
		handleResult: function() {},
		updateChance : function(n){}
	});
	window.Lottery = Lottery;
	window.Popup = Popup;
	window.ZouMa = ZouMa;
})();