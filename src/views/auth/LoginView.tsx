import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticateUser } from "@/api/AuthAPI";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";


export default function LoginView() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginForm>({
        defaultValues: { email: "", password: "" },
    });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss();
            toast.error(error.message);
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.dismiss();
            navigate("/admin");
        },
    });

    const handleLogin = (formData: UserLoginForm) => {
        setIsLoading(true);
        mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-700 mb-2">
                        Explora Calango
                    </h2>
                    <p className="text-gray-700">
                        Inicia sesión y descubre Cañete.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" noValidate>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido",
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-md transition duration-300"
                    >
                        {isLoading ? "Iniciando..." : "Iniciar"}
                    </button>
                </form>

                <nav className="mt-6 text-center space-y-3">
                    <Link to="/register" className="text-gray-700 hover:text-orange-500">
                        ¿Cuenta nueva?
                    </Link>
                    <br />
                    {/* <Link to="/auth/forgot-password" className="text-gray-700 hover:text-orange-500">
                        ¿Olvidaste clave?
                    </Link> */}
                </nav>
            </div>
        </div>
    );
}