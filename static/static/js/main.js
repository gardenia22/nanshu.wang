(function() {
    var getStyle = function(el, prop) {
        return window.getComputedStyle ? getComputedStyle(el).getPropertyValue(prop) : el.currentStyle[prop];
    };

    var addEvent = function(el, type, fn) {
        if (el.addEventListener) el.addEventListener(type, fn, false);
        else el.attachEvent('on' + type, fn);
    };

    var extend = function(obj, ext) {
        for (var key in ext)
            if (ext.hasOwnProperty(key)) obj[key] = ext[key];
        return obj;
    };

    window.fitText = function(el, kompressor, options) {
        var settings = extend({ 'minFontSize': -1/0, 'maxFontSize': 1/0 }, options);

        var fit = function(el) {
            var compressor = kompressor || 1;
            var resizer = function() {
                el.style.fontSize = Math.max(
                    Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)),
                    parseFloat(settings.minFontSize)
                ) + 'px';
            };
            resizer();
            addEvent(window, 'resize', resizer);
        };

        if (el.length) for (var i = 0; i < el.length; i++) fit(el[i]);
        else fit(el);
        return el;
    };
})();

fitText(document.getElementById('title'), 1);
