const Selector = ({ name, change }) => {
	return (
		<div onClick={() => {change(name)}} className='selector'>
			{name}
		</div>
	)
}

const Header = ({ change }) => {
	return (
		<div className='header'>
			<Selector name='gloves' change={change} />
			<Selector name='facemasks' change={change} />
			<Selector name='beanies' change={change} />
		</div>
	)
}

export default Header