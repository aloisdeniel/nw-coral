#nw-coral
![/screenshots/mac-wide.png](Screenshot)

![/screenshots/win-small.png](Screenshot)

Create simple [node-webkit](https://github.com/rogerwang/node-webkit) desktop applications without hassle. It isn't intented to replace big user interface frameworks but to make easier and quicker the creation process of small consistent cross-platform apps.

## Installation

Make sure [nodejs](http://nodejs.org) and [bower](http://bower.io) are installed and that you have [node-webkit](https://github.com/rogerwang/node-webkit).

Then, in your project directory, execute the command :

	bower install nw-coral
	
It is recommended to create a `bower.json` file for your project and then save dependency :

	bower init

	# Enter all project information to generate a bower.json file ...	

	bower install nw-coral --save

You are now ready to use **nw-coral** !

## Quick start

After installation, make sure you have configured your node-webkit app for a frameless window. Your `package.json` file should look like this :

    {
      "name": "my-awesome-app",
      "main": "index.html",
      "window": {
        "toolbar": false,
        "frame": false,
        "position": "center",
        "width": 450,
        "height": 500,
        "min_width": 450,
        "min_height": 500
      }
    }

Import the nw-coral styles into your `index.html` file :

    <link rel="stylesheet" type="text/css" href="bower_components/nw-coral/dist/css/coral.default.min.css" />
    
Import **JQuery** and the nw-coral script at the end of your `body` tag into `index.html` file :

    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/nw-coral/dist/js/coral.min.js"></script>

Create a `div` element in your `body` with the `#window-content` identifier.

    <body>
        <div id="window-content">
        </div>
    </body>

Finaly, create the Coral object that will configure your window just after the previous imports :

    <script type="text/javascript">
    
        var gui = require('nw.gui');

        var menu = new gui.Menu(); 
     
        menuItem = new gui.MenuItem({ 
            type: "normal",                
            label: "Quitter",              
            click: function() { }
        });

        menu.append(menuItem);
    
        var coral = new Coral({
            icon: "img/logo.png",
            menu: menu
        });
    </script>

## Themes

### Custom accent color

You need [LESS](http://lesscss.org/) css processor in order to compile your custom `.css` style file.

Create a less file `less/custom.less` and add this content whith `#cb3451` as your custom color :

    @accent-color: #cb3451;

    @coral-folder: "../bower_components/nw-coral/dist";

    @import "@{coral-folder}/less/theme.default.less";
    @import "@{coral-folder}/less/coral.less";
    
Then compile it and that's it !

    lessc less/custom.less css/custom.css

### Custom theme

*TBD*

## Examples

Examples are available in the `examples` folder.

* `examples/basic` : a basic example with all the features provided by **nw-coral**.
* `examples/basic-theme` : a basic theming example with a custom accent color.

## Documentation

### User interface components 

A set of UI components is provided by **nw-coral**.

#### Tabs

![/screenshots/tabs-wide.png](Screenshot)

![/screenshots/tabs-small.png](Screenshot)

Adds children `div` element in your `#window-content` with `.tab` class for each tab. A `title` and an `icon` (a [ionicon](http://ionicons.com/) class name) properties must be precised for each tab. 

    <div id="window-content">
          <div class="tab" title="home" icon="ion-home" >
              <p>home content</p>
          </div>
          <div class="tab" title="favorites" icon="ion-star" >
              <p>favorites content</p>
          </div>
    </div>

![/screenshots/tabs-notifications.png](Screenshot)

More over you can add a notification badge on the tab menu by using `updateTabNotifications(tabIndex,value)` on your `coral` object. With no value specified, the badge will be hidden.

	coral.updateTabNotifications(2,6);

#### Modal windows

![/screenshots/modal.png](Screenshot)

Create a `div` element in your `body` with the `#window-popups` identifier and a children `div` element with `.popup` class for each modal window. A title must be precised for each popup.

    <body>
        <!-- ... -->
        <div id="window-popups">
            <div id="mypopup" title="My example" class="popup">
                <!-- Your content -->
            </div>
        </div>
    </body>
    
Give an id to your `.popup` div in order to show it from javascript.

#### Action bar

![/screenshots/action-bar.png](Screenshot)

Define action buttons in the header bar by using the `setActionBar(actions)` function on your `Coral` window object.

    coral.setActionBar([
    {
        name: "email",
        icon: 'ion-email',
        action: function() { console.log('email'); }
    }]);
    
#### Menu

![/screenshots/status.png](Screenshot)

A simple menu button that launches a native menu is added to the header bar when `Coral` window object is instanciated. 

    var gui = require('nw.gui');

    var menu = new gui.Menu(); 

    menuItem = new gui.MenuItem({ 
        type: "normal",                
        label: "Quit",              
        click: function() { /* ... */ }
    });

    menu.append(menuItem);

    var coral = new Coral({
        icon: "img/logo.png",
        menu: menu
    });

#### Status

![/screenshots/status.png](Screenshot)

Update the status icon and message in the footer bar by using the `setStatus(icon,message)` function on your `Coral` window object.

    coral.setStatus("ion-folder","Status of the current task ...");
    
#### Loading layer

![/screenshots/loading.png](Screenshot)

Add a loading layer by using the `showLoading(message)` function on your `Coral` window object. Hide it with `hideLoading()` function.

    coral.showLoading("loading");
    setTimeout(function () { coral.hideLoading(); }, 2000); 

### Javascript

A complete documentation for the javascript class has been generated thanks to jsdoc and is available in the `doc` folder.

## Building

A `Gruntfile.js` builds and minifies all the `src` directory into the `dist` directory.

## Versioning

**nw-coral** is maintained under the [Semantic Versioning guidelines](http://semver.org/).

## About
	
The original creator is [@aloisdeniel](https://twitter.com/aloisdeniel).

>  I'm originaly a french native mobile app developer, not a web developer ... but I try to keep an eye on those technologies and I have loved playing with nodejs since a few weeks. I've discovered many tools by writting this framework (node-webkit, grunt, less, bower, ...) so try not to be too hard on myself ! I'm waiting for any suggestion to improve the whole quality of this framework.  

**Why *Coral* ?**

> The `nw` letters are for `node-webkit`, and `Coral` is translated in french by `Corail`, which is prononced a little bit like `Core-UI` (Core User Interface).

## Roadmap / ideas

* Cleaning less/js code to have a more flexible API
* Cleaning fonts integration
* Making tabs optionnal
* Adding icon font customization 
* Adding more themes
* Adding notifications
* Adding animations
* Adding scrollable and dynamic tabs
* Adding examples *(twitter client, markdown-editor, socket.io-chat, npm client, bower client)*
* Improving accessibility

## Copyright and license

Code and documentation copyright 2011-2014 Aloïs Deniel released under the MIT license. 