$.widget( "corecss.tabs" , {

    version: "1.0.0",

    options: {
        openTarget: false,
        duration: CORE_ANIMATION_DURATION,
        target: 'self',
        markerColor: 'bg-white',
        onTabClick: function(tab){return true;},
        onTabChange: function(tab){}
    },


    _create: function () {
        var that = this, element = this.element, o = this.options;
        var tabs = element.find('li:not(.tab-marker)');
        var tab = $(tabs[0]);

        //console.log(tab);

        this._setOptionsFromDOM();

        this._createTabs();
        this._createEvents();
        this._openTab(tab, null);

        element.data('tabs', this);
    },

    _createTabs: function(){
        var element = this.element, o = this.options;
        //var tabs = element.find('li:not(.tab-marker)');
        var tab_marker = element.find('li.tab-marker');

        if (tab_marker.length == 0) {
            tab_marker = $("<li>").addClass("tab-marker");
            tab_marker.appendTo(element);
        }

        if (o.markerColor.isColor()) {
            tab_marker.css('background', o.markerColor);
        } else {
            tab_marker.addClass(o.markerColor);
        }
    },

    _openTab: function(tab, direction){
        var element = this.element, o = this.options;
        var tabs = element.find('li:not(.tab-marker)');
        var frames = o.target === 'self' ? element.siblings('.tabs-content').children('div') : $(o.target).children('div');
        var frame = '#'+tab.data('target');
        var marker = element.find('li.tab-marker');
        var tab_width = tab.outerWidth();
        var tab_left = tab.position().left;
        var tab_left_off = tab.offset().left;
        var shift = tab.position().left + tab.outerWidth();
        var width = element.outerWidth();
        var scroll = element.scrollLeft();

        tabs.removeClass('active');
        frames.hide();

        tab.addClass('active');
        $(frame).show();

        marker.animate({
            width: tab_width,
            top: '100%',
            left: tab_left + scroll
        }, o.duration);

        if (shift > width) {
            element.animate({
                scrollLeft: scroll + (shift - width)
            }, CORE_ANIMATION_DURATION);
        }

        if (tab.position().left < 0) {
            element.animate({
                scrollLeft: tab_left + scroll
            }, CORE_ANIMATION_DURATION);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find('li');
        var frames = o.target === 'self' ? element.siblings('.tabs-content').children('div') : $(o.target).children('div');

        element.on('click', 'li', function(e){

            if ($(this).hasClass('tab-marker')) return;
            if ($(this).hasClass('scroll-control-left')) return;
            if ($(this).hasClass('scroll-control-right')) return;

            var result;
            var tab = $(this), target = tab.data('target'), frame = $(target);
            var tab_active = element.find("li.active");
            var change_direction = tabs.index(tab) > tabs.index(tab_active) ? 'right' : 'left';

            //console.log(change_direction);

            if (tab.parent().hasClass('disabled')) {return false;}

            if (typeof o.onTabClick === 'function') {
                if (!o.onTabClick(tab)) {return false;}
            } else {
                if (typeof window[o.onTabClick] === 'function') {
                    if (!window[o.onTabClick](tab)) {return false;}
                } else {
                    result = eval("(function(){"+o.onTabClick+"})");
                    if (!result.call(tab)) {return false;}
                }
            }

            if (target !=undefined && target.isUrl()) {
                window.location.href = target;
                return true;
            }

            element.data('activeTab', target);

            that._openTab(tab, change_direction);

            if (typeof o.onTabChange === 'function') {
                o.onTabChange(tab);
            } else {
                if (typeof window[o.onTabChange] === 'function') {
                    window[o.onTabChange](tab);
                } else {
                    result = eval("(function(){"+o.onTabChange+"})");
                    result.call(tab);
                }
            }

            e.preventDefault();
            //e.stopPropagation();
        });
    },

    hideTab: function(tab){

    },

    showTab: function(tab){

    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
