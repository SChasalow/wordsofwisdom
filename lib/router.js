Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('userhome');
Router.route('wisdom');
Router.route('about');
Router.route('phrases');
Router.route('search');
Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 
		
		return Meteor.users.findOne({_id:this.params._id})
	}
});
Router.route('/profileEdit/:_id',
	{name:'profileEdit',
	data: function(){ return Meteor.users.findOne({_id:this.params._id})}
});

Router.route('/category/:category',
	{name:'category',
	 data: function() {
	  var cat = this.params.category;
	  cat = cat[0].toUpperCase() + cat.substring(1)
	  var quotes = Quotes.find({category:this.params.category});
	  
	  	return( {category:cat,  quotes: quotes}  );
	  }
    }
 );