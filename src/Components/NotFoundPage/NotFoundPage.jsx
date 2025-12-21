import { CircleAlert, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 contain">
      <h3
        className="text-sm
         sm:text-xl font-medium "
      >
        <CircleAlert className="w-5 h-5 inline" />
        <span>
          {" "}
          The page you are looking for does not exist or has been moved
        </span>
      </h3>
      <Link to="/">
        <button className="bg-main px-2 h-10 rounded-lg text-white hover:bg-main/80 duration-300 flex justify-center items-center space-x-1 text-lg">
          <Home className="w-5 h-5" />
          <span> Back to Home</span>
        </button>
      </Link>
    </div>
  );
}
