# InlayRunner

Applciation Runner for Inlay

  
## Getting Started

###  Install InlayRunner, jQuery, and jQuery UI
You can use the npm command-line tool to install packages. 
```
	npm install --save inlay-runner jquery jquery-ui-dist
```
### Configure jQuery

Add the jQuery and jQuery UI as `scripts`  to your `angular.json` - Here we go:
```
	"scripts": [
		"node_modules/jquery/dist/jquery.js",
		"node_modules/jquery-ui-dist/jquery-ui.min.js"
	]
```

### Include a theme 
You should add this to your `style.css` to include a theme.
```
	@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

### Show InlayRunner

Then, you can show InlayRunner now.
```
<screen  [projectData]="projectData"></screen>
```
