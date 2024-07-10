import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter,  createRoutesFromElements } from 'react-router-dom'
import {Home, Course, Login, Register, VideoPlayer, Profile} from './pages/index.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { InstructorRegisterForm, StudentRegisterForm, AuthLayout } from './components/index.js'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App/>}>
			<Route index element={<AuthLayout isAuthRequired={null}><Home /></AuthLayout>} />
			<Route path='course/:courseId' element={<AuthLayout isAuthRequired={null}><Course /></AuthLayout>} />
			<Route path='course/:courseId/video/:Id' element={<AuthLayout isAuthRequired={true}><VideoPlayer /></AuthLayout>} />
			<Route path='login' element={<AuthLayout isAuthRequired={false}><Login /></AuthLayout>} />
			<Route path='register' element={<AuthLayout isAuthRequired={false}><Register/></AuthLayout>}>
				<Route path='student' element={<StudentRegisterForm/>}></Route>
				<Route path='instructor' element={<InstructorRegisterForm/>}></Route>
			</Route>
			<Route path='profile' element={<AuthLayout isAuthRequired={true}><Profile></Profile></AuthLayout>}></Route>
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router}></RouterProvider>
	</Provider>
)
