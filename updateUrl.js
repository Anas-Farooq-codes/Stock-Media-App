"use strict";


/**
 *  Import
*/

import { urlEncode } from "./urlEncode.js";


/**
 * 
 * @param {*} filterObj filter object
 * @param {*} searchType Search Type eg 'videos' or 'photos'
 */

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const /** {String} */ root = window.location.origin;
        const /** {String} */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    }, 500)

}