import axios from "axios"

/*
use proxy to work around cors issues with
http://bad-api-assignment.reaktor.com/v2/
and chrome safety measures
*/

const get = (category) => {
	const baseUrl = `https://ui-api-proxy.herokuapp.com/api/${category}`
//	const baseUrl = `http://localhost:3001/api/${category}`
	return (axios
		.get(baseUrl)
		.then(response => response.data )
	)

}

const services = { get }

export default services