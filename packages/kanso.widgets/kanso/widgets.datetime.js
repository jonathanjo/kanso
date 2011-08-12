var core = require('./widgets.core'),
    db = require('kanso/db'),
    sanitize = require('kanso/sanitize'),
    utils = require('kanso/utils'),
    events = require('kanso/events'),
    _ = require('kanso/underscore')._;

var h = sanitize.escapeHtml,
    css = sanitize.escapeAttributeSelectorValue;



// @JC
exports.datetime1 = function (_options) {
    var w = new Widget('datetime1', _options || {});
    w.options = _options;
    w.toHTML = function (name, value, raw, field, options) {
        if (raw === undefined) {
            raw = (value === undefined) ? '': '' + value;
        }
        if (raw === null || raw === undefined) {
            raw = '';
        }
        var html = '<input type="hidden"';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, options.offset, options.path_extra) + '"';
        html += ' value="' + h(raw) + '/>';

        html += '<input type="text"';
        html += ' name="' + this._name(name, options.offset) + '" id="';
        html += this._id(name, 'widget', options.offset, options.path_extra) + '"';
        html += ' value="' + h(raw) + '/>';


        return html;
    };
    return w;
};




// @JC
exports.datetime2a = function (_options) {
    var w = new Widget('datetime2a', _options);
    w.toHTML = function (name, value, raw, field, options) {
        if (raw === undefined) {
            raw = (value === undefined) ? '': '' + value;
        }
        if (raw === null || raw === undefined) {
            raw = '';
        }
        var html = '<div ra="ra" id="';
        html += this._id(name, 'widget', options.offset, options.path_extra) + '">';
        // html += '<input type="text" class="dpicker" value="' + h(raw) + '"/>';
        // html += '<input type="text" class="dpickeralt" value="' + h(raw) + '"';
        html += '<input type="text" class="dpicker" value=""/>';
        html += '<input type="text" class="dpickeralt" value=""';        
        html += ' name="' + this._name(name, options.offset) + '" />';
        html += '</div>';
        return html;
    };

    w.clientInit = function (field, path, value, raw, errors, options) {
        var id = this._id(
            path, 'widget', options.offset, options.path_extra
        );
        var container_elt = $('#' + id);
        var widget_options = (this.options || {});

        var date_elt = this._discoverDateElement(container_elt);

        console.log(" -> here I found it");
        console.log(date_elt);
        $(date_elt).datepicker();
        // $(date_elt).datepicker({
        //     // altField: $(this).closest('div').find('.dpickeralt'),
        //     altField: $(this).closest('.dpickeraltt'),
        //     altFormat: "@"
        // });


    };


    w.cacheInit = function () {
        this.discoverDateElement = this._discoverDateElement;
    };

    w._discoverDateElement = function (container_elt) {
        return $(container_elt).closestChild('.dpicker');
    };



    return w;
};
