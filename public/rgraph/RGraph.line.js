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

    RGraph = window.RGraph || {isrgraph:true,isRGraph:true,rgraph:true};

    //
    // The line chart constructor
    //
    RGraph.Line = function (conf)
    {
        var id                  = conf.id,
            canvas              = document.getElementById(id),
            data                = conf.data;

        this.id                     = id;
        this.canvas                 = canvas;
        this.context                = this.canvas.getContext('2d');
        this.canvas.__object__      = this;
        this.type                   = 'line';
        this.max                    = 0;
        this.coords                 = [];
        this.coords2                = [];
        this.coords.key             = [];
        this.coordsText             = [];
        this.coordsSpline           = [];
        this.coordsAxes             = {xaxis: [], yaxis: []};
        this.coordsTrendline        = [];
        this.hasnegativevalues      = false;
        this.isRGraph               = true;
        this.isrgraph               = true;
        this.rgraph                 = true;
        this.uid                    = RGraph.createUID();
        this.canvas.uid             = this.canvas.uid ? this.canvas.uid : RGraph.createUID();
        this.colorsParsed           = false;
        this.original_colors        = [];
        this.firstDraw              = true; // After the first draw this will be false
        this.stopAnimationRequested = false;// Used to control the animations
        this.growEffectMultiplier   = 1;    // Used by the Grow effect











        // Various config type stuff
        this.properties =
        {
            backgroundBarsCount:        null,
            backgroundBarsColor1:       'rgba(0,0,0,0)',
            backgroundBarsColor2:       'rgba(0,0,0,0)',
            backgroundGrid:             1,
            backgroundGridLinewidth:    1,
            backgroundGridHsize:        25,
            backgroundGridVsize:        25,
            backgroundGridColor:        '#ddd',
            backgroundGridVlines:       true,
            backgroundGridHlines:       true,
            backgroundGridBorder:       true,
            backgroundGridAutofit:      true,
            backgroundGridAutofitAlign: true,
            backgroundGridHlinesCount:  5,
            backgroundGridVlinesCount:  null,
            backgroundGridDashed:       false,
            backgroundGridDotted:       false,
            backgroundGridDashArray:    null,
            backgroundHbars:            null,
            backgroundImage:            null,
            backgroundImageStretch:     true,
            backgroundImageX:           null,
            backgroundImageY:           null,
            backgroundImageW:           null,
            backgroundImageH:           null,
            backgroundImageAlign:       null,
            backgroundColor:            null,
            backgroundBorder:           false,
            backgroundBorderLinewidth:  1,
            backgroundBorderColor:      '#aaa',
            backgroundBorderDashed:     false,
            backgroundBorderDotted:     false,
            backgroundBorderDashArray:  null,

            xaxis:                   true,
            xaxisLinewidth:          1,
            xaxisColor:              'black',
            xaxisTickmarks:          true,
            xaxisTickmarksLength:    3,
            xaxisTickmarksLastLeft:  null,
            xaxisTickmarksLastRight: null,
            xaxisTickmarksCount:  null,
            xaxisLabels:          null,
            xaxisLabelsFormattedDecimals:   0,
            xaxisLabelsFormattedPoint:      '.',
            xaxisLabelsFormattedThousand:   ',',
            xaxisLabelsFormattedUnitsPre:   '',
            xaxisLabelsFormattedUnitsPost:  '',
            xaxisLabelsSize:      null,
            xaxisLabelsFont:      null,
            xaxisLabelsItalic:    null,
            xaxisLabelsBold:      null,
            xaxisLabelsColor:     null,
            xaxisLabelsOffsetx:   0,
            xaxisLabelsOffsety:   0,
            xaxisLabelsHalign:   null,
            xaxisLabelsValign:   null,
            xaxisLabelsPosition:  'edge',
            xaxisLabelsSpecificAlign:'left',
            xaxisPosition:        'bottom',
            xaxisPosition:        'bottom',
            xaxisLabelsAngle:     0,
            xaxisTitle:           '',
            xaxisTitleBold:       null,
            xaxisTitleSize:       null,
            xaxisTitleFont:       null,
            xaxisTitleColor:      null,
            xaxisTitleItalic:     null,
            xaxisTitlePos:        null,
            xaxisTitleOffsetx:    0,
            xaxisTitleOffsety:    0,
            xaxisTitleX:          null,
            xaxisTitleY:          null,
            xaxisTitleHalign:     'center',
            xaxisTitleValign:     'top',

            yaxis:                    true,
            yaxisLinewidth:           1,
            yaxisColor:               'black',
            yaxisTickmarks:           true,
            yaxisTickmarksCount:      null,
            yaxisTickmarksLastTop:    null,
            yaxisTickmarksLastBottom: null,
            yaxisTickmarksLength:     3,
            yaxisScale:               true,
            yaxisScaleMin:            0,
            yaxisScaleMax:            null,
            yaxisScaleUnitsPre:       '',
            yaxisScaleUnitsPost:      '',
            yaxisScaleDecimals:       0,
            yaxisScalePoint:          '.',
            yaxisScaleThousand:       ',',
            yaxisScaleRound:          false,
            yaxisScaleFormatter:      null,
            yaxisScaleInvert:         false,
            yaxisLabelsSpecific:      null,
            yaxisLabelsCount:         5,
            yaxisLabelsOffsetx:       0,
            yaxisLabelsOffsety:       0,
            yaxisLabelsHalign:        null,
            yaxisLabelsValign:        null,
            yaxisLabelsFont:          null,
            yaxisLabelsSize:          null,
            yaxisLabelsColor:         null,
            yaxisLabelsBold:          null,
            yaxisLabelsItalic:        null,
            yaxisLabelsPosition:      'edge',
            yaxisPosition:            'left',
            yaxisTitle:               '',
            yaxisTitleBold:           null,
            yaxisTitleSize:           null,
            yaxisTitleFont:           null,
            yaxisTitleColor:          null,
            yaxisTitleItalic:         null,
            yaxisTitlePos:            null,
            yaxisTitleX:              null,
            yaxisTitleY:              null,
            yaxisTitleOffsetx:        0,
            yaxisTitleOffsety:        0,
            yaxisTitleHalign:         null,
            yaxisTitleValign:         null,
            yaxisTitleAccessible:     null,
            
            labelsAbove:                false,
            labelsAboveDecimals:        null,
            labelsAboveSize:            null,
            labelsAboveColor:           null,
            labelsAboveFont:            null,
            labelsAboveBold:            null,
            labelsAboveItalic:          null,
            labelsAboveBackground:      'rgba(255,255,255,0.7)',
            labelsAboveBorder:          false,
            labelsAboveUnitsPre:        '',
            labelsAboveUnitsPost:       '',
            labelsAboveSpecific:        null,
            labelsAboveOffsetx:        0,
            labelsAboveOffsety:        0,
            labelsAboveFormatter:      null,

            linewidth:                  2.001,
            linecap:                    'round',
            linejoin:                   'round',

            colors:                     ['red', '#0f0', '#00f', '#f0f', '#ff0', '#0ff','green','pink','blue','black'],
            
            tickmarksStyle:             'none',
            tickmarksLinewidth:         null,
            tickmarksSize:              3,
            tickmarksColor:             null,
            tickmarksStyleDotStroke:    'white',
            tickmarksStyleDotFill:      null,
            tickmarksStyleDotLinewidth: 3,
            tickmarksStyleImage:        null,
            tickmarksStyleImageHalign:  'center',
            tickmarksStyleImageValign:  'center',
            tickmarksStyleImageOffsetx: 0,
            tickmarksStyleImageOffsety: 0,

            marginLeft:                 35,
            marginRight:                35,
            marginTop:                  35,
            marginBottom:               35,
            marginInner:                0,
            
            filledColors:               null,
            
            textBold:                   false,
            textItalic:                 false,
            textSize:                   12,
            textColor:                  'black',
            textFont:                   "Arial, Verdana, sans-serif",
            textAccessible:             false,
            textAccessibleOverflow:     'visible',
            textAccessiblePointerevents:false,
            text:                       null,
            
            title:                      '',
            titleFont:                  null,
            titleSize:                  null,
            titleColor:                 null,
            titleBold:                  null,
            titleItalic:                null,
            titleX:                     null,
            titleY:                     null,
            titleHalign:                null,
            titleValign:                null,
            titleOffsetx:               0,
            titleOffsety:               0,
            titleSubtitle:        '',
            titleSubtitleSize:    null,
            titleSubtitleColor:   '#aaa',
            titleSubtitleFont:    null,
            titleSubtitleBold:    null,
            titleSubtitleItalic:  null,
            titleSubtitleOffsetx: 0,
            titleSubtitleOffsety: 0,

            shadow:                     true,
            shadowOffsetx:              2,
            shadowOffsety:              2,
            shadowBlur:                 3,
            shadowColor:                'rgba(128,128,128,0.5)',
            
            tooltips:                   null,
            tooltipsHotspotXonly:       false,
            tooltipsHotspotSize:        5,
            tooltipsHotspotIgnore:      null,
            tooltipsEffect:             'slide',
            tooltipsCssClass:           'RGraph_tooltip',
            tooltipsCss:                null,
            tooltipsEvent:              'onmousemove',
            tooltipsHighlight:          true,
            tooltipsPersistent:         false,
            tooltipsCoordsPage:         false,
            tooltipsFormattedThousand:  ',',
            tooltipsFormattedPoint:     '.',
            tooltipsFormattedDecimals:  0,
            tooltipsFormattedUnitsPre:  '',
            tooltipsFormattedUnitsPost: '',
            tooltipsFormattedKeyColors: null,
            tooltipsFormattedKeyColorsShape: 'square',
            tooltipsFormattedKeyLabels: [],
            tooltipsFormattedListType:  'ul',
            tooltipsFormattedListItems: null,
            tooltipsFormattedTableHeaders: null,
            tooltipsFormattedTableData: null,
            tooltipsDataset:            null,
            tooltipsDatasetEvent:       'click',
            tooltipsPointer:            true,
            tooltipsPointerOffsetx:     0,
            tooltipsPointerOffsety:     0,
            tooltipsPositionStatic:     true,

            highlightStyle:             null,
            highlightStroke:            'gray',
            highlightFill:              'white',
            highlightPointRadius:       2,
            
            highlightDataset:                false,
            highlightDatasetStroke:          'rgba(0,0,0,0.25)',
            highlightDatasetFill:            'rgba(255,255,255,0.75)',
            highlightDatasetStrokeAlpha:     1,
            highlightDatasetFillAlpha:       1,
            highlightDatasetFillUseColors:   false,
            highlightDatasetStrokeUseColors: false,
            highlightDatasetLinewidth:       null,
            highlightDatasetDotted:          false,
            highlightDatasetDashed:          false,
            highlightDatasetDashArray:       null,
            highlightDatasetExclude:         null,
            highlightDatasetCallback:        null,
            highlightDatasetEvent:           'click',

            stepped:                    false,
            
            key:                        null,
            keyBackground:              'white',
            keyPosition:                'graph',
            keyHalign:                  null,
            keyShadow:                  false,
            keyShadowColor:             '#666',
            keyShadowBlur:              3,
            keyShadowOffsetx:           2,
            keyShadowOffsety:           2,
            keyPositionMarginBoxed:     false,
            keyPositionMarginHSpace:   0,
            keyPositionX:               null,
            keyPositionY:               null,
            keyColorShape:              'square',
            keyRounded:                 true,
            keyLinewidth:               1,
            keyColors:                  null,
            keyInteractive:             false,
            keyInteractiveHighlightChartStroke: 'rgba(255,0,0,0.3)',
            keyInteractiveHighlightLabel: 'rgba(255,0,0,0.2)',
            keyLabelsFont:              null,
            keyLabelsSize:              null,
            keyLabelsColor:             null,
            keyLabelsBold:              null,
            keyLabelsItalic:            null,
            keyLabelsOffsetx:           0,
            keyLabelsOffsety:           0,
            keyFormattedDecimals:       0,
            keyFormattedPoint:          '.',
            keyFormattedThousand:       ',',
            keyFormattedUnitsPre:       '',
            keyFormattedUnitsPost:      '',
            keyFormattedValueSpecific:  null,
            keyFormattedItemsCount:     null,

            contextmenu:                null,

            crosshairs:                 false,
            crosshairsColor:            '#333',
            crosshairsLinewidth:        1,
            crosshairsHline:            true,
            crosshairsVline:            true,
            crosshairsSnapToScale:      false,
            
            annotatable:                false,
            annotatableColor:           'black',
            annotatableLinewidth:       1,

            filled:                     false,
            filledRange:                false,
            filledRangeThreshold:       null,
            filledRangeThresholdColors: ['red', 'green'],
            filledAccumulative:    		true,

            variant:                	null,

            axesAbove:              	false,

            backdrop:               	false,
            backdropSize:          		30,
            backdropAlpha:         		0.2,

            adjustable:                 false,
            adjustableOnly:             null,
            adjustableXonly:            false,

            redraw:                     true,

            outofbounds:                false,
            outofboundsClip:            false,

            animationFactor:            1,
            animationUnfoldX:           false,
            animationUnfoldY:           true,
            animationUnfoldInitial:     2,
            animationTraceClip:         1,
            animationTraceCenter:       false,

            spline:                     false,

            lineVisible:                [],

            errorbars:                  false,
            errorbarsColor:             'black',
            errorbarsCapped:            true,
            errorbarsCappedWidth:       12,
            errorbarsLinewidth:         1,

            combinedEffect:             null,
            combinedEffectOptions:      null,
            combinedEffectCallback:     null,

            clearto:                    'rgba(0,0,0,0)',

            dotted:                     false,
            dashed:                     false,
            
            trendline:                  false,
            trendlineColors:            ['#666'],
            trendlineLinewidth:         1,
            trendlineMargin:            25,
            trendlineDashed:            false,
            trendlineDotted:            false,
            trendlineDashArray:         null,
            trendlineClip:              true,
            
            nullBridge:                 false,
            nullBridgeLinewidth:        null,
            nullBridgeColors:           null, // Can be null, a string or an object
            nullBridgeDashArray:        [5,5],

            labelsAngled:           false,
            labelsAngledSpecific:   null,
            labelsAngledAccessible: null,
            labelsAngledFont:       null,
            labelsAngledColor:      null,
            labelsAngledSize:       null,
            labelsAngledBold:       null,
            labelsAngledItalic:     null,
            labelsAngledUpFont:     null,
            labelsAngledUpColor:    null,
            labelsAngledUpSize:     null,
            labelsAngledUpBold:     null,
            labelsAngledUpItalic:   null,
            labelsAngledDownFont:   null,
            labelsAngledDownColor:  null,
            labelsAngledDownSize:   null,
            labelsAngledDownBold:   null,
            labelsAngledDownItalic: null,
            labelsAngledLevelFont:  null,
            labelsAngledLevelColor: null,
            labelsAngledLevelSize:  null,
            labelsAngledLevelBold:  null,
            labelsAngledILeveltalic:null,

            lines:                  null // Used to show an average line indicator (for example)
        }

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

        // Convert strings to numbers
        this.original_data  = RGraph.stringsToNumbers(conf.data);
        

        //
        // Store the original data. This also allows for giving arguments as one big array.
        //
        if (typeof this.original_data[0] === 'number' || RGraph.isNullish(this.original_data[0])) {
            this.original_data = [RGraph.arrayClone(this.original_data)];
        }


        // Some of the animations actually modify the
        // .original_data array so we need to keep a
        // copy of the unmodified, unmodified data. this
        // variable is used to access that data in those
        // effects (eg the wave effect).
        this.unmodified_data = RGraph.arrayClone(this.original_data);









        // Check for support
        if (!this.canvas) {
            alert('[LINE] Fatal error: no canvas support');
            return;
        }




        
        //
        // Store the data here as one big array
        //
        this.data_arr = RGraph.arrayLinearize(this.original_data);

        for (var i=0; i<this.data_arr.length; ++i) {
            this['$' + i] = {};
        }




        // Easy access to properties and the path function
        var properties = this.properties;
        this.path      = RGraph.pathObjectFunction;

        
        //
        // "Decorate" the object with the generic effects if the effects library has been included
        //
        if (RGraph.Effects && typeof RGraph.Effects.decorate === 'function') {
            RGraph.Effects.decorate(this);
        }

        
        
        // Add the responsive method. This method resides in the common file.
        this.responsive = RGraph.responsive;




    
        //
        // An all encompassing accessor
        //
        this.set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            if (typeof name === 'string') {
                name = this.properties_lowercase_map[name.toLowerCase()] || name;
            }

            // Set the colorsParsed flag to false if the colors
            // property is being set
            if (
                   name === 'colors'
                || name === 'fillledColors'
                || name === 'keyColors'
                || name === 'backgroundHbars'
                || name === 'backgroundBarsColor1'
                || name === 'backgroundBarsColor2'
                || name === 'backgroundGridColor'
                || name === 'backgroundColor'
                || name === 'textColor'
                || name === 'crosshairsColor'
                || name === 'annotatableColor'
                || name === 'titleColor'
                || name === 'xaxisTitleColor'
                || name === 'yaxisTitleColor'
                || name === 'keyBackground'
                || name === 'axesColor'
                || name === 'highlightFill'
                ) {
                this.colorsParsed = false;
            }

            // the number of arguments is only one and it's an
            // object - parse it for configuration data and return.
            if (arguments.length === 1 && typeof arguments[0] === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        this.set(i, arguments[0][i]);
                    }
                }

                return this;
            }

            properties[name] = value;

            return this;
        };








        //
        // An all encompassing accessor
        // 
        // @param string name The name of the property
        //
        this.get = function (name)
        {
            // Go through all of the properties and make sure
            // that they're using the correct capitalisation
            name = this.properties_lowercase_map[name.toLowerCase()] || name;

            return properties[name];
        };








        //
        // The function you call to draw the line chart
        //
        this.draw = function ()
        {
            // MUST be the first thing done!
            if (typeof properties.backgroundImage == 'string') {
                RGraph.drawBackgroundImage(this);
            }
    

            //
            // Fire the onbeforedraw event
            //
            RGraph.fireCustomEvent(this, 'onbeforedraw');





            // Translate half a pixel for antialiasing purposes - but only if it hasn't been
            // done already
            //
            // MUST be the first thing done!
            //
            if (!this.canvas.__rgraph_aa_translated__) {
                this.context.translate(0.5,0.5);
            
                this.canvas.__rgraph_aa_translated__ = true;
            }



            //
            // Parse the colors. This allows for simple gradient syntax
            //
            if (!this.colorsParsed) {

                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }



            //
            // Make the margins easy to access
            //
            this.marginLeft   =  properties.marginLeft;
            this.marginRight  =  properties.marginRight;
            this.marginTop    =  properties.marginTop;
            this.marginBottom =  properties.marginBottom;

    
            if (properties.xaxisLabels && properties.xaxisLabels.length) {
                //
                // If the xaxisLabels option is a string then turn it
                // into an array.
                //
                if (typeof properties.xaxisLabels === 'string') {
                    properties.xaxisLabels = RGraph.arrayPad({
                        array:  [],
                        length: this.original_data[0].length,
                        value:  properties.xaxisLabels
                    });
                }
    
                for (var i=0; i<properties.xaxisLabels.length; ++i) {
                    properties.xaxisLabels[i] = RGraph.labelSubstitution({
                        object:    this,
                        text:      properties.xaxisLabels[i],
                        index:     i,
                        value:     this.original_data[0][i],
                        decimals:  properties.xaxisLabelsFormattedDecimals  || 0,
                        unitsPre:  properties.xaxisLabelsFormattedUnitsPre  || '',
                        unitsPost: properties.xaxisLabelsFormattedUnitsPost || '',
                        thousand:  properties.xaxisLabelsFormattedThousand  || ',',
                        point:     properties.xaxisLabelsFormattedPoint     || '.'
                    });
                }
            }








            // Reset the data back to that which was initially supplied
            this.data = RGraph.arrayClone(this.original_data);

    
            // Reset the max value
            this.max = 0;

            if (properties.filled && !properties.filledRange && this.data.length > 1 && properties.filledAccumulative) {
    
                var accumulation = [];

                for (var set=0; set<this.data.length; ++set) {
                    for (var point=0; point<this.data[set].length; ++point) {
                        this.data[set][point] = Number(accumulation[point] ? accumulation[point] : 0) + this.data[set][point];
                        accumulation[point] = this.data[set][point];
                    }
                }
            }

            //
            // Get the maximum Y scale value
            //
            if ( properties.yaxisScaleMax) {

                this.max =  properties.yaxisScaleMax;
                this.min =  properties.yaxisScaleMin ?  properties.yaxisScaleMin : 0;
    
                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':           properties.yaxisScaleMin,
                    'scale.strict':       true,
                    'scale.thousand':      properties.yaxisScaleThousand,
                    'scale.point':         properties.yaxisScalePoint,
                    'scale.decimals':      properties.yaxisScaleDecimals,
                    'scale.labels.count':  properties.yaxisLabelsCount,
                    'scale.round':         properties.yaxisScaleRound,
                    'scale.units.pre':     properties.yaxisScaleUnitsPre,
                    'scale.units.post':    properties.yaxisScaleUnitsPost
                }});

                this.max   = this.scale2.max ? this.scale2.max : 0;
    
                // Check for negative values
                if (!properties.outofbounds) {
                    for (dataset=0; dataset<this.data.length; ++dataset) {
                        if (RGraph.isArray(this.data[dataset])) {
                            for (var datapoint=0; datapoint<this.data[dataset].length; datapoint++) {
                                // Check for negative values
                                this.hasnegativevalues = (this.data[dataset][datapoint] < 0) || this.hasnegativevalues;
                            }
                        }
                    }
                }
    
            } else {

                this.min =  properties.yaxisScaleMin ?  properties.yaxisScaleMin : 0;
    
                // Work out the max Y value
                for (dataset=0; dataset<this.data.length; ++dataset) {
                    for (var datapoint=0; datapoint<this.data[dataset].length; datapoint++) {
        
                        this.max = Math.max(this.max, this.data[dataset][datapoint] ? Math.abs(parseFloat(this.data[dataset][datapoint])) : 0);
        
                        // Check for negative values
                        if (!properties.outofbounds) {
                            this.hasnegativevalues = (this.data[dataset][datapoint] < 0) || this.hasnegativevalues;
                        }
                    }
                }

                this.scale2 = RGraph.getScale({object: this, options: {
                    'scale.max':          this.max,
                    'scale.min':           properties.yaxisScaleMin,
                    'scale.thousand':      properties.yaxisScaleThousand,
                    'scale.point':         properties.yaxisScalePoint,
                    'scale.decimals':      properties.yaxisScaleDecimals,
                    'scale.labels.count':  properties.yaxisLabelsCount,
                    'scale.round':         properties.yaxisScaleRound,
                    'scale.units.pre':     properties.yaxisScaleUnitsPre,
                    'scale.units.post':    properties.yaxisScaleUnitsPost,
                    'scale.formatter':     properties.yaxisScaleFormatter
                }});
    
                this.max   = this.scale2.max ? this.scale2.max : 0;
            }




            //
            // Setup the context menu if required
            //
            if (properties.contextmenu) {
                RGraph.showContext(this);
            }

            //
            // Reset the coords arrays otherwise it will keep growing
            //
            this.coords     = [];
            this.coordsText = [];

            //
            // Work out a few things. They need to be here because they depend on things you can change before you
            // call Draw() but after you instantiate the object
            //
            this.grapharea      = this.canvas.height - this.marginTop - this.marginBottom;
            this.halfgrapharea  = this.grapharea / 2;
            this.halfTextHeight = properties.textSize / 2;
    

            //
            // Install clipping before anything is drawn but after
            // everything has been calculated (eg maximum values
            // etc)
            //
            if (!RGraph.isNullish(this.properties.clip)) {
                RGraph.clipTo.start(this, this.properties.clip);
            }
    
            if (properties.variant == '3d') {
                RGraph.draw3DAxes(this);
            }
            
            // Draw the background
            RGraph.Background.draw(this);


            //
            // Draw any horizontal bars that have been defined
            //
            if (properties.backgroundHbars && properties.backgroundHbars.length > 0) {
                RGraph.drawBars(this);
            }

            if (!properties.axesAbove) {
                this.drawAxes();
            }
    
            //
            // This facilitates the new Trace2 effect
            //
    
            this.context.save()
            this.context.beginPath();

            // The clipping region is idfferent based on th animationTraceCenter option
            if (properties.animationTraceCenter) {
                this.context.rect(
                    (this.canvas.width / 2) * (1 - properties.animationTraceClip),
                    0,
                    this.canvas.width * properties.animationTraceClip,
                    this.canvas.height
                );
            } else {
                this.context.rect(0, 0, this.canvas.width * properties.animationTraceClip, this.canvas.height);
            }

            this.context.clip();
    
                for (var i=0, j=0, len=this.data.length; i<len; i++, j++) {
        
                    this.context.beginPath();
        
                    //
                    // Turn on the shadow if required
                    //
                    if (!properties.filled) {
                        this.setShadow(i);
                    }
        
                    //
                    // Draw the line
                    //
        
                    if (properties.filledColors) {
                        if (typeof properties.filledColors == 'object' && properties.filledColors[j]) {
                           var fill = properties.filledColors[j];
                        
                        } else if (typeof properties.filledColors == 'object' && properties.filledColors.toString().indexOf('Gradient') > 0) {
                           var fill = properties.filledColors;
                        
                        } else if (typeof properties.filledColors == 'string') {
                            var fill = properties.filledColors;
            
                        }
                    } else if (properties.filled) {
                        var fill =  properties.colors[j];
        
                    } else {
                        var fill = null;
                    }

                    //
                    // Figure out the tickmark to use
                    //
                    if (properties.tickmarksStyle && typeof properties.tickmarksStyle == 'object') {
                        var tickmarks = properties.tickmarksStyle[i];
                    } else if (properties.tickmarksStyle && typeof properties.tickmarksStyle == 'string') {
                        var tickmarks = properties.tickmarksStyle;
                    } else if (properties.tickmarksStyle && typeof properties.tickmarksStyle == 'function') {
                        var tickmarks = properties.tickmarksStyle;
                    } else {
                        var tickmarks = null;
                    }

                    //
                    // Draw the line, accounting for the outofboundsClip option
                    //
                    if (properties.outofboundsClip) {
                        this.path(
                            'sa b r % % % % cl b',
                            0,this.marginTop,this.canvas.width,this.canvas.height - this.marginTop - this.marginBottom
                        );
                    }

                        this.drawLine(
                            this.data[i],
                             properties.colors[j],
                            fill,
                            this.getLineWidth(j),
                            tickmarks,
                            i
                        );
                    if (properties.outofboundsClip) {
                        this.context.restore();
                    }
            
                    this.context.stroke();

                }
        
            //
            // If the line is filled re-stroke the lines
            //
            if (properties.outofboundsClip) {
                this.path(
                    'sa b r % % % % cl b',
                    0,this.marginTop,this.canvas.width,this.canvas.height - this.marginTop - this.marginBottom
                );
            }


            if (properties.filled && properties.filledAccumulative && !properties.spline) {
                

                for (var i=0; i<this.coords2.length; ++i) {
        
                    this.context.beginPath();
                    this.context.lineWidth = this.getLineWidth(i);
                    this.context.strokeStyle = !this.hidden(i) ?  properties.colors[i] : 'rgba(0,0,0,0)';
        
                    for (var j=0,len=this.coords2[i].length; j<len; ++j) {
        
                        if (j == 0 || this.coords2[i][j][1] == null || (this.coords2[i][j - 1] && this.coords2[i][j - 1][1] == null)) {
                            this.context.moveTo(this.coords2[i][j][0], this.coords2[i][j][1]);
                        } else {
                            if (properties.stepped) {
                                this.context.lineTo(this.coords2[i][j][0], this.coords2[i][j - 1][1]);
                            }
                            this.context.lineTo(this.coords2[i][j][0], this.coords2[i][j][1]);
                        }
                    }
                    
                    this.context.stroke();
                    // No fill!
                }

                // Redraw the tickmarks
                if (properties.tickmarksStyle) {
        
                    this.context.beginPath();
        
                    this.context.fillStyle = 'white';
                    
                    for (var i=0,len=this.coords2.length; i<len; ++i) {
        
                        this.context.beginPath();
                        this.context.strokeStyle =  properties.colors[i];
    
                        for (var j=0; j<this.coords2[i].length; ++j) {
                            if (typeof this.coords2[i][j] == 'object' && typeof this.coords2[i][j][0] == 'number' && typeof this.coords2[i][j][1] == 'number') {
                                
                                var tickmarks = typeof properties.tickmarksStyle == 'object' ? properties.tickmarksStyle[i] : properties.tickmarksStyle;
        
                                this.drawTick(
                                    this.coords2[i],
                                    this.coords2[i][j][0],
                                    this.coords2[i][j][1],
                                    this.context.strokeStyle,
                                    false,
                                    j == 0 ? 0 : this.coords2[i][j - 1][0],
                                    j == 0 ? 0 : this.coords2[i][j - 1][1],
                                    tickmarks,
                                    j,
                                    i
                                );
                            }
                        }
                    }
        
                    this.context.stroke();
                    this.context.fill();
                }

            } else if (properties.filled && properties.filledAccumulative && properties.spline) {

                // Restroke the curvy filled accumulative lines

                for (var i=0; i<this.coordsSpline.length; i+=1) {
                    this.context.beginPath();
                    this.context.strokeStyle =  properties.colors[i];
                    this.context.lineWidth = this.getLineWidth(i);

                    for (var j=0,len=this.coordsSpline[i].length; j<len; j+=1) {
                        
                        var point = this.coordsSpline[i][j];
                        
                        j == 0 ? this.context.moveTo(point[0], point[1]) : this.context.lineTo(point[0], point[1]);
                    }

                   this.context.stroke();
                }







                for (var i=0,len=this.coords2.length; i<len; i+=1) {
                    for (var j=0,len2=this.coords2[i].length; j<len2; ++j) {
                        if (typeof this.coords2[i][j] == 'object' && typeof this.coords2[i][j][0] == 'number' && typeof this.coords2[i][j][1] == 'number') {

                            var tickmarks = typeof properties.tickmarksStyle == 'object' && !RGraph.isNullish(properties.tickmarksStyle) ? properties.tickmarksStyle[i] : properties.tickmarksStyle;
                            this.context.strokeStyle =  properties.colors[i];
                            this.drawTick(
                                this.coords2[i],
                                this.coords2[i][j][0],
                                this.coords2[i][j][1],
                                 properties.colors[i],
                                false,
                                j == 0 ? 0 : this.coords2[i][j - 1][0],
                                j == 0 ? 0 : this.coords2[i][j - 1][1],
                                tickmarks,
                                j,
                                i
                            );
                        }
                    }
                }



            }

            //
            // Bridge the null gaps if requested
            //
            // This was moved on 25/028/2021 to be inside the clip()
            // so that the trace() animation works
            //
            if (properties.nullBridge) {
                for (var i=0; i<this.data.length; ++i) {
                    this.nullBridge(i, this.data[i]);
                }
            }






        if (properties.outofboundsClip) {
            this.context.restore();
        }
        this.context.restore();
    
        // ???
        this.context.beginPath();
    


    
    
            //
            // If the axes have been requested to be on top, do that
            //
            if (properties.axesAbove) {
                this.drawAxes();
            }

            //
            // Draw the labels
            //
            this.drawLabels();
            
            //
            // Draw the range if necessary
            //
            this.drawRange();

            // Draw a key if necessary
            if (properties.key && properties.key.length && RGraph.drawKey) {
                RGraph.drawKey(this, properties.key,  properties.colors);
            }
    
            //
            // Draw " above" labels if enabled
            //
            if (properties.labelsAbove) {
                this.drawAboveLabels();
            }
    
            //
            // Draw the "in graph" labels
            //
            RGraph.drawInGraphLabels(this);

            //
            // Redraw the lines if a filled range is on the cards
            //
            if (properties.filled && properties.filledRange && this.data.length == 2) {
    
                this.context.beginPath();
                var len        = this.coords.length / 2;
                this.context.lineWidth   = properties.linewidth;
                this.context.strokeStyle = this.hidden(0) ? 'rgba(0,0,0,0)' :  properties.colors[0];
    
                for (var i=0; i<len; ++i) {
    
                    if (!RGraph.isNullish(this.coords[i][1])) {
                        if (i == 0) {
                            this.context.moveTo(this.coords[i][0], this.coords[i][1]);
                        } else {
                            this.context.lineTo(this.coords[i][0], this.coords[i][1]);
                        }
                    }
                }
                
                this.context.stroke();
    
    
                this.context.beginPath();
                
                if ( properties.colors[1]) {
                    this.context.strokeStyle = this.hidden(1) ? 'rgba(0,0,0,0)' :  properties.colors[1];
                }
                
                for (var i=this.coords.length - 1; i>=len; --i) {
                    if (!RGraph.isNullish(this.coords[i][1])) {
                        if (i == (this.coords.length - 1)) {
                            this.context.moveTo(this.coords[i][0], this.coords[i][1]);
                        } else {
                            this.context.lineTo(this.coords[i][0], this.coords[i][1]);
                        }
                    }
                }
    
                this.context.stroke();
    
    
            } else if (properties.filled && properties.filledRange) {
                alert('[LINE] You must have only two sets of data for a filled range chart');
            }
        
        
        
            // Add trendlines if they have been enabled
            for (var i=0; i<this.data.length; ++i) {
                if (    (RGraph.isArray(properties.trendline) && properties.trendline[i])
                     || (!RGraph.isArray(properties.trendline) && properties.trendline)) {










                    this.context.save()
                    this.context.beginPath();
        
                        // The clipping region is idfferent based on the
                        // animationTraceCenter option
                        if (properties.animationTraceCenter) {
                            this.context.rect(
                                (this.canvas.width / 2) * (1 - properties.animationTraceClip),
                                0,
                                this.canvas.width * properties.animationTraceClip,
                                this.canvas.height
                            );
                        } else {
                            this.context.rect(0, 0, this.canvas.width * properties.animationTraceClip, this.canvas.height);
                        }
            
                        this.context.clip();
                        
                        this.drawTrendline(i);
                    this.context.restore();
                }
            }









            //
            // Add custom text thats specified
            //
            RGraph.addCustomText(this);








            //
            // This installs the event listeners
            //
            RGraph.installEventListeners(this);
            
            //
            // Add the tooltipsDataset tooltips listener
            //
            if (properties.tooltipsDataset) {
                this.addDatasetTooltip();
            }






            // Draw any custom lines that have been defined
            RGraph.drawHorizontalLines(this);
            





            //
            // End clipping
            //
            RGraph.clipTo.end();

    
    

            //
            // Fire the onfirstdraw event
            //
            if (this.firstDraw) {
                this.firstDraw = false;
                RGraph.fireCustomEvent(this, 'onfirstdraw');
                this.firstDrawFunc();
            }




            //
            // Fire the RGraph draw event
            //
            RGraph.fireCustomEvent(this, 'ondraw');








            //
            // Install any inline responsive configuration. This
            // should be last in the draw function - even after
            // the draw events.
            //
            RGraph.installInlineResponsive(this);








            
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
        // Draws the axes
        //
        this.drawAxes = function ()
        {
            this.context.beginPath();
            
            this.context.lineCap = 'square';

            // Draw the X axis
            RGraph.drawXAxis(this);

            // Draw the Y axis
            RGraph.drawYAxis(this);

            //
            // This is here so that setting the color after this function doesn't
            // change the color of the axes
            //
            this.context.beginPath();
        };








        // Draw the text labels for the axes
        this.drawLabels = function ()
        {
            // Now done by the X and Y axis functions
        };








        //
        // Draws the line
        //
        this.drawLine = function (lineData, color, fill, linewidth, tickmarks, index)
        {
            // This facilitates the Rise animation (the Y value only)
            if (properties.animationUnfoldY && properties.animationFactor != 1) {
                for (var i=0; i<lineData.length; ++i) {
                    lineData[i] *= properties.animationFactor;
                }
            }

            var penUp = false;
            var yPos  = null;
            var xPos  = 0;
            this.context.lineWidth = 1;
            var lineCoords = [];
            
            //
            // Get the previous line data
            //
            if (index > 0) {
                var prevLineCoords = this.coords2[index - 1];
            }
            
            this.setLinecap({index: index});
            this.setLinejoin({index: index});


            // Work out the X interval
            var xInterval = (this.canvas.width - (2 *  properties.marginInner) - this.marginLeft - this.marginRight) / (lineData.length - 1);
    
            // Loop thru each value given, plotting the line
            // (FORMERLY FIRST)
            for (i=0,len=lineData.length; i<len; i+=1) {

                var data_point = lineData[i];
// For the Grow effect!!
data_point *= this.growEffectMultiplier;

                //
                // Get the yPos for the given data point
                //
                var yPos = this.getYCoord(data_point);


                // Null data points, and a special case a bug
                if (   lineData[i] == null
                    || ( properties.xaxisPosition == 'bottom' && lineData[i] < this.min && !properties.outofbounds)
                    ||  ( properties.xaxisPosition == 'center' && lineData[i] < (-1 * this.max) && !properties.outofbounds)
                    || (((lineData[i] < this.min &&  properties.xaxisPosition !== 'center') || lineData[i] > this.max) && !properties.outofbounds)) {
    
                    yPos = null;
                }






                // Plot the line if we're at least on the second iteration
                if (i > 0) {
                    xPos = xPos + xInterval;
                } else {
                    xPos =  properties.marginInner + this.marginLeft;
                }
                
                if (properties.animationUnfoldX) {
                    xPos *= properties.animationFactor;
                    
                    if (xPos <  properties.marginLeft) {
                        xPos =  properties.marginLeft;
                    }
                }
    
                //
                // Add the coords to an array
                //
                this.coords.push([xPos, yPos]);
                lineCoords.push([xPos, yPos]);
            }

            this.context.stroke();

            // Store the coords in another format, indexed by line number
            this.coords2[index] = lineCoords;



            //
            // Now draw the actual line [FORMERLY SECOND]
            //
            this.context.beginPath();
            // Transparent now as of 11/19/2011
            this.context.strokeStyle = 'rgba(0,0,0,0)';
            //this.context.strokeStyle = fill;
            if (fill) {
                this.context.fillStyle   = fill;
            }

            var isStepped = properties.stepped;
            var isFilled  = properties.filled;
            
            if ( properties.xaxisPosition == 'top') {
                var xAxisPos = this.marginTop;
            } else if ( properties.xaxisPosition == 'center') {
                var xAxisPos = this.marginTop + (this.grapharea / 2);
            } else if ( properties.xaxisPosition == 'bottom') {
                var xAxisPos = this.getYCoord( properties.yaxisScaleMin)

            }




            for (var i=0,len=lineCoords.length; i<len; i+=1) {
    
                xPos = lineCoords[i][0];
                yPos = lineCoords[i][1];
                var set = index;
    
                var prevY     = (lineCoords[i - 1] ? lineCoords[i - 1][1] : null);
                var isLast    = (i + 1) == lineCoords.length;
    
                //
                // This nullifys values which are out-of-range
                //
                if (!properties.outofbounds && (prevY < this.marginTop || prevY > (this.canvas.height - this.marginBottom) ) ) {
                    penUp = true;
                }
    
                if (i == 0 || penUp || !yPos || !prevY || prevY < this.marginTop) {

                    if (properties.filled && !properties.filledRange) {
    
                        if (!properties.outofbounds || prevY === null || yPos === null) {
                            this.context.moveTo(xPos + 1, xAxisPos);
                        }

                        // This facilitates the X axis being at the top
                        // NOTE: Also done below
                        if ( properties.xaxisPosition == 'top') {
                            this.context.moveTo(xPos + 1, xAxisPos);
                        }
                        
                        if (isStepped && i > 0) {
                            this.context.lineTo(xPos, lineCoords[i - 1][1]);
                        }
    
                        this.context.lineTo(xPos, yPos);
    
                    } else {
    
                        if (RGraph.ISOLD && yPos == null) {
                            // Nada
                        } else {
                            this.context.moveTo(xPos + 1, yPos);
                        }
                    }
    
                    if (yPos == null) {
                        penUp = true;
    
                    } else {
                        penUp = false;
                    }
    
                } else {
    
                    // Draw the stepped part of stepped lines
                    if (isStepped) {
                        this.context.lineTo(xPos, lineCoords[i - 1][1]);
                    }
    
                    if ((yPos >= this.marginTop && yPos <= (this.canvas.height - this.marginBottom)) || properties.outofbounds ) {
    
                        if (isLast && properties.filled && !properties.filledRange &&  properties.yaxisPosition == 'right') {
                            xPos -= 1;
                        }
    
    
                        // Added 8th September 2009
                        if (!isStepped || !isLast) {
                            this.context.lineTo(xPos, yPos);
                            
                            if (isFilled && lineCoords[i+1] && lineCoords[i+1][1] == null) {
                                this.context.lineTo(xPos, xAxisPos);
                            }
                        
                        // Added August 2010
                        } else if (isStepped && isLast) {
                            this.context.lineTo(xPos,yPos);
                        }
    
    
                        penUp = false;
                    } else {
                        penUp = true;
                    }
                }
            }

            //
            // Draw a line to the X axis if the chart is filled
            //
            if (properties.filled && !properties.filledRange && !properties.spline) {

                // Is this needed ??
                var fillStyle = properties.filledColors;

                //
                // Draw the bottom edge of the filled bit using either the X axis or the prevlinedata,
                // depending on the index of the line. The first line uses the X axis, and subsequent
                // lines use the prevLineCoords array
                //
                if (index > 0 && properties.filledAccumulative) {
                    
                    this.context.lineTo(xPos, prevLineCoords ? prevLineCoords[i - 1][1] : (this.canvas.height - this.marginBottom - 1 + ( properties.xaxisPosition == 'center' ? (this.canvas.height - this.marginTop - this.marginBottom) / 2 : 0)));

                    for (var k=(i - 1); k>=0; --k) {
                        this.context.lineTo(k == 0 ? prevLineCoords[k][0] + 1: prevLineCoords[k][0], prevLineCoords[k][1]);
                    }
                } else {

                    // Draw a line down to the X axis
                    if ( properties.xaxisPosition == 'top') {
                        this.context.lineTo(xPos,  properties.marginTop +  1);
                        this.context.lineTo(lineCoords[0][0], properties.marginTop + 1);
                    } else if (typeof lineCoords[i - 1][1] == 'number') {

                        var yPosition = this.getYCoord(0);

                        this.context.lineTo(xPos,yPosition);
                        this.context.lineTo(lineCoords[0][0],yPosition);
                    }
                }
    
                this.context.fillStyle = !this.hidden(index) ? fill : 'rgba(0,0,0,0)';

                this.context.fill();
                this.context.beginPath();

            }
    
            this.context.stroke();
    
    
            if (properties.backdrop) {
                this.drawBackdrop(lineCoords, color);
            }
    
    
    
    
            //
            // TODO CLIP TRACE
            // By using the clip() method the Trace animation can be updated.
            // NOTE: Needs to be done for the filled part as well
            // NOTE: This appears to have been done?
            //
            this.context.save();
                this.context.beginPath();
                
                // The clipping region is different based on th animationTraceCenter option
                if (properties.animationTraceCenter) {
                    this.context.rect(
                        (this.canvas.width / 2) * (1 - properties.animationTraceClip),
                        0,
                        this.canvas.width * properties.animationTraceClip,
                        this.canvas.height
                    );
                } else {
                    this.context.rect(0, 0, this.canvas.width * properties.animationTraceClip, this.canvas.height);
                }
                this.context.clip();





                //
                // Draw errorbars
                //
                if (typeof properties.errorbars !== 'null') {
                    this.drawErrorbars();
                }





                // Now redraw the lines with the correct line width
                this.setShadow(index);
                this.redrawLine(lineCoords, color, linewidth, index);
                this.context.stroke();
                RGraph.noShadow(this);






                // Draw the tickmarks
                for (var i=0; i<lineCoords.length; ++i) {
        
                    i = Number(i);
                    
                    //
                    // Set the color
                    //
                    this.context.strokeStyle = color;
                    
        
                    if (isStepped && i == (lineCoords.length - 1)) {
                        this.context.beginPath();
                        //continue;
                    }
        
                    if (
                        (
                            tickmarks != 'endcircle'
                         && tickmarks != 'endsquare'
                         && tickmarks != 'filledendsquare'
                         && tickmarks != 'endtick'
                         && tickmarks != 'endtriangle'
                         && tickmarks != 'arrow'
                         && tickmarks != 'filledarrow'
                        )
                        || (i == 0 && tickmarks != 'arrow' && tickmarks != 'filledarrow')
                        || i == (lineCoords.length - 1)
                       ) {
        
                        var prevX = (i <= 0 ? null : lineCoords[i - 1][0]);
                        var prevY = (i <= 0 ? null : lineCoords[i - 1][1]);

                        this.drawTick(
                            lineData,
                            lineCoords[i][0],
                            lineCoords[i][1],
                            color,
                            false,
                            prevX,
                            prevY,
                            tickmarks,
                            i,
                            index
                        );
                    }
                }

            this.context.restore();


            //
            // Draw the undulating labels that follow
            // the line up and down
            //
            this.drawAngledLabels();

            // Draw something off canvas to skirt an annoying bug
            this.context.beginPath();
            this.context.arc(this.canvas.width + 50000, this.canvas.height + 50000, 2, 0, 6.38, 1);
        };








        //
        // This functions draws a tick mark on the line
        //
        this.drawTick = function (lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index, dataset)
        {
            // Reset the linedash setting for drawing the tickmarks
            //this.context.setLineDash([1,1]);
            this.context.setLineDash([]);

            // Allow for the tickmarksColor property
            if (properties.tickmarksColor) {
                color = properties.tickmarksColor;
            }

            // Various conditions mean no tick
            if (this.hidden(dataset)) {
                return;
            } else if (RGraph.isNullish(yPos)) {
                return false;
            } else if ((yPos > (this.canvas.height - this.marginBottom)) && !properties.outofbounds) {
                return;
             } else if ((yPos < this.marginTop) && !properties.outofbounds) {
                return;
            }

            this.context.beginPath();
    
            var offset   = 0;
    
            // Reset the stroke and lineWidth back to the same as what they were when the line was drawn
            // UPDATE 28th July 2011 - the line width is now set to 1
            this.path(
                'lw % ss % fs %',
                properties.tickmarksLinewidth ? properties.tickmarksLinewidth : properties.linewidth,
                isShadow ? properties.shadowColor : color,
                isShadow ? properties.shadowColor : color
            );


            // Cicular tick marks
            if (   tickmarks == 'circle'
                || tickmarks == 'round'
                || tickmarks == 'filledcircle'
                || tickmarks == 'endcircle'
                || tickmarks === 'filledendcircle') {

                if (tickmarks == 'round'|| tickmarks == 'circle'|| tickmarks == 'filledcircle' || ((tickmarks == 'endcircle' || tickmarks === 'filledendcircle') && (index == 0 || index == (lineData.length - 1)))) {
                    this.path(
                        'b a % % % % % %',
                        xPos + offset,yPos + offset,properties.tickmarksSize,0,360 / (180 / RGraph.PI),false
                    );

                    if (tickmarks.indexOf('filled') !== -1) {
                        this.path(
                            'fs %',
                            isShadow ? properties.shadowColor : color
                        );

                    } else {

                        this.path(
                            'fs %',
                            isShadow ? properties.shadowColor : 'white'
                        );
                    }

                    this.context.fill();
                    this.context.stroke();
                }
    
            // Halfheight "Line" style tick marks
            } else if (tickmarks == 'halftick') {
                this.path(
                    'b m % % l % % s null',
                    Math.round(xPos), yPos,
                    Math.round(xPos), yPos + properties.tickmarksSize
                );
            
            // Tick style tickmarks
            } else if (tickmarks == 'tick') {
                this.path(
                    'b m % % l % % s',
                    Math.round(xPos), yPos -  properties.tickmarksSize,
                    Math.round(xPos), yPos + properties.tickmarksSize
                );
            
            // Endtick style tickmarks
            } else if (tickmarks == 'endtick' && (index == 0 || index == (lineData.length - 1))) {
                this.path(
                    'b m % % l % % s',
                    Math.round(xPos), yPos -  properties.tickmarksSize,
                    Math.round(xPos), yPos + properties.tickmarksSize
                );
            
            // "Cross" style tick marks
            } else if (tickmarks == 'cross') {
                
                var ticksize = properties.tickmarksSize;

                this.path(
                    'b m % % l % % m % % l % % s %',
                    xPos - ticksize, yPos - ticksize,
                    xPos + ticksize, yPos + ticksize,
                    xPos + ticksize, yPos - ticksize,
                    xPos - ticksize, yPos + ticksize,
                    color
                );
    
    
            // Triangle style tick marks
            } else if (tickmarks == 'triangle' || tickmarks == 'filledtriangle' || (tickmarks == 'endtriangle' && (index == 0 || index == (lineData.length - 1)))) {
                
                this.path(
                    'b m % % l % % l % % c f % s null',
                    Math.round(xPos - properties.tickmarksSize), yPos + properties.tickmarksSize,
                    Math.round(xPos), yPos - properties.tickmarksSize,
                    Math.round(xPos + properties.tickmarksSize), yPos + properties.tickmarksSize,
                    tickmarks === 'filledtriangle' ? (isShadow ? properties.shadowColor : this.context.strokeStyle) : 'white'
                );
    
    
            // 
            // A white bordered circle
            //
            } else if (tickmarks == 'borderedcircle' || tickmarks == 'dot') {

                this.path(
                    'lw % b a % % % % % false c f % s %',
                    properties.tickmarksStyleDotLinewidth || 0.00000001,
                    xPos, yPos, properties.tickmarksSize, 0, 360 / (180 / RGraph.PI),
                    properties.tickmarksStyleDotFill || color,
                    properties.tickmarksStyleDotStroke || color
                );
            
            } else if (   tickmarks == 'square'
                       || tickmarks == 'rect'
                       || tickmarks == 'filledsquare'
                       || (tickmarks == 'endsquare' && (index == 0 || index == (lineData.length - 1)))
                       || (tickmarks == 'filledendsquare' && (index == 0 || index == (lineData.length - 1))) ) {

                this.path(
                    'b r % % % % f % s %',
                    Math.round(xPos - properties.tickmarksSize),
                    Math.round(yPos - properties.tickmarksSize),
                    properties.tickmarksSize * 2,
                    properties.tickmarksSize * 2,
                    'white',
                    this.context.strokeStyle
                );

                // Fillrect
                if (tickmarks == 'filledsquare' || tickmarks == 'filledendsquare') {
                
                    this.path(
                        'b r % % % % f %',
                        Math.round(xPos - properties.tickmarksSize),
                        Math.round(yPos - properties.tickmarksSize),
                        properties.tickmarksSize * 2,
                        properties.tickmarksSize * 2,
                        isShadow ? properties.shadowColor : this.context.strokeStyle
                    );
                }
                
                this.path('f null s null');






            //
            // Diamond style tickmarks
            //
            } else if (
                   tickmarks === 'diamond'
                || tickmarks === 'filleddiamond'
                || (tickmarks === 'enddiamond'  && (index == 0 || index == (lineData.length - 1)))
                || (tickmarks === 'filledenddiamond' && (index == 0 || index == (lineData.length - 1)))
            ) {

                this.path(
                    'b m % % l % % l % % l % % c f % s',
                    xPos - properties.tickmarksSize,
                    yPos,
                    xPos,
                    yPos - properties.tickmarksSize,
                    xPos + properties.tickmarksSize,
                    yPos,
                    xPos,
                    yPos + properties.tickmarksSize,
                    tickmarks.substr(0, 6) === 'filled' ? (isShadow ? properties.shadowColor : this.context.strokeStyle) : 'white'
                );





            //
            // Filled arrowhead
            //
            } else if (tickmarks == 'filledarrow') {


                // If the spline option is enabled then update the
                // variables that are used to calculate the arrow
                if (properties.spline) {
                    xPos = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 1][0];
                    yPos = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 1][1];
                    
                    prevX = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 3][0];
                    prevY = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 3][1];
                }


                var x = Math.abs(xPos - prevX);
                var y = Math.abs(yPos - prevY);
    
                if (yPos < prevY) {
                    var a = Math.atan(x / y) + 1.57;
                } else {
                    var a = Math.atan(y / x) + 3.14;
                }

                this.path(
                    'b lj miter m % % a % % % % % false a % % % % % false c s % f %',
                    xPos, yPos,
                    xPos, yPos, properties.tickmarksSize, a - 0.3, a - 0.3,
                    xPos, yPos, properties.tickmarksSize, a + 0.3, a + 0.3,
                    this.context.strokeStyle,
                    this.context.fillStyle
                );

            //
            // Arrow head, NOT filled
            //
            } else if (tickmarks === 'arrow') {


                // If the spline option is enabled then update the
                // variables that are used to calculate the arrow
                if (properties.spline) {
                    xPos = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 1][0];
                    yPos = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 1][1];
                    
                    prevX = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 2][0];
                    prevY = this.coordsSpline[dataset][this.coordsSpline[dataset].length - 2][1];
                }


                var orig_linewidth = this.context.lineWidth;
    
                var x = Math.abs(xPos - prevX);
                var y = Math.abs(yPos - prevY);
                
                this.context.lineWidth;
    
                if (yPos < prevY) {
                    var a = Math.atan(x / y) + 1.57;
                } else {
                    var a = Math.atan(y / x) + 3.14;
                }
                
                this.path(
                    'b lj miter m % % a % % % % % false m % % a % % % % % false s % lw %',
                    xPos, yPos,
                    xPos, yPos, properties.tickmarksSize, a - 0.3, a - 0.3,
                    xPos, yPos,
                    xPos, yPos, properties.tickmarksSize, a + 0.3, a + 0.3,
                    this.context.strokeStyle,
                    orig_linewidth
                );

            //
            // Image based tickmark
            //
            // lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index
            } else if (
                       typeof tickmarks === 'string' &&
                           (
                            tickmarks.substr(0, 6) === 'image:'  ||
                            tickmarks.substr(0, 5) === 'data:'   ||
                            tickmarks.substr(0, 1) === '/'       ||
                            tickmarks.substr(0, 3) === '../'     ||
                            tickmarks.substr(0, 7) === 'images/' ||
                            tickmarks.substr(0, 4) === 'src:'
                           )
                      ) {

                var img = new Image();
                
                if (tickmarks.substr(0, 6) === 'image:') {
                    img.src = tickmarks.substr(6);
                } else if (tickmarks.substr(0, 4) === 'src:') {
                    img.src = tickmarks.substr(4);
                } else {
                    img.src = tickmarks;
                }

                var obj = this;

                img.onload = function ()
                {
                    if (properties.tickmarksStyleImageHalign === 'center') xPos -= (this.width / 2);
                    if (properties.tickmarksStyleImageHalign === 'right')  xPos -= this.width;
                    
                    if (properties.tickmarksStyleImageValign === 'center') yPos -= (this.height / 2);
                    if (properties.tickmarksStyleImageValign === 'bottom') yPos -= this.height;
                    
                    xPos += properties.tickmarksStyleImageOffsetx;
                    yPos += properties.tickmarksStyleImageOffsety;

                    obj.context.drawImage(this, xPos, yPos);
                };


            //
            // Custom tick drawing function
            //
            } else if (typeof tickmarks == 'function') {
                tickmarks(
                    this,
                    lineData, lineData[index],
                    index,
                    xPos, yPos,
                    color,
                    prevX, prevY
                );
            }
        };








        //
        // Draws a filled range if necessary
        //
        this.drawRange = function ()
        {
            //
            // Fill the range if necessary
            //
            if (properties.filledRange && properties.filled) {
            
                if (RGraph.isNullish(properties.filledRangeThreshold)) {
                    properties.filledRangeThreshold        = this.ymin
                    properties.filledRangeThresholdColors = [properties.filledColors, properties.filledColors]
                }
    
                for (var idx=0; idx<2; ++idx) {
    
                    var threshold_colors = properties.filledRangeThresholdColors;
                    var y = this.getYCoord(properties.filledRangeThreshold)
                    
                    this.context.save();
                        if (idx == 0) {
                            this.context.beginPath();
                            this.context.rect(0,0,this.canvas.width,y);
                            this.context.clip();
                        
                        } else {
    
                            this.context.beginPath();
                            this.context.rect(0,y,this.canvas.width, this.canvas.height);
                            this.context.clip();
                        }
    
                        this.context.beginPath();
                            this.context.fillStyle = (idx == 1 ? properties.filledRangeThresholdColors[1] : properties.filledRangeThresholdColors[0]);

                            this.context.lineWidth = !this.hidden(idx) ? 1 : 0;
                            var len = (this.coords.length / 2);
                
                            
                            
                            for (var i=0; i<len; ++i) {
                                if (!RGraph.isNullish(this.coords[i][1])) {
                                    if (i == 0) {
                                        this.context.moveTo(this.coords[i][0], this.coords[i][1])
                                    } else {
                                        this.context.lineTo(this.coords[i][0], this.coords[i][1])
                                    }
                                }
                            }
    
    
                            for (var i=this.coords.length - 1; i>=len; --i) {
                                if (RGraph.isNullish(this.coords[i][1])) {
                                    this.context.moveTo(this.coords[i][0], this.coords[i][1])
                                } else {
                                    this.context.lineTo(this.coords[i][0], this.coords[i][1])
                                }
                                //this.context.lineTo(this.coords[i][0], this.coords[i][1])
                            }
    
    
    
                        // Taken out - 10th Oct 2012
                        //this.context.stroke();
            
                        this.context.fill();
                    this.context.restore();
                }
            }
        };








        //
        // Redraws the line with the correct line width etc
        // 
        // @param array coords The coordinates of the line
        //
        this.redrawLine = function (coords, color, linewidth, index)
        {
            if (!properties.redraw || properties.filledRange) {
                return;
            }
    

            
            this.context.strokeStyle = (typeof color == 'object' && color && color.toString().indexOf('CanvasGradient') == -1 ? color[0] : color);
            this.context.lineWidth = linewidth;


            // Added this on 1/1/17 to facilitate dotted and dashed lines
            if (properties.dotted || properties.dashed ) {
                if (properties.dashed) {
                    this.context.setLineDash([2,6])
                } else if (properties.dotted) {
                    this.context.setLineDash([1,5])
                }
            }



            if (this.hidden(index)) {
                this.context.strokeStyle = 'rgba(0,0,0,0)';
            }








            if (properties.spline) {
                this.drawCurvyLine(coords, this.hidden(index) ? 'rgba(0,0,0,0)' : color, linewidth, index);
                return;
            }

            this.setLinejoin({index: index});
            this.setLinecap({index: index});

            this.context.beginPath();
    
            var len    = coords.length;
            var width  = this.canvas.width
            var height = this.canvas.height;
            var penUp  = false;
    
            for (var i=0; i<len; ++i) {
    
                var xPos   = coords[i][0];
                var yPos   = coords[i][1];
    
                if (i > 0) {
                    var prevX = coords[i - 1][0];
                    var prevY = coords[i - 1][1];
                }
    
    
                if ((
                       (i == 0 && coords[i])
                    || (yPos < this.marginTop)
                    || (prevY < this.marginTop)
                    || (yPos > (height - this.marginBottom))
                    || (i > 0 && prevX > (width - this.marginRight))
                    || (i > 0 && prevY > (height - this.marginBottom))
                    || prevY == null
                    || penUp == true
                   ) && (!properties.outofbounds || yPos == null || prevY == null) ) {

                    if (RGraph.ISOLD && yPos == null) {
                        // ...?
                    } else {
                        this.context.moveTo(coords[i][0], coords[i][1]);
                    }
    
                    penUp = false;
    
                } else {
    
                    if (properties.stepped && i > 0) {
                        this.context.lineTo(coords[i][0], coords[i - 1][1]);
                    }
                    
                    // Don't draw the last bit of a stepped chart. Now DO
                    //if (!this.properties.stepped || i < (coords.length - 1)) {
                    this.context.lineTo(coords[i][0], coords[i][1]);
                    //}
                    penUp = false;
                }
            }

            //
            // If two colors are specified instead of one, go over the up bits
            //
            if ( properties.colorsAlternate && typeof color == 'object' && color[0] && color[1]) {
                for (var i=1; i<len; ++i) {
    
                    var prevX = coords[i - 1][0];
                    var prevY = coords[i - 1][1];
                    
                    if (prevY != null && coords[i][1] != null) {
                        this.context.beginPath();
                            this.context.strokeStyle = color[coords[i][1] < prevY ? 0 : 1];
                            this.context.lineWidth = properties.linewidth;
                            this.context.moveTo(prevX, prevY);
                            this.context.lineTo(coords[i][0], coords[i][1]);
                        this.context.stroke();
                    }
                }
            }
            


            // Added the stroke and beginPath in on 5/1/19 as dotted/dashed
            // wasn't working correctly.
            //
            this.context.stroke();
            this.context.beginPath();            
            if (properties.dashed || properties.dotted) {
                //this.context.setLineDash([1,0]);
                this.context.setLineDash([]);
            }
        };








        //
        // Draw the backdrop
        //
        this.drawBackdrop = function (coords, color)
        {
            var size = properties.backdropSize;
            
            this.path(
                'lw % ga % ss %',
                size, properties.backdropAlpha, color
            );

            var yCoords = [];
    
            this.context.beginPath();
                if (properties.spline) {
                    
                    // The DrawSpline function only takes the Y coords so extract them from the coords that have
                    // (which are X/Y pairs)
                    for (var i=0; i<coords.length; ++i) {
                        yCoords.push(coords[i][1])
                    }

                    this.drawSpline(this.context, yCoords, color, null);
    
                } else {
                    this.context.moveTo(coords[0][0], coords[0][1]);
                    for (var j=1; j<coords.length; ++j) {
                        if (
                            RGraph.isNullish(coords[j][1])
                            || (coords[j - 1] && RGraph.isNullish(coords[j-1][1]))
                           ) {
                            this.context.moveTo(coords[j][0], coords[j][1]);
                        } else {
                            this.context.lineTo(coords[j][0], coords[j][1]);
                        }
                    }
                }
            this.context.stroke();
        
            // Reset the alpha value
            this.context.globalAlpha = 1;
            RGraph.noShadow(this);
        };








        //
        // Returns the linewidth
        //
        this.getLineWidth = function (i)
        {
            var linewidth = properties.linewidth;

            if (typeof linewidth == 'number') {
                return linewidth;
            
            } else if (typeof linewidth === 'object') {
                if (linewidth[i]) {
                    return linewidth[i];
                } else {
                    return linewidth[0];
                }
    
                alert('[LINE] Error! The linewidth option should be a single number or an array of one or more numbers');
            }
        };








        //
        // The getShape() method - used to get the point the mouse is currently over, if any
        // 
        // @param object e The event object
        // @param object   OPTIONAL You can pass in the bar object instead of the
        //                          function getting it from the canvas
        //
        this.getShape = function (e)
        {
            var obj     = this,
                mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];
            
            // This facilitates you being able to pass in the bar object as a parameter instead of
            // the function getting it from the object
            if (arguments[1]) {
                obj = arguments[1];
            }

            for (var i=0; i<obj.coords.length; ++i) {

                if (RGraph.tooltipsHotspotIgnore(this, i)) {
                    continue;
                }

                var x = obj.coords[i][0],
                    y = obj.coords[i][1],
              dataset = 0,
                  idx = i;

                while ((idx + 1) > this.data[dataset].length) {
                    idx -= this.data[dataset].length;
                    dataset++;
                }

                // Do this if the hotspot is triggered by the X coord AND the Y coord
                if (   mouseX <= (x + properties.tooltipsHotspotSize)
                    && mouseX >= (x - properties.tooltipsHotspotSize)
                    && mouseY <= (y + properties.tooltipsHotspotSize)
                    && mouseY >= (y - properties.tooltipsHotspotSize)
                    && (this.properties.clip ? RGraph.clipTo.test(this, mouseX, mouseY) : true)
                   ) {
    
                        if (RGraph.parseTooltipText) {
                            var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
                        }

                        // Don't return points for hidden datasets
                        // Added 10/08/17
                        // Fixed 22/09/17 Thanks to zsolt - this should be a continue
                        // not a return.
                        if (this.hidden(dataset)) {
                            continue;
                        }

                        return {
                            object: obj,
                                 x: x,
                                 y: y,
                           dataset: dataset,
                             index: idx,
                   sequentialIndex: i,
                             label:  properties.xaxisLabels && typeof  properties.xaxisLabels[idx] === 'string' ?  properties.xaxisLabels[idx] : null,
                           tooltip: typeof tooltip === 'string' ? tooltip : null
                        };
    
                } else if (    properties.tooltipsHotspotXonly == true
                            && mouseX <= (x + properties.tooltipsHotspotSize)
                            && mouseX >= (x - properties.tooltipsHotspotSize)) {
    
                            var tooltip = RGraph.parseTooltipText(properties.tooltips, i);
    
                            return {
                                object: obj,
                                     x: x,
                                     y: y,
                               dataset: dataset,
                                 index: idx,
                       sequentialIndex: i,
                                 label:  properties.xaxisLabels && typeof  properties.xaxisLabels[idx] === 'string' ?  properties.xaxisLabels[idx] : null,
                               tooltip: tooltip
                            };
                }
            }
        };








        //
        // The getShapeByX() method - used to get the point the mouse is currently over, if any
        // but it ONLY considers the X coordinate - not the Y
        // 
        // @param object e The event object
        // @param object   OPTIONAL You can pass in the bar object instead of the
        //                          function getting it from the canvas
        //
        this.getShapeByX = function (e)
        {
            var obj     = this,
                mouseXY = RGraph.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];
            
            // This facilitates you being able to pass in the bar object as a parameter instead of
            // the function getting it from the object
            if (arguments[1]) {
                obj = arguments[1];
            }

            for (var i=0; i<obj.coords.length; ++i) {
            
                var x = obj.coords[i][0],
                    y = obj.coords[i][1],
              dataset = 0,
                  idx = i;

                while ((idx + 1) > this.data[dataset].length) {
                    idx -= this.data[dataset].length;
                    dataset++;
                }

                if (mouseX <= (x + properties.tooltipsHotspotSize) && mouseX >= (x - properties.tooltipsHotspotSize)) {
        
                            return {
                                object: obj,
                                     x: x,
                                     y: y,
                               dataset: dataset,
                                 index: idx,
                       sequentialIndex: i,
                                 label:  properties.xaxisLabels && typeof  properties.xaxisLabels[idx] === 'string' ?  properties.xaxisLabels[idx] : null
                            };
                }
            }
        };








        //
        // Draws the above line labels
        //
        this.drawAboveLabels = function ()
        {
            var units_pre  = properties.labelsAboveUnitsPre,
                units_post = properties.labelsAboveUnitsPost,
                decimals   = properties.labelsAboveDecimals,
                point      = properties.labelsAbovePoint,
                thousand   = properties.labelsAboveThousand,
                bgcolor    = properties.labelsAboveBackground || 'white',
                border     = ((
                       typeof properties.labelsAboveBorder === 'boolean'
                    || typeof properties.labelsAboveBorder === 'number'
                ) ? properties.labelsAboveBorder : true),
                offsety    = properties.labelsAboveOffsety,
                specific   = properties.labelsAboveSpecific,
                formatter  = properties.labelsAboveFormatter,
                data_arr = RGraph.arrayLinearize(this.original_data);;


                var textConf = RGraph.getTextConf({
                    object: this,
                    prefix: 'labelsAbove'
                });
                
                offsety -= textConf.size;



            // Use this to 'reset' the drawing state
            this.context.beginPath();
    
            // Don't need to check that chart.labels.above is enabled here, it's been done already
            for (var i=0, len=this.coords.length; i<len; i+=1) {

                var indexes = RGraph.sequentialIndexToGrouped (i, this.data),
                    dataset = indexes[0],
                    index   = indexes[1],
                    coords  = this.coords[i];
                
                // Don't draw a label for null values
                if (RGraph.isNullish(coords[1])) {
                    continue;
                }
                
                if (this.hidden(dataset)) {
                    continue;
                }

                RGraph.text({
                
               object: this,
            
                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:              coords[0] + properties.labelsAboveOffsetx,
                    y:              coords[1] + offsety,

                    text:           (specific && specific[i]) ? specific[i] : (specific ? '' : RGraph.numberFormat({
                                        object:    this,
                                        number:    typeof decimals === 'number' ? data_arr[i].toFixed(decimals) : data_arr[i],
                                        value:     typeof decimals === 'number' ? data_arr[i].toFixed(decimals) : data_arr[i],
                                        unitspre:  units_pre,
                                        unitspost: units_post,
                                        point:     point,
                                        thousand:  thousand,
                                        formatter: formatter,
                                        index:     index,
                                        dataset:   dataset
                                    })),

                    valign:         'center',
                    halign:         'center',

                    bounding:       true,
                    boundingFill:   bgcolor,
                    boundingStroke: border ? 'black' : 'rgba(0,0,0,0)',
                    tag:            'labels.above'
                });
            }
        };








        //
        // Draw a curvy line.
        //
        this.drawCurvyLine = function (coords, color, linewidth, index)
        {
            var yCoords = [];
    
            for (var i=0; i<coords.length; ++i) {
                yCoords.push(coords[i][1]);
            }
            
            if (properties.filled) {
                this.context.beginPath();
                    
                    var xaxisY = this.getYCoord( properties.yaxisScaleMin);



                    this.context.moveTo(coords[0][0],xaxisY);
                    this.drawSpline(this.context, yCoords, color, index);

                    if (properties.filledAccumulative && index > 0) {
                        for (var i=(this.coordsSpline[index - 1].length - 1); i>=0; i-=1) {
                            this.context.lineTo(this.coordsSpline[index - 1][i][0], this.coordsSpline[index - 1][i][1]);
                        }
                    } else {
                        this.context.lineTo(coords[coords.length - 1][0],xaxisY);
                    }
                this.context.fill();
            }

            this.context.beginPath();    
            this.drawSpline(this.context, yCoords, color, index);
            this.context.stroke();
        };








        //
        // When you click on the chart, this method can return the Y value at that point. It works for any point on the
        // chart (that is inside the gutters) - not just points on the Line.
        // 
        // @param object e The event object
        //
        this.getValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RGraph.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }
    
            var obj = this;
            var xaxispos =  properties.xaxisPosition;
    
            if (mouseY <  properties.marginTop) {
                return xaxispos == 'bottom' || xaxispos == 'center' ? this.max : this.min;
            } else if (mouseY > (this.canvas.height -  properties.marginBottom)) {
                return xaxispos == 'bottom' ? this.min : this.max;
            }

            if ( properties.xaxisPosition == 'center') {
                var value = (( (obj.grapharea / 2) - (mouseY -  properties.marginTop)) / obj.grapharea) * (obj.max - obj.min);
                value *= 2;
                value > 0 ? value += this.min : value -= this.min;
                return value;
            } else if ( properties.xaxisPosition == 'top') {
                var value = ((obj.grapharea - (mouseY -  properties.marginTop)) / obj.grapharea) * (obj.max - obj.min);
                value = Math.abs(obj.max - value) * -1;
                return value;
            } else {
                var value = ((obj.grapharea - (mouseY -  properties.marginTop)) / obj.grapharea) * (obj.max - obj.min)
                value += obj.min;
                return value;
            }
        };








        //
        // Each object type has its own Highlight() function which highlights the appropriate shape
        // 
        // @param object shape The shape to highlight
        //
        this.highlight = function (shape)
        {
            if (properties.tooltipsHighlight) {
                
                if (typeof properties.highlightStyle === 'function') {
                    (properties.highlightStyle)(shape);
                
                // Inverted highlighting
                } else if (properties.highlightStyle === 'invert') {

                    // Clip to the graph area
                    this.path(
                        'sa b r % % % % cl',
                         properties.marginLeft,  properties.marginTop,
                        this.canvas.width -  properties.marginLeft -  properties.marginRight,
                        this.canvas.height -  properties.marginTop -  properties.marginBottom 
                    );

                    this.path(
                        'b m % % a % % 25 4.71 4.72 true l % % l % % l % % l % % l % % c f %',
                        shape.x,  properties.marginTop,
                        shape.x, shape.y,
                        shape.x,  properties.marginTop,
                        this.canvas.width -  properties.marginRight,  properties.marginTop,
                        this.canvas.width -  properties.marginRight, this.canvas.height -  properties.marginBottom,
                         properties.marginLeft, this.canvas.height -  properties.marginBottom,
                         properties.marginLeft,  properties.marginTop,
                        properties.highlightFill
                    );

                    // Draw a border around the circular cutout
                    this.path(
                        'b a % % 25 0 6.29 false s % rs',
                        shape.x, shape.y,
                        properties.highlightStroke
                    );

                // Halo style highlighting
                } else if (properties.highlightStyle === 'halo') {
                    
                    var obj   = shape.object,
                        color =  properties.colors[shape.dataset];

                    // Clear a space in white first for the tickmark
                    obj.path(
                        'b a % % 13 0 6.2830 false f rgba(255,255,255,0.75)',
                        shape.x,
                        shape.y
                    );
                    
                    obj.path(
                        'ga 0.15 b a % % 13 0 6.2830 false f % ga 1',
                        shape.x,
                        shape.y,
                        color
                    );
            
                    obj.path(
                        'b a % % 7 0 6.2830 false f white',
                        shape.x,
                        shape.y
                    );
                    
                    obj.path(
                        'b a % % 5 0 6.2830 false f %',
                        shape.x,
                        shape.y,
                        color
                    );
                
                } else {
                    this.context.lineWidth = 1;
                    RGraph.Highlight.point(this, shape);
                }
            }
        };








        //
        // The getObjectByXY() worker method. Don't call this call:
        // 
        // RGraph.ObjectRegistry.getObjectByXY(e)
        // 
        // @param object e The event object
        //
        this.getObjectByXY = function (e)
        {
            var mouseXY = RGraph.getMouseXY(e);
    
            // The 5 is so that the cursor doesn't have to be over the graphArea to trigger the hotspot
            if (
                   (mouseXY[0] >  properties.marginLeft - 5)
                && mouseXY[0] < (this.canvas.width -  properties.marginRight + 5)
                && mouseXY[1] > ( properties.marginTop - 5)
                && mouseXY[1] < (this.canvas.height -  properties.marginBottom + 5)
                ) {
    
                return this;
            }
        };








        //
        // This method handles the adjusting calculation for when the mouse is moved
        // 
        // @param object e The event object
        //
        this.adjusting_mousemove = function (e)
        {
            //
            // Handle adjusting for the Bar
            //
            if (properties.adjustable && RGraph.Registry.get('adjusting') && RGraph.Registry.get('adjusting').uid == this.uid) {
    
                // Rounding the value to the given number of decimals make the chart step
                var value   = Number(this.getValue(e));
                var shape   = RGraph.Registry.get('adjusting.shape');
    
                if (shape) {
    
                    RGraph.Registry.set('adjusting.shape', shape);
    
                    this.original_data[shape.dataset][shape.index] = Number(value);
    
                    RGraph.redrawCanvas(e.target);
                    
                    RGraph.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        //
        // This function can be used when the canvas is clicked on (or similar - depending on the event)
        // to retrieve the relevant Y coordinate for a particular value.
        // 
        // @param int value The value to get the Y coordinate for
        //
        this.getYCoord = function (value)
        {
            if (arguments[1] === true) {
                var allowOutOfBounds = true;
            }

            if (typeof value != 'number') {
                return null;
            }
    
            var y;
            var xaxispos =  properties.xaxisPosition;
    
            if (xaxispos == 'top') {
            
                // Account for negative numbers
                //if (value < 0) {
                //    value = Math.abs(value);
                //}
    
                y = ((value - this.min) / (this.max - this.min)) * this.grapharea;
    
                // Inverted Y labels
                if ( properties.yaxisScaleInvert) {
                    y = this.grapharea - y;
                }
    
                y = y + this.marginTop
    
            } else if (xaxispos == 'center') {
    
                y = ((value - this.min) / (this.max - this.min)) * (this.grapharea / 2);
                y = (this.grapharea / 2) - y;
                y += this.marginTop;
    
            } else {

                if (!allowOutOfBounds && ((value < this.min || value > this.max) && properties.outofbounds == false) ) {
                    return null;
                }
    
                y = ((value - this.min) / (this.max - this.min)) * this.grapharea;
    
    

                // Inverted Y labels
                if ( properties.yaxisScaleInvert) {
                    y = this.grapharea - y;
                }
                
                y = this.canvas.height - this.marginBottom - y;
            }

            return y;
        };








        //
        // This function draws a curvy line
        // 
        // @param object context The  2D context
        // @param array  coords  The coordinates
        //
        this.drawSpline = function (context, coords, color, index)
        {
            this.coordsSpline[index] = [];
            var xCoords     = [];
            var marginLeft  =  properties.marginLeft;
            var marginRight =  properties.marginRight;
            var hmargin     =  properties.marginInner;
            var interval    = (this.canvas.width - (marginLeft + marginRight) - (2 * hmargin)) / (coords.length - 1);
    
            this.context.strokeStyle = color;

            //
            // The drawSpline function takes an array of JUST Y
            // coords - not X/Y coords. So the line coords need
            // converting if we've been given X/Y pairs
            //
            for (var i=0,len=coords.length; i<len;i+=1) {
                if (typeof coords[i] == 'object' && coords[i] && coords[i].length == 2) {
                    coords[i] = Number(coords[i][1]);
                }
            }




            //
            // Get the Points array in the format we want - first
            // value should be null along with the lst value
            //
            var P = [coords[0]];
            for (var i=0; i<coords.length; ++i) {
                P.push(coords[i]);
            }
            P.push(coords[coords.length - 1] + (coords[coords.length - 1] - coords[coords.length - 2]));
    
            for (var j=1; j<P.length-2; ++j) {
                for (var t=0; t<10; ++t) {
                    
                    var yCoord = Spline( t/10, P[j-1], P[j], P[j+1], P[j+2] );
    
                    xCoords.push(((j-1) * interval) + (t * (interval / 10)) + marginLeft + hmargin);

                    this.context.lineTo(xCoords[xCoords.length - 1], yCoord);

                    
                    if (typeof index == 'number') {
                        this.coordsSpline[index].push(
                            [xCoords[xCoords.length - 1],
                            yCoord]
                        );
                    }
                }
            }


            // Draw the last section
            this.context.lineTo(((j-1) * interval) + marginLeft + hmargin, P[j]);
            if (typeof index == 'number') {
                this.coordsSpline[index].push([((j-1) * interval) + marginLeft + hmargin, P[j]]);
            }


    
            function Spline (t, P0, P1, P2, P3)
            {
                return 0.5 * ((2 * P1) +
                             ((0-P0) + P2) * t +
                             ((2*P0 - (5*P1) + (4*P2) - P3) * (t*t) +
                             ((0-P0) + (3*P1)- (3*P2) + P3) * (t*t*t)));
            }
        };








        //
        // This allows for easy specification of gradients
        //
        this.parseColors = function ()
        {
            // This is necessary for some reason
            //var properties = this.properties;

            // Save the original colors so that they can be 
            // restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors.colors                = RGraph.arrayClone(properties.colors);
                this.original_colors.fillledColors         = RGraph.arrayClone(properties.filledColors);
                this.original_colors.keyColors             = RGraph.arrayClone(properties.keyColors);
                this.original_colors.backgroundHbars       = RGraph.arrayClone(properties.backgroundHbars);
                this.original_colors.backgroundBarsColor1  = properties.backgroundBarsColor1;
                this.original_colors.backgroundBarsColor2  = properties.backgroundBarsColor2;
                this.original_colors.backgroundGridColor   = properties.backgroundGridColor;
                this.original_colors.backgroundColor       = properties.backgroundColor;
                this.original_colors.textColor             = properties.textColor;
                this.original_colors.crosshairsColor       = properties.crosshairsColor;
                this.original_colors.annotatableColor      = properties.annotatableColor;
                this.original_colors.titleColor            = properties.titleColor;
                this.original_colors.xaxisTitleColor       = properties.xaxisTitleColor;
                this.original_colors.yaxisTitleColor       = properties.yaxisTitleColor;
                this.original_colors.keyBackground         = properties.keyBackground;
                this.original_colors.axesColor             = properties.axesColor;
                this.original_colors.highlightFill         = properties.highlightFill;
            }
            
            
            
            for (var i=0; i<properties.colors.length; ++i) {
                if (typeof  properties.colors[i] == 'object' &&  properties.colors[i][0] &&  properties.colors[i][1]) {
                     properties.colors[i][0] = this.parseSingleColorForGradient( properties.colors[i][0]);
                     properties.colors[i][1] = this.parseSingleColorForGradient( properties.colors[i][1]);
                } else {
                     properties.colors[i] = this.parseSingleColorForGradient( properties.colors[i]);
                }
            }
            
            //
            // Filled.colors
            //
            if (properties.filledColors) {
                if (typeof properties.filledColors == 'string') {
                    properties.filledColors = this.parseSingleColorForGradient(properties.filledColors, 'vertical');
                } else {
                    for (var i=0; i<properties.filledColors.length; ++i) {
                        properties.filledColors[i] = this.parseSingleColorForGradient(properties.filledColors[i], 'vertical');
                    }
                }
            }
            
            //
            // Key colors
            //
            if (!RGraph.isNullish(properties.keyColors)) {
                for (var i=0; i<properties.keyColors.length; ++i) {
                    properties.keyColors[i] = this.parseSingleColorForGradient(properties.keyColors[i]);
                }
            }

            //
            // Background horizontal bars colors
            //
            if (!RGraph.isNullish(properties.backgroundHbars)) {
                for (var i=0; i<properties.backgroundHbars.length; ++i) {
                    properties.backgroundHbars[i][2] = this.parseSingleColorForGradient(properties.backgroundHbars[i][2]);
                }
            }
    
            //
            // Parse various properties for colors
            //
            var props = [
                'backgroundBarsColor1',
                'backgroundBarsColor2',
                'backgroundGridColor',
                'backgroundColor',
                'crosshairsColor',
                'annotatableColor',
                'textColor',
                'titleColor',
                'xaxisTitleColor',
                'yaxisTitleColor',
                'keyBackground',
                'axesColor',
                'highlightFill'
            ];
    
            for (var i=0; i<props.length; ++i) {
                properties[props[i]] = this.parseSingleColorForGradient(properties[props[i]]);
            }
        };








        //
        // Use this function to reset the object to the post-constructor state. Eg reset colors if
        // need be etc
        //
        this.reset = function ()
        {
        };








        //
        // This parses a single color value
        //
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof color != 'string') {
                return color;
            }

            //
            // Horizontal or vertical gradient
            //
            var dir = typeof arguments[1] == 'string' ? arguments[1] : 'vertical';
    
            if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RGraph.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                if (dir == 'horizontal') {
                    var grad = this.context.createLinearGradient(0,0,this.canvas.width,0);
                } else {
                    var grad = this.context.createLinearGradient(0,this.canvas.height -  properties.marginBottom,0, properties.marginTop);
                }
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RGraph.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(
                        j * diff,
                        RGraph.trim(parts[j])
                    );
                }
            }
    
            return grad ? grad : color;
        };








        //
        // Sets the appropriate shadow
        //
        this.setShadow = function (i)
        {    
            if (properties.shadow) {
                //
                // Handle the appropriate shadow color. This now facilitates an array of differing
                // shadow colors
                //
                var shadowColor = properties.shadowColor;
        
                //
                // Accommodate an array of shadow colors as well as a single string
                //
                if (typeof shadowColor == 'object' && shadowColor[i - 1]) {
                    this.context.shadowColor = shadowColor[i];
    
                } else if (typeof shadowColor == 'object') {
                    this.context.shadowColor = shadowColor[0];
    
                } else if (typeof shadowColor == 'string') {
                    this.context.shadowColor = shadowColor;
                }
        
                this.context.shadowBlur    = properties.shadowBlur;
                this.context.shadowOffsetX = properties.shadowOffsetx;
                this.context.shadowOffsetY = properties.shadowOffsety;
            }
        };








        //
        // This function handles highlighting an entire data-series for the interactive
        // key
        // 
        // @param int index The index of the data series to be highlighted
        //
        this.interactiveKeyHighlight = function (index)
        {
            var coords = this.coords2[index];

            if (coords) {

                var pre_linewidth = this.context.lineWidth;
                var pre_linecap   = this.context.lineCap;
                
                this.context.lineWidth   = properties.linewidth + 10;
                this.context.lineCap     = 'round';
                this.context.strokeStyle = properties.keyInteractiveHighlightChartStroke;

                
                this.context.beginPath();
                if (properties.spline) {
                    this.drawSpline(this.context, coords, properties.keyInteractiveHighlightChart, null);
                } else {
                    for (var i=0,len=coords.length; i<len; i+=1) {
                        if (   i == 0
                            || RGraph.isNullish(coords[i][1])
                            || (typeof coords[i - 1][1] != undefined && RGraph.isNullish(coords[i - 1][1]))) {
                            this.context.moveTo(coords[i][0], coords[i][1]);
                        } else {
                            this.context.lineTo(coords[i][0], coords[i][1]);
                        }
                    }
                }
                this.context.stroke();
                
                // Reset the lineCap and lineWidth
                this.context.lineWidth = pre_linewidth;
                this.context.lineCap = pre_linecap;
            }
        };








        //
        // Using a function to add events makes it easier to facilitate method chaining
        // 
        // @param string   type The type of even to add
        // @param function func 
        //
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }


            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RGraph.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        //
        // This function runs once only
        // (put at the end of the file (before any effects))
        //
        this.firstDrawFunc = function ()
        {
        };








        //
        // Draws error-bars for the Bar and Line charts
        //
        this.drawErrorbars = function ()
        {
            // Save the state of the canvas so that it can be restored at the end
            this.context.save();

                RGraph.noShadow(this);

                var coords = this.coords,
                         x = 0,
                 errorbars = properties.errorbars,
                    length = 0;

                // If not capped set the width of the cap to zero
                if (!properties.errorbarsCapped) {
                    properties.errorbarsCappedWidth = 0.001;
                    halfwidth = 0.0005;
                }

                // Set the linewidth
                this.context.lineWidth = properties.errorbarsLinewidth;
    
    
    
    
                for (var i=0; i<coords.length; ++i) {
                
                    var halfwidth = properties.errorbarsCappedWidth / 2 || 5,
                            color = properties.errorbarsColor || 'black';

                    // Set the perbar linewidth if the fourth option in the array
                    // is specified
                    if (errorbars[i] && typeof errorbars[i][3] === 'number') {
                        this.context.lineWidth = errorbars[i][3];
                    } else if (typeof properties.errorbarsLinewidth === 'number') {
                        this.context.lineWidth = properties.errorbarsLinewidth;
                    } else {
                        this.context.lineWidth = 1;
                    }

    
    
                    // Calulate the pixel size
                    if (typeof errorbars === 'number' || typeof errorbars[i] === 'number') {

                        if (typeof errorbars === 'number') {
                            var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars),
                                negativeLength = positiveLength;
                        } else {
                            var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i]),
                                negativeLength = positiveLength;
                        }

                        if (positiveLength || negativeLength) {

                            this.path(
                                'lj miter lc square b m % % l % % m % % l % % l % % m % % l % % s %',
                                coords[i][0] - halfwidth,coords[i][1] + negativeLength,
                                coords[i][0] + halfwidth,coords[i][1] + negativeLength,
                                coords[i][0],coords[i][1] + negativeLength,
                                coords[i][0],coords[i][1] - positiveLength,
                                coords[i][0] - halfwidth,coords[i][1] - positiveLength,
                                coords[i][0],coords[i][1] - positiveLength,
                                coords[i][0] + halfwidth,coords[i][1] - positiveLength,
                                color
                            );

                            this.path(
                                'lj miter lc square b m % % l % % s %',
                                coords[i][0] - halfwidth,coords[i][1] + negativeLength,
                                coords[i][0] + halfwidth,coords[i][1] + negativeLength,
                                color
                            );
                        }



                    } else if (typeof errorbars[i] === 'object' && !RGraph.isNullish(errorbars[i])) {

                        var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i][0]),
                            negativeLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i][1]);


                        // Color
                        if (typeof errorbars[i][2] === 'string') {
                            color = errorbars[i][2];
                        }

                        // Cap width
                        halfwidth = typeof errorbars[i][4] === 'number' ? errorbars[i][4] / 2 : halfwidth;
    
    
                        // Set the linewidth
                        if (typeof errorbars[i] === 'object' && typeof errorbars[i][3] === 'number') {
                            this.context.lineWidth = errorbars[i][3];
                        } else if (typeof properties.errorbarsLinewidth === 'number') {
                            this.context.lineWidth = properties.errorbarsLinewidth;
                        } else {
                            this.context.lineWidth = 1;
                        }


                        if (!RGraph.isNullish(errorbars[i][0])) {

                            this.path(
                                'lc square b  m % % l % % l % % m % % l % % s %',
                                coords[i][0],coords[i][1],
                                coords[i][0],coords[i][1] - positiveLength,
                                coords[i][0] - halfwidth,Math.round(coords[i][1] - positiveLength),
                                coords[i][0],Math.round(coords[i][1] - positiveLength),
                                coords[i][0] + halfwidth,Math.round(coords[i][1] - positiveLength),
                                color
                            );
                        }
    
                        if (typeof errorbars[i][1] === 'number') {

                            var negativeLength = Math.abs(this.getYCoord(errorbars[i][1]) - this.getYCoord(0));
    
                            this.path(
                                'b m % % l % % l % % m % % l % % s %',
                                coords[i][0],coords[i][1],
                                coords[i][0],coords[i][1] + negativeLength,
                                coords[i][0] - halfwidth,Math.round(coords[i][1] + negativeLength),
                                coords[i][0],Math.round(coords[i][1] + negativeLength),
                                coords[i][0] + halfwidth,Math.round(coords[i][1] + negativeLength),
                                color
                            );
                        }
                    }
                }

            this.context.restore();
        };








        //
        // Hides a line by setting the appropriate flag so that the .visible(index)
        // function returns the relevant result.
        // 
        // @param int index The index of the line to hide
        //
        this.hide = function ()
        {
            // Hide a single line
            if (typeof arguments[0] === 'number') {
                properties.lineVisible[arguments[0]] = false;
            
            // Hide multiple lines
            } else if (typeof arguments[0] === 'object') {
                for (var i=0; i<arguments[0].length; ++i) {
                    properties.lineVisible[arguments[0][i]] = false;
                }
                
            // Hide all lines
            } else {
                for (var i=0; i<this.original_data.length; ++i) {
                    properties.lineVisible[i] = false;
                }
            }
            
            RGraph.redraw();
            
            // Facilitate chaining
            return this;
        };








        //
        // Shows a line by setting the appropriate flag so that the .visible(index)
        // function returns the relevant result.
        // 
        // @param int index The index of the line to show
        //
        this.show = function ()
        {
            // Show a single line
            if (typeof arguments[0] === 'number') {
                properties.lineVisible[arguments[0]] = true;
            
            // Show multiple lines
            } else if (typeof arguments[0] === 'object') {
                for (var i=0; i<arguments[0].length; ++i) {
                    properties.lineVisible[arguments[0][i]] = true;
                }

            // Show all lines
            } else {
                for (var i=0; i<this.original_data.length; ++i) {
                    properties.lineVisible[i] = true;
                }
            }
            
            RGraph.redraw();            
            
            // Facilitate chaining
            return this;
        };








        //
        // Returns true/false as to wether a line is hidden or not
        // 
        // @param int index The index of the line to hide
        //
        this.hidden = function (index)
        {
            return !properties.lineVisible[index];
        };








        //
        // Line chart grow effect
        // 
        // This effect gradually increases the magnitude of the
        // points on the Line chart
        // 
        // @param object     Options for the effect
        // @param function   An optional callback that is run when
        //                   the effect is finished
        //
        this.grow = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj      = this,
                callback = arguments[1] ? arguments[1] : function () {},
                opt      = arguments[0] ? arguments[0] : {},
                frames   = opt.frames ? opt.frames : 30,
                frame    = 0,
                data     = RGraph.arrayClone(this.unmodified_data);

                this.draw();
                var max = this.scale2.max;
                this.set('yaxisScaleMax', max);
                RGraph.clear(this.canvas);

            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                for (var i=0,len=data.length; i<len; ++i) {
                    for (var j=0,len2=data[i].length; j<len2; ++j) {
                        obj.original_data[i][j] = (frame / frames)  * data[i][j];
                    }
                }

                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (frame < frames) {
                    frame++;
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // Unfold animation effect
        // 
        // This effect gradually increases the X/Y coordinates
        // from 0
        //
        this.unfold = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj      = this,
                opt      = arguments[0] ? arguments[0] : {},
                frames   = opt.frames ? opt.frames : 30,
                frame    = 0,
                callback = arguments[1] ? arguments[1] : function () {},
                initial  = properties.animationUnfoldInitial;
            
            properties.animationFactor = properties.animationUnfoldInitial;

            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                properties.animationFactor = ((1 - initial) * (frame / frames)) + initial;
    
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (frame < frames) {
                    frame++;
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }


            iterator();

            return this;
        };








        //
        // Trace
        // 
        // This is a new version of the Trace effect which no longer requires jQuery and is more compatible
        // with other effects (eg Expand). This new effect is considerably simpler and less code.
        // 
        // @param object     Options for the effect. Currently only "frames" is available.
        // @param int        A function that is called when the ffect is complete
        //
        this.trace = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj      = this,
                opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                callback = arguments[1] || function () {};

            obj.set('animationTraceClip', opt.reverse ? 1 : 0);
            
            // Disable the labelsAbove option
            if (obj.properties.labelsAbove) {
                obj.set('labelsAbove', false);
                var enableLabelsAbove = true;
            }
    
            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                RGraph.clear(obj.canvas);

                RGraph.redrawCanvas(obj.canvas);

                if (frame++ < frames) {
                    obj.set('animationTraceClip', opt.reverse ? (1 - (frame / frames)) : (frame / frames));
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    if (enableLabelsAbove) {
                        setTimeout(function ()
                        {
                            obj.set('labelsAbove', true);
                            RGraph.redraw();
                        }, 500);
                    }
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // A wave effect - like the Bar chart Wave effect
        //
        this.wave = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            // Reset the data to the original
            this.data = RGraph.arrayClone(this.original_data);

            this.draw();

            // If there's only one point call the grow function instead
            if (this.original_data[0].length === 1) {
                this.unfold(arguments[0]);
                return;
            }

            var obj = this,
                opt = arguments[0] || {},
                labelsAbove = this.get('labelsAbove');

            opt.frames      =  opt.frames || 60;
            opt.startFrames = [];
            opt.counters    = [];

            var framesperpoint = opt.frames / 3,
                frame          = -1,
                callback       = arguments[1] || function () {},
                original       = RGraph.arrayClone(this.unmodified_data);

            //
            // turn off the labelsAbove option whilst animating
            //
            this.set('labelsAbove', false);

            for (var dataset=0; dataset<original.length; ++dataset) {
                for (var i=0; i<original[dataset].length; ++i) {
                    opt.startFrames[i] = ((opt.frames / 2) / (original[0].length - 1)) * i;
                    opt.counters[i] = 0;
                    
                    if (!opt.reverse) {
                        this.original_data[dataset][i] = 0;
                    }
                }
            }
            
            if (opt.reverse) {
               opt.startFrames = RGraph.arrayReverse(opt.startFrames); 
            }


            //
            // This stops the chart from jumping
            //
            this.set('yaxisScaleMax', this.scale2.max);
            RGraph.clear(this.canvas);



            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }




                ++frame;

                // Loop thru each dataset
                for (var dataset=0; dataset<original.length; ++dataset) {
                    
                    //Loop thru the data in reverse direction
                    if (opt.reverse) {
                        
                        // Loop thru all of the points in each dataset
                        for (var i=(original[dataset].length - 1); i>=0; i-=1) {
                            
                            if (frame > opt.startFrames[i]) {
                                obj.original_data[dataset][i] = Math.max(
                                    0,
                                    original[dataset][i] - (Math.abs(original[dataset][i] * ( (opt.counters[i]++) / framesperpoint)))
                                );        
        
                                // Make the number negative if the original was
                                if (original[dataset][i] < 0) {
                                    obj.original_data[dataset][i] *= -1;
                                }
                            }
                        }
                    } else {
                        for (var i=0,len=original[dataset].length; i<len; i+=1) {
                            if (frame > opt.startFrames[i]) {
    
                                obj.original_data[dataset][i] = Math.min(
                                    Math.abs(original[dataset][i]),
                                    Math.abs(original[dataset][i] * ( (opt.counters[i]++) / framesperpoint))
                                );
        
        
                                // Make the number negative if the original was
                                if (original[dataset][i] < 0) {
                                    obj.original_data[dataset][i] *= -1;
                                }
                            }
                        }
                    }
                }


                if (frame >= opt.frames) {

                    if (labelsAbove) {
                        setTimeout(function ()
                        {
                            obj.set('labelsAbove', true);
                            RGraph.redraw();
                        }, 500);
                    }

                    callback(obj);
                } else {
                    RGraph.redrawCanvas(obj.canvas);
                    RGraph.Effects.updateCanvas(iterator);
                }
            }

            iterator();

            return this;
        };








        //
        // FoldToCenter
        // 
        // Line chart  FoldTocenter
        // 
        // @param object   OPTIONAL An object map of options
        // @param function OPTIONAL A callback to run when the effect is complete
        //
        this.foldtocenter = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();

            var obj      = this,
                opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                callback = arguments[1] || function () {},
                center_value = obj.scale2.max / 2;

            obj.set('yaxisScaleMax', obj.scale2.max);
            
            var original_data = RGraph.arrayClone(obj.original_data);
            
            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                for (var i=0,len=obj.original_data.length; i<len; ++i) {
                    if (obj.original_data[i].length) {
                        for (var j=0,len2=obj.original_data[i].length; j<len2; ++j) {
                            
                            var dataset = obj.original_data[i];

                            if (dataset[j] > center_value) {
                                dataset[j] = original_data[i][j] - ((original_data[i][j] - center_value) * (frame / frames));
                            } else {
                                dataset[j] = original_data[i][j] + (((center_value - original_data[i][j]) / frames) * frame);
                            }
                        }
                    }
                }
                
                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas)
    
                if (frame++ < frames) {
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }



            iterator();



            return this;
        };








        //
        // UnfoldFromCenterTrace effect
        // 
        // @param object   An object containing options
        // @param function A callback function
        //
        this.unfoldfromcentertrace =
        this.unfoldFromCenterTrace = function ()
        {
            // Cancel any stop request if one is pending
            //this.cancelStopAnimation();

            var obj      = this,
                opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                data     = RGraph.arrayClone(obj.original_data),
                callback = arguments[1] || function () {};



            // Draw the chart once to get the scale values
            obj.canvas.style.visibility = 'hidden';
            obj.draw();

            var max = obj.scale2.max;

            RGraph.clear(obj.canvas);
            obj.canvas.style.visibility = 'visible';




            //
            // When the Trace function finishes it calls this
            // function
            //
            var unfoldCallback = function ()
            {
                obj.original_data = data;
                obj.unfoldFromCenter({frames: frames / 2}, callback);
            };



            //
            // Determine the mid-point
            //
            var half = obj.get('xaxisPosition') == 'center' ? obj.min : ((obj.max - obj.min) / 2) + obj.min;
            obj.set('yaxisScaleMax', obj.max);
    
            for (var i=0,len=obj.original_data.length; i<len; ++i) {
                for (var j=0; j<obj.original_data[i].length; ++j) {
                    obj.original_data[i][j] = (obj.get('filled') && obj.get('filledAccumulative') && i > 0) ? 0 : half;
                }
            }

            RGraph.clear(obj.canvas);
            obj.trace({frames: frames / 2}, unfoldCallback);
            
            return obj;
        };








        //
        // UnfoldFromCenter
        // 
        // Line chart  unfold from center
        // 
        // @param object An option map of properties. Only frames is supported: {frames: 30}
        // @param function An optional callback
        //
        this.unfoldfromcenter =
        this.unfoldFromCenter = function ()
        {
            // Cancel any stop request if one is pending
            this.cancelStopAnimation();
        
            var obj           = this,
                opt           = arguments[0] || {},
                frames        = opt.frames || 30,
                frame         = 0,
                callback      = arguments[1] || function () {};
            
            // Draw the chart once to get the scale values
            obj.canvas.style.visibility = 'hidden';
            obj.draw();

            var max = obj.scale2.max;

            RGraph.clear(obj.canvas);
            obj.canvas.style.visibility = 'visible';

            var center_value  = obj.get('xaxisPosition') === 'center' ?  properties.yaxisScaleMin : ((obj.max - obj.min) / 2) + obj.min,
                original_data = RGraph.arrayClone(obj.original_data),
                steps         = null;
            
            obj.set('yaxisScaleMax', max);

            if (!steps) {
            
                steps = [];
            
                for (var dataset=0,len=original_data.length; dataset<len; ++dataset) {
    
                    steps[dataset] = []
    
                    for (var i=0,len2=original_data[dataset].length; i<len2; ++i) {
                        if (properties.filled && properties.filledAccumulative && dataset > 0) {
                            steps[dataset][i] = original_data[dataset][i] / frames;
                            obj.original_data[dataset][i] = center_value;
                        } else {
                            steps[dataset][i] = (original_data[dataset][i] - center_value) / frames;
                            obj.original_data[dataset][i] = center_value;
                        }
                    }
                }
            }

            function iterator ()
            {
                if (obj.stopAnimationRequested) {
    
                    // Reset the flag
                    obj.stopAnimationRequested = false;
    
                    return;
                }

                for (var dataset=0; dataset<original_data.length; ++dataset) {
                    for (var i=0; i<original_data[dataset].length; ++i) {
                        obj.original_data[dataset][i] += steps[dataset][i];
                    }
                }

                RGraph.clear(obj.canvas);
                RGraph.redrawCanvas(obj.canvas);
    
                if (--frames > 0) {
                    RGraph.Effects.updateCanvas(iterator);
                } else {
                    obj.original_data = RGraph.arrayClone(original_data);
                    RGraph.clear(obj.canvas);
                    RGraph.redrawCanvas(obj.canvas);

                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        //
        // Couple of functions that allow you to control the
        // animation effect
        //
        this.stopAnimation = function ()
        {
            // Reset the data on the chart object to the
            // unmodified_data variable
            this.original_data = RGraph.arrayClone(this.unmodified_data);
            
            // This, effectively, resets the clip area that
            // is set up by the trace effect (if the trace
            // effect is stopped part way through the
            // animationTraceClip option will be less than
            // 1 - affecting future draws.
            //
            if (this.get('animationTraceClip') !== 1) {
                this.set('animationTraceClip', 1);
            }

            this.stopAnimationRequested = true;
        };

        this.cancelStopAnimation = function ()
        {
            this.stopAnimationRequested = false;
        };








        //
        // Determines whether a point is adjustable or not.
        //
        // @param object A shape object
        //
        this.isAdjustable = function (shape)
        {
            if (RGraph.isNullish(properties.adjustableOnly)) {
                return true;
            }

            if (RGraph.isArray(properties.adjustableOnly) && properties.adjustableOnly[shape.sequentialIndex]) {
                return true;
            }

            return false;
        };








        //
        // A worker function that handles Bar chart specific tooltip substitutions
        //
        this.tooltipSubstitutions = function (opt)
        {
            var indexes = RGraph.sequentialIndexToGrouped(opt.index, this.data);

            //
            //// Dataset tooltips
            ////
            if (properties.tooltipsDataset) {
                
                return {
                    dataset: indexes[1],
                    index:   indexes[0],
          sequentialIndex:   opt.index,
                   values:   this.data[indexes[1]]
                };
            
            //
            // Regular tooltips
            //
            } else {
                
                // Create the values array which contains each datasets value
                for (var i=0,values=[]; i<this.original_data.length; ++i) {
                    values.push(this.original_data[i][indexes[1]]);
                }
    
                return {
                      index: indexes[1],
                    dataset: indexes[0],
            sequentialIndex: opt.index,
                      value: this.data_arr[opt.index],
                     values: values
                };
            }
        };








        //
        // A worker function that returns the correct color/label/value
        //
        // @param object specific The indexes that are applicable
        // @param number index    The appropriate index
        //
        this.tooltipsFormattedCustom = function (specific, index)
        {
            return {
            };
        };








        //
        // Adds dataset tooltips
        //
        this.addDatasetTooltip = function ()
        {
            var obj = this;

            //
            // This is the function that handles dataset tooltips
            //
            this.datasetTooltipsListener = function (e)
            {
                var [mx, my] = RGraph.getMouseXY(e);
                
                // This defaults the tooltipsDatasetEvent property to mousemove
                if (!obj.properties.tooltipsDatasetEvent) {
                    obj.properties.tooltipsDatasetEvent = 'click';
                }


                // Now test it
                var result = obj.over(mx, my)

                if (RGraph.isObject(result) && RGraph.isNumber(result.dataset)) {

                    var over    = true,
                        dataset = result.dataset;

                    // Show the tooltip if we're in the click handler or change the
                    // pointer if we're in the mousemove listener.
                    if (    e.type === 'click'
                        || (e.type === 'mousemove' && obj.properties.tooltipsDatasetEvent === 'mousemove' && (!RGraph.Registry.get('tooltip') || i != RGraph.Registry.get('tooltip').__dataset__))
                       ) {

                        RGraph.hideTooltip();
                        RGraph.redraw();
                        
                        // Set the tooltip positioning
                        obj.set('tooltipsPositionStatic', false);
                        obj.set('tooltipsEffect', 'fade');
                        
                        if (obj.get('tooltipsDatasetEvent') === 'mousemove') {
                            obj.set('tooltipsEffect', 'none');
                        }

                        // Add the dataset index to the object
                        obj.tooltipsDatasetIndex = dataset;

                        RGraph.tooltip({
                            object: obj,
                            text: typeof obj.properties.tooltipsDataset === 'string'
                                      ? obj.properties.tooltipsDataset
                                      : obj.properties.tooltipsDataset[dataset],
                            x: 0,
                            y: 0,
                            index: dataset,
                            event: e
                        });




                        //
                        // Position the tooltip
                        //
                        var coords_length = obj.coords2[dataset].length,
                            x             = obj.coords2[dataset][Math.floor(coords_length / 2)][0],
                            y             = obj.coords2[dataset][Math.floor(coords_length / 2)][1],
                            [cx, cy]      = RGraph.getCanvasXY(obj.canvas),
                            tooltip       = RGraph.Registry.get('tooltip'),
                            width         = tooltip.offsetWidth,
                            height        = tooltip.offsetHeight;
                        
                        tooltip.style.left = (cx + x - (width / 2)) + 'px';
                        tooltip.style.top  = (cy + y - height - 20) + 'px';







                        //
                        // Highlight the dataset
                        //
                        obj.properties.highlightDatasetStrokeAlpha = 0.25;
                        
                        // Set the linecap and linejoin to match
                        // the chart object
                        obj.context.lineCap  = obj.properties.linecap;
                        obj.context.lineJoin = obj.properties.linejoin;
                            
                        obj.highlightDataset({
                            dataset:   dataset,
                            linewidth: obj.getLineWidth(dataset) + 10,
                            stroke:    obj.properties.filled ? 'transparent'  : obj.properties.colors[dataset]
                        });
                        
                        obj.properties.highlightDatasetStrokeAlpha = 1;
                    }
                    
                    if (e.type === 'mousemove') {
                        e.target.style.cursor = 'pointer';
                    }
                }
                
                if (!over) {
                    // Hide the tooltip if the event is click
                    if (e.type === 'click') {
                        RGraph.hideTooltip();
                        RGraph.redraw();
                    }

                    // Reset the cursor type
                    obj.canvas.style.cursor = 'default';
                }


                e.stopPropagation();
            };
            
            if (!this.datasetTooltipsListenerAdded) {
                this.canvas.addEventListener('click', this.datasetTooltipsListener, false);
                this.canvas.addEventListener('mousemove', this.datasetTooltipsListener, false);
                window.addEventListener('click', function (e)
                {
                    RGraph.redraw();
                }, false);
                
                this.datasetTooltipsListenerAdded = true;
            }
        };







        //
        // This allows for static tooltip positioning
        //
        this.positionTooltipStatic = function (args)
        {
            var obj      = args.object,
                e        = args.event,
                tooltip  = args.tooltip,
                index    = args.index,
                canvasXY = RGraph.getCanvasXY(obj.canvas)
                coords   = this.coords[args.index];

            // Position the tooltip in the X direction
            args.tooltip.style.left = (
                canvasXY[0]                      // The X coordinate of the canvas
                + coords[0]                      // The X coordinate of the point on the chart
                - (tooltip.offsetWidth / 2)      // Subtract half of the tooltip width
                + obj.properties.tooltipsOffsetx // Add any user defined offset
            ) + 'px';

            args.tooltip.style.top  = (
                  canvasXY[1]                    // The Y coordinate of the canvas
                + coords[1]                      // The Y coordinate of the bar on the chart
                - tooltip.offsetHeight           // The height of the tooltip
                - 15                             // An arbitrary amount
                + obj.properties.tooltipsOffsety // Add any user defined offset
            ) + 'px';
        };








        //
        // Draws a trendline on the Scatter chart. This is also known
        // as a "best-fit line"
        //
        // @param dataset The index of the dataset to use
        //
        this.drawTrendline = function ()
        {
            var args       = RGraph.getArgs(arguments, 'dataset');
            var obj        = this;
            var color      = properties.trendlineColor;
            var linewidth  = properties.trendlineLinewidth;
            var margin     = properties.trendlineMargin;
            
            // If clipping is enabled then draw a clip box the same as the graph area
            // (just the chart area, not including the margins)
            if (properties.trendlineClip) {
                this.path(
                    'b sa r % % % % cl',
                    properties.marginLeft,
                    properties.marginTop,
                    this.canvas.width - properties.marginLeft - properties.marginRight,
                    this.canvas.height - properties.marginTop - properties.marginBottom
                );
            }
    
                //
                // Create the pseudo-data array
                //
                var data=[];
    
                // Create the data array from the given data and an
                // increasing X value
                for (var i=0; i<this.data.length; ++i) {
                    
                    data[i] = [];
    
                    for (var j=0; j<this.data[i].length; ++j) {
                        data[i].push([j, this.data[i][j]]);
                    }
                }
    
                // Allow for trendlineColors as well
                if (RGraph.isArray(properties.trendlineColors)) {
                    color = properties.trendlineColors;
                }
    
    
    
                // handle the options being arrays
                if (typeof color === 'object' && color[args.dataset]) {
                    color = color[args.dataset];
                } else if (typeof color === 'object') {
                    color = 'gray';
                }
    
                if (typeof linewidth === 'object' && typeof linewidth[args.dataset] === 'number') {
                    linewidth = linewidth[args.dataset];
                } else if (typeof linewidth === 'object') {
                    linewidth = 1;
                }
    
                if (typeof margin === 'object' && typeof margin[args.dataset] === 'number') {
                    margin = margin[args.dataset];
                } else if (typeof margin === 'object'){
                    margin = 25;
                }
    
    
                // Step 1: Calculate the mean values of the X coords and the Y coords
                for (var i=0,totalX=0,totalY=0; i<this.data[args.dataset].length; ++i) {
                    totalX += data[args.dataset][i][0];
                    totalY += data[args.dataset][i][1];
                }
    
                var averageX = totalX / data[args.dataset].length;
                var averageY = totalY / data[args.dataset].length;
    
                // Step 2: Calculate the slope of the line
                
                // a: The X/Y values minus the average X/Y value
                for (var i=0,xCoordMinusAverageX=[],yCoordMinusAverageY=[],valuesMultiplied=[],xCoordMinusAverageSquared=[]; i<this.data[args.dataset].length; ++i) {
                    xCoordMinusAverageX[i] = data[args.dataset][i][0] - averageX;
                    yCoordMinusAverageY[i] = data[args.dataset][i][1] - averageY;
    
                    // b. Multiply the averages
                    valuesMultiplied[i] = xCoordMinusAverageX[i] * yCoordMinusAverageY[i];
                    xCoordMinusAverageSquared[i] = xCoordMinusAverageX[i] * xCoordMinusAverageX[i];
                }
    
                var sumOfValuesMultiplied          = RGraph.arraySum(valuesMultiplied);
                var sumOfXCoordMinusAverageSquared = RGraph.arraySum(xCoordMinusAverageSquared);
    
                // Calculate m (???)
                var m = sumOfValuesMultiplied / sumOfXCoordMinusAverageSquared;
                var b = averageY - (m * averageX);
    
                // y = mx + b
                
                var coords =  [
                    [0, m * 0 + b],
                    [data[0].length - 1, m * (data[0].length - 1) + b]
                ];
    
                // Convert the X/Y numbers into coordinates
                coords[0][0] = this.marginLeft;
                coords[0][1] = this.getYCoord(coords[0][1], true);
                coords[1][0] = this.canvas.width - this.marginRight;
                coords[1][1] = this.getYCoord(coords[1][1], true);
    
    
    
    
    
    
    
    
    
                //
                // Draw the line
                //
                
                // Set dotted, dash or a custom dash array
                if (   properties.trendlineDashed === true
                    || (RGraph.isArray(properties.trendlineDashed) && properties.trendlineDashed[args.dataset]) ) {
                    this.context.setLineDash([4,4]);
                }
                
                if (   properties.trendlineDotted === true
                    || (RGraph.isArray(properties.trendlineDotted) && properties.trendlineDotted[args.dataset])) {
                    this.context.setLineDash([1,4]);
                }
                
                // Set a lineDash array. It can be an array of two numbers, or it can be a
                // multi-dimensional array, each of two numbers. One for each line on the
                // chart.
                if (RGraph.isArray(properties.trendlineDashArray)) {
                    if (   properties.trendlineDashArray.length === 2
                        && typeof properties.trendlineDashArray[0] === 'number'
                        && typeof properties.trendlineDashArray[1] === 'number'
                       ) {
                        this.context.setLineDash(properties.trendlineDashArray);
                    
                    } else if (   RGraph.isArray(properties.trendlineDashArray)
                               && RGraph.isArray(properties.trendlineDashArray[args.dataset])) {
                        this.context.setLineDash(properties.trendlineDashArray[args.dataset]);
                    }
                }
    
    
    
    
    
    
    
    
                // These variables hold the coordinates
                var x1, x2, y1, y2;

                // Draw the line
                this.path(
                    ' lc round lw % b m % % l % % s %',
                    
                    linewidth,
    
                    // moveTo
                    x1 = Math.max(coords[0][0], this.coords2[args.dataset][0][0] - margin),
                    y1 = coords[0][1],
                    
                    // lineTo
                    x2 = Math.min(coords[1][0], this.coords2[args.dataset][this.coords2[args.dataset].length - 1][0] + margin),
                    y2 = coords[1][1],
                    
                    // stroke color
                    color
                );
                
                // Store the trendline coordinates
                this.coordsTrendline[args.dataset] = [
                    [x1, y1],
                    [x2, y2]
                ];
                
                // Reset the line dash array
                this.context.setLineDash([5,0]);

            //
            // Reset the clipping region
            //
            if (properties.trendlineClip) {
                this.context.restore();
            }
        };








        //
        // This is the code the adds lines across null gaps in the
        // Line chart
        //
        // @param number datasetIdx The index of the dataset
        // @param array  data       The dataset
        //    
        this.nullBridge = function (datasetIdx, data)
        {
            var readData = false;

            //
            // Now add the gray connecting lines
            //
            for (var i=0; i<data.length; i++) {

                var isNull   = false,
                    start    = null,
                    end      = null;

                // This ensures that the first datapoint is not null
                if (readData === false && RGraph.isNumber(data[i])) {
                    readData = true;
                }

                if (RGraph.isNullish(data[i]) && readData) {
                    start = i - 1;
                    
                    for (var j=(i+1); j<data.length; ++j) {
                        if (RGraph.isNullish(data[j])) {
                            continue;
                        } else {
                            end = j;
                        }

                        this.context.setLineDash(properties.nullBridgeDashArray);

                        this.path(
                            'b lw % m % % l % % s %',
                            typeof properties.nullBridgeLinewidth === 'number' ? properties.nullBridgeLinewidth : this.getLineWidth(datasetIdx),
                            this.coords2[datasetIdx][start][0], this.coords2[datasetIdx][start][1],
                            this.coords2[datasetIdx][end][0], this.coords2[datasetIdx][end][1],
                            typeof properties.nullBridgeColors === 'string'
                                ? properties.nullBridgeColors
                                : ((typeof properties.nullBridgeColors === 'object' && !RGraph.isNullish(properties.nullBridgeColors) && properties.nullBridgeColors[datasetIdx]) ? properties.nullBridgeColors[datasetIdx] : properties.colors[datasetIdx])
                        );
                        
                        start = null;
                        end   = null;
                        
                        break;
                    }
                }
            }
        };








        //
        // Draws the angled labels that follow
        // the line up and down. Bit similar to
        // labelsAbove, but they're positioned
        // above the line and not the points
        // on the line.
        //
        this.drawAngledLabels = function ()
        {
            if (properties.labelsAngled) {
    
                // Turn off any lingering shadow
                RGraph.noShadow(this);
    
                // This is the first lines coordinates
                var coords = this.coords;








                // This function gets the relevant text
                // configuration from all (12) of the text
                // configuration properties
                var getTextConfiguration = function (dir)
                {
                    // Init the textConf object
                    var textConf = {};
                
                    // Get the up text configuration
                    var prefixes       = ['text', 'labelsAngled', 'labelsAngled' + dir];
                    var textProperties = ['Font','Color','Size','Bold','Italic'];
                
                    for (var prefix in prefixes) {
                        for (var prop in textProperties) {
                            
                            var name = prefixes[prefix] + textProperties[prop];
                
                            if (name) {
                                if (   RGraph.isString(properties[name])
                                    || RGraph.isNumber(properties[name])
                                    || RGraph.isBoolean(properties[name])
                                   ) {
                                    textConf[textProperties[prop].toLowerCase()] = properties[name];
                                }
                            }
                        }
                    }
                    
                    return textConf;
                };






                // Loop thru the coordinates for the line (but not
                // the last one)
                for (var i=0; i<(coords.length) - 1; ++i) {
                    
                    // Work out the horizontal and vertical distance to the next point
                    var dx = (coords[i + 1][0] - coords[i][0]) / 2,
                        dy = (coords[i + 1][1] - coords[i][1]) / 2;

                    
                    // Work out the direction that the line is going so
                    // that the correct label can be used

                    if (coords[i + 1][1] < coords[i][1]) {
                        var direction = 0; // Up
                        var textConf = getTextConfiguration('Up');
                    } else if (coords[i + 1][1] > coords[i][1]) {
                        var direction = 1; // Down
                        var textConf = getTextConfiguration('Down');
                    } else {
                        var direction = 2; // Level
                        var textConf = getTextConfiguration('Level');
                    }

                    // Work out the angle that the text should be drawn at
                    var angle = RGraph.getAngleByXY({
                        cx: coords[i][0],
                        cy: coords[i][1],
                        x:  coords[i + 1][0],
                        y:  coords[i + 1][1],
                    });

                    // Use the API function to add the text to the chart
                    RGraph.text({
                        object:     this,
                        accessible: properties.adjustable ? false : (RGraph.isBoolean(properties.labelsAngledAccessible) ? properties.labelsAngledAccessible : true),
                        font:       textConf.font,
                        color:      textConf.color,
                        size:       textConf.size,
                        bold:       textConf.bold,
                        italic:     textConf.italic,
                        x:          coords[i][0] + dx,
                        y:          coords[i][1] + dy - 5,
                        text:       (properties.labelsAngledSpecific && (RGraph.isString(properties.labelsAngledSpecific[i]) || RGraph.isNumber(properties.labelsAngledSpecific[i]))) ? properties.labelsAngledSpecific[i] : properties.labelsAngled[direction],
                        halign:     'center',
                        valign:     'bottom',
                        angle:      angle * (180 / Math.PI)
                    });
                }
            }
        };








        //
        // Sets the linecap style
        // Not always very noticeable, but these do have an effect
        // with thick lines
        //
        // butt square round
        //
        this.setLinecap = function ()
        {
            var args = RGraph.getArgs(arguments, 'index');

            if (RGraph.isArray(properties.linecap) && RGraph.isString(properties.linecap[args.index])) {
                this.context.lineCap =  properties.linecap[args.index];
            
            } else if ( RGraph.isString(properties.linecap) ) {
                this.context.lineCap =  properties.linecap;
            } else {
                this.context.lineCap = 'round';
            }
        };








        //
        // Finds the closest point to the given mouseX coordinate. It allows a
        // tolerance of 10 (or so) pixels.
        //
        //  @param object opt An object consisting of;
        //                     o coords The coordinates of the points
        //                     o mousex The mouseX coordinate
        //                     o tolerance The number of pixels leeway
        //                       that is allowed. Default is 10
        //
        this.closest = function (opt)
        {
            var DEFAULT_TOLERANCE = 25,
                ret               = [];
    
            // custom object given
            if (typeof opt === 'object' && typeof opt.event === 'object' && !opt.event.type) {
                if (typeof opt.tolerance !== 'number') {
                    opt.tolerance = DEFAULT_TOLERANCE;
                }
    
            // Event object
            } else if (typeof opt === 'object' && typeof opt.pageX === 'number') {
                var e = opt;
                opt = {event: e, tolerance: DEFAULT_TOLERANCE};
            }

            var coords    = this.coords2,
                mouseXY   = RGraph.getMouseXY(opt.event),
                tolerance = (typeof opt.tolerance === 'number' ? opt.tolerance : DEFAULT_TOLERANCE);
    
            // Loop through the coordinates looking for the closest
            // (going by X coordinate)
            for (var dataset=0; dataset<coords.length; ++dataset) {
                for (var index=0; index<coords[dataset].length; ++index) {
                    
                    //
                    // Only go by the x coordinate
                    //
                    if (opt.xonly) {
                        if (   mouseXY[0] > (coords[dataset][index][0] - tolerance)
                            && mouseXY[0] < (coords[dataset][index][0] + tolerance)) {
                            
                            ret.push({dataset: dataset, index: index, distance: Math.abs(mouseXY[0] - coords[dataset][index][0])});
                        }

                    //
                    // Go by both the X and Y coordinates
                    //
                    } else {
    
    
                        var hyp = RGraph.getHypLength({
                            x1: coords[dataset][index][0],
                            y1: coords[dataset][index][1],
                            x2: mouseXY[0],
                            y2: mouseXY[1]
                        });
                        
                        if (hyp <= tolerance) {
                            ret.push({dataset: dataset, index: index,distance: hyp});
                        }
                    } // End else clause
                } // End for loop
            }// End for loop

            //
            // Sort the ret array in order of the distance
            //
            ret.sort(function (a, b)
            {
                return a.distance - b.distance;
            });
            
            // Return the point closest to the click
            return ret[0];
        };








        //
        // The animation function that makes the point grow to
        // a new position. Give it the index, the new value and
        // optionally the dataset too (this defaults to zero).
        //
        // @param number dataset The dataset of the point OPTIONAL
        // @param number index   The index of the point
        // @param number value   The value to grow the point to
        // @param number frames  The number of frames to use whilst
        //                       animating to the new position OPTIONAL
        //
        this.growPoint = function ()
        {
            var args = RGraph.getArgs(arguments, 'index,value'),
                obj  = this;
            
            
            // args.dataset should default to zero if not given
            if (typeof args.dataset !== 'number') {
                args.dataset = 0;
            }
            
            // Determine the original value or the point that's being adjusted
            var original_value = this.original_data[args.dataset][args.index];
    
    
            var frames = typeof args.frames === 'number' ? args.frames : 15,
                delay  = 16.666;  
    
            for (var i=0; i<frames; i++) {
                (function (i)
                {
                    setTimeout(function ()
                    {
                        obj.original_data[args.dataset][args.index] = ((args.value - original_value) * (i + 1) / frames) + original_value;
                        
                        // Update this so that the above labels are correctly updated
                        obj.data_arr = RGraph.arrayLinearize(obj.original_data);
                        
                        RGraph.redraw();
                    }, delay * i);
                })(i)
            }
        };








        //
        // Sets the linejoin style
        //
        // round miter bevel
        //
        this.setLinejoin = function ()
        {
            var args = RGraph.getArgs(arguments, 'index');

            if (RGraph.isArray(properties.linejoin) && RGraph.isString(properties.linejoin[args.index])) {
                this.context.lineJoin = properties.linejoin[args.index];
            } else if ( RGraph.isString(properties.linejoin) ) {
                this.context.lineJoin =  properties.linejoin;
            } else {
                this.context.lineJoin = 'round';
            }
        };








        //
        // This returns the relevant value for the formatted key
        // macro %{value}. THIS VALUE SHOULD NOT BE FORMATTED.
        //
        // @param number index The index in the dataset to get
        //                     the value for
        //
        this.getKeyValue = function (index)
        {
            if (   RGraph.isArray(this.properties.keyFormattedValueSpecific)
                && RGraph.isNumber(this.properties.keyFormattedValueSpecific[index])) {
                
                return this.properties.keyFormattedValueSpecific[index];
            
            } else {
                return RGraph.arraySum(this.data[index]);
            }
        };








        //
        // Returns how many data-points there should be when a string
        // based key property has been specified. For example, this:
        //
        // key: '%{property:_labels[%{index}]} %{value_formatted}'
        //
        // ...depending on how many bits of data ther is might get
        // turned into this:
        //
        // key: [
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        //     '%{property:_labels[%{index}]} %{value_formatted}',
        // ]
        //
        // ... ie in that case there would be 4 data-points so the
        // template is repeated 4 times.
        //
        this.getKeyNumDatapoints = function ()
        {
            return this.data.length;
        };








        //
        // This function tests the given coords to see if
        // they're over the line. It draws the path using
        // the coordinates from the line chart (either
        // the regular coords or the spline coordinates)
        // and then uses the isPointInstroke() function.
        //
        // @param  number  x The X coordinate to test
        // @param  number  y The Y coordinate to test
        // @return boolean   Whether the given coordinates
        //                   are over the line or not.
        //
        this.over = function (x, y)
        {
            var args     = RGraph.getArgs(arguments, 'x,y');
            var datasets = properties.spline ? this.coordsSpline : this.coords2;

            // Loop through the set of coords for each line
            for (var i=0; i<datasets.length; ++i) {

                // Current datasets coordinates
                var dataset = i;

                // Move to the first points coordinates
                this.path(
                    'b lw % lc round ss rgba(0,0,0,0) m % %',
                    this.properties.linewidth + 5,
                    datasets[dataset][0][0],
                    datasets[dataset][0][1]
                );

                // Loop through the coords for the line
                for (var j=1; j<datasets[dataset].length; ++j) {                
                    this.context.lineTo(
                        datasets[dataset][j][0],
                        datasets[dataset][j][1]
                    );
                }




                // This is the shape object that is retuned
                // with details of any line/fill that is
                // currently being hovered over. More
                // information is added when it can be
                var shape = {
                    object: this,
                    dataset: dataset
                };






                //
                // Accommodate stacked filled line charts
                //
                if (   this.properties.filled
                    && this.properties.filledAccumulative
                   ) {
                    
                    // Highlight the first dataset
                    // Draw a line to the X axis and back
                    // to the first point
                    if (dataset === 0) {
                        this.context.lineTo(
                            datasets[dataset][datasets[dataset].length - 1][0],
                            this.canvas.height - this.properties.marginBottom
                        );
                        this.context.lineTo(
                            this.properties.marginLeft,
                            this.canvas.height - this.properties.marginBottom
                        );




                    // Other datasets
                    //
                    // Have to stroke the line over the
                    // coordinates and then backtrack
                    // over the previous lines coordinates
                    } else if (dataset > 0) {

                        // Draw a line to the top of the previous dataset and
                        // back to the first point
                        var prevDatasetIdx = dataset - 1;

                        // Draw a line to the bottom of the canvas
                        this.context.lineTo(
                            datasets[dataset][datasets[dataset].length - 1][0],
                            this.canvas.height - this.properties.marginBottom
                        );

                        // Draw a line to the LHS of the canvas
                        this.context.lineTo(
                            this.properties.marginLeft,
                            this.canvas.height - this.properties.marginBottom
                        );

                        this.context.closePath();
                        
                        shape.dataset = dataset;
                    }













                // Accommodate non-stacked, filled charts
                } else if (   this.properties.filled
                           && !this.properties.filledAccumulative
                          ) {

                    // Reverse the dataset index as the
                    // datasets need to be checked in reverse
                    // order
                    dataset = datasets.length - dataset - 1;

                    this.context.beginPath();
                    
                    // Loop through the coordinates
                    // of the shape
                    for (var k=0; k<datasets[dataset].length; ++k) {
                        k === 0
                            ? this.context.moveTo(datasets[dataset][k][0], datasets[dataset][k][1])
                            : this.context.lineTo(datasets[dataset][k][0], datasets[dataset][k][1]);
                    }
                    
                    // Draw a line to the bottom of the chart
                    this.context.lineTo(
                        datasets[dataset][datasets[dataset].length - 1][0],
                        this.canvas.height - this.properties.marginBottom
                    );
                    
                    // Draw a line back to the LHS of the chart
                    this.context.lineTo(
                        datasets[dataset][0][0],
                        this.canvas.height - this.properties.marginBottom
                    );
                    
                    this.context.closePath();
                    this.context.fillStyle = 'rgba(0,0,0,0.5)';

                    
                    // Add filled shape details to the
                    // shape (if any)
                    shape.dataset = dataset;
                }

//this.context.stroke();



                // Return the index of the line if the mouse
                // pointer is over it it's in the stroke
                if (   this.context.isPointInStroke(args.x, args.y)
                    || (this.properties.filled && this.context.isPointInPath(args.x, args.y))
                   ) {

                    // This shape object is created up above
                    // and the necessary bits are added to it
                    // as they're determined
                    return shape;
                }
            }
            
            return null;
        };








        //
        // Used to highlight a particular dataset. This
        // function accommodates fill, non-filled, splines
        // and non-spline charts.
        //
        // @param opt object A little object that should
        //                   contain configuration
        //                   information:
        //
        //                   linewidth: The linewidth
        //                   stroke:    The color of the
        //                              stroke
        //                   fill:      The color of the fill
        //
        this.highlightDataset = function ()
        {
            var args   = RGraph.getArgs(arguments, 'opt');
            var coords = this.properties.spline ? this.coordsSpline : this.coords2;

            // Default to the first dataset
            args.opt.dataset = parseInt(args.opt.dataset) || 0;

            // Default this to an empty object
            if (!args.opt)                              args.opt = {};
            if (!args.opt.stroke)                       args.opt.stroke    = this.properties.highlightDatasetStroke;
            if (!args.opt.fill)                         args.opt.fill      = this.properties.highlightDatasetFill;
            if (!args.opt.dotted)                       args.opt.fotted    = this.properties.highlightDatasetDotted;
            if (!args.opt.dashed)                       args.opt.dashed    = this.properties.highlightDatasetDashed;
            if (!args.opt.linedash)                     args.opt.linedash  = this.properties.highlightDatasetDashArray;
            if (!RGraph.isNumber(args.opt.linewidth))   args.opt.linewidth = this.properties.linewidth;

            //
            // If the colors are arrays - deal with that
            if (RGraph.isArray(args.opt.stroke) && args.opt.stroke[args.opt.dataset]) {
                args.opt.stroke = args.opt.stroke[args.opt.dataset];
            }

            if (RGraph.isArray(args.opt.fill) && args.opt.fill[args.opt.dataset]) {
                args.opt.fill = args.opt.fill[args.opt.dataset];
            }

            // Start the path
            this.context.beginPath();

            // Set the colors and linewidth
            this.context.strokeStyle = args.opt.stroke;
            this.context.fillStyle   = args.opt.fill;
            this.context.lineWidth   = args.opt.linewidth;

            // If the highlighDatasetStrokeUseColors property is set
            // then set the strokeStyle to the relevant
            // obj.properties.colors color
            if (this.properties.highlightDatasetStrokeUseColors && this.properties.colors[args.opt.dataset]) {
                this.context.strokeStyle = this.properties.colors[args.opt.dataset];
            }
            
            // If the highlighDatasetFillUseColors property is set
            // then set the fillStyle to the relevant
            // obj.properties.colors color
            if (this.properties.highlightDatasetFillUseColors && this.properties.colors[args.opt.dataset]) {
                this.context.fillStyle = this.properties.colors[args.opt.dataset];
            }
            
            // If the highlighDatasetFillUseColors property is set AND the
            // obj.properties.filledColors property is being used
            // then set the fillStyle to the relevant
            // obj.properties.filledColors color
            if (this.properties.highlightDatasetFillUseColors && RGraph.isArray(this.properties.filledColors) && this.properties.filledColors[args.opt.dataset]) {
                this.context.fillStyle = this.properties.filledColors[args.opt.dataset];
            }
            
            // Fotted or dashed settings
            if (args.opt.dotted || args.opt.dashed) {
                if (args.opt.dashed) {
                    this.context.setLineDash([2,6])
                } else if (args.opt.dotted) {
                    this.context.setLineDash([1,5])
                }
            } else if (args.opt.linedash) {
                this.context.setLineDash(args.opt.linedash);
            }

            if (args.opt.linewidth === 0) {
                this.context.strokeStyle = 'transparent';
            }



            // Loop through the coordinates
            // of the shape
            for (var i=0; i<coords[args.opt.dataset].length; ++i) {
                i === 0
                    ? this.context.moveTo(coords[args.opt.dataset][i][0], coords[args.opt.dataset][i][1])
                    : this.context.lineTo(coords[args.opt.dataset][i][0], coords[args.opt.dataset][i][1]);
            }

            //
            // If this is a stacked & filled chart then we
            // need to add the previous datasets coordinates
            // to the path
            //
            if (   this.properties.filled
                && this.properties.filledAccumulative
                && args.opt.dataset > 0
               ) {

                // Necessary?
                this.context.lineTo(
                    coords[args.opt.dataset - 1][coords[args.opt.dataset - 1].length - 1][0],
                    coords[args.opt.dataset - 1][coords[args.opt.dataset - 1].length - 1][1]
                );
                
                for (let i=(coords[args.opt.dataset - 1].length - 1); i>=0; --i) {
                    this.context.lineTo(
                        coords[args.opt.dataset - 1][i][0],
                        coords[args.opt.dataset - 1][i][1]
                    );
                }
            }






            // First dataset or non-stacked charts -
            // draw a line down to the bottom of
            // the chart.
            //
            // *** ONLY DO THIS FOR FILLED CHARTS ***
            //
            if (this.properties.filled && (args.opt.dataset === 0 || !this.properties.filledAccumulative) ) {
                if (args.opt.dataset === 0 || !this.properties.filledAccumulative) {
                    this.context.lineTo(
                        coords[args.opt.dataset][coords[args.opt.dataset].length - 1][0],
                        this.canvas.height - this.properties.marginBottom
                    );
                }

                this.context.lineTo(
                    this.properties.marginLeft,
                    this.canvas.height - this.properties.marginBottom
                );
            }




            // Close the path
            //                    
            // *** ONLY DO THIS FOR FILLED CHARTS ***
            //
            if (this.properties.filled) {
                
                this.context.closePath();
                
                // Enable the highlightDatasetFillAlpha
                if (RGraph.isNumber(this.properties.highlightDatasetFillAlpha)) {
                    this.context.globalAlpha = this.properties.highlightDatasetFillAlpha;
                }

                // Fill the shape - but only on filled
                // charts
                this.context.fill();
                
                this.context.globalAlpha = 1;
            }

            // Enable the highlightDatasetStrokeAlpha
            if (RGraph.isNumber(this.properties.highlightDatasetStrokeAlpha)) {
                this.context.globalAlpha = this.properties.highlightDatasetStrokeAlpha;
            }

            // Stroke the shape
            this.context.stroke();
            

            this.context.globalAlpha = 1;
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
        this.clipToScaleWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.scale2.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.scale2.max; else to   = Number(RegExp.$2);
    
            var width  = this.canvas.width,
                y1     = this.getYCoord(from),
                y2     = this.getYCoord(to),
                height = Math.abs(y2 - y1),
                x      = 0,
                y      = Math.min(y1, y2);
        
            // Increase the height if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                y = 0;
                height += this.properties.marginTop;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                height += this.properties.marginBottom;
            }
            this.path(
                'sa b r % % % % cl',
                x, y, width, height
            );
        };








        //
        // This function handles clipping to scale values TESTING.
        // Because each chart handles scales differently, a worker
        // function is needed instead of it all being done
        // centrally in the RGraph.clipTo.start() function.
        //
        // @param string clip The clip string as supplied by the
        //                    user in the chart configuration
        //
        this.clipToScaleTestWorker = function (clip)
        {
            // The Regular expression is actually done by the
            // calling RGraph.clipTo.start() function  in the core
            // library
            if (RegExp.$1 === 'min') from = this.scale2.min; else from = Number(RegExp.$1);
            if (RegExp.$2 === 'max') to   = this.scale2.max; else to   = Number(RegExp.$2);
    
            var width  = this.canvas.width,
                y1     = this.getYCoord(from),
                y2     = this.getYCoord(to),
                height = Math.abs(y2 - y1),
                x      = 0,
                y      = Math.min(y1, y2);
        
            // Increase the height if the maximum value is "max"
            if (RegExp.$2 === 'max') {
                y = 0;
                height += this.properties.marginTop;
            }
        
            // Increase the height if the minimum value is "min"
            if (RegExp.$1 === 'min') {
                height += this.properties.marginBottom;
            }
            this.path(
                'b r % % % %',
                x, y, width, height
            );
        };








        //
        // Register the object so it is redrawn when necessary
        //
        RGraph.register(this);








        //
        // Allow all lines to start off as visible
        //
        for (var i=0; i<this.original_data.length; ++i) {
            properties.lineVisible[i] = true;
        }

        //
        // This is the 'end' of the constructor so if the first argument
        // contains configuration data - handle that.
        //
        RGraph.parseObjectStyleConfig(this, conf.options);
    };









    //
    // This is a "wrapper" function that creaters a dual-color
    // trendline Line chart for you. Options to give to
    // the frunction are (the sole argument is an object):
    //
    //   id:            The id of the canvas tag
    //   data:          The data for the chart
    //   options:       The chart options that get applied to
    //                  both Line charts (the one above
    //                  and also the one below the trendline.)
    //   optionsTop:    With this option you can specify
    //                  configuration values that are specific to
    //                  the top chart (eg color)
    //   optionsBottom: With this option you can specify
    //                  configuration values that are specific to
    //                  the bottom chart (eg color)
    //
    RGraph.Line.dualColorTrendline = function (args)
    {
        // Check that a trendline is enabled
        if(!args.options.trendline) {
            alert('[ALERT] A trendline is not enabled in your charts configuration');
            return;
        }

        //
        // Draw the red part of the Scatter chart (the bottom
        // half)
        //
        var obj1 = new RGraph.Line({
            id: args.id,
            data: RGraph.arrayClone(args.data, true),
            options: RGraph.arrayClone(args.options, true)
        }).draw();
        
        
        
        // The coordinates of the first (and only) trendline
        var coords = obj1.coordsTrendline[0];



        //
        // Calculate the coordinates for the top part of the chart
        // (above the trendline)
        //
        var coords_top = [
            [0,coords[0][1]],
            ...coords,
            [obj1.canvas.width,coords[1][1]],
            [obj1.canvas.width, 0],
            [0,0]
        ];


        //
        // Calculate the coordinates for the bottom part of the chart
        // (below the trendline)
        //
        var coords_bottom = [
            [0,coords[0][1]],
            ...coords,
            [obj1.canvas.width,coords[1][1]],
            [obj1.canvas.width, obj1.canvas.height],
            [0,obj1.canvas.height]
        ];

        //
        // Now that we have the coordinates, clipping can be
        // installed on the chart that's already been drawn
        // (the top part of the chart).
        //
        obj1.set('clip', coords_top);
        
        // Set any options that have been specified that are
        // specific to the top Scatter chart
        if (RGraph.isObject(args.optionsTop)) {
            for (i in args.optionsTop) {
                if (RGraph.isString(i)) {
                    obj1.set(i, args.optionsTop[i]);
                }
            }
        }



        //
        // Create a new chart that's clipped to the bottom part
        // coordinates.
        //
        var obj2 = new RGraph.Line({
            id: args.id,
            data: RGraph.arrayClone(args.data, true),
            options: {
                ...RGraph.arrayClone(args.options, true),
                clip: coords_bottom // Clip to the part of the canvas
                                    // that's below the trendline
            }
        });

        // Set any options that have been specified that are
        // specific to the bottom Scatter chart
        if (RGraph.isObject(args.optionsBottom)) {
            for (i in args.optionsBottom) {
                if (RGraph.isString(i)) {
                    obj2.set(i, args.optionsBottom[i]);
                }
            }
        }

        //
        // Now draw both of the charts using the RGraph.redraw
        // API function or the requested animation effect
        if (    RGraph.isString(args.animationEffect)
            && obj1[args.animationEffect]
            && obj1[args.animationEffect]
           ) {
            var effect         = args.animationEffect;
            var effectOptions  = args.animationEffectOptions ? args.animationEffectOptions : null;
            var effectCallback = function ()
                {
                    RGraph.runOnce('rgraph-canvas-line-dual-color-effect-callback', function ()
                    {
                        args.animationEffectCallback ? args.animationEffectCallback() : function () {};
                    });
                }
            obj1[effect](effectOptions);
            obj2[effect](effectOptions, effectCallback);
        } else {
            RGraph.redraw();
        }
        
        return [obj1, obj2];
    };