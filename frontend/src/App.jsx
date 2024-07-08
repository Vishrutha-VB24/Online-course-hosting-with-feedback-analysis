import { Outlet, useSearchParams } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { useEffect, useState } from 'react'
import { getCurrentUser } from './utils'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'
import { dotStream } from 'ldrs'
function App() {
	dotStream.register()
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	useEffect(()=>{
		getCurrentUser()
		.then(res=>{
			console.log(res)
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
	<div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
		<l-dot-stream size="70"></l-dot-stream>
		<p>Loading</p>
	</div>:
	<>
		<Header></Header>
		<Outlet></Outlet>
	</>;
}

export default App
