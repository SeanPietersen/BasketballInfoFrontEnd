Rats.UI.LoadAnimation = {
    "start" : function() {
        var opts = {
            lines: 13,
            length: 7,
            width: 4,
            radius: 10,
            corners: 1,
            rotate: 0,
            color: '#000',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: $(window).height()/2.5,
            left: "auto"
        };
        var target = $("body")[0];
        return new Spinner(opts).spin(target);
    },
    "stop" : function(spinner)
    {
        spinner.stop();
    }
};

