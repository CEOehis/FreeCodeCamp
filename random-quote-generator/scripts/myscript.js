$(document).ready(function() {
	var quotesApi = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=?&lang=en";
	function displayQuote() {
		$.getJSON(quotesApi, function(json) {
			$("#displayDiv").empty();
			$(".quoteDisplay").append(" ")
			$(".quoteDisplay").append(json.quoteText);
			$(".authorDisplay").text("-" + json.quoteAuthor);
		});
	}
    displayQuote();

	$("#newQuote").on("click", function() {
		displayQuote();
	});	

	$("#newQuote").focus();

});

function tweetIt() {
		var quote, author, tweetUrl;
		quote = document.getElementById("displayDiv").innerText;
		author = document.getElementById("authorDisplayDiv").innerText;
		tweetUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + '"' +
		 encodeURIComponent(quote) + '"' + ' ' + encodeURIComponent(author);
		 
		window.open(tweetUrl);

		}
