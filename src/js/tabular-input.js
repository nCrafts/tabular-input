const tabularInput = (($) => {

	class tabularInput {

		constructor(element, config) {
			this.config = config
			element.on('keydown', 'input', (e) => {
				if (this.config.newRowOnTab === true && e.which === 9 && $(e.target).closest('tr').is(':last-child') && $(e.target).parent('td').is(':last-child')) {
				  e.preventDefault()					
					this.addRow(element)
				}
			})
		}

		addColumn(element) {
			element.find('tbody tr').each((x, y) => {
				$(y).find('td:last').after('<td><input type="text"/></td>')
			})
			this.config.columns++
			this.setColumnHeads(element, this.config.columnHeads)
			this.setName(element)
			this.setWidth(element)
		}

		deleteColumn(element, _whichColumn) {
			if (this.config.columns === 0) {
				return
			}
			let whichColumn = typeof _whichColumn !== 'number' ? this.config.columns : _whichColumn + 1
			element.find(`tr td:nth-child(${whichColumn})`).remove()
			this.config.columns--
			this.setName(element)
			this.setWidth(element)
		}

		addRow(element) {
			if (this.config.maxRows !== false && element.find('tbody tr').length >= this.config.maxRows) {
				return
			}
			let newRowInputs = []
			for (let a = 0; a < this.config.columns; a++) {
				newRowInputs.push('<input type="text"/>')
			}
			let newRowHTML = `<tr class='${this.config.animate === true ? 'animate-add' : ''}'><td>${newRowInputs.join('</td><td>')}</td></tr>`
			element.find('tr:last').after(newRowHTML)
			this.setName(element)
			element.find('tr:last td:first input').focus()
			setTimeout(() => {
				element.find('.animate-add').removeClass('animate-add')
			}, 250)
		}

		deleteRow(element, _whichRow) {
			let whichRow =  _whichRow || element.find('tr').length - 1
			element.find('tr').eq(whichRow).addClass('animate-remove')
			if (this.config.animate === false) {
				element.find('tr.animate-remove').remove()
			} else {
				setTimeout(() => {
					element.find('tr.animate-remove').remove()
				}, 250)
			}
		}

		maxRows(element, maxRows) {
			if (typeof maxRows !== 'number') {
				return
			}
			this.config.maxRows = maxRows
		}

		setColumnHeads(element, heads) {
			if (typeof heads !== 'object') {
				return
			}
			this.config.columnHeads = true
			while (heads.length < this.config.columns) {
				heads.push('')
			}
			let headsHTML = heads.map((x) => `<th>${x}</th>`).slice(0, this.config.columns).join()
			element.find('thead').html(`<tr>${headsHTML}</tr>`)
		}

		setName(element) {
			if (this.config.name === false) {
				return
			}
			element.find('tr').each((x, tr) => {
				$(tr).find('td').each((y, td) => {
					$(td).find('input').attr('name', `${this.config.name}[${y}][${x}]`)
				})
			})
		}

		setWidth(element) {
			let width = `${(100 / this.config.columns).toFixed(2)}%`
			element.find('td').css('width', width)
			if (element.find('th').length > 0) {
				element.find('th').css('width', width)
			}
		}

		destroy(element) {
			element.find('.tabularInput-table').remove()
		}

		static jQueryInterface(_config, extraArgument) {

			return this.each(() => {
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
					animate: false,
					maxRows: false
				}, _config)

				let currentRow = 0
				let allRowsArray = []

				while (currentRow < config.rows) {
					let currentRowInputs = []
					for (let a = 0; a < config.columns; a++) {
						currentRowInputs.push('<input type="text"/>')
					}
					allRowsArray.push(`<tr row-index='${currentRow}'><td>${currentRowInputs.join('</td><td>')}</td></tr>`)
					currentRow++
				}

				this.html($(`<table width="100%" cellspacing="0" cellpadding="0" class="tabularInput-table ${config.animate ? 'animate' : ''}"></table>`).html(`<thead></thead><tbody>${allRowsArray.join()}</tbody>`))
				let tabularObject = new tabularInput(this, config)

				tabularObject.setColumnHeads(this, config.columnHeads)
				tabularObject.setName(this)
				tabularObject.setWidth(this)
				this.data('tabularObject', tabularObject)
			})
		}
	}

	$.fn.tabularInput = tabularInput.jQueryInterface
	$.fn.tabularInput.Constructor = tabularInput

})(jQuery)

export default tabularInput
