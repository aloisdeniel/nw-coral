var gui = require('nw.gui');
var win = gui.Window.get(); 

var body = $(document.body);

var createTitleBar = function(window) {

    var titlebar = $("<div />", { id: "window-title" });
    
    // Options
    var options = $("<div />", { "class": "options" });
    var close = $("<a />", { "class": "close", "href": "#" }).append($("<i />", { "class": "ion-close-round" }));
    options.append(close);
    var maximize = $("<a />", { "class": "maximize", "href": "#" }).append($("<i />", { "class": "ion-arrow-resize" }));
    options.append(maximize);
    var minimize = $("<a />", { "class": "minimize", "href": "#" }).append($("<i />", { "class": "ion-minus-round" }));
    options.append(minimize);
    titlebar.append(options);
    
    //Icon
    var img = $("<img />", { "class": "logo" });
    titlebar.append(img);
    
    //Title
    var h1 = $("<h1 />");
    titlebar.append(h1);
    
    //Adding to body
    body.append(titlebar);
    
    //Handlers
    close.on('click', function() {  window.close(); gui.App.quit(); });
    maximize.on('click', function() {   if (screen.availHeight <= win.height) { window.unmaximize();} else { window.maximize(); } });
    minimize.on('click', function() {  window.minimize(); });
    
    return {
        root: titlebar,
        children: {
            title: h1,
            icon: img
        }
    };
};

var createHeaderBar = function(options) {
    
    var bar = $("<div />", { id: "window-header" });
    
    // Menu
    var button = $("<a />", { "class": "menu ion-navicon-round", "href": "#" });
    bar.append(button);
    
    //Actions
    var actions = $("<div />", { "class": "actions" });
    bar.append(actions);
    
    //Adding to body
    body.append(bar);
    
    //Handlers
    button.on('click', function() {  
        var rect = button.offset();
        options.menu.popup(rect.left,rect.top + 25); 
    });
    
    return {
        root: bar,
        children : {
            menu: button,
            actions: actions
        }
    };
};

var createNavigationBar = function() {
    
    var tabDivs = $("#window-content .tab");
    
    if(!tabDivs.length)
    {
        $("#window-content").addClass('tab');
        return null;
    }
    
    $("#window-content").addClass('with-tabs');
    
    var bar = $("<div />", { id: "window-navigation" });
    var tabs = [];
    
    tabDivs.each(function(i) {
        var link = $("<a />", { "href": "#" });
        var icon = $("<i />", { "class": $(this).attr('icon') });
        var notifications = $("<b />");
        notifications.hide();
        link.append(icon);
        var title = $("<span />");
        title.text($(this).attr('title'));
        link.append(title);
        link.append(notifications);
        bar.append(link);
        tabs.push({
            button: link,
            notifications: notifications,
            content: $(this)
        });
    });
    
    //Adding to body
    body.append(bar);
    
    return {
        root: bar,
        children : {
            tabs: tabs
        }
    };
};

var createLoadingLayer = function() {
    
    var layer = $("<div />", { "id": "window-layer", "class" : "animated fadingOut" });
    layer.hide();
    
    var indicator = $("<div />", { "class": "indicator" });
    layer.append(indicator);
    
    // Spinner
    indicator.append($("<div />", { "class": "spinner" })
        .append($("<div />", { "class": "bounce1" }))
        .append($("<div />", { "class": "bounce2" }))
        .append($("<div />", { "class": "bounce3" }))
    );
    
    // Message
    var h2 = $("<h2 />");
    indicator.append(h2);
    
    //Adding to body
    body.append(layer);
    
    return {
        root: layer,
        children: {
            message: h2   
        }
    }; 
};

var createFooterBar = function() {
    
    var bar = $("<div />", { "id": "window-footer" });
  
    // Icon
    var i = $("<i />");
    bar.append(i);
    
    // Message
    var h2 = $("<h2 />");
    bar.append(h2);
    
    //Adding to body
    body.append(bar);
    
    return {
        root: bar,
        children: {
            icon: i,
            message: h2   
        }
    };
};

var createPopup = function() {

    if(!( $('#window-popups').length))
    {
        return null;
    }
    
    var popups = $("#window-popups");
    var bar = $("<div />", { "id": "window-popups-title" });
    
    // Options
    var options = $("<div />", { "class": "options" });
    var close = $("<a />", { "class": "close", "href": "#" }).append($("<i />", { "class": "ion-close-round" }));
    options.append(close);
    bar.append(options);
    
    //Title
    var h1 = $("<h1 />");
    bar.append(h1);
    
    //Adding to body
    popups.append(bar);
    
    //Handlers
    close.on('click', function() {  
        popups.removeClass("visible");
        $("#window-popups .popup").each(function(i) { $(this).hide(); });
        bar.hide();
    });
    
    return {
        root: popups,
        children: {
            title: h1,
            bar: bar 
        }
    };
};

/**
 * Represents a window, which includes a title bar, a header bar, responsive tabs and many other components.
 * @constructor
 * @example var coral = new Coral({ menu: mymenu, icon: 'img/logo.png' });
 * @param {object} option - The options needed to create a window (at least: { menu: [node-webkit menu], icon: [link to an image] } )
 */
var Coral = function (options)
{
    // Updating system layout
    if(process.platform === "darwin") { body.addClass("mac"); }
    else { body.addClass("windows"); }
    
    /* Creating elements */
    this.titlebar = createTitleBar(win);
    this.headerbar = createHeaderBar(options);
    this.loadinglayer = createLoadingLayer();
    this.footerbar = createFooterBar();
    this.navigationbar = createNavigationBar();
    this.popup = createPopup();
    
    /* Tab selection */
    if(this.navigationbar !== null)
    {
        var _this = this;
        this.navigationbar.children.tabs.forEach(function(tab,i) { tab.button.on('click',i, function(e) { _this.selectTab(e.data); }); });
    }
    
    //Initialization
    this.setTitle($(document).attr('title'));
    this.setIcon(options.icon);
    this.selectTab(0);
};

/**
 * Sets the title of the window in the title bar.
 * @name setTitle
 * @function
 * @param {string} title - The new title of the window.
 * @memberOf Coral
 */
Coral.prototype.setTitle = function(title) 
{ 
    this.titlebar.children.title.text(title);
};

/**
 * Sets the icon of the window in the title bar.
 * @name setIcon
 * @function
 * @param {string} src - The link to the new icon of the window.
 * @memberOf Coral
 */
Coral.prototype.setIcon = function(src)
{ 
    this.titlebar.children.icon.attr( "src", src );
};

/**
 * Sets the icon and the status message in the footer bar.
 * @name setStatus
 * @function
 * @param {string} icon - The class of the icon that will be used.
 * @param {string} message - The status message.
 * @memberOf Coral
 */
Coral.prototype.setStatus = function(icon,message)
{ 
    this.footerbar.children.message.text(message); 
    this.footerbar.children.icon.attr("class",icon); 
};

/**
 * Updates the action buttons in the header bar.
 * @name setActionBar
 * @function
 * @example coral.setActions([{ icon: 'ion-share', action: function() { ... } },{ icon: 'ion-mail', action: function() { ... } }])
 * @param {array} actions - The actions that will be displayed in header bar. Each action must contains : iconClass, action.
 * @memberOf Coral
 */
Coral.prototype.setActionBar = function(actions)
{
    var actionbar = this.headerbar.children.actions;

    actionbar.empty();

    actions.forEach(function(action,index) {
        var button = $("<a />", { "href": "#" });
        button.addClass("animated");
        button.addClass("fadeIn");
        button.addClass(action.icon);
        button.on('click', action.action);
        actionbar.append(button);
    });
};

/**
 * Selects the tab with given index.
 * @name selectTab
 * @function
 * @param {array} index - The index of the selected tab.
 * @memberOf Coral
 */
Coral.prototype.selectTab = function(index) 
{ 
    if(this.navigationbar === null)
        return;
    
    this.navigationbar.children.tabs.forEach(function(tab,i) {
        if(index === i)
        {
            tab.content.removeClass('hidden');
            tab.button.addClass('selected');
        }
        else
        {
            tab.content.addClass('hidden');
            tab.button.removeClass('selected');
        }
    });
};

/**
 * Updates the notification badge of a tab.
 * @name updateTabNotifications
 * @function
 * @param {int} index - The notified tab
 * @param {string} value - The badge value for wide mode.
 * @memberOf Coral
 */
Coral.prototype.updateTabNotifications = function(index,value) 
{ 
    if(this.navigationbar === null)
        return;
    
    var tab = this.navigationbar.children.tabs[index];
    
    if(!value)
    {
        tab.notifications.hide();
    }
    else
    {
        tab.notifications.text(value);
        tab.notifications.show();
    }
};

/**
 * Shows a modal window.
 * @name showPopup
 * @function
 * @param {string} id - The id of the window
 * @memberOf Coral
 */
Coral.prototype.showPopup = function(id)
{ 
    var popup = $("#" + id);
    this.popup.children.title.text(popup.attr('title'));
    this.popup.children.bar.show();
    this.popup.root.addClass("visible");
    popup.show();
};

/**
 * Closes the currently open modal window.
 * @name closePopup
 * @function
 * @memberOf Coral
 */
Coral.prototype.closePopup = function()
{ 
    this.popup.root.removeClass("visible");
    this.popup.children.bar.hide();
    $("#window-popups .popup").each(function(i) { $(this).hide(); });

};

/**
 * Shows the loading layer onto the window.
 * @name showLoading
 * @function
 * @param {string} message - The loading message
 * @memberOf Coral
 */
Coral.prototype.showLoading = function(message)
{ 
    this.loadinglayer.children.message.text(message);
    this.loadinglayer.root.show();
};

/**
 * Hides the loading layer onto the window.
 * @name hideLoading
 * @function
 * @memberOf Coral
 */
Coral.prototype.hideLoading = function() {
    this.loadinglayer.root.hide();
};