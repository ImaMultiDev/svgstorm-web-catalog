export default function LoadingSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Cargando iconos...</p>
        <p className="text-sm text-gray-500 mt-2">
          Conectando con la API de SVGStorm
        </p>
      </div>
    </div>
  );
}
