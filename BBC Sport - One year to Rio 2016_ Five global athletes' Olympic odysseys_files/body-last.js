(function (onesport) {
    if (!onesport.enhanced) {
        return;
    }

    var i,
        iLimit,
        // Keep these in sync with modules/onesport-desktop.js
        requires = [
            'module/debouncer',
            'module/fast-button',
            'module/scroll-to-top',
            'module/nav-3/columniser/controller',
            'module/nav-3/columniser/view',
            'module/nav-3/dynamic-crumb/controller',
            'module/nav-3/dynamic-crumb/view',
            'module/nav-3/more/controller',
            'module/nav-3/more/model',
            'module/nav-3/more/view',
            'module/nav-3/primary-nav/controller',
            'module/nav-3/primary-nav/model',
            'module/nav-3/primary-nav/view',
            'module/nav-3/primary-nav-flyout/controller',
            'module/nav-3/primary-nav-flyout/model',
            'module/nav-3/primary-nav-flyout/view',
            'module/nav-3/primary-nav-flyout-sections/controller',
            'module/nav-3/primary-nav-flyout-sections/model',
            'module/nav-3/primary-nav-flyout-sections/view',
            'module/nav-3/secondary-nav-flyout/controller',
            'module/nav-3/secondary-nav-flyout/model',
            'module/nav-3/secondary-nav-flyout/view',
            'vendor/pubsub'
        ],
        requireMap = {},
        pageInit = function () {
            require( // Similar to page init in onesport
                [
                    'jquery-1.9',
                    'module/debouncer',
                    'onesport',
                    'module/fast-button'
                ],
                function (
                    $,
                    debouncer,
                    onesport,
                    FastButton
                ) {
                    $(document).ready(function () {
                        debouncer.init();
                        FastButton.init();

                        $('#blq-main').addClass('no-keyboard-navigation-in-use');
                        $('body').on('keydown', function (event) {
                            if (event.which == 9) {
                                $('#blq-main').removeClass('no-keyboard-navigation-in-use');
                            }
                        });

                        iLimit = onesport.moduleJs.length;
                        for (i = 0; i < iLimit; i++) {
                            onesport.moduleJs[i]();
                        }
                    });
                }
            );
        };

    if (onesport.config.env === 'sandbox') {
        iLimit = requires.length;
        for (i = 0; i < iLimit; i++) {
            requireMap[requires[i]] = onesport.config.staticPrefix + '/modules/' + requires[i];
        }
        require({paths: requireMap}, function () {
            pageInit();
        });

    } else {
        require([onesport.config.staticPrefix + '/modules/compiled/all-desktop.js'], function () {
            pageInit();
        });
    }

}(onesport));