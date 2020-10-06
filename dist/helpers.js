import { allowedExts } from './_GLOBALS.js';
export var getMediaTypeByUrl = function (url) {
    var targetExt = url.split('.').pop();
    for (var _i = 0, _a = Object.entries(allowedExts); _i < _a.length; _i++) {
        var _b = _a[_i], mediaType = _b[0], exts = _b[1];
        if (exts.includes(targetExt)) {
            return mediaType;
        }
    }
    return false;
};
