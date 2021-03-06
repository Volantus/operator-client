function AbstractWidget()
{
    /**
     * @type {string}
     */
    this.id = 'undefinedWidgetId';

    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * @type {string}
     */
    this.templateId = undefined;

    /**
     * @type {string}
     */
    this.segmentId = undefined;

    /**
     * @type {string}
     */
    this.template = undefined;

    /**
     * @type {object}
     */
    this.segment = undefined;

    this.init = function ()
    {
        this.active = true;
    };

    this.close = function ()
    {
        this.tearDown();
        this.segment.remove();
        this.active = false;
        app.WidgetController.onTearDown(this);
    };

    this.tearDown = function ()
    {
    };

    this.loadTemplate = function ()
    {
        var widget = this;
        $.get('/templates/' + this.templateId + ".html", function (template) {
            widget.template = template;
        })
    };

    this.show = function ()
    {
        var widget = this;
        $('#ContentGrid').append(this.template);
        this.segment = $('#' + this.segmentId);
        this.segment.find('.top.attached.label').click(function () {
            widget.close();
        })
    }
}