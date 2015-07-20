Template.userhome.helpers({
	savedQuotes: function(){

		return _.map(Meteor.user().profile.SavedQuotes,
			function(x){
				console.log("quote: "+x);
				var z = Quotes.findOne(x);
				console.dir(z);
				return z })
	} 

});


