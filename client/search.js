Template.search.helpers({
   quotes: function () {
   	var sessionKey = Session.get("keyword");
   	
   
   return Quotes.find({tags:sessionKey}).fetch(); // we are finding all of the quotes on the server to show on the client
  },
});

Template.search.events({

  'click #searchButton': function (event) {
 		 var keyword = $("#searchWorking").val();
 		
 		if (keyword.length > 0 ){
 			$("#validation").html("");

 			
 			Session.set("keyword",keyword);
 		}else{
 			$("#validation").html("Please type a message");
 			$("#searchResult").html("");
 		}
  }

});

Template.search.rendered = function(){
};

