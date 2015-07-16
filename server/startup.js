Meteor.startup(function(){
	if (Quotes.find({}).count()==0){
		
		Quotes.insert({quote:"Sunshine is the best disinfectant",author:"Louis Brandeis",likes:1});
		
		Quotes.insert(
			{quote:"Ask not what your country can do for you, ask what you can do for your country.", 
			 author:"JFK",
			 likes:1});
	}
})