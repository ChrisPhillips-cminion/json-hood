var util = require('util');
var contarrow = "├────>";
var endarrow = "└────>";



function processArray(array, count) {
    'use strict';
    var output = '',
        countClone,
        arrow;
    array.forEach(function (object, index) {
        countClone = count.slice();

        var spacer = "";
        countClone.forEach(function (entry) {
            if (entry) {
                spacer = spacer + "│\t";
            } else {
                spacer = spacer + " \t";
            }
        });
        countClone.push(!(array.length - 1 === index));
        arrow = contarrow;
        if (array.length - 1 === index) {
            arrow = endarrow;
        }
        output = output + "\n" + (spacer + arrow + " [" + index + "]");
        output = output + (GetJSONasArrowDiagram(object, countClone));
    });
    return output;
}



function GetJSONasArrowDiagram(jsonObject, count, output) {
    'use strict';
    var spacer = "",
        key,
        arrow = contarrow,
        index = 0,
        countClone,
	ignoreFirst =false;
    if (output === undefined) {
        output = "";
    }
    if (count === undefined) {
        count = [];
	ignoreFirst=true;
    }
    else {
   	count.forEach(function (entry) {
      	 	if (entry) {
        	    spacer = spacer + "│\t";
	        } else {
	            spacer = spacer + " \t";
        	}
	});
    }
    if (typeof jsonObject === "string") {
        output = output + "\n" + (spacer + endarrow   + jsonObject);
    } else {
    for (key in jsonObject) {

        countClone = count.slice();
	if (ignoreFirst) {
		arrow = "";	
	}
	else if (Object.keys(jsonObject).length - 1 === index++) {
            arrow = endarrow;
            countClone.push(false);
        } else {
            countClone.push(true);
            arrow = contarrow;
        }
        if (util.isFunction(jsonObject[key])) {

        }
        else if (util.isArray(jsonObject[key])) {
            output = output + "\n" + (spacer + arrow + key);
            output = output + processArray(jsonObject[key], countClone);
        } else  if (typeof jsonObject[key] === "object") {
            output = output + "\n"+ (spacer + arrow + key);
            output = output + GetJSONasArrowDiagram(jsonObject[key], countClone);
        } else {
            output = output + "\n" + (spacer + arrow + key + ' :  ' + jsonObject[key]);
        }
}
    }
    return output;
}


exports.printJSONasArrowDiagram = function (jsonObject) {
    'use strict';
    console.log(GetJSONasArrowDiagram(jsonObject));
};
exports.getJSONasArrowDiagram = function (jsonObject) {
    'use strict';
    return GetJSONasArrowDiagram(jsonObject);
};
