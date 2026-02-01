import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export default function DropDown({
  name,
  dropDown,
  setDropDown,
  list,
  params,
  setParams,
}) {
  console.log(params);
  
  return (
    <div className="relative my-1">
      {/* dropdown btn */}
      <div
        onClick={() => {
          dropDown ? setDropDown(false) : setDropDown(true);
        }}
        className={clsx(
          "px-1 py-1 rounded-lg  bg-slate-100 dark:bg-slate-800  cursor-pointer flex justify-between items-center",
          dropDown ? "border border-slate-300 dark:border-slate-700 " : "",
        )}
      >
        {!params 
          ?`Select ${name}` 
          : list?.find((ele) => ele.apiName === params)?.name ||params}
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* dropdown */}
      {dropDown ? (
        <div
          className="w-full max-h-56  bg-slate-100 dark:bg-slate-800 
         z-30 rounded-lg border border-slate-50 dark:border-slate-700 p-2 overflow-auto space-y-2 my-2"
        >
          <h3 className="text-slate-400 dark:text-slate-600 capitalize">
            {name}
          </h3>
          {list.map((ele) => {
            return (
              <div
                key={ele.name}
                onClick={() => {
                  setDropDown(false);
                  setParams(ele.apiName);
                }}
                className={clsx(
                  " rounded p-0.5 cursor-pointer duration-200",
                  params === ele.apiName
                    ? "bg-main text-white"
                    : "hover:bg-main hover:text-white",
                )}
              >
                <span>{name === "years" ? ele.apiName : ele.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
