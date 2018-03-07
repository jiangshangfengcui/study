var server = require('./server');
var router = require('./router');

server.start(router.route);


/**
 * 入口文件所在的文件默认为根目录
 * 
 * 所有请求（包括html, js, css, ajax接口, 下载文件）都必须手动设置路由
 *
 * 在请求对象 request 中可获取到请求的信息（）
 */

 //很显然req对象是一个IncomingMessage实例  
 // IncomingMessage {  
 //   httpVersionMajor: 1,  
 //   httpVersionMinor: 1,  
 //   httpVersion: '1.1',  
 //   complete: false,  
 //   //req.headers属性是请求的头  
 //   headers:  
 //    { host: 'localhost:1337',  
 //      connection: 'keep-alive',  
 //      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*  
 // /*;q=0.8', 
 //      'upgrade-insecure-requests': '1', 
 //      'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like 
 //  Gecko) Chrome/49.0.2623.110 Safari/537.36', 
 //      'accept-encoding': 'gzip, deflate, sdch', 
 //      'accept-language': 'zh-CN,zh;q=0.8', 
 //      cookie: 'qinliang=s%3ABDOjujVhV0DH9Atax_gl4DgZ4-1RGvjQ.OeUddoRalzB4iSmUHcE8 
 // oMziad4Ig7jUT1REzGcYcdg; blog=s%3A-ZkSm8urr8KsXAKsZbSTCp8EWOu7zq2o.Axjo6YmD2dLPG 
 // QK9aD1mR8FcpOzyHaGG6cfGUWUVK00' }, 
 //   //req.rawHeaders属性是没有格式化请求的头 
 //   rawHeaders: 
 //    [ 'Host', 
 //      'localhost:1337', 
 //      'Connection', 
 //      'keep-alive', 
 //      'Accept', 
 //      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8  
 // ',  
 //      'Upgrade-Insecure-Requests',  
 //      '1',  
 //      'User-Agent',  
 //      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome  
 // /49.0.2623.110 Safari/537.36',  
 //      'Accept-Encoding',  
 //      'gzip, deflate, sdch',  
 //      'Accept-Language',  
 //      'zh-CN,zh;q=0.8',  
 //      'Cookie',  
 //      'qinliang=s%3ABDOjujVhV0DH9Atax_gl4DgZ4-1RGvjQ.OeUddoRalzB4iSmUHcE8oMziad4I  
 // g7jUT1REzGcYcdg; blog=s%3A-ZkSm8urr8KsXAKsZbSTCp8EWOu7zq2o.Axjo6YmD2dLPGQK9aD1mR  
 // 8FcpOzyHaGG6cfGUWUVK00' ],  
 //   trailers: {},  
 //   rawTrailers: [],  
 //   upgrade: false,  
 //   url: '/',  
 //   method: 'GET',  
 //   statusCode: null,  
 //   statusMessage: null,  
 //   httpVersionMajor: 1,  
 //   httpVersionMinor: 1,  
 //   httpVersion: '1.1',  
 //   complete: false,  
 //   headers:  
 //    { host: 'localhost:1337',  
 //      connection: 'keep-alive',  
 //      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*  
 // /*;q=0.8', 
 //      'upgrade-insecure-requests': '1', 
 //      'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like 
 //  Gecko) Chrome/49.0.2623.110 Safari/537.36', 
 //      'accept-encoding': 'gzip, deflate, sdch', 
 //      'accept-language': 'zh-CN,zh;q=0.8', 
 //      cookie: 'qinliang=s%3ABDOjujVhV0DH9Atax_gl4DgZ4-1RGvjQ.OeUddoRalzB4iSmUHcE8 
 // oMziad4Ig7jUT1REzGcYcdg; blog=s%3A-ZkSm8urr8KsXAKsZbSTCp8EWOu7zq2o.Axjo6YmD2dLPG 
 // QK9aD1mR8FcpOzyHaGG6cfGUWUVK00' }, 
 //   rawHeaders: 
 //    [ 'Host', 
 //      'localhost:1337', 
 //      'Connection', 
 //      'keep-alive', 
 //      'Accept', 
 //      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8  
 // ',  
 //      'Upgrade-Insecure-Requests',  
 //      '1',  
 //      'User-Agent',  
 //      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome  
 // /49.0.2623.110 Safari/537.36',  
 //      'Accept-Encoding',  
 //      'gzip, deflate, sdch',  
 //      'Accept-Language',  
 //      'zh-CN,zh;q=0.8',  
 //      'Cookie',  
 //      'qinliang=s%3ABDOjujVhV0DH9Atax_gl4DgZ4-1RGvjQ.OeUddoRalzB4iSmUHcE8oMziad4I  
 // g7jUT1REzGcYcdg; blog=s%3A-ZkSm8urr8KsXAKsZbSTCp8EWOu7zq2o.Axjo6YmD2dLPGQK9aD1mR  
 // 8FcpOzyHaGG6cfGUWUVK00' ]  