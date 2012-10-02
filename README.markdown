jQuery Lavalamp
===============

A jQuery plugin to display a lavalamp style navigation.

Basic usage
-----------

To use the lavalamp plugin you have to include the latest jQuery build and the
plugin source in your HTML document:

    <script type="text/javascript" 
            src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script type="text/javascript" 
            src="/path/to/jquery.twitterTimeline.js"></script>

The second step is to add this simple markup:

    <ul class="lavalamp">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
    </ul>

Finally you have to initialize the plugin with your desired parameters:

    <script type="text/javascript">
        $(function() {
            $('.lavalamp').lavalamp({
                // Your configuration goes here
            });
        });
    </script>

Checkout the [examples](examples/) for sample implementations.

License
-------

Copyright (c) 2012 Dots United GmbH.
Licensed under the MIT license.
