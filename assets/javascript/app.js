$(document).ready(function() {

var topics = ["Lionel Messi", "Diego Maradona", "Pele", "Zinedine Zidane", "Andres Iniesta", "Xavi", "Ibrahimovic", "Thierry Henry", "Frank Lampard", "Neymar", "Carles Puyol", "Paul Pogba"]




//Function to create buttons
function createButtons() {
    $("#buttons").empty();
    for (i=0;i<topics.length;i++) {
        var newButton = $("<button>")
        newButton.addClass("gif-button btn btn-info")
        newButton.text(topics[i])
        newButton.val(topics[i])
        $("#buttons").append(newButton)
    }
}

createButtons();

$(document.body).on("click", ".gif-button", function() {
    var searchTag = this.value
    console.log(searchTag)
    var gifKey = "8pfzJ6HMlxspmR7FHDexfN7c1ywi62NR"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTag + "&api_key=" + gifKey + "&limit=10"
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        results = response.data
        console.log(queryURL)
        console.log(results);
        for (i=0;i<results.length;i++) {
            var newDiv = $("<div>")
            newDiv.addClass("gif-box")
            newGif = $("<img>")
            newGif.addClass("gif-image")
            newGif.attr("src",results[i].images.fixed_height_small_still.url)
            newGif.attr("gif-motion", results[i].images.fixed_height_small.url)
            newGif.attr("gif-still",results[i].images.fixed_height_small_still.url)
            newGif.attr("status", "still")
            var newRating = $("<div>")
            newRating.text("Rating: " + results[i].rating.toUpperCase())
            newDiv.append(newGif)
            newDiv.append(newRating)
            $("#gifs-appear-here").prepend(newDiv);
        }
        
    })

})

$(document.body).on("click", ".gif-image", (function() {
    if ($(this).attr("status") == "still") {
        $(this).attr("src", $(this).attr("gif-motion"))
        $(this).attr("status", "motion")
    }
    else if ($(this).attr("status") == "motion") {
        $(this).attr("src", $(this).attr("gif-still"))
        $(this).attr("status", "still")
    }

}))

$("#gif-submit").on("click", function() {
    event.preventDefault();
    searchTerm = $("#gif-input").val().trim();
    $("#gif-input").val("");
    topics.push(searchTerm);
    createButtons();
})


})
