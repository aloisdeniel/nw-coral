var gui = require('nw.gui');
var win = gui.Window.get(); 

var menu = new gui.Menu(); 
    
var menuItem = new gui.MenuItem({ 
    type: "normal",                
    label: "Open",            
    click: function() { 
        
    }
});

menu.append(menuItem); 

menu.append(new gui.MenuItem({type: "separator" })); 

menuItem = new gui.MenuItem({ 
    type: "normal",                
    label: "Quit",              
    click: function() { 
        var chooser = document.querySelector("#fileDialog");
        chooser.addEventListener("change", function(evt) { console.log(this.value); }, false);
        chooser.click();  
    }
});

menu.append(menuItem);

var coral = new Coral({
    icon: "img/logo.png",
    menu: menu
});

coral.setActionBar([
    {
        name: "load",
        icon: 'ion-load-a',
        action: function() { 
            coral.showLoading("loading");
            setTimeout(function  () { coral.hideLoading(); }, 2000); 
        }
    },
    {
        name: "show",
        icon: 'ion-information-circled',
        action: function() { coral.showPopup("example-popup"); }
    },
    {
        name: "show2",
        icon: 'ion-information',
        action: function() { coral.showPopup("example-popup-2"); }
    },
    {
        name: "debug",
        icon: 'ion-bug',
        action: function() { win.showDevTools(); }
    },
    {
        name: "refresh",
        icon: 'ion-refresh',
        action: function() { win.reload(); }
    }
]);

coral.updateTabNotifications(2,6);

coral.setStatus("ion-folder","Status of the current task ...");