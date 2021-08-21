//Load a book from disk
function loadBook(filename, displayName) {
    let currentBook = "";
    let url = "books/" + filename;

    //reset our UI
    document.getElementById("filename").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";

    //create a server arequest to load our book
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText;

            getDocStats(currentBook);

            //remove line breaks and carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

            document.getElementById("fileContent").innerHTML = currentBook;
            var elmnt = document.getElementById("fileContent");
            elmnt.scrollTop = 0;
        }
    };
}

//get the stats for the book
function getDocStats(fileContent) {
    var docLength = document.getElementById("doclength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");

    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDictionary = {};

    //Count every word in the wordArray
    for (let word in wordArray) {
        let wordValue = wordArray[word];
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue]  + 1;
        } else {
            wordDictionary[wordValue] = 1;
        }
    }

    //sort the array
    let wordList = sortProperties(wordDictionary);

    //return the top 5 words
    var top5Words = wordList.slice(0, 6);
    var least5Words = wordList.slice(-6, wordList.length);

    //Write the values of the page
    ULTemplate(top5Words, document.getElementById("mostUsed"));
    ULTemplate(least5Words, document.getElementById("leastUsed"));

}

function ULTemplate(items, element) {
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + " : " + items[i][1] + "times(s)");
    }

    element.innerHTML = resultsHTML;
}

function sortProperties(obj) {
    //first covert the obj to an array
    let rtnArray = Object.defineProperties(obj);

    //sort the array
    rtnArray.sort(function (first, second){
        return second[1] - first[1];
    });

    return rtnArray;
}








