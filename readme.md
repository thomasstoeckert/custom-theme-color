# Custom Theme Color
![](https://img.shields.io/badge/dynamic/json?label=Custom%20Theme%20Color&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2meapalmipcfjcfdlnijcacpadfkfhhfi)

Microsoft Edge has the ability to "install" any given webpage as a standalone application (really, it's just a self-contained edge instance with limited UI). That limited UI utilizes the "theme-color" meta header tag to color the title bar of the page, and that's not frequently implemented. So, I made this extension to let you, the user, customize that color which will then be automatically applied to the page every time you visit it.

It's not the smoothest, as I can't quite get the chrome engine to run it *before* the header tag is read, but it's good for sites where you might sit on a single page for a long time.

![](https://github.com/thomasstoeckert/custom-theme-color/blob/master/assets/google-configuring-ss.png?raw=true)
![](https://github.com/thomasstoeckert/custom-theme-color/blob/master/assets/google-configure-ss.png?raw=true)

The code is all simple JS, with the page-manipulating script located in "content-scripts", and the popup HTML, CSS, and JS code located in "popup"

As an extra note, this *should* be completely compatible with the Chrome extension store. However, as Chrome really doesn't seem to use the theme-color metatag on desktop. I didn't publish it on there.