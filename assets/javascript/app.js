$(document).ready(function () {

    var apiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var key = "&api-key=mAREy4OZGu5yDAfpzXgwCZOguhAowON3";
    var searchString = "";
    var queryURL;
    var articleNumber = 0;

    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

    $(".clear").click(function () {
        articleNumber = 0;
        $("#search-string").val("");
        $("#article-results").empty();
    });

    $(".search").on("click", function () {
        $("#article-results").empty();
        articleNumber = 0;
        searchString = $("#search-string").val();
        queryURL = apiURL + "q=" + searchString + key;
        console.log('query: ', queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            // console.log(result);
            // console.log(result.response.docs);
            // console.log(result.response.docs.length);
            // console.log(result.response.docs[0].headline.main)
            // console.log(result.response.docs[0].abstract)
            // console.log(result.response.docs[0])
            for (i = 0; i < result.response.docs.length; i++) {
                articleNumber++;
                var article = $("<div>");
                article.addClass("well well-lg row");
                var title = $("<h3>");
                title.addClass("title");
                title.text(result.response.docs[i].headline.main);
                var description = $("<p>");
                description.addClass("description");
                description.text(result.response.docs[i].abstract);
                var number = $("<div class='articleNumber'>").text(articleNumber);
                $(article).append(number, title, description);
                $("#article-results").append(article);
                // console.log(result.response.docs[i].headline.main)
                // console.log(result.response.docs[i].abstract)
            }
        });
    });


});