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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tabularInput = function ($) {
		var tabularInput = function () {
			function tabularInput(element, config) {
				var _this = this;

				_classCallCheck(this, tabularInput);

				this.config = config;
				element.on('keydown', 'input', function (e) {
					if (_this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
						e.preventDefault();
						_this.addRow(element);
					}
				});
			}

			_createClass(tabularInput, [{
				key: 'addColumn',
				value: function addColumn(element) {
					element.find('tbody tr').each(function (x, y) {
						$(y).find('td:last').after('<td><input type="text"/></td>');
					});
					this.config.columns++;
					this.setColumnHeads(element, this.config.columnHeads);
					this.setName(element);
					this.setWidth(element);
				}
			}, {
				key: 'deleteColumn',
				value: function deleteColumn(element, _whichColumn) {
					if (this.config.columns === 0) {
						return;
					}
					var whichColumn = typeof _whichColumn !== 'number' ? this.config.columns : _whichColumn + 1;
					element.find('tr td:nth-child(' + whichColumn + ')').remove();
					this.config.columns--;
					this.setName(element);
					this.setWidth(element);
				}
			}, {
				key: 'addRow',
				value: function addRow(element) {
					if (this.config.maxRows !== false && element.find('tbody tr').length >= this.config.maxRows) {
						return;
					}
					var newRowInputs = [];
					for (var a = 0; a < this.config.columns; a++) {
						newRowInputs.push('<input type="text"/>');
					}
					var newRowHTML = '<tr class=\'' + (this.config.animate === true ? 'animate-add' : '') + '\'><td>' + newRowInputs.join('</td><td>') + '</td></tr>';
					element.find('tr:last').after(newRowHTML);
					this.setName(element);
					element.find('tr:last td:first input').focus();
					setTimeout(function () {
						element.find('.animate-add').removeClass('animate-add');
					}, 250);
				}
			}, {
				key: 'deleteRow',
				value: function deleteRow(element, _whichRow) {
					var whichRow = _whichRow || element.find('tr').length - 1;
					element.find('tr').eq(whichRow).addClass('animate-remove');
					if (this.config.animate === false) {
						element.find('tr.animate-remove').remove();
					} else {
						setTimeout(function () {
							element.find('tr.animate-remove').remove();
						}, 250);
					}
				}
			}, {
				key: 'maxRows',
				value: function maxRows(element, _maxRows) {
					if (typeof _maxRows !== 'number') {
						return;
					}
					this.config.maxRows = _maxRows;
				}
			}, {
				key: 'setColumnHeads',
				value: function setColumnHeads(element, heads) {
					if ((typeof heads === 'undefined' ? 'undefined' : _typeof(heads)) !== 'object') {
						return;
					}
					this.config.columnHeads = true;
					while (heads.length < this.config.columns) {
						heads.push('');
					}
					var headsHTML = heads.map(function (x) {
						return '<th>' + x + '</th>';
					}).slice(0, this.config.columns).join();
					element.find('thead').html('<tr>' + headsHTML + '</tr>');
				}
			}, {
				key: 'setName',
				value: function setName(element) {
					var _this2 = this;

					if (this.config.name === false) {
						return;
					}
					element.find('tr').each(function (x, tr) {
						$(tr).find('td').each(function (y, td) {
							$(td).find('input').attr('name', _this2.config.name + '[' + y + '][' + x + ']');
						});
					});
				}
			}, {
				key: 'setWidth',
				value: function setWidth(element) {
					var width = (100 / this.config.columns).toFixed(2) + '%';
					element.find('td').css('width', width);
					if (element.find('th').length > 0) {
						element.find('th').css('width', width);
					}
				}
			}, {
				key: 'destroy',
				value: function destroy(element) {
					element.find('.tabularInput-table').remove();
				}
			}], [{
				key: 'jQueryInterface',
				value: function jQueryInterface(_config, extraArgument) {
					var _this3 = this;

					return this.each(function () {
						if (typeof _config === 'string' && typeof _this3.data().tabularObject[_config] === 'function') {
							_this3.data().tabularObject[_config](_this3, extraArgument);
							return;
						}

						var config = $.extend({
							rows: 2,
							columns: 4,
							name: false,
							newRowOnTab: false,
							columnHeads: false,
							animate: false,
							maxRows: false
						}, _config);

						var currentRow = 0;
						var allRowsArray = [];

						while (currentRow < config.rows) {
							var currentRowInputs = [];
							for (var a = 0; a < config.columns; a++) {
								currentRowInputs.push('<input type="text"/>');
							}
							allRowsArray.push('<tr row-index=\'' + currentRow + '\'><td>' + currentRowInputs.join('</td><td>') + '</td></tr>');
							currentRow++;
						}

						_this3.html($('<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table ' + (config.animate ? 'animate' : '') + '"></table>').html('<thead></thead><tbody>' + allRowsArray.join() + '</tbody>'));
						var tabularObject = new tabularInput(_this3, config);

						tabularObject.setColumnHeads(_this3, config.columnHeads);
						tabularObject.setName(_this3);
						tabularObject.setWidth(_this3);
						_this3.data('tabularObject', tabularObject);
					});
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