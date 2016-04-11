/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tabularInput = function ($) {
		var tabularInput = function () {
			function tabularInput(element, config) {
				var _this = this;

				_classCallCheck(this, tabularInput);

				this.config = config;
				this.rowCounter = config.rows;
				element.on('keydown', 'input', function (e) {
					if (_this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
						_this.addRow(element);
					}
				});
			}

			_createClass(tabularInput, [{
				key: 'addRow',
				value: function addRow(element) {
					var newRowInputs = [];
					for (var a = 0; a < this.config.columns; a++) {
						if (this.config.name === false) {
							newRowInputs.push('<input type="text"/>');
						} else {
							newRowInputs.push('<input type="text" name="' + this.config.name + '[' + a + '][' + this.rowCounter + ']"/>');
						}
					}
					var newRowHTML = '<tr class=\'' + (this.config.animate === true ? 'animate-add' : '') + '\'><td style=\'width: ' + this.config.cellWidth + '%\'>' + newRowInputs.join('</td><td>') + '</td></tr>';
					element.find('tr:last').after(newRowHTML);
					this.rowCounter++;
					setTimeout(function () {
						element.find('.animate-add').removeClass('animate-add');
					}, 500);
				}
			}, {
				key: 'deleteRow',
				value: function deleteRow(element, _whichRow) {
					var whichRow = typeof _whichRow === 'undefined' ? element.find('tr').length - 1 : _whichRow;
					element.find('tr').eq(whichRow).addClass('animate-remove');
					if (this.config.animate === false) {
						element.find('tr.animate-remove').remove();
					} else {
						setTimeout(function () {
							element.find('tr.animate-remove').remove();
						}, 300);
					}
				}
			}, {
				key: 'setColumnHeads',
				value: function setColumnHeads(element, heads) {
					var headsHTML = heads.map(function (x) {
						return '<th>' + x + '</th>';
					}).join();
					element.find('thead').html('<tr>' + headsHTML + '</tr>');
				}
			}], [{
				key: 'jQueryInterface',
				value: function jQueryInterface(_config, extraArgument) {

					if (typeof _config === 'string' && typeof this.data().tabularObject[_config] === 'function') {
						this.data().tabularObject[_config](this, extraArgument);
						return;
					}

					var config = $.extend({
						rows: 2,
						columns: 4,
						name: false,
						newRowOnTab: false,
						columnHeads: false,
						animate: false
					}, _config);

					config.cellWidth = 100 / config.columns;

					var currentRow = 0;
					var allRowsArray = [];

					while (currentRow < config.rows) {
						var currentRowInputs = [];
						for (var a = 0; a < config.columns; a++) {
							if (config.name === false) {
								currentRowInputs.push('<input type="text"/>');
							} else {
								currentRowInputs.push('<input type="text" name="' + config.name + '[' + a + '][' + currentRow + ']"/>');
							}
						}
						allRowsArray.push('<tr><td style=\'width: ' + config.cellWidth + '%\'>' + currentRowInputs.join('</td><td>') + '</td></tr>');
						currentRow++;
					}

					this.html($('<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table ' + (config.animate ? 'animate' : '') + '"></table>').html('<thead></thead><tbody>' + allRowsArray.join() + '</tbody>'));
					var tabularObject = new tabularInput(this, config);

					if (config.columnHeads !== false) {
						config.columnHeads = typeof config.columnHeads === 'undefined' ? ' column'.repeat(config.columns).split(' ').splice(1) : config.columnHeads;
						tabularObject.setColumnHeads(this, config.columnHeads);
					}

					this.data('tabularObject', tabularObject);
				}
			}]);

			return tabularInput;
		}();

		$.fn.tabularInput = tabularInput.jQueryInterface;
		$.fn.tabularInput.Constructor = tabularInput;
	}(jQuery);

	exports.default = tabularInput;

/***/ }
/******/ ]);