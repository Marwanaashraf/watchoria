import logo from "../../assets/images/Watchix.png";
export default function StaticImage() {
  return (
    <div className="w-full h-full bg-slate-300 dark:bg-slate-800 flex justify-center items-center rounded-lg">
      <img className="w-10" src={logo} alt="logo" />
      <h3 className="text-2xl font-sans uppercase font-semibold text-main">
        Watchoria
      </h3>
    </div>
  );
}
