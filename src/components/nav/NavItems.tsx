import {
    PowerIcon,
    HomeIcon,
    MapPinIcon,
    UsersIcon,
  } from "@heroicons/react/20/solid";
  import { Link } from "react-router-dom";
  import { useQueryClient } from '@tanstack/react-query'
  
  export default function NavItems() {

    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_CALANGO')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (
      <nav className="flex flex-col gap-4 w-full mt-4">
        <Link
          to="/admin"
          className="group inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
        >
          <HomeIcon
            className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Dashboard
        </Link>
  
        <Link
          to="/admin/users"
          className="group inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
        >
          <UsersIcon
            className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5"
            aria-hidden="true"
            />
            Usuarios
        </Link>

        <Link
          to="/admin/lugares"
          className="group inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
        >
            <MapPinIcon
                className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5"
                aria-hidden="true"
                />
                Lugares
        </Link>
  
        {/* ... (otros botones) ... */}
  
        <Link to={"/login"} onClick={logout} className="group inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900">
            <PowerIcon className="text-gray-400 group-hover:text-gray-500 mr-2 h-5 w-5" aria-hidden="true" />
            Cerrar sesión
        </Link>
        
      </nav>
    );
  }