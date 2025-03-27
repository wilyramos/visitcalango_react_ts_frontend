import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "../components/nav/Navbar"


export default function AuthLayout() {
    return (
        <>
            <div className="">
                <div className="flex justify-center">
                    <Navbar />
                </div>
                
                <Outlet />
                
                
            </div>
            {/* <Footer /> */}
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
