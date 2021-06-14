export const getItem = name => {
	const data = window.localStorage.getItem(name)
	try {
		return JSON.parse(data)
	} catch (e) {
		return data
	}
}

export const setItem = (name, data) => {
	if (typeof data === 'object') {
		data = JSON.stringify(data)
	}
	window.localStorage.setItem(name, data)
}
