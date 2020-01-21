export function formateJsonData(arrSearchResults) {
    arrSearchResults = Array.isArray(arrSearchResults) ? arrSearchResults : [arrSearchResults];
    let newJson;
    const arrNewSearchResult = [];
    arrSearchResults.forEach((node) => {
        newJson = {};
        Object.keys(node).forEach(key => {
            delete (node[key]._attributes);
            if (node[key]._text !== undefined) {
                newJson[key] = node[key]._text
            } else if (node[key]._cdata !== undefined) {
                newJson[key] = node[key]._cdata
            } else {
                let formatedResult = formateJsonData([node[key]]);
                newJson[key] = Array.isArray(formatedResult) ? formatedResult[0] : formatedResult;
            }
        });
        arrNewSearchResult.push(newJson);
    });
    return arrNewSearchResult;
}

export const truncate = (input, charactersCnt) => input.length > charactersCnt ? `${input.substring(0, charactersCnt)}...` : input;