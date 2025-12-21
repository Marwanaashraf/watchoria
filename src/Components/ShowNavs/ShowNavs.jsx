import { useState } from "react";
import { navLinks } from "../../Constants/index.js";
import clsx from "clsx";
import Recomindations from "../Recomindations/Recomindations.jsx";
import { Film, TvMinimalPlay, Users } from "lucide-react";
import NotData from "../NotData/NotData.jsx";
import Cast from "../Cast/Cast.jsx";

export default function ShowNavs({ cast, recomindations, streamList, type }) {
  // navLink
  const [navLink, setNavLink] = useState("cast");
  return (
    <>
      <div className="flex gap-5 items-center  mt-28">
        {navLinks.map((ele, i) => {
          return (
            <div
              onClick={() => {
                setNavLink(ele.link);
              }}
              className={clsx(
                "relative cursor-pointer text-lg md:text-2xl",
                navLink === ele.link ? "nav-active" : ""
              )}
              key={i}
            >
              <span>{ele.name}</span>
            </div>
          );
        })}
      </div>
      <hr className="my-1" />
      {/* Cast */}
      {navLink === "cast" ? (
        cast.length == 0 ? (
          <NotData
            icon={
              <Users className="w-16 h-16 dark:text-gray-800 text-gray-300" />
            }
            header="Cast data not exist right now."
            details="Cast options for this show are not available now."
          />
        ) : (
          <div className="w-[92%] lg:w-full mx-auto my-7 relative ">
            <Cast cast={cast} />
          </div>
        )
      ) : navLink === "reco" ? (
        // Recomindations
        recomindations.length == 0 ? (
          <NotData
            icon={
              <Film className="w-16 h-16 dark:text-gray-800 text-gray-300" />
            }
            header="No Recomindations exist right now."
            details="Recomindations options for this show are not available now."
          />
        ) : (
          <div className="w-[92%] mx-auto my-7 relative ">
            <Recomindations recomindations={recomindations} type={type} />
          </div>
        )
      ) : streamList.length === 0 ? (
        <NotData
          icon={
            <TvMinimalPlay className="w-16 h-16 dark:text-gray-800 text-gray-300" />
          }
          header="No Streaming Options Available in Egypt"
          details="Streaming options for this show are not available in Egypt."
        />
      ) : (
        <>
          <h3 className="text-3xl my-7">In Egypt</h3>
          <div className="flex gap-5 items-center ">
            {streamList.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="bg-slate-200 dark:bg-slate-800 rounded-lg flex gap-2 px-2 py-2 items-center text-lg font-semibold hover:-translate-y-2 duration-300 w-48"
                >
                  <img
                    className="w-14 rounded-md"
                    src={`https://image.tmdb.org/t/p/w500/${ele.logo_path}`}
                    alt={ele.provider_name}
                  />
                  <h3>{ele.provider_name}</h3>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
