import { useState } from "react";
import { FaTree, FaLandmark, FaRoute, FaGlobe } from "react-icons/fa";

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

	// Filtrar lugares por categoría seleccionada

	return (
		<div className="p-6 max-w-screen-lg mx-auto">
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

			</div>


		</div>
	);
}
