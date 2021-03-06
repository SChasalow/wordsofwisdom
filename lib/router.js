Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'welcome'});
//Router.route('userhome');
Router.route('search');
Router.route('about');
Router.route('feedback');
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

Router.route('/myprofile',
	{name:'myprofile',
template:'profile',
	data: function(){
		return Meteor.users.findOne({_id:Meteor.userId()})
	}
});




Router.route('/category/:category',
	{name:'category',
	 data: function() {
	  var now = new Date().getTime();
      var yesterday = new Date(now - 86400000);
	  var cat = this.params.category;
	  cat = cat[0].toUpperCase() + cat.substring(1)
	  var quotes = Quotes.find({category:this.params.category,createdAt:{$gt:yesterday}},{sort:{likes:-1}});

	  	return( {category:cat,  quotes: quotes}  );
	  }
    }
 );
