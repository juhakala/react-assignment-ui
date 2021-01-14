/*
color: ["black"]
id: "be027af73a7e9a2373a6ed26"
manufacturer: "ippal"
name: "JEÖISOOT FANTASY"
price: 89
type: "facemasks"
*/

const Stock = ({ item, stock }) => {
	if (stock) {
		const id = stock.id_arr.indexOf(item.id.toUpperCase())
		const option = stock.stock_arr[id]
		return (
			<td>{option}</td>
		)
	} else {
		return (
			<td>pending</td>
		)
	}
}

const Item = ({ item, stock }) => {
	return (
		<tr>
			<td>&#8594; {item.name}</td>
			<Stock item={item} stock={stock}/>
			<td>{item.price}</td>
			<td>{item.manufacturer}</td>
			<td>{item.color}</td>
			<td>{item.type}</td>
			<td>{item.id}</td>
		</tr>
	)
}

/*
iterate with .map through items (array) and add stock situation if
request for that manufacturer is fetched with axios
*/

const Body = ({ category, items, manus }) => {
	if (items[0])
		items = items[0].data
	const dudes = manus.map(manu => manu.name)
	return (
		<div className='body'>
			<h2 className='title'>Category: {category}</h2>
			<div className='divLst'>
				<table>
					<tbody>
						<tr>
							<td>&#8594; NAME</td>
							<td>STOCK</td>
							<td>PRICE</td>
							<td>MANUF</td>
							<td>COLOR</td>
							<td>TYPE</td>
							<td>ID</td>
						</tr>
						{items.map(item => <Item key={item.id} item={item} stock={manus[dudes.indexOf(item.manufacturer)]} />)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Body