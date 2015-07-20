// This is the code for the newquote template.
// It adds a new quote to the database when the user presses the save button.
// It has three local variables which store the author, quote, and likes values
// when the user modifies one of these fields in the browser, the local value is stored here
// when they press on the save button, the new quote is created and inserted into the Quotes collection


  Template.newquote.events({

	  'click button#saveQuote': function(event){
		  // read the author and quote text from the browser window



		  var newQuoteText = $("#newquotetext").val();
      var e = document.getElementById("categories")
      var newCat = e.options[e.selectedIndex].value;
      var newtaglist = (($("#newtags").val()).toLowerCase()).split(",");
      var newTags = [];
      $.each(newtaglist, function(i, el){
    if($.inArray(el, newTags) === -1) newTags.push(el);
});



		  // and erase the fields so the user can add another quote later


		  // create a new quote object and upload it to the server!
		  var quote =
		  	{quote:newQuoteText,
          tags:newTags,
          category:newCat,
		  		likes:1,
          flags:0,
		  		likers:[Meteor.userId()],
          savers:[],
          flaggers: [],
		  		createdAt: new Date(),
		  		createdBy: Meteor.user().emails[0].address,
		  		user:Meteor.userId()};  // create the JSON object representing the quote
		  		 if(newTags, newQuoteText == ""){
                alert("Please Type a Message");
                return false;
         };
         if (newQuoteText.length > 400){
              alert("Message cannot exceed 400 characters");
              return false;
       };
		  Quotes.insert(quote);
      $("#newquotetext").val("");
      $("#newtags").val("");
		  Meteor.user().emails[0].address
	  }

  })
