PAGE.add('ColorizeMap.javascript', [

	/**
	* matches $. or $(
	*/
	{
		'name': 'selector',
		'pattern': /(\s|^)\$(?=\.|\()/g
	},
	{
		'name': 'support',
		'pattern': /\s(window|document|return)\s/g
	},
	{
		'name': 'function',
		'pattern': / function/g
	},
	{
		'matches': {
			1: 'support.property'
		},
		'pattern': /\.(length|node(Name|Value))\b/g
	},
	{
		'matches': {
			1: 'support.function'
		},
		'pattern': /(setTimeout|setInterval)(?=\()/g

	},
	{
		'matches': {
			1: 'support.method'
		},
		'pattern': /\.(getAttribute|push|getElementById|getElementsByClassName|log|setTimeout|setInterval)(?=\()/g
	},

	{
		'matches': {
			1: 'storage',
			3: 'entity.function'
		},
		'pattern': /(var)?(\s|^)(\S*)(?=\s?=\s?function\()/g
	},

	/**
			 * matches constructor call
	*/
	{
		'matches': {
			1: 'keyword',
			2: 'entity.function'
		},
		'pattern': /(new)\s+(.*)(?=\()/g
	},

	/**
			 * matches any function call in the style functionName: function()
	*/
	{
		'name': 'entity.function',
		'pattern': /(\w+)(?=:\s{0,}function)/g
	}

])
