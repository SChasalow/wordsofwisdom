Quotes = new Mongo.Collection("quotes");


// here is where we can define operations that the client can ask the server to perform on the collection
// in this case we have one operation which is to count the number of quotes
// this is invoked in the client using the Meteor.call method
//		var num = Meteor.call("countQuotes")

Meteor.methods({
	
	countQuotes: function(){
		return Quotes.find({}).count();
	}
	
})