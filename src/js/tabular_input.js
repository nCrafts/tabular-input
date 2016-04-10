const tabularInput = (($) => {

	class tabularInput {

		constructor(element, config) {
			this.element = element
			this.config = config
			this.rowCounter = config.rows

			this.element.on('keydown', 'input', (e) => {
				if (this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
					this.addRow()
				}
			})
		}

		addRow() {
			let newRowInputs = []
			for (let a = 0; a < this.config.columns; a++) {
				newRowInputs.push(`<input type='text' name='${this.config.name}[${this.rowCounter}][${a}]'/>`)
			}
			let newRowHTML = `<tr><td style='width: ${this.config.cellWidth}%'>${newRowInputs.join('</td><td>')}</td></tr>`
			this.element.find('tr:last').after(newRowHTML)
			this.rowCounter++
		}

		deleteRow(_whichRow) {
			let whichRow = typeof _whichRow === 'undefined' ? this.element.find('tr').length - 1 : _whichRow
			this.element.find('tr').eq(whichRow).remove()
		}

		static jQueryInterface(_config, extraArgument) {

			if (typeof _config === 'string' && typeof this.data().tabularObject[_config] === 'function') {
				this.data().tabularObject[_config](extraArgument)
				return
			}

			let config = $.extend({
				rows: 2,
				columns: 4,
				name: 'tabular',
				newRowOnTab: true
			}, _config)

			config.cellWidth = 100 / config.columns

			let currentRow = 0
			let allRowsArray = []

			while (currentRow < config.rows) {
				let currentRowInputs = []
				for (let a = 0; a < config.columns; a++) {
					currentRowInputs.push(`<input type='text' name='${config.name}[${currentRow}][${a}]'/>`)
				}
				allRowsArray.push(`<tr><td style='width: ${config.cellWidth}%'>${currentRowInputs.join('</td><td>')}</td></tr>`)
				currentRow++
			}

			this.html($('<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table"></table>').html(`<tbody>${allRowsArray.join()}</tbody>`))
			let tabularObject = new tabularInput(this, config)
			this.data('tabularObject', tabularObject)

		}
	}

	$.fn.tabularInput = tabularInput.jQueryInterface
	$.fn.tabularInput.Constructor = tabularInput

})(jQuery)

export default tabularInput
