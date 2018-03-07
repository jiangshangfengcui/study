;(function($){
	/**	 
	 * @param opt {df:触发的间隔高度单位：像素,e:拉动到可视区触发的事件}
	 * demo:
	 * $('#tL').loaded(function(){},20 ).;
	 * */
	 
	 	/**判断元素的高度是否在可视范围内*/
    var gIsKs = function(ele,sts) {
		if (sts.ct === undefined || sts.ct === window) {
			var fold = $(window).height() + $(window).scrollTop();
		} else {
			var fold = $(sts.ct).offset().top + $(sts.ct).height();
		}
		return fold <= $(ele).offset().top - sts.df;
	};
	/**判断元素是否在可视区上部*/
	 
	 
    $.fn.loaded = function (opt,df) {

        //更改调用方式
        //原来这样调用 $('#tL').loaded({e:function(){});
        //现在可以这样调用$('#tL').loaded(function () { })
        if ((typeof opt) == "function") {
            opt = { e: opt };
        }
        
        if (parseInt(df) > 0) {
            opt.df = df;
        }

		var sts={df:20,e:null,et:"scroll",ct:window};
		if (opt) {
			$.extend(sts,opt);
		}
		var eles = this;
		if ("scroll" == sts.et) {
			$(sts.ct).bind(
					"scroll",
					function(){
						eles.each(function(){
							if (!gIsKs(this,sts)){
								$(this).trigger("appear");
							};
						});
						var temp = $.grep(eles, function(els) {
							return !els.loaded;
						});
						eles = $(temp);
					}		
			);
		}
		this.each(function(){
			var self = this;self.loaded = false;
			$(self).one("appear",function() {
				if (!this.loaded) {
					if( sts.e != null && sts.e !='')
						sts.e.apply(self);
					self.loaded = true;
				}
			});
			if ("scroll" != sts.et) {
				$(self).bind(sts.et,function(event) {
					if (!self.loaded) {
						$(self).trigger("appear");
					}
				});
			}
		});
		$(window).scroll();
		return this; 
	};

	/**$.gIsTop = function(ele, sts) {
		if (sts.ct === undefined || sts.ct === window) {
			var fold = $(window).scrollTop();
		} else {
			var fold = $(sts.ct).offset().top;
		}
		return fold >= $(ele).offset().top + sts.df	+ $(ele).height();
	};*/
})(jQuery);