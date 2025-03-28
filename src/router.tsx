import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./views/Home";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/admin/DashboardView";
import AdminLugarView from "./views/admin/places/AdminLugarView";
import NotFound from "./views/404/NotFound";
import PlaceView from "./views/places/PlaceView";

export default function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<AuthLayout />}>
                        {/* Rutas públicas */}
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<LoginView />} />
                        <Route path="/register" element={<RegisterView />} />
                        <Route path="/places/:placeId" element={<PlaceView />} />
                    </Route>

                    <Route element={<AppLayout />}>
                        {/* Rutas privadas */}
                        <Route path="/admin" element={<DashboardView />} index />
                        <Route path="/admin/lugares" element={<AdminLugarView />} />

                        
        
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}