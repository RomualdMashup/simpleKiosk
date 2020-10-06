import { allowedExts } from './_GLOBALS.js';

export const getMediaTypeByUrl = (url: string): string | false => {
    const targetExt = url.split('.').pop();
    for (const [mediaType, exts] of Object.entries(allowedExts)) {
        if (exts.includes(targetExt)) {
            return mediaType;
        }
    }
    return false;
}