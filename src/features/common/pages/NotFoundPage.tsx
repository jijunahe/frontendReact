import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Página no encontrada</h1>
      <p className="text-gray-500 mt-2">Lo sentimos, la página no existe ! ! !.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
