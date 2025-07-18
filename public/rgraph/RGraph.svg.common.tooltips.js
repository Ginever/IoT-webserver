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
    //
    // This is used in two functions, hence it's here
    //
    RGraph.SVG.tooltips       = {};
    RGraph.SVG.tooltips.css   =
    RGraph.SVG.tooltips.style = {
        display:    'inline-block',
        position:   'absolute',
        padding:    '6px',
        lineHeight: 'initial',
        fontFamily: 'Arial',
        fontSize:   '12pt',
        fontWeight: 'normal',
        textAlign:  'center',
        left:       0,
        top:        0,
        backgroundColor: 'black',
        color:      'white',
        visibility: 'visible',
        zIndex:     3,
        borderRadius: '5px',
        boxShadow:  'rgba(96,96,96,0.5) 0 0 5px',
        transition: 'left ease-out .25s, top ease-out .25s'
    };


    //
    // Shows a tooltip
    //
    // @param obj The chart object
    // @param opt The options
    //
    RGraph.SVG.tooltip = function (opt)
    {
        var obj        = opt.object;
        var properties = obj.properties;

        // Fire the beforetooltip event
        RGraph.SVG.fireCustomEvent(obj, 'onbeforetooltip');


        if (!opt.text || typeof opt.text === 'undefined' || RGraph.SVG.trim(opt.text).length === 0) {
            if (typeof properties.tooltipsOverride !== 'function') {
                return;
            }
        }






        //
        // The tooltipsOverride option allows you to totally take control of
        // rendering the tooltip yourself.
        //
        if (RGraph.SVG.isFunction(properties.tooltipsOverride)) {

            // Add the body click handler that clears the highlight if necessary
            //
            document.body.addEventListener('mouseup', function (e)
            {
                obj.removeHighlight();
            }, false);

            return (properties.tooltipsOverride)(obj, opt);
        }


opt.object.removeHighlight();




        // Create the tooltip DIV element
        if (!RGraph.SVG.REG.get('tooltip')) {

            var tooltipObj        = document.createElement('DIV');
            tooltipObj.className  = properties.tooltipsCssClass;
    
    
    
    
            // Add the default CSS to the tooltip
            for (var i in RGraph.SVG.tooltips.style) {
                if (typeof i === 'string') {
                    tooltipObj.style[i] = substitute(RGraph.SVG.tooltips.style[i]);
                }
            }

            for (var i in RGraph.SVG.tooltips.css) {
                if (typeof i === 'string') {
                    tooltipObj.style[i] = substitute(RGraph.SVG.tooltips.css[i]);
                }
            }
            
            //
            // If the tooltipsCss property is populated the add those values
            // to the tooltip
            //
            if (!RGraph.SVG.isNullish(obj.properties.tooltipsCss)) {
                for (var i in obj.properties.tooltipsCss) {
                    if (typeof i === 'string') {
                        tooltipObj.style[i] = substitute(obj.properties.tooltipsCss[i]);
                    }
                }
            }




        // Reuse an existing tooltip
        } else {
            var tooltipObj = RGraph.SVG.REG.get('tooltip');
            tooltipObj.__object__.removeHighlight();
            
            // This prevents the object from continuously growing
            tooltipObj.style.width = '';
        }




        if (RGraph.SVG.REG.get('tooltip-lasty')) {
            tooltipObj.style.left = RGraph.SVG.REG.get('tooltip-lastx') + 'px';
            tooltipObj.style.top  = RGraph.SVG.REG.get('tooltip-lasty') + 'px';
        }




































        ///////////////////////////////////////
        // Do tooltip text substitution here //
        ///////////////////////////////////////
        function substitute (original)
        {
            // Ensure that it's a string first
            original = String(original);

            if (typeof opt.object.tooltipSubstitutions !== 'function') {
                return original;
            }

            // Get hold of the indexes from the sequentialIndex that we have.
            //
            if (typeof opt.object.tooltipSubstitutions === 'function') {
                var specific = opt.object.tooltipSubstitutions({
                    index: opt.sequentialIndex
                });
            }


            // This allows for escaping the percent
            var text = original.replace(/%%/g, '___--PERCENT--___')


            //
            // Draws the key in the tooltip
            //

            var keyReplacementFunction = function ()
            {
                if (!specific.values) {
                    return;
                }
            
                //
                // Allow the user to specify the key colors
                //
                var colors = properties.tooltipsFormattedKeyColors ? properties.tooltipsFormattedKeyColors : properties.colors;
                
                if (!colors) {
                    colors = [properties.colorsDefault];
                }

                // Build up the HTML table that becomes the key
                for (var i=0,str=[]; i<specific.values.length; ++i) {

                    var value = (typeof specific.values === 'object' && typeof specific.values[i] === 'number') ? specific.values[i] : 0;
                    var color = colors[i];
                    var label = ( (typeof properties.tooltipsFormattedKeyLabels === 'object' && typeof properties.tooltipsFormattedKeyLabels[i] === 'string') ? properties.tooltipsFormattedKeyLabels[i] : '');



                    // Chart specific customisations -------------------------
                    if (typeof opt.object.tooltipsFormattedCustom === 'function') {
            
                        // The index/group/sequential index
                        // The index
                        // The colors
                        var ret = opt.object.tooltipsFormattedCustom(
                            specific,
                            i,
                            colors
                        );

                        if (ret.continue) {continue;};
            
                        if (typeof ret.label === 'string') {label = ret.label;};
                        if (ret.color)                     {color = ret.color;};
                        if (typeof ret.value === 'number') {value = ret.value;};
                    }
            
            
            
            
            
            
            
            
                    value = RGraph.SVG.numberFormat({
                         object: opt.object,
                            num: value.toFixed(opt.object.properties.tooltipsFormattedDecimals),
                       thousand: opt.object.properties.tooltipsFormattedThousand  || ',',
                          point: opt.object.properties.tooltipsFormattedPoint     || '.',
                        prepend: opt.object.properties.tooltipsFormattedUnitsPre  || '',
                         append: opt.object.properties.tooltipsFormattedUnitsPost || ''
                    });
            
                    // If the tooltipsFormattedKeyColorsShape property is set to circle then add
                    // some border-radius to the DIV tag
                    //
                    var borderRadius = 0;
                    
                    if (   typeof opt.object.properties.tooltipsFormattedKeyColorsShape === 'string'
                        && opt.object.properties.tooltipsFormattedKeyColorsShape === 'circle') {
            
                        borderRadius = '100px';
                    }
            
                    // Facilitate the  property that allows CSS to be added to
                    // the tooltip key color blob
                    var tooltipsFormattedKeyColorsCss = '';
                    if (properties.tooltipsFormattedKeyColorsCss) {
                        for(property in properties.tooltipsFormattedKeyColorsCss) {
                            if (typeof property === 'string') {
                                tooltipsFormattedKeyColorsCss += '{1}: {2};'.format(property.replace(/[A-Z]/, function (match)
                                {
                                    return '-' + match.toLowerCase();
                                }), String(properties.tooltipsFormattedKeyColorsCss[property]));
                            }
                        }
                    }
            
                    str[i] = '<tr><td><div class="RGraph_tooltipsFormattedKeyColor" id="RGraph_tooltipsFormattedKeyColor_' + i + '" '
                        + '>Ml</div></td><td>'
                        + '<span id="RGraph_tooltipsFormattedKeyLabel_' + i + '">' + label + '</span>'
                        + ' ' + value + '</td></tr>';

                    // Now that styles can't be applied inline
                    // (due to the CSP header) then apply them with
                    // JavaScript after a small delay.
                    (function (index, color, borderRadius)
                    {
                        setTimeout(function ()
                        {
                            // Align the label left
                            var node = document.getElementById('RGraph_tooltipsFormattedKeyLabel_' + index);
                            if (node) {
                                node.style.textAlign = 'left'
                            }

                            // Add some styles to the color blob
                            var colorBlob = document.getElementById('RGraph_tooltipsFormattedKeyColor_' + index);
                            
                            if (colorBlob) {
                                colorBlob.style.textAlign       = 'left';
                                colorBlob.style.backgroundColor = color;
                                colorBlob.style.color           = 'transparent';
                                colorBlob.style.pointerEvents   = 'none';
                                colorBlob.style.borderRadius    = borderRadius;

                                // Add user specified styles from the
                                // tooltipsFormattedKeyColorsCss property
                                for (var property in tooltipsFormattedKeyColorsCss) {
                                    if (typeof property === 'string') {
                                        colorBlob.style[property] = tooltipsFormattedKeyColorsCss[property];
                                    }
                                }
                            }
                            
                            // Set the default color for the table to inherit
                            var node = document.getElementById('RGraph_tooltipsFormattedKey_table')
                            if (node) {
                                node.style.color = 'inherit';
                            }

                        }, 1);
                    })(i, color, borderRadius);
               }
                str = str.join('');
            
                // Add the key to the tooltip text - replacing the placeholder
                text = text.replace('%{key}', '<table id="RGraph_tooltipsFormattedKey_table">' + str + '</table>');
            };
            
            keyReplacementFunction();













            // Replace the index of the tooltip
            text = text.replace(/%{index}/g, specific.index);
            
            // Replace the dataset/group of the tooltip
            text = text.replace(/%{dataset2}/g, specific.dataset2); // Used by the Bipolar
            text = text.replace(/%{dataset}/g, specific.dataset);
            text = text.replace(/%{group2}/g, specific.dataset2); // Used by the Bipolar
            text = text.replace(/%{group}/g, specific.dataset);
            
            // Replace the sequentialIndex of the tooltip
            text = text.replace(/%{sequential_index}/g, specific.sequentialIndex);
            text = text.replace(/%{seq}/g, specific.sequentialIndex);
















            //Do %{list} sunstitution
            if (text.indexOf('%{list}') !== -1) {
                (function ()
                {
                    if (properties.tooltipsFormattedListType === 'unordered') properties.tooltipsFormattedListType = 'ul';
                    if (properties.tooltipsFormattedListType === '<ul>')      properties.tooltipsFormattedListType = 'ul';
                    if (properties.tooltipsFormattedListType === 'ordered')   properties.tooltipsFormattedListType = 'ol';
                    if (properties.tooltipsFormattedListType === '<ol>')      properties.tooltipsFormattedListType = 'ol';
            
                    var str   = properties.tooltipsFormattedListType === 'ol' ? '<ol id="rgraph_formatted_tooltips_list">' : '<ul id="rgraph_formatted_tooltips_list">';
                    var items = properties.tooltipsFormattedListItems[specific.sequentialIndex];
                    
                    if (items && items.length) {
                        for (var i=0; i<items.length; ++i) {
                            str += '<li>' + items[i] + '</li>';
                        }
                    }
                    
                    str += properties.tooltipsFormattedListType === 'ol' ? '</ol>' : '</ul>';
                    
                    // Add the list to the tooltip
                    text = text.replace(/%{list}/, str);
                    
                })();
            }












            // Do table substitution (ie %{table} )
            if (text.indexOf('%{table}') !== -1) {
                (function ()
                {
                    var str = '<table>';
            
                    // Add the headers if they're defined
                    if (properties.tooltipsFormattedTableHeaders && properties.tooltipsFormattedTableHeaders.length) {
                        str += '<thead><tr>';
                        for (var i=0; i<properties.tooltipsFormattedTableHeaders.length; ++i) {
                            str += '<th>' + properties.tooltipsFormattedTableHeaders[i] + '</th>';
                        }
                        str += '</tr></thead>';
                    }





                    // Add each row of data
                    if (typeof properties.tooltipsFormattedTableData === 'object' && !RGraph.SVG.isNullish(properties.tooltipsFormattedTableData)) {
                        str += '<tbody>';
                        for (var i=0; i<properties.tooltipsFormattedTableData[specific.sequentialIndex].length; ++i) {
                            str += '<tr>';
                            for (var j=0; j<properties.tooltipsFormattedTableData[specific.sequentialIndex][i].length; ++j) {
                                str += '<td>' + String(properties.tooltipsFormattedTableData[specific.sequentialIndex][i][j]) + '</td>';
                            }
                            str += '</tr>';
                        }
                
                        str += '</tbody>';
                    }
                    
                    // Close the table
                    str += '</table>';
            
                    text = text.replace(/%{table}/g, str);
                })();
            }













            // Do property substitution when there's an index to
            // the property
            var reg = /%{pr?o?p?(?:erty)?:([_a-z0-9]+)\[([0-9]+)\]}/i;

            while (text.match(reg)) {

                var property = RegExp.$1;
                var index    = parseInt(RegExp.$2);

                if (opt.object.properties[property]) {
                    text = text.replace(
                        reg,
                        opt.object.properties[property][index] || ''
                    );
                
                // Get rid of the text
                } else {
                    text = text.replace(reg,'');
                }
                    
                RegExp.lastIndex = null;
            }




            // Third, replace this: %{property:xxx} (but there's no index to the property)
            while (text.match(/%{property:([_a-z0-9]+)}/i)) {
                var str = '%{property:' + RegExp.$1 + '}';
                text    = text.replace(str, opt.object.properties[RegExp.$1]);
            }




            // Fourth, replace this: %%prop:xxx%%
            while (text.match(/%{prop:([_a-z0-9]+)}/i)) {
                var str = '%{prop:' + RegExp.$1 + '}';
                text    = text.replace(str, opt.object.properties[RegExp.$1]);
            }




            // Fourth, replace this: %%p:xxx%%
            while (text.match(/%{p:([_a-z0-9]+)}/i)) {
                var str = '%{p:' + RegExp.$1 + '}';
                text    = text.replace(str, opt.object.properties[RegExp.$1]);
            }




            // THIS IS ONLY FOR A NON-EQUI-ANGULAR ROSE CHART
            //
            // Replace this: %{value2}
            if (opt.object.type === 'rose' && opt.object.properties.variant === 'non-equi-angular') {
                while (text.match(/%{value2}/i)) {
                    text    = text.replace('%{value2}', specific.value2);
                }
            }




            // Fifth and sixth, replace this: %{value} and this: %{value_formatted}
            while (text.match(/%{value(?:_formatted)?}/i)) {
                
                var value = specific.value;
                
                //
                // Special case for the Waterfall chart and mid totals
                //
                if (opt.object.type === 'waterfall' && specific.index != opt.object.data.length - 1 && RGraph.SVG.isNullish(value)) {
                    
                    for (var i=0,tot=0; i<specific.index; ++i) {
                        tot += opt.object.data[i];
                    }
                    value = tot;
                }

                if (text.match(/%{value_formatted}/i)) {
                    text = text.replace(
                        '%{value_formatted}',
                        typeof value === 'number' ? RGraph.SVG.numberFormat({
                            object:    opt.object,
                            num:      value.toFixed(opt.object.properties.tooltipsFormattedDecimals),
                            thousand: opt.object.properties.tooltipsFormattedThousand  || ',',
                            point:    opt.object.properties.tooltipsFormattedPoint     || '.',
                            prepend:  opt.object.properties.tooltipsFormattedUnitsPre  || '',
                            append:   opt.object.properties.tooltipsFormattedUnitsPost || ''
                        }) : null
                    );
                } else {
                    text = text.replace('%{value}', value);
                }
            }
















          ////////////////////////////////////////////////////////////////
         // Do global substitution when there's an index to the global //
        ////////////////////////////////////////////////////////////////
        var reg = /%{global:([_a-z0-9.]+)\[([0-9]+)\]}/i;

        while (text.match(reg)) {

            var name  = RegExp.$1,
                index = parseInt(RegExp.$2);

            if (eval(name)) {
                text = text.replace(
                    reg,
                    eval(name)[index] || ''
                );

            // Get rid of the text if there was nothing to replace the template bit with
            } else {
                text = text.replace(reg,'');
            }
                
            RegExp.lastIndex = null;
        }
















          //////////////////////////////////////////////////
         // Do global substitution when there's no index //
        //////////////////////////////////////////////////
        var reg = /%{global:([_a-z0-9.]+)}/i;

        while (text.match(reg)) {

            var name = RegExp.$1;

            if (eval(name)) {
                text = text.replace(
                    reg,
                    eval(name) || ''
                );

            // Get rid of the text if there was nothing to replace the template bit with
            } else {
                text = text.replace(reg,'');
            }
                
            RegExp.lastIndex = null;
        }
















            // And lastly - call any functions
            // MUST be last
            var regexp = /%{function:([_A-Za-z0-9]+)\((.*?)\)}/;

            // Temporarily replace carriage returns and line feeds with CR and LF
            // so the the s option is not needed
            text = text.replace(/\r/,'|CR|');
            text = text.replace(/\n/,'|LF|');

            while (text.match(regexp)) {

                var str  = RegExp.$1 + '(' + RegExp.$2 + ')';
                
                for (var i=0,len=str.length; i<len; ++i) {
                    str  = str.replace(/\r?\n/, "\\n");
                }
                
                RGraph.SVG.REG.set('tooltip-templates-function-object', opt.object);

                var func = new Function ('return ' + str);
                var ret  = func();

                text = text.replace(regexp, ret)
            }










            // Do color blob replacement
            text = text.replace(/%{color\:([^}]+)}/g, '<div style="display: inline-block; background-color: $1; scale: 0.9;color: transparent">Mj</div>');
            
            
            
            
            
            
            
            
            
            
            
            
            // Replace CR and LF with a space
            text = text.replace(/\|CR\|/, ' ');
            text = text.replace(/\|LF\|/, ' ');







            
            // Replace line returns with br tags
            text = text.replace(/\r?\n/g, '<br />');
            text = text.replace(/___--PERCENT--___/g, '%')


            return text.toString();
        }

        // Save the original text on the tooltip
        tooltipObj.__original_text__  = opt.text;

        opt.text = substitute(opt.text);


        // Add the pointer if requested. The background color is updated to match the
        // tooltip a further down.
        if (opt.object.properties.tooltipsPointer) {
            opt.text += '<div id="RGraph_tooltipsPointer_' + opt.object.id + '"></div>';
        }



















        tooltipObj.innerHTML  = opt.text;
        tooltipObj.__text__   = opt.text; // This is set because the innerHTML can change when it's set
        tooltipObj.id         = '__rgraph_tooltip_' + obj.id + '_' + obj.uid + '_'+  opt.index;
        tooltipObj.__event__  = properties.tooltipsEvent || 'click';
        tooltipObj.__object__ = obj;












        // Add the index
        if (typeof opt.index === 'number') {
            tooltipObj.__index__ = opt.index;
        }

        // Add the dataset
        if (typeof opt.dataset === 'number') {
            tooltipObj.__dataset__ = opt.dataset;
        }

        // Add the group
        if (typeof opt.group === 'number' || RGraph.SVG.isNullish(opt.group)) {
            tooltipObj.__group__ = opt.group;
        }

        // Add the sequentialIndex
        if (typeof opt.sequentialIndex === 'number') {
            tooltipObj.__sequentialIndex__ = opt.sequentialIndex;
        }




        // Add the tooltip to the document
        document.body.appendChild(tooltipObj);









// Set styles on the pointer. It's done this way
// (not adding the style to the HTML above) to
// prevent an error bein thrown should a
// Content-Security-Policy header using style-src
// be in place
var pointerObj = document.getElementById('RGraph_tooltipsPointer_' + opt.object.id + '');
if (pointerObj) {
    var styles     = window.getComputedStyle(tooltipObj, false);
    
    pointerObj.style.backgroundColor = styles.backgroundColor;
    pointerObj.style.color           = 'transparent';
    pointerObj.style.position        = 'absolute';    
    pointerObj.style.bottom          = -5 + (RGraph.SVG.isNumber(obj.properties.tooltipsPointerOffsety) ? obj.properties.tooltipsPointerOffsety : 0) + 'px';
    pointerObj.style.left            = 'calc(50% + ' + (RGraph.SVG.isNumber(obj.properties.tooltipsPointerOffsetx) ? obj.properties.tooltipsPointerOffsetx : 0) + 'px)';
    pointerObj.style.transform       = 'translateX(-50%) rotate(45deg)';
    pointerObj.style.width           = '10px';
    pointerObj.style.height          = '10px';
}
        
        var width  = tooltipObj.offsetWidth,
            height = tooltipObj.offsetHeight;



        // Set these properties to 0 (ie an integer) in case chart libraries are missing
        // default values for them
        obj.properties.tooltipsOffsetx = obj.properties.tooltipsOffsetx || 0;
        obj.properties.tooltipsOffsety = obj.properties.tooltipsOffsety || 0;

        // Move the tooltip into position
        tooltipObj.style.left = opt.event.pageX - (width / 2) + obj.properties.tooltipsOffsetx + 'px';
        
        // Prevent the top of the tooltip from being placed off the top of the page
        var y = opt.event.pageY - height - 15;

        if (y < 0) {
            y = 5;
        }

        tooltipObj.style.top  = y + obj.properties.tooltipsOffsety + 'px';




        //
        // Set the width on the tooltip so it doesn't resize if the window is resized
        //
        tooltipObj.style.width = width + 'px';


        //
        // Now that the tooltip pointer has been added, determine the background-color and update
        // the color of the pointer
        if (opt.object.properties.tooltipsPointer) {

            var styles = window.getComputedStyle(tooltipObj, false);
            var pointer = document.getElementById('RGraph_tooltipsPointer_' + opt.object.id + '');

            pointer.style.backgroundColor = styles.backgroundColor;

            // Add the pointer to the tooltip as a property
            tooltipObj.__pointer__ = pointer;

            // Facilitate the  property that allows CSS to be added to
            // the tooltip key color blob
            var tooltipsPointerCss = '';

            if (opt.object.properties.tooltipsPointerCss) {
            
                var pointerDiv = document.getElementById('RGraph_tooltipsPointer_' + opt.object.id + '');
            
                for(property in opt.object.properties.tooltipsPointerCss) {
                    if (typeof property === 'string') {
                        pointerDiv.style[property] = opt.object.properties.tooltipsPointerCss[property];
                    }
                }
            }
        }

        // Fade the tooltip in if the tooltip is the first view
        //if (!RGraph.SVG.REG.get('tooltip-lastx')) {
        //    for (var i=0; i<=30; ++i) {
        //        (function (idx)
        //        {
        //            setTimeout(function ()
        //            {
        //                tooltipObj.style.opacity = (idx / 30) * 1;
        //            }, (idx / 30) * 200);
        //        })(i);
        //    }
        //}




        // If the left is less than zero - set it to 5
        if (parseFloat(tooltipObj.style.left) <= 5) {
            tooltipObj.style.left = 5 + obj.properties.tooltipsOffsetx + 'px';
        }

        // If the tooltip goes over the right hand edge then
        // adjust the positioning
        if (parseFloat(tooltipObj.style.left) + parseFloat(tooltipObj.style.width) > window.innerWidth) {
            tooltipObj.style.left  = ''
            tooltipObj.style.right = 5 + obj.properties.tooltipsOffsety + 'px'
        }












        //
        // Allow for static positioning.
        //
        if (opt.object.properties.tooltipsPositionStatic && RGraph.SVG.isFunction(opt.object.positionTooltipStatic)) {

            opt.object.positionTooltipStatic({
                object:  opt.object,
                event:   opt.event,
                tooltip: tooltipObj,
                index:   tooltipObj.__sequentialIndex__
            });
            
            // Allow for offsetting the position
            tooltipObj.style.left = parseFloat(tooltipObj.style.left) + obj.properties.tooltipsOffsetx + 'px';
            tooltipObj.style.top  = parseFloat(tooltipObj.style.top)  + obj.properties.tooltipsOffsety + 'px';
        }



















//
// Move the tooltip and its pointer ifthey're off-screen LHS
//
if (parseInt(tooltipObj.style.left) < 0) {
    var left  = parseInt(tooltipObj.style.left);
    var width = parseInt(tooltipObj.style.width)

    left = left + (width * 0.1 * 4);
    
    tooltipObj.style.left = left + 'px';
    var pointer =  document.getElementById('RGraph_tooltipsPointer_' + opt.object.id + '');

    if (pointer) {
        (function (pointer)
        {
            setTimeout(function ()
            {
                pointer.style.left = 'calc(10% + 5px)';
            }, 1);
        })(pointer);
    }


//
// Move the tooltip and its pointer ifthey're off-screen RHS
//
} else if ( (parseInt(tooltipObj.style.left) + parseInt(tooltipObj.offsetWidth)) > document.body.offsetWidth) {
    var left  = parseInt(tooltipObj.style.left);
    var width = parseInt(tooltipObj.style.width)
    
    left = left - (width * 0.1 * 4);
    
    tooltipObj.style.left = left + 'px';
    var pointer = document.getElementById('RGraph_tooltipsPointer_' + opt.object.id + '');
    
    (function (pointer)
    {
        setTimeout(function ()
        {
            if (pointer) {
                pointer.style.left = 'calc(90% - 5px)';
            }
        }, 1);
    })(pointer);
}







        // If the canvas has fixed positioning then set the tooltip position to
        // fixed too
        if (RGraph.SVG.isFixed(obj.svg)) {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;

            tooltipObj.style.position = 'fixed';
            tooltipObj.style.top      = opt.event.pageY - scrollTop - height - 10 + obj.properties.tooltipsOffsety + 'px';
        }



        // Cancel the mousedown event
        tooltipObj.onmousedown = function (e)
        {
            e.stopPropagation();
        };

        // Cancel the mouseup event
        tooltipObj.onmouseup = function (e)
        {
            e.stopPropagation();
        };

        // Cancel the click event
        tooltipObj.onclick  = function (e)
        {
            if (e.button == 0) {
                e.stopPropagation();
            }
        };
        
        // Add the body click handler that clears the tooltip
        document.body.addEventListener('mouseup', function (e)
        {
            RGraph.SVG.hideTooltip();
        }, false);





        //
        // Keep a reference to the tooltip in the registry
        //
        RGraph.SVG.REG.set('tooltip', tooltipObj);
        RGraph.SVG.REG.set('tooltip-lastx', parseFloat(tooltipObj.style.left));
        RGraph.SVG.REG.set('tooltip-lasty', parseFloat(tooltipObj.style.top));













/////////////////////////
// PERSISTENT tooltips //
/////////////////////////


    //
    // Enable persistent tooltips if requested
    //
    if (opt.object.get('tooltipsPersistent')) {
    
        if (!RGraph.SVG.tooltip.persistent) {
            RGraph.SVG.tooltip.persistent = {divs:[]};
        }

        setTimeout(function ()
        {
            // Change the pointer ID
            var pointer = document.getElementById('RGraph_tooltipsPointer_' + opt.object.id);
            if (pointer) {
                pointer.id += '_' + RGraph.SVG.random(18564, 999999);
            }

            // Save a reference to all of the tooltip DIV
            // objects
            RGraph.SVG.tooltip.persistent.divs.push(RGraph.SVG.REG.get('tooltip'));

            // Set the tooltips reference to null
            RGraph.SVG.REG.set('tooltip', null);
            
            // Set the last coords (for the slide effect)
            // to null
            //RGraph.tooltip_slide_effect_previous_x_coordinate = null;
            //RGraph.tooltip_slide_effect_previous_y_coordinate = null;
            //
        }, 50);

        //
        // A function to clear all of the persistent
        // tooltip DIV tags
        //
        RGraph.SVG.tooltip.persistent.clear =
        RGraph.SVG.tooltip.persistent.clearAll = function ()
        {
            var els = document.getElementsByClassName(opt.object.get('tooltipsCSSClass'));
            
            // Create a real array - not an HTMLCollection
            var arr = Array.from(els);

            for (let i=0,len=arr.length; i<len; ++i) {
                arr[i].parentNode.removeChild(arr[i]);
            }
            
            RGraph.SVG.redraw();
        }
    }
/////////////////
/////////////////
/////////////////




        //
        // Fire the tooltip event
        //
        RGraph.SVG.fireCustomEvent(obj, 'ontooltip');
    };



// End module pattern
})(window, document);