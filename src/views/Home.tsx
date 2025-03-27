import DestinosPrincipales from "@/components/DestinosPrincipales";
import Header from "@/components/Header";
import Categorias from "@/components/Place/Categorias";


// import DestinosPrincipales from '../components/DestinosPrincipales';

export default function Home() {
    return (
        <>
          <Header />
          {/* <DestinosPrincipales /> */}
            <div className="container max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-green-600">Encuentra tu siguiente parada</h2>
                <p className="mt-2 text-gray-600">Descubre el turismo en calango recomendado para ti.</p>
                {/* <Categorias /> */}

                <DestinosPrincipales />
                
                <Categorias />
    
            </div>
            
        </>
    );
};


