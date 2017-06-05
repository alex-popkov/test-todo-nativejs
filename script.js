var bootstrap = function( ){

	var rootElement = document.getElementsByClassName( 'items' )[ 0 ];
	var todolist = new ToDoList( rootElement );
};

/**
 * ToDo list appication class.
 * @param {Element} root
 */
var ToDoList = function( root ){

	/**
	 * Root element for rendering todo list items
	 */
	this.root = root;

	/**
	 * Initial id for items.
	 */
	this.id = 1;

	/**
	 * Application model
	 */
	this.model = [

		{
			id: this.id,
			title: 'Hire this cool guy',
			text: 'He built excellent application using pure JavaScript'
		}
 	]

	this.setupListeners( );
	this.renderModel( );
};

/**
 *  Set up listeners
 */
ToDoList.prototype.setupListeners = function( ){

	document.getElementById( 'sort-by-id' ).addEventListener( "click", this.sortByIdListener.bind( this ) );
	document.getElementById( 'sort-by-title' ).addEventListener( "click", this.sortByTitleListener.bind( this ) );
	document.getElementById( 'add-item' ).addEventListener( "click", this.addItemListener.bind( this ) );
};


//Listeners 

/**
 * Sort list by id listener
 */
	ToDoList.prototype.sortByIdListener = function( ){

	this.model.sort( function( a, b ){

        return a.id - b.id;
    } );

	console.log( this.model );
    this.deleteAllItemsFromView( );
    this.renderModel( );		
};

/**
 * Sort list by title listener
 */
	ToDoList.prototype.sortByTitleListener = function( ){

	this.model.sort( function( a, b ){

        if( a.title < b.title ){

        	return -1;
        } 
	    if( a.title > b.title ){

	    	return 1;
	    } 
	    return 0;
    } );

	console.log( this.model );
    this.deleteAllItemsFromView( );
    this.renderModel( );		
};


/**
 * Create item listener
 * @param e
 */
ToDoList.prototype.addItemListener = function( e ){

	var titleElement = document.getElementById( 'new-item-title' );
	var textElement = document.getElementById( 'new-item-text' );
	this.addItemToModel( titleElement.value, textElement.value );
	titleElement.value = '';
	textElement.value = '';
};

/**
 * Delete item listener
 * @param e
 */
ToDoList.prototype.deleteItemListener = function( e ){

	var id = +e.target.parentElement.getAttribute( 'id' );
	this.deleteItemFromModel( id );
};

//View methods

/**
 * Add item to view
 * @param {string} title
 * @param {string} text
 * @param {number=} opt_id
 */
ToDoList.prototype.addItemToView = function( title, text, opt_id ){

	var itemNode = document.createElement( "div" );
	itemNode.className = 'item mdl-card mdl-shadow--2dp';
	itemNode.id = '' + this.id;

	var itemId = document.createElement( "div" );
	var id;
	opt_id ? id = '' + opt_id : id = '' + this.id;
	itemId.className = 'item--id';
	itemId.innerHTML = id;

	var itemTitle = document.createElement( "div" );
	itemTitle.className = 'item--title';
	itemTitle.innerHTML = title;

	var itemText = document.createElement( "div" );
	itemText.className = 'item--text';
	itemText.innerHTML = text;

	var btn = document.createElement( "button" );
	btn.className = 'item--delete mdl-button mdl-js-button';
	btn.innerHTML = 'Delete';

	itemNode.appendChild( itemId );
	itemNode.appendChild( itemTitle );
	itemNode.appendChild( itemText );
	itemNode.appendChild( btn );
	this.root.appendChild( itemNode );

	btn.addEventListener( "click", this.deleteItemListener.bind( this ) );
};

/**
 * Delete item from view
 * @param {number} id
 */
ToDoList.prototype.deleteItemFromView = function( id ){

	document.getElementById( id ).outerHTML='';
};

/**
 * Delete all items from view.
 */
ToDoList.prototype.deleteAllItemsFromView = function( ){

	while( this.root.firstChild ){

	    this.root.removeChild( this.root.firstChild );
	}
};

/**
 * Render data from model
 */
ToDoList.prototype.renderModel = function( ){

	for( var i = 0; i < this.model.length; i++ ){

		this.addItemToView( this.model[ i ].title, this.model[ i ].text, this.model[ i ].id );
	}		
};

//Model methods

/**
 * Add item to model
 * @param {string} title
 * @param {string} text
 */
ToDoList.prototype.addItemToModel = function( title, text ){

	this.id++;

	this.model.push( {

		id: this.id,
		title: title,
		text: text
	} );

	this.addItemToView( title, text );

	console.log( this.model );
};

/**
 * Delete item from model
 * @param {number} id
 */
ToDoList.prototype.deleteItemFromModel = function( id ){

	for( var i = 0; i < this.model.length; i++ ){

		if( this.model[ i ].id === id ){

			var index = this.model.indexOf( this.model[ i ] );

			this.model.splice( index, 1 );
		}
	}

	this.deleteItemFromView( id );
	console.log( this.model );
};