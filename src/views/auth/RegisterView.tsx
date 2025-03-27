import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onMutate: () => {
            setIsLoading(true);
            toast.loading("Creando cuenta...");
        },
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss();
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            toast.dismiss();
            toast.success(data);
            reset();
            navigate("/login");
        },
    });

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white mx-4">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-700 mb-2">
                        Descubre Calango
                    </h2>
                    <p className="text-gray-700 text-sm">
                        Crea tu cuenta y explora las maravillas de Cañete.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-6" noValidate>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                            {...register("name", { required: "El nombre es obligatorio" })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido",
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres",
                                },
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 rounded-md transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creando..." : "Crear"}
                    </button>
                </form>

                <nav className="mt-6 text-center">
                    <Link to="/login" className="text-gray-700 hover:text-orange-500">
                        ¿Ya tienes cuenta?
                    </Link>
                </nav>
            </div>
        </div>
    );
}