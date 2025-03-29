import { useState } from "react";
import { FaTree, FaLandmark, FaRoute, FaGlobe } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/api/PlaceAPI";

export default function Categorias() {

	// Estado para manejar la categoría seleccionada
	const [selectedCategory, setSelectedCategory] = useState("todos");

	// Categorías disponibles
	const categories = [
		{ id: "Nature", label: "Naturaleza", icon: <FaTree /> },
		{ id: "Culture", label: "Cultura", icon: <FaLandmark /> },
		{ id: "Historical", label: "Historia", icon: <FaRoute /> },
		{ id: "Aventura", label: "Aventuras", icon: <FaGlobe /> },
	];

	const { data, isLoading, error } = useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });

	// const data: {
	// 	name: string;
	// 	description: string;
	// 	category: string;
	// 	location: string;
	// 	images: string[];
	// 	_id: string;
	// }[] = data || [];

	if(isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-red-500">Error al cargar los lugares</p>
			</div>
		);
	}
	if (!data || data.length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-500">No hay lugares disponibles</p>
			</div>
		);
	}

	// Filtrar lugares por categoría seleccionada

	if(data)return (
		<div className="p-6 max-w-screen-lg mx-auto pt-28">
			<h2 className="text-2xl font-bold mb-4 text-center">Categorías</h2>
			<div className="flex flex-wrap justify-center gap-4 mb-6">
				<button
					className={`px-4 py-2 rounded-full flex items-center gap-2 ${selectedCategory === "todos" ? "" : "bg-gray-300 text-gray-800"}`}
					onClick={() => setSelectedCategory("todos")}
				>
					<FaGlobe /> Todos
				</button>
				{categories.map((cat) => (
					<button
						key={cat.id}
						className={`px-4 py-2 rounded-full flex items-center gap-2 ${selectedCategory === cat.id ? "bg-blue-600 text-white" : ""}`}
						onClick={() => {
							setSelectedCategory(cat.id);
						}}
					>
						{cat.icon} {cat.label}
					</button>
				))}
			</div>
			

			<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
				{data
					.filter((place) => selectedCategory === "todos" || place.category === selectedCategory)
					.map((place, index) => (
						<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="h-48 bg-gray-200 rounded-t-lg">
								{place.images.map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Imagen de ${place.name}`}
										className="w-full h-full object-cover rounded-t-lg"
									/>
								))}
							</div>
							<div className="p-4">
								<h3 className="text-xl font-semibold mb-2">{place.name}</h3>
								<p className="text-gray-600">{place.description}</p>
							</div>
						</div>
					))}
				

			</div>


		</div>
	);
}
