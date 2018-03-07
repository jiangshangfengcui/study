/*
用法:
Timer({
    milliseconds:3600,  //总时间
    interval: 500, //间隔时间
    immediately: true,//立即执行一次
    callback: function (milliseconds, desc) { //回调    milliseconds剩余毫秒   desc
        console.log(milliseconds, desc.days, desc.hours, desc.minutes, desc.second, desc.millisecond);                
    },
    fnEnd: function () {//结束后的回调
        console.log('end');
    }
}).run();


*/

//#region Timer

function Timer(params) {
    function timer(params) {
        this._init(params);
        this._runningflag;
    }
    timer.prototype = {
        _init: function (params) {
            this.params = params;
        },
        run: function () {  //启动定时器
            //#region 输入毫秒  输出天时分秒的对象
            function dateInfo(milliseconds) {
                var days = 0,
                    hours = 0,
                    minutes = 0,
                    second = 0,
                    millisecond = 0;

                if (milliseconds > 0) {
                    days = parseInt(milliseconds / (1000 * 60 * 60 * 24))
                    hours = parseInt(milliseconds / (1000 * 60 * 60) % 24)
                    minutes = parseInt(milliseconds / (1000 * 60) % 60)
                    second = parseInt(milliseconds / 1000 % 60);
                    millisecond = milliseconds % 1000;
                }

                return {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    second: second,
                    millisecond: millisecond
                }
            }
            //#endregion

            var _this = this;

            _this.params.immediately && _this.params.callback(_this.params.milliseconds, dateInfo(_this.params.milliseconds))

            var running = setInterval(function () {
                _this.params.milliseconds -= _this.params.interval;

                if (_this.params.milliseconds < 0) {
                    clearInterval(running);

                    _this.params.callback(0, dateInfo(_this.params.milliseconds));
                    _this.end();
                    return;
                }
                _this.params.callback(_this.params.milliseconds, dateInfo(_this.params.milliseconds));

            }, this.params.interval)
        },
        end: function () {
            this.params.fnEnd && this.params.fnEnd();
        }
    }

    return new timer(params);
}
//#endregion