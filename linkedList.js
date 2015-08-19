function ListItem(data) {
	this.data = data;
	this.prev = null;
	this.next = null;
};

function LinkedList(data) {
	var item = new ListItem(data);
	
	this.first = item;
	this.last = item;
	
	this.length = 1;
};

LinkedList.prototype.head = function() {
	if(this.first)
		return this.first.data;
	else
		return null;
};

LinkedList.prototype.tail = function() {
	if(this.last)
		return this.last.data;
	else
		return null;
};

LinkedList.prototype.append = function(value, toEnd) {
	var item = new ListItem(value);
	
	if(toEnd) {
		item.prev = this.last;
		this.last.next = item;
		this.last = item;
	} else {
		item.next = this.first;
		this.first.prev = item;
		this.first = item;
	}
	
	++this.length;
	return this;
};

LinkedList.prototype.deleteAt = function(index) {
	var item = this.at(index);
	
	if(item !== null) {		
		if(item.prev !== null)
			item.prev.next = item.next;
		else
			this.first = item.next;
		
		if(item.next !== null)
			item.next.prev = item.prev;
		else
			this.last = item.prev;
	}
	
	--this.length;
	return this;
};

LinkedList.prototype.at = function(index) {
	if(this.first === null || index < 0 || index >= this.legth)
		throw new Error("Incorrect index");
	
	var item = this.first;
	
	if(index !== 0) {		
		for(var i = 1; i <= index; ++i) {			
			item = item.next;
		}
	}
	
	return item;
};

LinkedList.prototype.insertAt = function(index, data) {
	if(index < 0 || index > this.length)
		throw new Error("Incorrect index");
	
	if(index === 0)
		this.append(data, false);
	else if(index === this.length)
		this.append(data, true);
	else {
		var item = this.at(index);
		
		var newItem = new ListItem(data);
		item.prev.next = newItem;
		newItem.prev = item.prev;
		newItem.next = item;
		item.prev = newItem;
		item.next = item.next.next;
		
		++this.length;
	}
	return this;
};

LinkedList.prototype.reverse = function() {
	var reversedList = null;
	
	if(this.length === 0) {
		reversedList = new LinkedList(null);
	} else {
		reversedList = new LinkedList(this.last.data);
		
		var item = this.last;
		while(item.prev !== null) {
			item = item.prev;
			reversedList.append(item.data, true);
		}
	}
	
	return reversedList;
};

LinkedList.prototype.each = function(action) {
	if(this.first !== null) {
		var item = this.first;
		item.data = action(item.data);
		
		while(item.next !== null) {
			item = item.next;
			item.data = action(item.data);
		}
	}
	
	return this;
};

LinkedList.prototype.indexOf = function(data) {
	if(this.length === 0)
		return -1;
	
	var item = this.first;
	if(item.data === data)
		return 0;
		
	var index = 1;
	while(item.next !== null) {
		item = item.next;
		
		if(item.data === data)
			return index;
		
		index++;
	}
	
	return -1;
};


// test
var list = new LinkedList(5);
list.append(10, true).append(15, true).append(20, true).append(25, true);
list.insertAt(5, 1000).deleteAt(2);
console.log(list);

var reversed = list.reverse();
console.log(reversed.each(function(data) {
	return ++data;
}));

console.log(list.indexOf(25151));