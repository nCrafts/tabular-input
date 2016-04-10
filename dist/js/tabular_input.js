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

				this.element = element;
				this.config = config;
				this.rowCounter = config.rows;

				this.element.on('keydown', 'input', function (e) {
					if (_this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
						_this.addRow();
					}
				});
			}

			_createClass(tabularInput, [{
				key: 'addRow',
				value: function addRow() {
					var newRowInputs = [];
					for (var a = 0; a < this.config.columns; a++) {
						newRowInputs.push('<input type=\'text\' name=\'' + this.config.name + '[' + this.rowCounter + '][' + a + ']\'/>');
					}
					var newRowHTML = '<tr><td style=\'width: ' + this.config.cellWidth + '%\'>' + newRowInputs.join('</td><td>') + '</td></tr>';
					this.element.find('tr:last').after(newRowHTML);
					this.rowCounter++;
				}
			}, {
				key: 'deleteRow',
				value: function deleteRow(_whichRow) {
					var whichRow = typeof _whichRow === 'undefined' ? this.element.find('tr').length - 1 : _whichRow;
					this.element.find('tr').eq(whichRow).remove();
				}
			}], [{
				key: 'jQueryInterface',
				value: function jQueryInterface(_config, extraArgument) {

					if (typeof _config === 'string' && typeof this.data().tabularObject[_config] === 'function') {
						this.data().tabularObject[_config](extraArgument);
						return;
					}

					var config = $.extend({
						rows: 2,
						columns: 4,
						name: 'tabular',
						newRowOnTab: true
					}, _config);

					config.cellWidth = 100 / config.columns;

					var currentRow = 0;
					var allRowsArray = [];

					while (currentRow < config.rows) {
						var currentRowInputs = [];
						for (var a = 0; a < config.columns; a++) {
							currentRowInputs.push('<input type=\'text\' name=\'' + config.name + '[' + currentRow + '][' + a + ']\'/>');
						}
						allRowsArray.push('<tr><td style=\'width: ' + config.cellWidth + '%\'>' + currentRowInputs.join('</td><td>') + '</td></tr>');
						currentRow++;
					}

					this.html($('<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table"></table>').html('<tbody>' + allRowsArray.join() + '</tbody>'));
					var tabularObject = new tabularInput(this, config);
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