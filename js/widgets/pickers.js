var picker = {
    timePicker: function(cb_done, cb_change){
        var picker = $("<div>").timepicker({
            onDone: cb_done,
            onChange: cb_change,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "timepicker-dialog"
            }
        });
    },

    timeSelect: function(cb_done){
        var picker = $("<div>").timeselect({
            onDone: cb_done,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "timeselect-dialog"
            }
        });
    },

    wheelSelect: function(values, value, cb_done, title){
        var picker = $("<div>").wheelselect({
            title: title,
            values: values,
            value: value,
            onDone: cb_done,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "wheelselect-dialog"
            }
        });
    },

    calendarPicker: function(cb_done, options){
        var picker_options = $.extend({}, {
            isDialog: true,
            onDone: cb_done
        }, (options != undefined ? options : {}));

        var picker = $("<div>").calendar(picker_options);
        return coreDialog.create({
            content: picker,
            options: {
                cls: "calendar-dialog"
            }
        });
    },

    datePicker: function(cb_done, options){
        var picker_options = $.extend({}, {
            isDialog: true,
            onDone: cb_done
        }, (options != undefined ? options : {}));

        var picker = $("<div>").datepicker(picker_options);
        return coreDialog.create({
            content: picker,
            options: {
                cls: "datepicker-dialog"
            }
        });
    }
};

$.Picker = window.corePicker = picker;