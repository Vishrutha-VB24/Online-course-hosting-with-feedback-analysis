import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter,  createRoutesFromElements } from 'react-router-dom'
import {Home, Course, Login, Register, VideoPlayer} from './pages/index.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App/>}>
			<Route index element={<Home />} />
			<Route path='course' element={<Course />} />
			<Route path='course/video/:id' element={<VideoPlayer />} />
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router}></RouterProvider>
	</Provider>
)
