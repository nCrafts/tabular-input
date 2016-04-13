var should = require('should')
var mocha = require('mocha')
var jsdom = require('jsdom').jsdom

var document = jsdom('<html><body></body></html>', {})
var window = document.defaultView
var $ = jQuery = require('jquery')(window)

var tabularInput = require('../dist/js/tabular-input.min.js')

describe('Tabular Input Module', () => {

	it('Cell Count', () => {

		$('body').append('<div id="tabular"></div>')

		$('#tabular').tabularInput({ rows: 0, columns: 0 })
		$('#tabular input[type="text"]').length.should.equal(0)

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 3, columns: 5 })
		$('#tabular input[type="text"]').length.should.equal(15)

	})

	it('Column Heads', () => {

		$('#tabular').tabularInput('setColumnHeads', ['A', 'B', 'C', 'D', 'E', 'F'])
		$('#tabular th').length.should.equal(5)

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 3, columns: 5, columnHeads: ['A', 'B', 'C', 'D'] })
		$('#tabular th').length.should.equal(5)

		$('#tabular').tabularInput('setColumnHeads', ['A', 'B', 'C', 'D', 'E', 'F'])
		$('#tabular th').length.should.equal(5)

	})

	it('Add & Delete Row', () => {

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 4, columns: 5 })

		$('#tabular').tabularInput('addRow')
		$('#tabular td').length.should.equal(25)

		$('#tabular').tabularInput('deleteRow').tabularInput('deleteRow')
		$('#tabular td').length.should.equal(15)

		$('#tabular').tabularInput('deleteRow').tabularInput('deleteRow', 2)
		$('#tabular td').length.should.equal(10)

	})

	it('Add & Delete Column', () => {

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 5, columns: 2 })

		$('#tabular').tabularInput('addColumn')
		$('#tabular td').length.should.equal(15)

	})

	it('New Row on Tab', () => {

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 5, columns: 3, newRowOnTab: true })
		$('#tabular tr:last td:last input').trigger('focus').trigger({ type: 'keydown', which: 9 })
		$('#tabular td').length.should.equal(18)

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 0, columns: 3, newRowOnTab: true })
		$('#tabular tr:last td:last input').trigger('focus').trigger({ type: 'keydown', which: 9 })
		$('#tabular td').length.should.equal(0)

	})

	it('Setting & Fetching Values', () => {

		$('#tabular').tabularInput('destroy').tabularInput({ rows: 2, columns: 2, name: 'ABC' })
		$('#tabular').tabularInput('deleteRow', 0).tabularInput('deleteColumn', 0)
		$('#tabular').tabularInput('addRow').tabularInput('addRow').tabularInput('addColumn').tabularInput('addColumn')
		$('#tabular').find('tr:nth-child(3) td:nth-child(3) > input').val('TestValue')
		$('#tabular input[name="ABC[2][2]"]').val().should.equal('TestValue')

	})

})
