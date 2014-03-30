;(function( window, document, $, undefined ) {

var personalizacao = (function() {
return {
	getPanelOptions : function() {
		return $.getJSON( 'http://onthewall.local/skin/frontend/volts/default/json/panel-options.json' );
	}
};
})();

window.personalizacao = personalizacao;

})( window, document, jQuery );