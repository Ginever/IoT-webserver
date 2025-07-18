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
    RGraph.SVG.Gauge = function (conf)
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
                        this.set(i, arguments[0][i]);
                    }
                }
            } else {

                // Go through all of the properties and make sure
                // that they're using the correct capitalisation
                name = this.properties_lowercase_map[name.toLowerCase()] || name;

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
                //
                // NB Don't need to do this for this chart type
                //if (name === 'colors') {
                //    this.originalColors = RGraph.SVG.arrayClone(value, true);
                //    this.colorsParsed = false;
                //}
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







        this.type            = 'gauge';
        this.innerMin        = RGraph.SVG.stringsToNumbers(conf.innerMin);
        this.innerMax        = RGraph.SVG.stringsToNumbers(conf.innerMax);
        this.outerMin        = RGraph.SVG.stringsToNumbers(conf.outerMin);
        this.outerMax        = RGraph.SVG.stringsToNumbers(conf.outerMax);

        this.min             = this.innerMin;
        this.max             = this.innerMax;
        this.value           = RGraph.SVG.stringsToNumbers(conf.value);
        this.angleStart      = 0 - RGraph.SVG.TRIG.HALFPI - (RGraph.SVG.TRIG.HALFPI / 2);
        this.angleEnd        = 0 + RGraph.SVG.TRIG.HALFPI + (RGraph.SVG.TRIG.HALFPI / 2);
        this.angleSpan       = this.angleEnd - this.angleStart;
        this.id              = conf.id;
        this.uid             = RGraph.SVG.createUID();
        this.container       = document.getElementById(this.id);
        this.layers          = {}; // MUST be before the SVG tag is created!
        this.svg             = RGraph.SVG.createSVG({object:    this,container: this.container});
        this.svgAllGroup     = RGraph.SVG.createAllGroup(this);
        this.clipid          = null; // Used to clip the canvas
        this.isRGraph        = true;
        this.isrgraph        = true;
        this.rgraph          = true;
        this.width           = Number(this.svg.getAttribute('width'));
        this.height          = Number(this.svg.getAttribute('height'));

        this.colorsParsed    = false;
        this.originalColors  = {};
        this.gradientCounter = 1;
        this.nodes           = {};
        this.shadowNodes     = [];
        this.currentValue    = null;
        this.firstDraw       = true; // After the first draw this will be false

        //
        // Allow .min, .max to be given as well as .innerMin
        // and innerMax
        //
        if (RGraph.SVG.isNumber(conf.min) && !conf.innerMin) this.innerMin = conf.min;
        if (RGraph.SVG.isNumber(conf.max) && !conf.innerMax) this.innerMax = conf.max;

        // Some bounds checking for the value
        if (this.value > this.innerMax) this.value = this.innerMax;
        if (this.value < this.innerMin) this.value = this.innerMin;






        // Add this object to the ObjectRegistry
        RGraph.SVG.OR.add(this);

        // Set the DIV container to be inline-block
        this.container.style.display = 'inline-block';

        this.properties =
        {
            centerx: null,
            centery: null,
            radius:  null,

            marginLeft:   35,
            marginRight:  35,
            marginTop:    35,
            marginBottom: 35,
            rmargin:      null, // This is set below
            
            backgroundFill:      'Gradient(white:#FEFEFE:#E6E6E6:#dedede)',
            backgroundStroke:    '#ddd',
            backgroundGrid:      true,
            backgroundGridColor: '#ddd',

            linewidth:   1,
            colors: ['black','black'],
            innerGap:    5,

            tickmarksOuterSize: 3,
            tickmarksInnerSize: 3,
            tickmarksCount:     10,

            textColor:      'black',
            textFont:       'Arial, Verdana, sans-serif',
            textSize:       12 ,
            textBold:       false,
            textItalic:     false,
            text:           null,
            
            labelsIngraph:           true,
            labelsIngraphFont:       null,
            labelsIngraphSize:       null,
            labelsIngraphBold:       null,
            labelsIngraphItalic:     null,
            labelsIngraphColor:      null,
            labelsIngraphUnitsPre:   '',
            labelsIngraphUnitsPost:  '',
            labelsIngraphThousand:   ',',
            labelsIngraphPoint:      '.',
            labelsIngraphFormatter:  null,
            labelsIngraphDecimals:   0,
            labelsIngraphPadding:    3,
            labelsIngraphBackground: 'Gradient(#ddd:#eee)',
            labelsIngraphRounded:    2,

            scaleInnerFont:      null,
            scaleInnerSize:      null,
            scaleInnerBold:      null,
            scaleInnerItalic:    null,
            scaleInnerColor:     null,
            scaleInnerUnitsPre:  '',
            scaleInnerUnitsPost: '',
            scaleInnerPoint:     '.',
            scaleInnerThousand:  ',',
            scaleInnerDecimals:  0,
            scaleInnerFormatter: null,
            scaleInnerLabelsCount: 10,
            scaleInnerRound:       false,

            scaleOuter:          true,
            scaleOuterFont:      null,
            scaleOuterSize:      null,
            scaleOuterBold:      null,
            scaleOuterItalic:    null,
            scaleOuterColor:     null,
            scaleOuterUnitsPre:  '',
            scaleOuterUnitsPost: '',
            scaleOuterPoint:     '.',
            scaleOuterThousand:  ',',
            scaleOuterDecimals:  0,
            scaleOuterFormatter: null,
            scaleOuterLabelsCount: 10,
            scaleOuterRound:       false,
            
            shadow:        false,
            shadowOffsetx: 2,
            shadowOffsety: 2,
            shadowColor: 'rgba(0,0,0,0.25)',
            shadowBlur:    2,

            title:       '',
            titleX:      null,
            titleY:      null,
            titleHalign: 'center',
            titleValign: 'bottom',
            titleSize:   null,
            titleColor:  null,
            titleFont:   null,
            titleBold:   null,
            titleItalic: null,

            titleSubtitle:       null,
            titleSubtitleSize:   null,
            titleSubtitleColor:  '#aaa',
            titleSubtitleFont:   null,
            titleSubtitleBold:   null,
            titleSubtitleItalic: null,
            
            needleColor: '#666',
            
            centerpinRadius: 15,
            
            adjustable: false,
            
            clip:       null,
            
            zoom:       false
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

        // Should the outer scale be disabled?
        if (!RGraph.SVG.isNumber(conf.outerMin) || !RGraph.SVG.isNumber(conf.outerMax)) {
            this.properties.scaleOuter = false;
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
            this.graphHeight = this.height - properties.marginTop  - properties.marginBottom;

            // If a title is specified then adjust the centery down
            //
            // NO LONGER NECESSARY NOW THAT THE drawTitle() FUNCTION HAS BEEN
            // REWRITTEN
            //
            //if (properties.title.length > 0) {
            //    this.graphHeight -= properties.marginTop;
            //}

            // Work out the center point
            this.centerx = (this.graphWidth / 2) + properties.marginLeft;
            this.centery = (this.graphHeight / 2) + properties.marginTop;
            this.radius  = Math.min(this.graphWidth / 2, this.graphHeight / 2);
            




            // Allow the user to override the calculated centerx/y/radius
            this.centerx = typeof properties.centerx === 'number' ? properties.centerx : this.centerx;
            this.centery = typeof properties.centery === 'number' ? properties.centery : this.centery;
            this.radius  = typeof properties.radius  === 'number' ? properties.radius  : this.radius;

            // Allow the centerx/centery/radius to be a plus/minus
            if (typeof properties.radius  === 'string' && properties.radius.match(/^\+|-\d+$/) )  this.radius  += parseFloat(properties.radius);
            if (typeof properties.centerx === 'string' && properties.centerx.match(/^\+|-\d+$/) ) this.centerx += parseFloat(properties.centerx);
            if (typeof properties.centery === 'string' && properties.centery.match(/^\+|-\d+$/) ) this.centery += parseFloat(properties.centery);

            
            
            
            // Parse the colors for gradients
            RGraph.SVG.resetColorsToOriginalValues({object:this});
            this.parseColors();




            //
            // Set the current value
            //
            this.currentValue = this.value;




            // Change the rmargin if it wasnt set manually
            if (properties.rmargin === null) {
                if (properties.scaleOuter) {
                    properties.rmargin = 40;
                } else {
                    properties.rmargin = 25;
                }
            }


















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

















            // Draw the meter
            this.drawMeter();


            // Draw the needle
            this.drawNeedle();
            
            

            // Draw the ingraph label
            if (properties.labelsIngraph) {
                this.drawIngraph();
            }



            // Draw the title and subtitle
            RGraph.SVG.drawTitle(this);


            //
            // Ajusting
            //
            if (properties.adjustable) {
                
                this.adjusting_mousedown = false;
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

                    var radius = RGraph.SVG.TRIG.getHypLength({
                        x1: mouseX,
                        y1: mouseY,
                        x2: obj.centerx,
                        y2: obj.centery,
                        object: obj
                    });

                    if (radius > obj.radius) {
                        return;
                    }

                    var value = obj.getValue(e);

                    obj.value = value;
                    obj.drawNeedle();
                };
                
                // Create a reference so that code thats inside
                // the event listeners can easily access the
                // object
                
                this.container.addEventListener('mousedown', function (e)
                {
                    obj.adjusting_mousedown = true;
                    func(e);

                    // Fire the beforedraw event
                    RGraph.SVG.fireCustomEvent(obj, 'onadjustbegin');

                }, false);
                
                this.container.addEventListener('mousemove', function (e)
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








        // Generate the inner scale
        this.drawMeter = function ()
        {
            // Generate the Inner scale
            this.scaleInner = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.scaleInnerLabelsCount,
                unitsPre:  properties.scaleInnerUnitsPre,
                unitsPost: properties.scaleInnerUnitsPost,
                max:       this.innerMax,
                min:       this.innerMin,
                point:     properties.scaleInnerPoint,
                round:     properties.scaleInnerRound,
                thousand:  properties.scaleInnerThousand,
                decimals:  properties.scaleInnerDecimals,
                strict:    true,
                formatter: properties.scaleInnerFormatter
            });

            // Generate the outer scale
            this.scaleOuter = RGraph.SVG.getScale({
                object:    this,
                numlabels: properties.scaleOuterLabelsCount,
                unitsPre:  properties.scaleOuterUnitsPre,
                unitsPost: properties.scaleOuterUnitsPost,
                max:       this.outerMax,
                min:       this.outerMin,
                point:     properties.scaleOuterPoint,
                round:     properties.scaleOuterRound,
                thousand:  properties.scaleOuterThousand,
                decimals:  properties.scaleOuterDecimals,
                strict:    true,
                formatter: properties.scaleOuterFormatter
            });

            // If a shadow is requested - define it
            if (properties.shadow) {
                RGraph.SVG.setShadow({
                    object:  this,
                    offsetx: properties.shadowOffsetx,
                    offsety: properties.shadowOffsety,
                    blur:    properties.shadowBlur,
                    color:   properties.shadowColor,
                    id:      'dropShadow'
                });
            }


            // Draw the background circle
            this.nodes.background = RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.svgAllGroup,
                attr: {
                    cx: this.centerx,
                    cy: this.centery,
                    r: this.radius,
                    stroke: properties.backgroundStroke,
                    fill: properties.backgroundFill,
                    filter: properties.shadow ? 'url(#dropShadow)' : ''
                }
            });


















            //
            // Draw the gray background grid lines
            //
            if (properties.backgroundGrid) {
                (function (obj)
                {
                    for(var i=0; i<=properties.scaleInnerLabelsCount; ++i) {
                    
                        var numticks = properties.tickmarksCount,
                            gap      = obj.angleSpan / numticks;
                    
                        // Draw the background grid lines
                        var endPoint = RGraph.SVG.TRIG.getRadiusEndPoint({
                            angle:  obj.angleStart + (i * gap) - RGraph.SVG.TRIG.HALFPI,
                            radius: obj.radius - properties.rmargin - properties.innerGap
                        });
                    
                        RGraph.SVG.create({
                            svg: obj.svg,
                            type: 'path',
                            parent: obj.svgAllGroup,
                            attr: {
                                d: 'M{1} {2} L{3} {4}'.format(
                                    obj.centerx + endPoint[0], obj.centery + endPoint[1],
                                    obj.centerx, obj.centery
                                ),
                                stroke: properties.backgroundGridColor,
                                fill: 'transparent',
                                'stroke-width': 1,
                                'stroke-linecap':  'square'
                            }
                        });
                    }
                })(this);
            }










            // Create the axis groups
            this.nodes.innerAxisGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    id: 'innerAxisGroup',
                }
            });


            this.nodes.outerAxisGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    id: 'outerAxisGroup',
                }
            });




            //
            // Draw the circular lines
            //
            var innerPath = RGraph.SVG.TRIG.getArcPath3({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - properties.innerGap - properties.rmargin,
                start: this.angleStart,
                end: this.angleEnd,
                anticlockwise: false,
                lineto: false
            });

            var inner = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.innerAxisGroup,
                attr: {
                    d: innerPath,
                    stroke: properties.colors[1],
                    fill: 'transparent',
                    'stroke-width': properties.linewidth
                }
            });














            // Draw the outer partial circle
            var outerPath = RGraph.SVG.TRIG.getArcPath3({
                cx: this.centerx,
                cy: this.centery,
                r:  this.radius - properties.rmargin,
                start: this.angleStart,
                end: this.angleEnd,
                anticlockwise: false,
                lineto: false
            });

            var outer = RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.outerAxisGroup,
                attr: {
                    d: outerPath,
                    stroke: properties.colors[0],
                    fill: 'transparent',
                    'stroke-width': properties.linewidth
                }
            });
            
            // Store references to the circles
            this.nodes.outerAxis = outerPath;
            this.nodes.innerAxis = innerPath;

















            var numticks  = properties.tickmarksCount,
                gap       = this.angleSpan / numticks,
                numlabels = properties.tickmarksCount;



            //
            // Get the text configurations
            //
            var textConfOuter = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'scaleOuter'
            });
            
            var textConfInner = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'scaleInner'
            });


            for (var i=0; i<=properties.scaleOuterLabelsCount; ++i) {

                if (properties.scaleOuter) {
                    
                    // Draw the OUTER tickmarks
                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleStart + (i * gap),
                        end: this.angleStart + (i * gap),
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius + properties.tickmarksOuterSize - properties.rmargin,
                        start: this.angleStart + (i * gap),
                        end: this.angleStart + (i * gap),
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.outerAxisGroup,
                        attr: {
                            d: path_a + ' ' + path_b,
                            stroke: properties.colors[0],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });

                    //
                    // Determine the correct gap for the outer labels#
                    //
                    var outerLabelGap = (this.angleEnd - this.angleStart) / properties.scaleOuterLabelsCount;

                    // Calculate the coordinates for the text label
                    var coords = RGraph.SVG.TRIG.toCartesian({
                        cx:    this.centerx,
                        cy:    this.centery,
                        r:     this.radius + properties.tickmarksOuterSize + 10 - properties.rmargin,
                        angle: this.angleStart - RGraph.SVG.TRIG.HALFPI + (i * outerLabelGap)
                    });
                    
                    var halign = (coords.x > this.centerx ? 'left' : 'right');
    
                    if (i / numlabels === 0.5) {
                        halign = 'center';
                    }

                    var zerolabel = RGraph.SVG.numberFormat({
                        object:   this,
                        prepend:  properties.scaleOuterUnitsPre,
                        append:   properties.scaleOuterUnitsPost,
                        num:      this.outerMin.toFixed(properties.scaleOuterDecimals),
                        point:    properties.scaleOuterPoint,
                        thousand: properties.scaleOuterThousand
                    });
                    
                    if (typeof properties.scaleOuterFormatter === 'function') {
                        zerolabel = (properties.scaleOuterFormatter)(zerolabel);
                    }
    
                    // Add an outer text label
                    var textnode = RGraph.SVG.text({
                        object:     this,
                        svg:        this.svg,
                        parent:     this.nodes.outerAxisGroup,
                        tag:        'scale.outer',
                        text:       (i === 0 ? zerolabel : this.scaleOuter.labels[i - 1]),
                        x:          coords.x,
                        y:          coords.y,
                        halign:     halign,
                        valign:     'center',
                        padding:    2,
                        
                        size:       textConfOuter.size,
                        color:      textConfOuter.color,
                        bold:       textConfOuter.bold,
                        italic:     textConfOuter.italic,
                        font:       textConfOuter.font
                    });
                    
                    textnode.style.pointerEvents = 'none';

                } else {



                    // Close the circles



                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleStart,
                        end: this.angleStart,
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.innerGap - properties.rmargin,
                        start: this.angleStart,
                        end: this.angleStart,
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.innerAxisGroup,
                        attr: {
                            d: path_a + path_b,
                            stroke: properties.colors[1],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });






                    var path_a = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.rmargin,
                        start: this.angleEnd,
                        end: this.angleEnd,
                        anticlockwise: false,
                        lineto: false
                    });
        
                    var path_b = RGraph.SVG.TRIG.getArcPath3({
                        cx: this.centerx,
                        cy: this.centery,
                        r:  this.radius - properties.innerGap - properties.rmargin,
                        start: this.angleEnd,
                        end: this.angleEnd,
                        anticlockwise: false,
                        lineto: true
                    });
        
                    RGraph.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: this.nodes.innerAxisGroup,
                        attr: {
                            d: path_a + path_b,
                            stroke: properties.colors[1],
                            fill: 'transparent',
                            'stroke-width': properties.linewidth,
                            'stroke-linecap':  'square'
                        }
                    });
                }
            }




            // Draw the inner labels
            for(var i=0; i<=properties.scaleInnerLabelsCount; ++i) {







                // Draw the INNER tickmarks




                var path_a = RGraph.SVG.TRIG.getArcPath3({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius - properties.rmargin - properties.innerGap,
                    start: this.angleStart + (i * gap),
                    end: this.angleStart + (i * gap),
                    anticlockwise: false,
                    lineto: false
                });
                
                var path_b = RGraph.SVG.TRIG.getArcPath3({
                    cx: this.centerx,
                    cy: this.centery,
                    r:  this.radius  - properties.innerGap - properties.tickmarksOuterSize - properties.rmargin,
                    start: this.angleStart + (i * gap),
                    end: this.angleStart + (i * gap),
                    anticlockwise: false,
                    lineto: true
                });

                RGraph.SVG.create({
                    svg: this.svg,
                    type: 'path',
                    parent: this.nodes.innerAxisGroup,
                    attr: {
                        d: path_a + ' ' + path_b,
                        stroke: properties.colors[1],
                        fill: 'transparent',
                        'stroke-width': properties.linewidth,
                        'stroke-linecap':  'square'
                    }
                });


                //
                // Determine the correct gap for the outer labels#
                //
                var innerLabelGap = (this.angleEnd - this.angleStart) / properties.scaleInnerLabelsCount;


                // Calculate the coordinates for the text label
                var coords = RGraph.SVG.TRIG.toCartesian({
                    cx:    this.centerx,
                    cy:    this.centery,
                    r:     this.radius - properties.innerGap - properties.tickmarksInnerSize - 10 - properties.rmargin,
                    angle: this.angleStart - RGraph.SVG.TRIG.HALFPI + (i * innerLabelGap)
                });
                
                var halign = (coords.x > this.centerx ? 'right' : 'left');


                var zerolabel = RGraph.SVG.numberFormat({
                    object:   this,
                    prepend:  properties.scaleInnerUnitsPre,
                    append:   properties.scaleInnerUnitsPost,
                    num:      this.innerMin.toFixed(properties.scaleInnerDecimals),
                    point:    properties.scaleInnerPoint,
                    thousand: properties.scaleInnerThousand
                });
                
                if (typeof properties.scaleInnerFormatter === 'function') {
                    zerolabel = (properties.scaleInnerFormatter)(zerolabel);
                }

                // Change the horizontal alignment for the center label
                if (
                       coords.x > (this.centerx - 2)
                    && coords.x < (this.centerx + 2)
                   ) {
                    halign = 'center';
                }

                // Add an inner text label
                RGraph.SVG.text({
                    object:     this,
                    svg:        this.svg,
                    parent:     this.nodes.innerAxisGroup,
                    tag:        'scale.inner',
                    
                    text:       (i === 0 ? zerolabel : this.scaleInner.labels[i - 1]),

                    x:          coords.x,
                    y:          coords.y,
                    halign:     halign,
                    valign:     'center',
                    padding:    2,

                    size:       textConfInner.size,
                    color:      textConfInner.color,
                    bold:       textConfInner.bold,
                    italic:     textConfInner.italic,
                    font:       textConfInner.font
                });
            }
        };








        // Draws the label that sits below the needle,
        // inside the meter
        this.drawIngraph = function ()
        {
            // If the group already exists remove it
            if (this.nodes.labelsIngraphGroup) {
                this.nodes.labelsIngraphGroup.parentNode.removeChild(this.nodes.labelsIngraphGroup);
            }

            this.nodes.labelsIngraphGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    id: 'labelsIngraphGroup',
                }
            });
            
            // Get the text configuration
            var textConf = RGraph.SVG.getTextConf({
                object: this,
                prefix: 'labelsIngraph'
            });

            this.nodes.labelsIngraph = RGraph.SVG.text({
                object: this,
                parent: this.nodes.labelsIngraphGroup,
                text:   RGraph.SVG.numberFormat({
                    prepend:   properties.labelsIngraphUnitsPre,
                    append:    properties.labelsIngraphUnitsPost,
                    point:     properties.labelsIngraphPoint,
                    thousand:  properties.labelsIngraphThousand,
                    formatter: properties.labelsIngraphFormatter,
                    num:       this.value.toFixed(properties.labelsIngraphDecimals)
                }),
                x:                 this.centerx,
                y:                 this.centery + this.radius - properties.rmargin - 30,
                background:        properties.labelsIngraphBackground,
                backgroundRounded: properties.labelsIngraphRounded,
                padding:           properties.labelsIngraphPadding,
                halign:            'center',
                valign:            'center',
                
                size:              textConf.size,
                bold:              textConf.bold,
                italic:            textConf.italic,
                font:              textConf.font,
                color:             textConf.color
            });
            
            // Add a border to the rect
            var rect = this.nodes.labelsIngraph.previousSibling;
            
            rect.setAttribute('stroke', '#aaa');

            // Prevent clicks on the label from affecting the rest of the
            // chart if adjusting is enabled
            var func = function (e) {e.stopPropagation();};
            
            rect.addEventListener('mousedown', func, false);
            this.nodes.labelsIngraph.addEventListener('mousedown', func, false);
        };








        // Draws the needle of the meter.
        //
        // This function is used by the adjusting feature to redraw just
        // the needle instead of redrawing the whole chart
        //
        this.drawNeedle = function ()
        {
            // Remove any pre-existing needle
            if (this.nodes.needleGroup) {
                this.nodes.needleGroup.parentNode.removeChild(this.nodes.needleGroup);
            }



            this.nodes.needleGroup = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: this.svgAllGroup,
                attr: {
                    id: 'needle-group',
                    fill: properties.needleColor,
                    stroke: properties.needleColor
                }
            });
            
            
            
            

            // Calculate the end coords of the needle
            var angle = (this.value - this.innerMin) / (this.innerMax - this.innerMin) * this.angleSpan;
                angle += RGraph.SVG.TRIG.HALFPI + (RGraph.SVG.TRIG.HALFPI / 2);

            // These are the coords of the tip of the needle
            var coords = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     this.radius - 60,
                angle: angle
            });

            // These are the coords of the left of the needle
            var coords2 = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     properties.centerpinRadius,
                angle: angle - RGraph.SVG.TRIG.HALFPI
            });

            // These are the coords of the right of the needle
            var coords3 = RGraph.SVG.TRIG.toCartesian({
                cx:    this.centerx,
                cy:    this.centery,
                r:     properties.centerpinRadius,
                angle: angle + RGraph.SVG.TRIG.HALFPI
            });

            // Now draw the needle
            RGraph.SVG.create({
                svg: this.svg,
                type: 'path',
                parent: this.nodes.needleGroup,
                attr: {
                    'stroke-width': 1,
                    'stroke-linecap': "round",
                    d: 'M{1} {2} L{3} {4} L{5} {6} z'.format(
                        coords.x,
                        coords.y,
                        coords2.x,
                        coords2.y,
                        coords3.x,
                        coords3.y
                        
                    )
                }
            });

            // Draw a center circle
            RGraph.SVG.create({
                svg: this.svg,
                type: 'circle',
                parent: this.nodes.needleGroup,
                attr: {
                    cx:this.centerx,
                    cy: this.centery,
                    r: properties.centerpinRadius
                }
            });
                    
            
            
            
            // Update the ingraph label if it's enabled
            if (properties.labelsIngraph) {
                this.drawIngraph();
            }
        };

















        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors:                  RGraph.SVG.arrayClone(properties.colors, true),
                    backgroundFill:          RGraph.SVG.arrayClone(properties.backgroundFill, true),
                    backgroundStroke:        RGraph.SVG.arrayClone(properties.backgroundStroke, true),
                    labelsIngraphBackground: RGraph.SVG.arrayClone(properties.labelsIngraphBackground, true)
                }
            }

            // backgroundFill
            properties.backgroundFill = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundFill,
                start: properties.marginTop,
                  end: this.height - properties.marginBottom,
                direction: 'vertical'
            });

            // backgroundStroke
            properties.backgroundStroke = RGraph.SVG.parseColorLinear({
                object: this,
                color: properties.backgroundStroke,
                start: properties.marginTop,
                  end: this.height - properties.marginBottom,
                direction: 'vertical'
            });

            // labelsIngraphBackground
            properties.labelsIngraphBackground = RGraph.SVG.parseColorLinear({
               object: this,
                color: properties.labelsIngraphBackground,
            direction: 'vertical',
        gradientUnits: 'objectBoundingBox'
            });
        };








        // Returns the value of a click
        //
        // @param e object The event object
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

            if (mouseX < this.centerx) {
                angle = angle - RGraph.SVG.TRIG.TWOPI;
            }

            var value = ((angle - this.angleStart) / (this.angleEnd - this.angleStart));
            value = value * (this.innerMax - this.innerMin);
            value = value + this.innerMin;
        
            if (value < this.innerMin) value = this.innerMin;
            if (value > this.innerMax) value = this.innerMax;

            return value;
        };








        //
        // Returns the angle (in radians) for the given value
        //
        this.getAngle = function (value)
        {
            var angle = (value - this.innerMin) / (this.innerMax - this.innerMin) * (this.angleEnd - this.angleStart) + this.angleStart;

            return angle
        }








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
        // This function handles clipping to scale values. Because
        // each chart handles scales differently, a worker function
        // is needed instead of it all being done centrally in the
        // RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleWorker = function (clipPath)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.max; else to   = Number(RegExp.$2);

            var a1 = this.getAngle(from),
                a2 = this.getAngle(to);

            // Change the angle if the number is "max"
            if (RegExp.$2 === 'max') {
                a2 = this.getAngle(this.innerMax);
            }

            // Change the angle if the number is "min"
            if (RegExp.$1 === 'min') {
                a1 = RGraph.SVG.TRIG.PI;
            }



            // Change the radius if the number is "max"
            if (RegExp.$2 === 'max') {
                a2 = RGraph.SVG.TRIG.TWOPI + RGraph.SVG.TRIG.PI;
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
        // The Gauge chart grow effect
        //
        this.grow = function ()
        {
            var opt    = arguments[0] || {},
                frames = opt.frames || 30,
                frame  = 0,
                obj    = this;

            //
            // Copy the data
            //
            var value = RGraph.SVG.arrayClone(this.value, true);


            if (RGraph.SVG.isNullish(this.currentValue)) {
                this.currentValue = this.innerMin;
            }

            var initial_value = this.currentValue,
                diff          = this.value - Number(this.currentValue),
                increment     = diff  / frames;

            var iterate = function ()
            {

                var multiplier = frame / frames;
                
                obj.value = initial_value + (increment * frame);

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
        // Set the options that the user has provided
        //
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }
    };
    
    
    
    return this;




// End module pattern
})(window, document);