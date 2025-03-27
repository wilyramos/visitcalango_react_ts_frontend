import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { getUser } from '@/api/AuthAPI'
import { useQuery } from '@tanstack/react-query'
import AdminNavigation from "@/components/nav/AdminNavigation"


export default function AppLayout() {

    // verify is the user is authenticated

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false, // Number of retries before failing
        refetchOnWindowFocus: false
    })


    if (isLoading) return <div className="min-h-screen">Loading...</div>
    if (isError) return <Navigate to="/login" />
    if (!data) return <Navigate to="/login" />

    return (
        <>
            <div className="md:flex h-screen">
                <div className="md:w-1/6">
                    <AdminNavigation />
                </div>
                
                <div className="md:w-5/6">
                    <Outlet />
                </div>

            </div>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
