const tabularInput = (($) => {

	class tabularInput {

		constructor(element, config) {
			this.config = config
			this.rowCounter = config.rows
			element.on('keydown', 'input', (e) => {
				if (this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
					this.addRow(element)
				}
			})
		}

		addRow(element) {
			let newRowInputs = []
			for (let a = 0; a < this.config.columns; a++) {
				if (this.config.name === false) {
					newRowInputs.push('<input type="text"/>')
				} else {
					newRowInputs.push(`<input type="text" name="${this.config.name}[${a}][${this.rowCounter}]"/>`)
				}
			}
			let newRowHTML = `<tr class='${this.config.animate === true ? 'animate-add' : ''}'><td style='width: ${this.config.cellWidth}%'>${newRowInputs.join('</td><td>')}</td></tr>`
			element.find('tr:last').after(newRowHTML)
			this.rowCounter++
			setTimeout(() => {
				element.find('.animate-add').removeClass('animate-add')
			}, 500)
		}

		deleteRow(element, _whichRow) {
			let whichRow = typeof _whichRow === 'undefined' ? element.find('tr').length - 1 : _whichRow
			element.find('tr').eq(whichRow).addClass('animate-remove')
			if (this.config.animate === false) {
				element.find('tr.animate-remove').remove()
			} else {
				setTimeout(() => {
					element.find('tr.animate-remove').remove()
				}, 300)
			}
		}

		setColumnHeads(element, heads) {
			let headsHTML = heads.map((x) => `<th>${x}</th>`).join()
			element.find('thead').html(`<tr>${headsHTML}</tr>`)
		}

		static jQueryInterface(_config, extraArgument) {

			if (typeof _config === 'string' && typeof this.data().tabularObject[_config] === 'function') {
				this.data().tabularObject[_config](this, extraArgument)
				return
			}

			let config = $.extend({
				rows: 2,
				columns: 4,
				name: false,
				newRowOnTab: false,
				columnHeads: false,
				animate: false
			}, _config)

			config.cellWidth = 100 / config.columns

			let currentRow = 0
			let allRowsArray = []

			while (currentRow < config.rows) {
				let currentRowInputs = []
				for (let a = 0; a < config.columns; a++) {
					if (config.name === false) {
						currentRowInputs.push('<input type="text"/>')
					} else {
						currentRowInputs.push(`<input type="text" name="${config.name}[${a}][${currentRow}]"/>`)
					}
				}
				allRowsArray.push(`<tr><td style='width: ${config.cellWidth}%'>${currentRowInputs.join('</td><td>')}</td></tr>`)
				currentRow++
			}

			this.html($(`<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table ${config.animate ? 'animate' : ''}"></table>`).html(`<thead></thead><tbody>${allRowsArray.join()}</tbody>`))
			let tabularObject = new tabularInput(this, config)

			if (config.columnHeads !== false) {
				config.columnHeads = typeof config.columnHeads === 'undefined' ? ' column'.repeat(config.columns).split(' ').splice(1) : config.columnHeads
				tabularObject.setColumnHeads(this, config.columnHeads)
			}

			this.data('tabularObject', tabularObject)

		}
	}

	$.fn.tabularInput = tabularInput.jQueryInterface
	$.fn.tabularInput.Constructor = tabularInput

})(jQuery)

export default tabularInput
