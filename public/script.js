var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'all',
    priority: 0,
    drag: {},
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
	return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	return this.items.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	return this.items.filter(function(item) {
	  return item.completed;
	});
      if (this.show === 'sort')
	return this.items.filter(function(item) {
		if(item.priority === 1)
			return item.priority;
	});  
      if (this.show === 'sort2')
	return this.items.filter(function(item) {		
		if(item.priority === 2)
			return item.priority;
	});
	if (this.show === 'sort3')
		return this.items.filter(function(item) {
		if(item.priority === 3)
			return item.priority;
	});
		

      return this.items;
    },
  },
  methods: {
   created: function() {
    this.getItems();
  },
getItems: function() {
      axios.get("/api/items").then(response => {
	this.items = response.data;
	return true;
      }).catch(err => {
      });
    },
    addItem: function() {
      axios.post("/api/items", {
	text: this.text,
	priority: this.priority,
	completed: false
      }).then(response => {
	this.text = "";
	this.getItems();
	return true;
      }).catch(err => {
      });
    },
     updatePrior: function(item) {
	axios.put("/api/items/" + item.id,{
	  text: item.text,
          completed: item.completed,
	  orderChange:false,
	  priority: this.item.priority,	
	}).then(response => {
	  return true;
	}).catch(err => {
	});
	},	
     completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
	text: item.text,
	completed: !item.completed,
        orderChange:false,
	priority: this.item.priority,
       }).then(response => {
	return true;
      }).catch(err => {
      });
    },
     deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
	this.getItems();
	return true;
      }).catch(err => {
      });
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showCompleted: function() {
      this.show = 'completed';
    },
    sort: function() {
	this.show = 'sort';
    },
    sort2: function() {
	this.show = 'sort2';
	},
    sort3: function() {
	this.show = 'sort3';
	},		
    deleteCompleted: function() {
      this.items.forEach(item => {
	if (item.completed)
	  this.deleteItem(item)
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
	text: this.drag.text,
	completed: this.drag.completed,
	orderChange: true,
	orderTarget: item.id
      }).then(response => {
	this.getItems();
	return true;
      }).catch(err => {
      });
    },
  }
});
