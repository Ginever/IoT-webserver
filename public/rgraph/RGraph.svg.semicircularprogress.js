'version:2025-04-10 (6.21)';
//
    // o---------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:                |
    // |                                                                                 |
    // |                       https://www.rgraph.net/license.html                       |
    // |                                                                                 |
    // | RGraph is dual-licensed under the Open Source GPL license. That means that it's |
    // | free to use and there are no restrictions on what you can use RGraph for!       |
    // | If the GPL license does not suit you however, then there's an inexpensive       |
    // | commercial license option available. See the URL above for more details.        |
    // o---------------------------------------------------------------------------------o

    RGraph     = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};
    RGraph.SVG = RGraph.SVG || {};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.SVG.SemiCircularProgress = function (conf)
    {
        //
        // A setter that the constructor uses (at the end)
        // to set all of the properties
        //
        // @param string name  The name of the property to set
        // @param string value The value to set the property to
        //
        this.set = function (name, value)
        {
            if (arguments.length === 1 && typeof name === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        
                        if (i === 'backgroundColor')        {i = 'backgroundFill';}
                        if (i === 'backgroundColorOpacity') {i = 'backgroundFillOpacity';}

                        this.set(i, arguments[0][i]);
                    }
                }
            } else {
                
                // Go through all of the properties and make sure
                // that they're using the correct capitalisation
                name = this.properties_lowercase_map[name.toLowerCase()] || name;

                if (name === 'backgroundColor')        {name = 'backgroundFill';}
                if (name === 'backgroundColorOpacity') {name = 'backgroundFillOpacity';}

                var ret = RGraph.SVG.commonSetter({
                    object: this,
                    name:   name,
                    value:  value
                });

                name  = ret.name;
                value = ret.value;

                this.properties[name] = value;

                // If setting the colors, update the originalColors
                // property too
                if (name === 'colors') {
                    this.originalColors = RGraph.SVG.arrayClone(value, true);
                    this.colorsParsed = false;
                }
            }

            return this;
        };








        //
        // A getter.
        //
        // @param name  string The name of the property to get
        //
        this.get = function (name)
        {
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return this.properties[name];
        };








        this.type            = 'semicircularprogress';
        this.min             = RGraph.SVG.stringsToNumbers(conf.min);
        this.max             = RGraph.SVG.stringsToNumbers(conf.max);
        this.value           = RGraph.SVG.stringsToNumbers(conf.value);
        this.id              = conf.id;
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({object: this,container: this.container});
        this.svgAllGroup     = RGraph.SVG.createAllGroup(this);
        this.clipid          = null; // Used to clip the canvas
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));
        this.data            = conf.data; // Is this used? Don't think so.
        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = {};
        this.coords          = [];
        this.shadowNodes     = [];
        this.currentValue    = null;
        this.firstDraw       = true; // After the first draw this will be false

        // Used for adjusting
        this.adjusting_mousedown = false;

        // Bounds checking
        if (this.value > this.max) this.value = this.max;
        if (this.value < this.min) this.value = this.min;







        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);

        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';

        this.properties =
        {
            centerx: null,
            centery: null,
            radius:  null,

            width: 60,

            marginLeft:    35,
            marginRight:   35,
            marginTop:     35,
            marginBottom:  35,

            backgroundStrokeLinewidth:  0.25,
            backgroundStroke:           'gray',
            backgroundFill:             null,
            backgroundFillOpacity:      0.15,
            backgroundGrid:             false,
            backgroundGridMargin:       20,
            backgroundGridColor:        '#ddd',
            backgroundGridLinewidth:    1,
            backgroundGridCircles:      true,
            backgroundGridRadials:      true,
            backgroundGridRadialsCount: 10,

            colors: ['#6d6','#FFA5A5','#A0A2F8','yellow','gray','pink','orange','cyan','green'],
            colorsStroke: 'transparent',

            textColor:      'black',
            textFont:       'Arial, Verdana, sans-serif',
            textSize:       12,
            textBold:       false,
            textItalic:     false,
            text:           null,

            scale:                      false,
            scaleMin:                   null, // Defaults to the charts min value
            scaleMax:                   null, // Defaults to the charts max value
            scaleDecimals:              0,
            scalePoint:                 '.',
            scaleThousand:              ',',
            scaleFormatter:             null,
            scaleUnitsPre:              '',
            scaleUnitsPost:             '',
            scaleLabelsCount:           10,
            scaleLabelsFont:            null,
            scaleLabelsSize:            null,
            scaleLabelsColor:           null,
            scaleLabelsBold:            null,
            scaleLabelsItalic:          null,
            scaleLabelsOffsetr:         0,
            scaleLabelsOffsetx:         0,
            scaleLabelsOffsety:         0,

            labelsMin:          true,
            labelsMinSpecific:  null,
            labelsMinPoint:     null,
            labelsMinThousand:  null,
            labelsMinDecimals:  null,
            labelsMinFormatter: null,
            labelsMinFont:      null,
            labelsMinSize:      null,
            labelsMinBold:      null,
            labelsMinItalic:    null,
            labelsMinColor:     null,
            labelsMinUnitsPre:  null,
            labelsMinUnitsPost: null,

            labelsMax:          true,
            labelsMaxSpecific:  null,
            labelsMaxPoint:     null,
            labelsMaxThousand:  null,
            labelsMaxFormatter: null,
            labelsMaxFont:      null,
            labelsMaxSize:      null,
            labelsMaxBold:      null,
            labelsMaxItalic:    null,
            labelsMaxColor:     null,
            labelsMaxDecimals:  null,
            labelsMaxUnitsPre:  null,
            labelsMaxUnitsPost: null,

            labelsCenter:          true,
            labelsCenterIndex:     0,
            labelsCenterSpecific:  null,
            labelsCenterPoint:     null,
            labelsCenterThousand:  null,
            labelsCenterFormatter: null,
            labelsCenterFont:      null,
            labelsCenterSize:      40,
            labelsCenterBold:      true,
            labelsCenterItalic:    null,
            labelsCenterColor:     null,
            labelsCenterDecimals:  null,
            labelsCenterUnitsPre:  null,
            labelsCenterUnitsPost: null,

            linewidth: 1,

            tooltips:                        null,
            tooltipsOverride:                null,
            tooltipsEffect:                  'fade',
            tooltipsCssClass:                'RGraph_tooltip',
            tooltipsCss:                     null,
            tooltipsEvent:                   'click',
            tooltipsPersistent:              false,
            tooltipsFormattedThousand:       ',',
            tooltipsFormattedPoint:          '.',
            tooltipsFormattedDecimals:       0,
            tooltipsFormattedUnitsPre:       '',
            tooltipsFormattedUnitsPost:      '',
            tooltipsFormattedKeyColors:      null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels:      [],
            tooltipsFormattedTableHeaders:   null,
            tooltipsFormattedTableData:      null,
            tooltipsPointer:                 true,
            tooltipsPointerOffsetx:          0,
            tooltipsPointerOffsety:          0,
            tooltipsPositionStatic:          true,

            adjustable:         false,

            highlightStroke:    'rgba(0,0,0,0)',
            highlightFill:      'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,

            title:          '',
            titleX:         null,
            titleY:         null,
            titleHalign:    'center',
            titleValign:    null,
            titleFont:      null,
            titleSize:      null,
            titleColor:     null,
            titleBold:      null,
            titleItalic:    null,

            titleSubtitle:       null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null,
            
            clip: null,
            
            zoom:             false
        };

        //
        // Add the reverse look-up table  for property names
        // so that property names can be specified in any case.
        //
        this.properties_lowercase_map = [];
        for (var i in this.properties) {
            if (typeof i === 'string') {
                this.properties_lowercase_map[i.toLowerCase()] = i;
            }
        }



        //
        // Copy the global object properties to this instance
        //
        RGraph.SVG.getGlobals(this);





        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.SVG.FX && typeof RGraph.SVG.FX.decorate === 'function') {
            RGraph.SVG.FX.decorate(this);
        }





        // Add the responsive function to the object
        this.responsive = RGraph.SVG.responsive;





        var properties = this.properties;








        //
        // The draw method draws the Bar chart
        //
        this.draw = function ()
        {
            // Fire the beforedraw event
            RGraph.SVG.fireCustomEvent(this, 'onbeforedraw');


            // Reset this to prevent it from growing
            this.nodes = {};

            // Should be the first(ish) thing that's done in the
            // .draw() function except for the onbeforedraw event
            // and the installation of clipping.
            this.width  = Number(this.svg.getAttribute('width'));
            this.height = Number(this.svg.getAttribute('height'));



            // Create the defs tag if necessary
            RGraph.SVG.createDefs(this);



            // Add these
            this.graphWidth  = this.width - properties.marginLeft - properties.marginRight;
            this.graphHeight = this.height - properties.marginTop - properties.marginBottom;



            // Work out the center point
            this.centerx = (this.graphWidth / 2) + properties.marginLeft;
            this.centery = this.height - properties.marginBottom;
            this.radius  = Math.min(this.graphWidth / 2, this.graphHeight);



            // Allow the user to override the calculated centerx/y/radius
            this.radius  = typeof properties.radius  === 'number' ? properties.radius  : this.radius;
            this.centerx = typeof properties.centerx === 'number' ? properties.centerx : this.centerx;
            this.centery = typeof properties.centery === 'number' ? properties.centery : this.centery;

            //
            // Allow the centerx/centery/radius to be a plus/minus
            //
            if (typeof properties.radius  === 'string' && properties.radius.match(/^\+|-\d+$/) )  this.radius  += parseFloat(properties.radius);
            if (typeof properties.centerx === 'string' && properties.centerx.match(/^\+|-\d+$/) ) this.centerx += parseFloat(properties.centerx);
            if (typeof properties.centery === 'string' && properties.centery.match(/^\+|-\d+$/) ) this.centery += parseFloat(properties.centery);

            // Set the width of the meter
            this.progressWidth = properties.width || (this.radius / 3);



            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();
            
            
            
            
            //
            // Set the current value
            //
            this.currentValue = this.value;
            
            
            
            
            
            
            
            
            
            
            // Install clipping if requested
            if (this.properties.clip) {

                this.clipid = RGraph.SVG.installClipping(this);

                // Add the clip ID to the all group
                this.svgAllGroup.setAttribute(
                    'clip-path',
                    'url(#{1})'.format(this.clipid)
                );
            } else {
                // No clipping - so ensure that there's no clip-path
                // attribute
                this.clipid = null;
                this.svgAllGroup.removeAttribute('clip-path');
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            






            this.drawBackground(); // Draw the background "grid"
            this.drawMeter(); // Draw the segments
            RGraph.SVG.drawTitle(this);   // Draw the title and subtitle
            this.drawLabels();            // Draw the labels
            this.drawScale();             // Draw the scale



            var obj = this;

            // Add the tooltip event listener
            if (!RGraph.SVG.isNullish(properties.tooltips) && (properties.tooltips.length || RGraph.SVG.isString(properties.tooltips)) ) {


                for (var i=0; i<this.coords.length; ++i) {
                    (function (index)
                    {
                        if (RGraph.SVG.isString(properties.tooltips) || (RGraph.SVG.isArray(properties.tooltips) && properties.tooltips[index])) {
                            obj.coords[index].element.addEventListener(properties.tooltipsEvent.replace(/^on/, ''), function (e)
                            {
                                obj.removeHighlight();

                                // Show the tooltip
                                RGraph.SVG.tooltip({
                                    object: obj,
                                    index:  index,
                                    group:  null,
                           sequentialIndex: index,
                                    text:   RGraph.SVG.isString(properties.tooltips) ? properties.tooltips : properties.tooltips[index],
                                    event:  e
                                });

                                // Highlight the rect that has been clicked on
                                obj.highlight(e.target);
                            }, false);

                            // Add the mousemove listener that changes the
                            // mouse pointer
                            obj.coords[index].element.addEventListener('mousemove', function (e)
                            {
                                e.target.style.cursor = 'pointer';
                            }, false);
                        }
                    })(i);
                }
            }


            // Add the event listener that clears the highlight if
            // there is any. Must be MOUSEDOWN (ie before the click
            // event)
            if (!this.added_remove_highlight_listener) {
                document.body.addEventListener('mousedown', function (e)
                {
                    obj.removeHighlight();
                }, false);

                this.added_remove_highlight_listener = true;
            }








            //
            // Allow the addition of custom text via the
            // text: property.
            //
            RGraph.SVG.addCustomText(this);





            // Lastly - install the zoom event listeners if
            // requested
            if (this.properties.zoom) {
                RGraph.SVG.addZoom(this);
            }








            //
            // Ajusting
            //
            if (properties.adjustable) {

                var obj = this;

                var func = function (e)
                {
                    var div     = e.currentTarget,
                        mouseX  = e.offsetX,
                        mouseY  = e.offsetY;

                        if (RGraph.SVG.ISFF) {
                            mouseX = e.pageX - e.currentTarget.offsetLeft;
                            mouseY = e.pageY - e.currentTarget.offsetTop;
                        }

                    //var radius = RGraph.SVG.TRIG.getHypLength({
                    //    x1: mouseX,
                    //    y1: mouseY,
                    //    x2: obj.centerx,
                    //    y2: obj.centery,
                    //    object: obj
                    //});

                    //if (radius > obj.radius) {
                    //    return;
                    //}

                    var value = obj.getValue(e);


                    obj.value = value;
                    RGraph.SVG.redraw(obj.svg);
                };

                //
                // Only add the adjusting event listeners once
                //
                var obj = this;
                RGraph.SVG.runOnce('rgraph-svg-scp-adjusting-event-listeners-' + obj.uid, function ()
                {
                    //
                    // Create a reference so that code thats inside
                    // the event listeners can easily access the
                    // object

                    obj.svg.addEventListener('mousedown', function (e)
                    {
                        var mouseX  = e.offsetX,
                            mouseY  = e.offsetY;

                        if (RGraph.SVG.ISFF) {
                            mouseX = e.pageX - e.currentTarget.offsetLeft;
                            mouseY = e.pageY - e.currentTarget.offsetTop;
                        }
    
                        var radius = RGraph.SVG.TRIG.getHypLength({
                            x1: mouseX,
                            y1: mouseY,
                            x2: obj.centerx,
                            y2: obj.centery,
                            object: obj
                        });

                        // The first click that starts adjusting
                        // must be within the progress meter area
                        //
                        // Allow the pointer to be inside the meter
                        // /* || radius < (obj.radius - obj.progressWidth) */
                        if (radius > obj.radius) {
                            return; 
                        }

                        obj.adjusting_mousedown = true;
                        func(e);

                        // Fire the beforedraw event
                        RGraph.SVG.fireCustomEvent(obj, 'onadjustbegin');

                    }, false);

                    obj.container.addEventListener('mousemove', function (e)
                    {
                        if (obj.adjusting_mousedown) {
                            func(e);

                            // Fire the beforedraw event
                            RGraph.SVG.fireCustomEvent(obj, 'onadjust');
                        }
                    }, false);

                    window.addEventListener('mouseup', function (e)
                    {
                        obj.adjusting_mousedown = false;

                        // Fire the beforedraw event
                        RGraph.SVG.fireCustomEvent(obj, 'onadjustend');
                    }, false);
                });
            }










            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.SVG.fireCustomEvent(this, 'onfirstdraw');
            }




            // Fire the draw event
            RGraph.SVG.fireCustomEvent(this, 'ondraw');







            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.SVG.installInlineResponsive(this);











            return this;
        };








        //
        // New create() shortcut function
        // For example:
        //    this.create('rect,x:0,y:0,width:100,height:100'[,parent]);
        //
        // @param str string The tag definition to parse and create
        // @param     object The (optional) parent element
        // @return    object The new tag
        //
        this.create = function (str)
        {
            var def = RGraph.SVG.create.parseStr(this, str);
            def.svg = this.svg;
            
            // By default the parent is the SVG tag - but if
            // requested then change it to the tag that has
            // been given
            if (arguments[1]) {
                def.parent = arguments[1];
            }

            return RGraph.SVG.create(def);
        };








        //
        // This function returns the value that the mouse is positioned at, regardless of
        // the actual indicated value.
        //
        // @param object e The event object
        //
        this.getValue = function (e)
        {
            var mouseX  = e.offsetX,
                mouseY  = e.offsetY;

            if (RGraph.SVG.ISFF) {
                mouseX = e.pageX - e.currentTarget.offsetLeft;
                mouseY = e.pageY - e.currentTarget.offsetTop;
            }

            var angle = RGraph.SVG.TRIG.getAngleByXY({
                cx: this.centerx,
                cy: this.centery,
                x: mouseX,
                y: mouseY
            });

            var value = ((angle - this.angleStart) / (this.angleEnd - this.angleStart));

            // Adjust the angle aso that it goes from 0 - 3.14
            if (mouseX < this.centerx) {
               angle = angle - RGraph.SVG.TRIG.PI - RGraph.SVG.TRIG.HALFPI;
            } else if (mouseX > this.centerx) {
                angle += RGraph.SVG.TRIG.HALFPI;
            } else if (mouseX === this.centerx) {
                angle = RGraph.SVG.TRIG.HALFPI;
            }

            value = (this.max - this.min) * (angle / RGraph.SVG.TRIG.PI);

            if (value < this.min) value = this.min;
            if (value > this.max) value = this.max;

            return value;
        };








        //
        // This function returns the relevant angle for the given
        // value.
        //
        // @param number value The value that you want to get an
        //                     angle for
        //
        this.getAngle = function (value, outofbounds = false)
        {
            if (!outofbounds && (value > this.max || value < this.min) ) {
                return null;
            }

            return (((value - this.min) / (this.max - this.min)) * RGraph.SVG.TRIG.PI) - RGraph.SVG.TRIG.HALFPI;
        };








        //
        // Draw the background "grid"
        //
        this.drawBackground = function ()
        {
            if (properties.backgroundGrid) {

                var margin      = properties.backgroundGridMargin;
                var outerRadius = this.radius + margin;
                var innerRadius = this.radius - properties.width - margin;

                // Draw the background grid "circles"
                if (properties.backgroundGridCircles) {

                    // Create the path for the outer line of the grid
                    var arcPath1 = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  outerRadius,
                        start: -RGraph.SVG.TRIG.HALFPI,
                        end: RGraph.SVG.TRIG.HALFPI,
                        anticlockwise: false,
                        lineto: false,
                        moveto: true
                    });

                    // Create the path for the inner line of the grid
                    var arcPath2 = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  innerRadius,
                        start: RGraph.SVG.TRIG.HALFPI,
                        end: -RGraph.SVG.TRIG.HALFPI,
                        anticlockwise: true,
                        lineto: true
                    });

                    RGraph.SVG.create({
                        svg:    this.svg,
                        type:   'path',
                        parent: this.svgAllGroup,
                        attr: {
                            d: arcPath1 + ' ' + arcPath2 + ' z',
                            stroke: properties.backgroundGridColor,
                            fill: 'transparent'
                        }
                    });
                }


                //
                // Draw the background grid radials
                //
                if (properties.backgroundGridRadials) {

                    // Calculate the radius increment
                    var increment = (RGraph.SVG.TRIG.HALFPI - (0 - RGraph.SVG.TRIG.HALFPI) ) / properties.backgroundGridRadialsCount;
                    var angle     = -RGraph.SVG.TRIG.HALFPI;

                    for (var i=0,path=''; i<properties.backgroundGridRadialsCount; ++i) {

                        path += RGraph.SVG.TRIG.getArcPath3({
                            cx: this.centerx,
                            cy: this.centery,
                            r:  outerRadius,
                            start: -RGraph.SVG.TRIG.HALFPI + (i * increment),
                            end: -RGraph.SVG.TRIG.HALFPI + (i * increment),
                            anticlockwise: true,
                            lineto: false,
                            moveto: true
                        });

                        path += RGraph.SVG.TRIG.getArcPath3({
                            cx: this.centerx,
                            cy: this.centery,
                            r:  innerRadius,
                            start: -RGraph.SVG.TRIG.HALFPI + (i * increment),
                            end: -RGraph.SVG.TRIG.HALFPI + (i * increment),
                            anticlockwise: true,
                            lineto: true
                        });

                        path += ' ';
                        angle += increment;
                    }

                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.svgAllGroup,
                        attr: {
                            d: path + ' z',
                            stroke: properties.backgroundGridColor,
                            fill: 'transparent',
                            'stroke-width': properties.backgroundGridLinewidth
                        }
                    });
                }
            }
        };








        //
        // Draws the meter
        //
        this.drawMeter = function ()
        {
            // Reset this
            this.coords = [];



            var path = RGraph.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                 r: this.radius,
             start: RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI,
               end: RGraph.SVG.TRIG.HALFPI,
     anticlockwise: false
            });


            var path2 = RGraph.SVG.TRIG.getArcPath({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - this.progressWidth,
                end: RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI,
                start: RGraph.SVG.TRIG.HALFPI,
                anticlockwise: true,
                moveto: false
            });

            // This element is repeated AFTER the green bar that indicates
            // the value so that the stroke appears AFTER the indicator bar
            var background = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.svgAllGroup,
                attr: {
                    d: path + " L " + (this.centerx + this.radius - this.progressWidth)  + " " + this.centery + path2 + " L " + (this.centerx - this.radius) + " " + this.centery,
                    fill:           properties.backgroundFill || properties.colors[0],
                    'stroke-width': 0,
                    'fill-opacity': properties.backgroundFillOpacity
                }
            });

            // Store a reference to the background
            this.nodes.background = background;



            //
            // This draws the bar that indicates the value
            //

            // A single number
            if (typeof this.value === 'number') {

                var angle = ((this.value - this.min) / (this.max - this.min)) * RGraph.SVG.TRIG.PI; // Because the Meter is always a semi-circle

                // Take off half a pi because our origin is the north axis
                angle -= RGraph.SVG.TRIG.HALFPI;

                // Store the angle for later use
                this.angle = angle;


                // Now get the path of the inner indicator bar
                var path = RGraph.SVG.TRIG.getArcPath({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius,
                    start: RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI,
                    end: angle,
                    anticlockwise: false
                });

                var path2 = RGraph.SVG.TRIG.getArcPath({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius - this.progressWidth,
                    start: angle,
                    end: angle,
                    anticlockwise: false,
                    array: true
                });

                var path3 = RGraph.SVG.TRIG.getArcPath({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius - this.progressWidth,
                    start: angle,
                    end: RGraph.SVG.TRIG.PI + RGraph.SVG.TRIG.HALFPI,
                    anticlockwise: true,
                    moveto: false
                });


                // Create a group for the indicator bar. At a later point any
                // highlight can be also appended to this group
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'g',
                    parent: this.svgAllGroup,
                    attr: {
                        id: 'indicator-bar-group'
                    }
                });

                // Now draw the path
                var path = RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: group,
                    attr: {
                        d: path + " L{1} {2} ".format(
                            path2[1],
                            path2[2]
                        ) + path3 + ' z',
                        fill: properties.colors[0],
                        stroke: properties.colorsStroke,
                        'stroke-width': properties.linewidth
                    }
                });

                // Store a reference to the bar in the nodes array and the
                // group as well. If necessary any highlight thats later
                // added can be appended to this group
                this.nodes.barGroup = group;
                this.nodes.bar      = path;

                this.coords.push({
                    cx:             this.centerx,
                    cy:             this.centery,
                    radiusOuter:    this.radius,
                    radiusInner:    this.radius - this.progressWidth,
                    start:          -RGraph.SVG.TRIG.HALFPI,
                    end:            angle,
                    element:        path
                });

            //
            // Multiple values
            //
            } else if (RGraph.SVG.isArray(this.value)) {




                // Create a group for the indicator bars. At a later point any
                // highlight can be also appended to this group
                var group = RGraph.SVG.create({
                    svg: this.svg,
                    type:'g',
                    parent: this.svgAllGroup,
                    attr: {
                        id: 'indicator-bar-group'
                    }
                });

                for (var i=0,start=-RGraph.SVG.TRIG.HALFPI; i<this.value.length; ++i) {

                    var angle = ((this.value[i] - this.min) / (this.max - this.min)) * RGraph.SVG.TRIG.PI; // Because the Meter is always a semi-circle

                    var path1 = RGraph.SVG.TRIG.getArcPath({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius, // - this.progressWidth,
                        start: start,
                        end: start + angle,
                        anticlockwise: false,
                        lineto: false,
                        moveto: true
                    });

                    var path2 = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - this.progressWidth,
                        start: start + angle,
                        end: start,
                        anticlockwise: true
                    });


                    var el = RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: '{1} {2} z'.format(path1, path2),
                            stroke: properties.colorsStroke,
                            'stroke-width': properties.linewidth,
                            fill: properties.colors[i]
                        }
                    });

                    // Store the angle for later use
                    this.coords.push({
                        cx:             this.centerx,
                        cy:             this.centery,
                        radiusOuter:    this.radius,
                        radiusInner:    this.radius - this.progressWidth,
                        start:          start,
                        end:            start + angle,
                        element:        el
                    });

                    // Increment the start angle
                    //
                    // DO THIS LAST
                    start += angle;
                }
            }
        };








        //
        // Draw the labels
        //
        this.drawLabels = function ()
        {
            // Draw the min label
            if (properties.labelsMin) {

                var min = RGraph.SVG.numberFormat({
                    object:    this,
                    num:       this.min.toFixed(properties.labelsMinDecimals),
                    prepend:   properties.labelsMinUnitsPre,
                    append:    properties.labelsMinUnitsPost,
                    point:     properties.labelsMinPoint,
                    thousand:  properties.labelsMinThousand,
                    formatter: properties.labelsMinFormatter
                });

                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsMin'
                });

                var text = RGraph.SVG.text({
                    object: this,
                    parent: this.svgAllGroup,
                    tag: 'labels.min',
                    text: typeof properties.labelsMinSpecific === 'string' ? properties.labelsMinSpecific : min,
                    x: this.centerx - this.radius + (this.progressWidth / 2),
                    y: this.centery + 5 + properties.backgroundStrokeLinewidth,
                    valign: 'top',
                    halign: 'center',

                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });

                this.nodes.labelsMin = text;
            }







            // Draw the max label
            if (properties.labelsMax) {

                var max = RGraph.SVG.numberFormat({
                    object:    this,
                    num:       this.max.toFixed(properties.labelsMaxDecimals),
                    prepend:   properties.labelsMaxUnitsPre,
                    append:    properties.labelsMaxUnitsPost,
                    point:     properties.labelsMaxPoint,
                    thousand:  properties.labelsMaxThousand,
                    formatter: properties.labelsMaxFormatter
                });


                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsMax'
                });

                var text = RGraph.SVG.text({
                    object: this,
                    parent: this.svgAllGroup,
                    tag:    'labels.max',
                    text:   typeof properties.labelsMaxSpecific === 'string' ? properties.labelsMaxSpecific : max,
                    x:      this.centerx + this.radius - (this.progressWidth / 2),
                    y:      this.centery + 5 + properties.backgroundStrokeLinewidth,
                    valign: 'top',
                    halign: 'center',
                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });

                // Store a reference to the text node
                this.nodes.labelsMax = text;
            }







             // Draw the center label
            if (properties.labelsCenter) {

                var center = RGraph.SVG.numberFormat({
                    object:    this,
                    num:       (typeof this.value === 'number' ? this.value : this.value[properties.labelsCenterIndex]).toFixed(properties.labelsCenterDecimals),
                    prepend:   properties.labelsCenterUnitsPre,
                    append:    properties.labelsCenterUnitsPost,
                    point:     properties.labelsCenterPoint,
                    thousand:  properties.labelsCenterThousand,
                    formatter: properties.labelsCenterFormatter
                });


                // Get the text configuration
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'labelsCenter'
                });

                var text = RGraph.SVG.text({
                    object: this,
                    parent: this.svgAllGroup,
                    tag:    'labels.center',
                    text:   typeof properties.labelsCenterSpecific === 'string' ? properties.labelsCenterSpecific : center,
                    x:      this.centerx,
                    y:      this.centery,
                    valign: 'bottom',
                    halign: 'center',
                    font:   textConf.font,
                    size:   textConf.size,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    color:  textConf.color
                });

                // Store a reference to the center label
                this.nodes.labelsCenter = text;
            }
        };








        //
        // Draw the scale if necessary
        //
        this.drawScale = function ()
        {
            if (properties.scale) {

                //
                // Generate an appropiate scale
                //
                this.scale = RGraph.SVG.getScale({
                    object:    this,
                    numlabels: properties.scaleLabelsCount,
                    unitsPre:  properties.scaleUnitsPre,
                    unitsPost: properties.scaleUnitsPost,
                    max:       typeof properties.scaleMax === 'number' ? properties.scaleMax : this.max,
                    min:       typeof properties.scaleMin === 'number' ? properties.scaleMin : this.min,
                    point:     properties.scalePoint,
                    round:     false,
                    thousand:  properties.scaleThousand,
                    decimals:  properties.scaleDecimals,
                    strict:    true,
                    formatter: properties.scaleFormatter
                });

                //
                // Loop thru the number of labels
                //
                var textConf = RGraph.SVG.getTextConf({
                    object: this,
                    prefix: 'scaleLabels'
                });

                for (var i=0; i<this.scale.labels.length; ++i) {

                    var xy = RGraph.SVG.TRIG.getRadiusEndPoint({
                        angle:  (-RGraph.SVG.TRIG.PI) + (((i+1) / this.scale.labels.length) * (RGraph.SVG.TRIG.HALFPI - (-RGraph.SVG.TRIG.HALFPI)) ),
                        r: this.radius + (properties.backgroundGrid ? properties.backgroundGridMargin : 0) + textConf.size + properties.scaleLabelsOffsetr + 5
                    });

                    // Draw the label
                    RGraph.SVG.text({
                        object: this,
                        parent: this.svgAllGroup,
                        tag:    'scale',
                        font:   textConf.font,
                        size:   textConf.size,
                        color:  textConf.color,
                        bold:   textConf.bold,
                        italic: textConf.italic,
                        x: xy[0] + this.centerx + (properties.scaleLabelsOffsetx || 0),
                        y: xy[1] + this.centery + (properties.scaleLabelsOffsety || 0),
                        valign: 'center',
                        halign: ((i+1) / this.scale.labels.length === 0.5)     ? 'center' : (((i+1) > (this.scale.labels.length / 2)) ? 'left' : 'right'),
                        text: this.scale.labels[i]
                    });
                }



                // Draw the zero label
                //
                // Draw the zero label
                //
                var xy = RGraph.SVG.TRIG.getRadiusEndPoint({
                    angle:  -RGraph.SVG.TRIG.PI,
                    r: this.radius + (properties.backgroundGrid ? properties.backgroundGridMargin : 0) + textConf.size + properties.scaleLabelsOffsetr + 5
                });

                RGraph.SVG.text({
                    object: this,
                    parent: this.svgAllGroup,
                    tag:    'scale',
                    font:   textConf.font,
                    size:   textConf.size,
                    color:  textConf.color,
                    bold:   textConf.bold,
                    italic: textConf.italic,
                    x: xy[0] + this.centerx + (properties.scaleLabelsOffsetx || 0),
                    y: xy[1] + this.centery + (properties.scaleLabelsOffsety || 0),
                    valign: 'center',
                    halign: 'right',
                      text:   (typeof properties.scaleFormatter === 'function') ?
                                  properties.scaleFormatter(this, this.min)
                                  :
                                  properties.scaleUnitsPre + (typeof properties.scaleMin === 'number' ? properties.scaleMin : this.min).toFixed(properties.scaleDecimals).replace(/\./, properties.scalePoint) + properties.scaleUnitsPost,
                });
            }
        };








        //
        // This function can be used to highlight a segment on the chart
        //
        // @param object segment The segment to highlight
        //
        this.highlight = function (segment)
        {
            // Remove any highlight that's already been
            // installed
            this.removeHighlight();

            var highlight = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.barGroup,
                attr: {
                    d: segment.getAttribute('d'),
                    fill: properties.highlightFill,
                    stroke: properties.highlightStroke,
                    'stroke-width': properties.highlightLinewidth
                },
                style: {
                    pointerEvents: 'none'
                }
            });

            // Store the highlight node in the registry
            RGraph.SVG.REG.set('highlight', highlight);

            // Add the event listener that clears the highlight path if
            // there is any. Must be MOUSEDOWN (ie before the click event)
            var obj = this;
            document.body.addEventListener('mousedown', function (e)
            {
                obj.removeHighlight();

            }, false);
        };








        //
        // This function can be used to remove the highlight that is added
        // by tooltips
        //
        this.removeHighlight = function ()
        {
            RGraph.SVG.removeHighlight();
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:          RGraph.SVG.arrayClone(properties.colors, true),
                    highlightFill:   RGraph.SVG.arrayClone(properties.highlightFill, true),
                    backgroundFill:  RGraph.SVG.arrayClone(properties.backgroundFill, true)
                }
            }


            // colors
            var colors = properties.colors;

            if (colors) {
                for (var i=0; i<colors.length; ++i) {
                    colors[i] = RGraph.SVG.parseColorLinear({
                        object: this,
                         color: colors[i],
                         start: this.centerx - this.radius,
                           end: this.centerx + this.radius,
                           direction: 'horizontal'
                    });
                }
            }

            // Highlight fill
            properties.highlightFill = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.highlightFill,
                start: properties.marginLeft,
                  end: this.width - properties.marginRight,
                direction: 'horizontal'
            });

            // Background color

            // Background color
            properties.backgroundFill = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundFill,
                start: properties.marginLeft,
                  end: this.width - properties.marginRight,
                  direction: 'horizontal'
            });
        };








        //
        // The SCP chart grow effect
        //
        this.grow = function ()
        {
            var opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                obj      = this;

            //
            // Copy the data
            //
            var value = RGraph.SVG.arrayClone(this.value, true);

            if (RGraph.SVG.isNumber(this.value)) {
            
                if (RGraph.SVG.isNullish(this.currentValue)) {
                    this.currentValue = this.min;
                }
                
                var initial_value = this.currentValue,
                    diff          = this.value - Number(this.currentValue),
                    increment     = diff  / frames;
            } else {
                var initial_value = [],
                    diff          = [],
                    increment     = [];
                
                for (var i=0; i<this.value.length; ++i) {
                    initial_value[i] = RGraph.SVG.isNullish(this.currentValue) ? 0 : this.currentValue[i];
                    diff[i]          = this.value[i] - Number(RGraph.SVG.isNullish(this.currentValue) ? 0 : this.currentValue[i]);
                    increment[i]     = diff[i]  / frames;
                }
            }

            var iterate = function ()
            {
                var multiplier = frame / frames;

                if (typeof obj.value === 'object') {
                    for (var i=0; i<obj.value.length; ++i) {
                        obj.value[i] = initial_value[i] + (increment[i] * frame);
                    }
                } else {
                    obj.value = initial_value + (increment * frame);
                }

                RGraph.SVG.redraw(obj.svg);

                if (frame++ < frames) {
                    RGraph.SVG.FX.update(iterate);
                } else if (opt.callback) {
                    obj.value = value;
                    RGraph.SVG.redraw();
                    (opt.callback)(obj);
                }
            };

            iterate();

            return this;
        };















        //
        // Using a function to add events makes it easier to facilitate method
        // chaining
        //
        // @param string   type The type of even to add
        // @param function func
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }

            RGraph.SVG.addCustomEventListener(this, type, func);

            return this;
        };








        //
        // Used in chaining. Runs a function there and then - not waiting for
        // the events to fire (eg the onbeforedraw event)
        //
        // @param function func The function to execute
        //
        this.exec = function (func)
        {
            func(this);

            return this;
        };








        //
        // Remove highlight from the chart (tooltips)
        //
        this.removeHighlight = function ()
        {
            RGraph.SVG.removeHighlight();
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var value  = RGraph.SVG.isArray(this.value) ? this.value[opt.index] : this.value;
            var values = RGraph.SVG.isArray(this.value) ? this.value : [this.value];

            return {
                  index: opt.index,
                dataset: 0,
        sequentialIndex: opt.index,
                  value: value,
                 values: values
            };
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index, colors)
        {
            var color = colors[index];
            var label = ( (typeof properties.tooltipsFormattedKeyLabels === 'object' && typeof properties.tooltipsFormattedKeyLabels[0] === 'string') ? properties.tooltipsFormattedKeyLabels[index] : '');

            return {
                label: label,
                color: color
            };
        };








        //
        // This allows for static tooltip positioning
        //
        this.positionTooltipStatic = function (args)
        {
            var obj        = args.object,
                e          = args.event,
                tooltip    = args.tooltip,
                index      = args.index,
                svgXY      = RGraph.SVG.getSVGXY(obj.svg);

            // Calculate the coordinates for the tooltip
            var coords = RGraph.SVG.TRIG.toCartesian({
                cx: this.centerx,
                cy: this.centery,
             //angle: this.angle - RGraph.SVG.TRIG.HALFPI - ((this.angle + RGraph.SVG.TRIG.HALFPI) / 2),
             angle: this.coords[index].start - RGraph.SVG.TRIG.HALFPI + ((this.coords[index].end - this.coords[index].start) / 2),
                 r: this.radius - (this.progressWidth / 2)
            });


            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                  svgXY[0]                  // The X coordinate of the canvas
                + coords.x
                - (tooltip.offsetWidth / 2) // Subtract half of the tooltip width
            ) + 'px';

            args.tooltip.style.top  = (
                  svgXY[1]              // The Y coordinate of the canvas
                + coords.y
                - tooltip.offsetHeight  // The height of the tooltip
                - 10                    // An arbitrary amount
            ) + 'px';
        };








        //
        // This function handles clipping to scale values. Because
        // each chart handles scales differently, a worker function
        // is needed instead of it all being done centrally in the
        // main function.
        //
        // @param object clipPath The parent cipPath element
        //
        this.clipToScaleWorker = function (clipPath)
        {
            if (RegExp.$1 === 'min') from = this.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.max; else to   = Number(RegExp.$2);

            var a1 = this.getAngle(from),
                a2 = this.getAngle(to);

            // Change the radius if the number is "min"
            if (RegExp.$1 === 'min') {
                a1 = -1 * RGraph.SVG.TRIG.PI;
            }

            // Change the radius if the number is "max"
            if (RegExp.$2 === 'max') {
                a2 = RGraph.SVG.TRIG.PI
            }

    
            var path = RGraph.SVG.TRIG.getArcPath3({
                cx:     this.centerx,
                cy:     this.centery,
                radius: Math.max(this.width, this.height),
                start:  a1,
                end:    a2,
                anticlockwise: false
            });
    

            RGraph.SVG.create({
                svg: this.svg,
                parent: clipPath,
                type: 'path',
                attr: {
                    d: 'M {1} {2} {3} z'.format(
                        this.centerx,
                        this.centery,
                        path
                    )
                }
            });
            
            // Now set the clip-path attribute on the
            // all-elements group
            this.svgAllGroup.setAttribute(
                'clip-path',
                'url(#' + clipPath.id + ')'
            );
        };







        //
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }



        return this;
    };








// End module pattern
})(window, document);