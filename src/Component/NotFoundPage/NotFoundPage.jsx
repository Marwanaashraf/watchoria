import { CircleAlert, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <div className="flex justify-center items-center space-x-1">
        <CircleAlert className="w-5 h-5" />
        <h3 className="text-xl font-medium ">
          The page you are looking for does not exist or has been moved
        </h3>
      </div>
      <Link to="/">
        <button className="bg-red-500 px-2 h-10 rounded-lg text-white hover:bg-red-500/90 duration-300 flex justify-center items-center space-x-1 text-lg">
          <Home className="w-5 h-5" />
          <span> Back to Home</span>
        </button>
      </Link>
    </div>
  );
}
