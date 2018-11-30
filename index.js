//Use npm package json-loader to parse json tests
//Import JSON test data
const json = require('./testData.json');
const json2 = require('./testData2.json');

//create empty arrays to store categorized links.
let validLinks = [];
let invalidLinks = [];
let duplicateLinks = [];

//Function to catagorize links as valid, invalid, and duplicates
const catagorizeLinks = function (json) {
    //Destructure json.pages to create an array json.pages' addresses
    let addressArray = json.pages.map((each) => {return each.address})
    //Nested for loop will iterate through the 2 levels of test data 
    for (let i = 0; i < json.pages.length; i ++) {
        //Alias for convenience 
        let currentLink = json.pages[i].address;
        let linkArray = json.pages[i].links;
        //Conditional to categorize top level links (addresses) as valid links and/or duplicates
        if (validLinks.includes(currentLink) || invalidLinks.includes(currentLink)) {
            duplicateLinks.push(currentLink);
        }else {
            validLinks.push(currentLink);
        }
        for (let j = 0; j < linkArray.length; j ++){
            //Alias for convenience
            let localLink = linkArray[j]
            //Conditional to categorize 2nd level links as valid or invalid links, and/or duplicates
            if (validLinks.includes(localLink) || invalidLinks.includes(localLink)){
                duplicateLinks.push(localLink);
            }else if (addressArray.includes(localLink)){
                validLinks.push(localLink);  
            }else if (!addressArray.includes(localLink)){
                invalidLinks.push(localLink);
            }
        }
    }
    printInspection(); 
}

function printInspection () {
    console.log("Valid Links:");
    console.log(validLinks);
    console.log("Invalid Links:");
    console.log(invalidLinks);
    console.log("Duplicate Links:");
    console.log(duplicateLinks);
    console.log()
    }

catagorizeLinks(json);