import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { useEffect, useState } from 'react';
import services from './services/calls'

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function getPosition(string, subString, index) {
	return string.split(subString, index).join(subString).length;
}

function App() {
	const [category, setCategory] = useState('gloves')
	const [items, setItems] = useState([])
	const [manus, setManu] = useState([])
	const [que, setQue] = useState([])

	/*
	fetch wanted item category from api if not fetched earlier,
	and push it to front. filter unique names of manufacturers
	who had not been fetched yet or not in que atm, and add to
	them to que
	*/
	useEffect(() => {
		const index = items.map(item => item.name).indexOf(category)
		if (index === -1) {
			const fetchData = async () => {
				const result = await services.get(`products/${category}`);
				const unique = result.map(item => item.manufacturer).filter(onlyUnique)
				const names = manus.map(item => item.name).concat(que)
				const qque = unique.filter(item => {
					return names.indexOf(item) === -1
				})
				setQue(qque)
				const newObj = {
					name: category,
					data: result
				}
				const clone = items.slice()
				clone.unshift(newObj)
				setItems(clone)
			}
			fetchData();
		} else {
			const ppp = items.slice()
			ppp.unshift(ppp.splice(index, 1)[0])
			setItems(ppp)
		}
		// eslint-disable-next-line 
	}, [category])

	/*
	if something is in que fetch the whole que same time to
	get manufacturers and construct new object to be added to
	manufacturers array. if api call fails, then add that name
	to que again and try to fetch it on second round
	*/
	useEffect(() => {
		if (!que[0]) {
			return ;
		}
		const final = []
		const newQue = []
		async function getData () {
			await Promise.all(que.map(async (target) => {
				const result = await services.get(`availability/${target}`);
				if (result.response === '[]')
					newQue.push(target)
				else {	
					const newObj = {
						name: target,
						id_arr: result.response.map(item => item.id),
						stock_arr: result.response.map(item => {
							return (
								item.DATAPAYLOAD.substring(
									getPosition(item.DATAPAYLOAD, '<INSTOCKVALUE>', 1) + 14,
									getPosition(item.DATAPAYLOAD, '</INSTOCKVALUE>', 1)
								)
							)
						})
					}
					final.push(newObj)
				}
			}));
			setManu(manus.concat(final))
			setQue(newQue)
		}
		getData();
		// eslint-disable-next-line 
	}, [que])

	/*
	if category is changed from header put temporaly object
	to items to see that you are getting the new category
	*/
	const changeCategory = (name) => {
		if (name !== category) {
			const newObj = {
				name: 'loading',
				data: [
					{id: "loading", type: "loading", name: "loading", color: 'loading', price: 'loading', manufacturer: 'loading'}
				]
			}
			const clone = items.slice()
			clone.unshift(newObj)
			setItems(clone)
			setCategory(name)
		}
	}
 	return (
		<div className='container'>
			<Header change={changeCategory}/>
			<Body category={category} items={items} manus={manus} />
			<Footer />
		</div>
	);
}

export default App;