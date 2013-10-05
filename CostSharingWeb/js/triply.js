$(function(){

  // Make fields editable
  $.fn.editable.defaults.mode = 'inline';
  $('#trip-name').editable({ emptytext: 'Trip Name' });
  $('#edit-cost-name').editable({ emptytext: 'Name' });
  $('#edit-cost-cost').editable({ emptytext: 'Cost' });
  $('#edit-cost-paid-by').editable({
    source: ['Craig', 'Xiaoyi', 'Jim', 'Wendy'],
    emptytext: 'Paid By'
  });
  $('#edit-cost-paid-for').editable({ emptytext: 'Paid For' }); 
  $('#new-Person-name').editable({ emptytext: 'Name' }); 

  // Create model for costs
  var Cost = Backbone.Model.extend({
    defaults:{
		title:'',
		price:0,
		paidBy:'',
		paidFor:''
    }
  });
  
  var CostList = Backbone.Collection.extend({
	  model: Cost
  });  
  
  var CostListView = Backbone.View.extend({
  	tagName: 'table',
		className: 'table table-striped table-hover',
		initialize: function(){
			_.bindAll(this, "renderCost");
		},
		renderCost: function(model){
		  var costView = new CostView({model: model});
			this.$el.append(costView.render());
		},
		render: function(){
		      var costHeader = '<thead><tr><th>Title</th><th>Cost</th><th>Paid By</th><th>Paid For</th><th></th></thead><tbody>';
		      var costFooter = '</tbody>';

		      this.$el.empty();
		      this.$el.append(costHeader);
		      this.collection.each(this.renderCost);
		      this.$el.append(costFooter);
		      return this.$el;
		    }
  });
	
  var CostView = Backbone.View.extend({
    tagName: 'tr',
    
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },
		
    render: function(){
      this.$el.html('<td>' + this.model.get('title') + '</td>' +
										'<td>' + this.model.get('price') + '</td>' +
										'<td>' + this.model.get('paidBy') + '</td>' +
										'<td>' + this.model.get('paidFor') + '</td>' +
										'<a href="#editCostModal" role="button" data-toggle="modal"><i class="icon-pencil"></i></a></td>'
		);
      return this.$el;
    },
  });
  
  // Create model for people 
  var Person = Backbone.Model.extend({
    defaults:{
      name: '',
      clear_through: false
    }
  });

  var PersonList = Backbone.Collection.extend({
    model: Person
  });

  var PersonListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'nav nav-list',
    initialize: function(){
      _.bindAll(this, "renderPerson");
    },
    renderPerson: function(model){
      var personView = new PersonView({model: model});
      this.$el.append(personView.render());
    },
    render: function(){
      var peopleHeader = '<li class="nav-header">Participants</li>';
      var peopleFooter = '<li class="divider"></li>' +
        '<li><a href="#newPersonModal" role="button" data-toggle="modal"><i class="icon-user"></i> Add Person</a></li>';

      this.$el.empty();
      this.$el.append(peopleHeader);
      this.collection.each(this.renderPerson);
      this.$el.append(peopleFooter);
      return this.$el;
    }
  });

  var PersonView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click a': 'clicked'
    },
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
      var star = this.model.get('clear_through') ? ' <i class="icon-star"></i>' : '';
      this.$el.html('<table style="width:100%"><tr><td width="*"><a href="#">' + this.model.get('name') + star + '</a></td><td style="text-align: right">5.00</td>');
      return this.$el;
    },
    clicked: function(e){
      e.preventDefault();

      // upon click, set all clear_through to false and this one to true
      people.each(function(person){
        person.set('clear_through', false);
      }, this);
      this.model.set('clear_through', true);
    }
  });

  var costs = new CostList([
		new Cost({title: 'Food', price: 100, paidBy: 'Craig', paidFor:'Everyone'}),
		new Cost({title: 'Gas', price: 200.10, paidBy: 'Jim', paidFor:'Everyone'}),
		new Cost({title: 'Hotel', price: 1000, paidBy: 'Craig', paidFor:'Everyone'})
  ]);
	window.costs = costs;
	
	var renderCostList = function(){
		var view = new CostListView({collection: costs});
		$("#cost-list").html(view.render());
	};
	renderCostList();

  var trip_name = 'Zubehaus Weekend';
  var people = new PersonList([
    new Person({ name: 'Craig', clear_through: true }),
    new Person({ name: 'Xiaoyi' }),
    new Person({ name: 'Jim' }),
    new Person({ name: 'Wendy' }),
    new Person({ name: 'Ankur' }),
    new Person({ name: 'Alex' })
  ]);
  window.people = people;

  $('#trip-name').editable('option', 'value', trip_name);

  var renderPersonList = function(){
    var view = new PersonListView({ collection: people });
    $("#people-list").html(view.render());
  };
  renderPersonList();

  $('#new-person-btn').click(function(){
    var name = $('#new-person-name').editable('getValue')['new-person-name'];
    if (!name)
      return;
    people.add([{ name: name }]);
    $('#newPersonModal').modal('hide');
  });

	costs.listenTo(costs, 'add', renderCostList);

  // do i really need to create a new PersonListView every time we add?
  people.listenTo(people, 'add', renderPersonList);
});
