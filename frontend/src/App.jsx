import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'
import { leapfrog } from 'ldrs'
import { getUser } from './utils/apis'
import { Course } from './pages'
function App() {
	leapfrog.register()
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	useEffect(()=>{
		getUser()
		.then(res=>{
			if(res.data?.data){
				dispatch(login(res.data?.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			setLoading(false);
		})
	})
	return loading ?
	<div className='gap-3 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
		<div className='flex items-center gap-1 '>
			<p>Loading</p>
			<l-leapfrog size={20}></l-leapfrog>
		</div>
	</div> :
	<>
		{/* <Header></Header> */}
		{/* <Outlet></Outlet> */}
	</>;
}

export default App
