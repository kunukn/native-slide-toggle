# native slide toggle
Vanilla JS mobile friendly version of jQuery.slideToggle

# about
slide toggle to open or close content using CSS transition and transitionend event.

# demo

[![demo](/images/demo.png?raw=true)](http://codepen.io/kunukn/full/yaYvrp/)

* native slide toggle vs jQuery.slideToggle http://codepen.io/kunukn/full/yaYvrp/

# browser support

| <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/archive/chrome-android_18-36/chrome-android_18-36_48x48.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/archive/opera_10-14/opera_10-14_48x48.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/archive/safari_1-7/safari_1-7_48x48.png" width="48px" height="48px" alt="Safari logo"> | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/edge/edge_48x48.png" width="48px" height="48px" alt="Edge logo"> | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/archive/firefox_1.5-3/firefox_1.5-3_48x48.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/37.2.0/internet-explorer/internet-explorer_48x48.png" width="48px" height="48px" alt="IE logo"> 
|:---:|:---:|:---:|:---:|:---:|:---:|
| 50+ ✅ | 40+ ✅ | 9+ ✅ |12+ ✅ |40+ ✅ | 11+ ✅ |


# how does it work?
This uses CSS transition on max-height value. The max-height is dynamically set and removed with JS during expanding and collapsing. The height value is calculated dynamically based on the content. You can rotate the device or resize the browser window where the height is dynamically adjusted.


# html structure

Basic example
```html
 <div class="nst-component">
    <button class="nst-toggle">toggle</button>
    <div class="nst-content">
      <div>
        Your content here
      </div>
    </div>
  </div>
```

nst-component must be a parent element to the nst-content element and the nst-toggle element.
The extra div inside the nst-content is for padding and to make the open/close animation look similar to jQuery.slideToggle.

# usage

Check the **index.html** for inspiration.

* Add reference to `nst.min.js` and `nst.min.css` in the html page
* Apply the markup structure
* Apply custom css to override the library css

# development
* Git clone the project or download it
* npm install
* npm run start

For minification 
* npm run deploy

# features
* Small library - JS is ~3kb minified and CSS is ~900 bytes minified
* CSS max-height transition on dynamically calculated height value
* Simple html structure with minimum CSS class usage 
* Max-height is dynamically set and reset after the animation
* Tabbing is supported
* Vanilla JS, no other dependency

# supported browsers

Browsers which supports requestAnimationFrame, transitionend event, css max-height transition, document.querySelector and Ecmascript 5.

# performance

The max-height triggers layout, paint and composite but is faster than JS animation. 
https://csstriggers.com/max-height

# license
MIT
