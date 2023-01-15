import url from 'url-unshort'

const uu = url()

export const getLatLng = async (text) => {
	try {
		if (text.slice(0, 20) === "https://www.google.c") {
			const regex = /-?(\d*\.)?\d+,\s*-?(\d*\.)?\d+/
			let result = text.match(regex);
			
			if (result.length >= 0) {
				return {
					lng: Number.parseFloat(result[0].split(',')[0]),
					lat: Number.parseFloat(result[0].split(',')[1]),
				}
			}
		}
		if (text.slice(0, 20) === "https://goo.gl/maps/") {
			const url = await uu.expand(text)
			if (url) {
				const regex = /-?(\d*\.)?\d+,\s*-?(\d*\.)?\d+/
				let result = url.match(regex);
				if (result.length >= 0) {
					return {
						lng: Number.parseFloat(result[0].split(',')[0]),
						lat: Number.parseFloat(result[0].split(',')[1]),
					}
				}
				return url
			}
			else throw new Error("This url can't be expanded")	
		}
		
	} catch (err) {
		return err
	}
}

const text = "https://goo.gl/maps/PUw9BjzaG7USfDiw7"

getLatLng(text).then(data => {
	console.log(data)
})