jQuery(function($){
        $.datepicker.regional['en-US'] = {
                closeText: 'close',
                prevText: '<',
                nextText: '>',
                currentText: 'today',
                monthNames: ['January','February','March','April','May','June',
                'July','August','September','October','November','December'],
                monthNamesShort: ['January','February','March','April','May','June',
                'July','August','September','October','November','December'],
                dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                dayNamesShort: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                dayNamesMin: ['day','one','two','three','four','five','six'],
                weekHeader: 'week',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['en-US']);
});