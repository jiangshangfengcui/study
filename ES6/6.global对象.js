在浏览器中，顶层对象是 window

在浏览器和 web worker 里面， self 也指向顶层对象， 

在 Node 中，global 是顶层对象

如何在不同的环境中统一获取顶层对象成了一个问题
		
		全局环境中，this 会返回顶层对象， 在 Node 和 ES6 模块化开发中 this 返回的却是当前模块，不同统一

		如果浏览器使用了 CSP(Content Security Policy, 内容安全政策), 那么 eval、new Function 这些方法都不能使用


		// 方法一
		(typeof window !== 'undefined'
		   ? window
		   : (typeof process === 'object' &&
		      typeof require === 'function' &&
		      typeof global === 'object')
		     ? global
		     : this);

		// 方法二
		var getGlobal = function () {
		  if (typeof self !== 'undefined') { return self; }
		  if (typeof window !== 'undefined') { return window; }
		  if (typeof global !== 'undefined') { return global; }
		  throw new Error('unable to locate global object');
		};		