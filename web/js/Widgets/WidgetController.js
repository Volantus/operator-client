function WidgetController()
{
    /**
     * @type {Object}
     */
    this.selectionDropdown = undefined;

    /**
     * @type {Array}
     */
    this.widgets = {};

    this.init = function ()
    {
        this.widgets[MapWidget.id] = new MapWidget();
        this.widgets[MapWidget.id].loadTemplate();

        this.selectionDropdown = $('#WidgetSelectionDropdown');
        this.selectionDropdown.dropdown({
            onChange: function (widgetId) {
                var widget = app.WidgetController.widgets[widgetId];

                if (!widget.active) {
                    console.log('[WidgetController] Initializing ' + widgetId + ' widget ...');
                    widget.init();
                    widget.show();
                    widget.active = true;
                    console.log('[WidgetController] Finished initializing ' + widgetId + ' widget!');
                }
            }
        });
    }
}