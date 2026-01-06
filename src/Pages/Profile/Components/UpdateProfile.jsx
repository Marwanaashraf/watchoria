import { useFormik } from "formik";
import { CircleX, Mail, SquarePen, UserRound } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../supabaseClient.js";
import clsx from "clsx";
import { editProfileSchema } from "../../../validation/validation.js";

export default function UpdateProfile({ user, setUser, isLoading }) {
  // personal information
  const [isEdit, setEdit] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  // save
  const handleSubmit = async (values) => {
    setSaveLoading(true);
    const user = await supabase.auth.updateUser({
      email: values.email,
      data: {
        userName: values.userName,
      },
    });
    setSaveLoading(false);
    if (!user) {
      toast.error("Something wrong please try again");
      return;
    }
    setUser(user.data.user);
    setEdit(false);
  };
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      userName: user?.user_metadata?.userName || "",
      email: user.email || "",
    },
    validationSchema: editProfileSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="border border-slate-300 dark:border-slate-800 rounded-md p-3 my-8">
      {/* header */}
      <div className="flex items-center justify-between">
        {/* head */}
        <div className="flex gap-2 items-center">
          <span className="bg-main w-[5px] h-8 rounded-lg"></span>
          <h2 className="text-xl md:text-3xl font-medium">
            Personal Information
          </h2>
        </div>

        {/* Edit */}
        {!isEdit ? (
          <button
            onClick={() => {
              setEdit(true);
            }}
            className="px-4 py-1 border border-main rounded-full flex items-center justify-center gap-1.5 text-main hover:bg-main hover:text-white duration-500 hover:scale-[0.98]"
          >
            <SquarePen className="w-4 h-4" />
            <span>Edit</span>
          </button>
        ) : (
          ""
        )}
      </div>

      {/* data */}
      {isEdit ? (
        <form onSubmit={formik.handleSubmit} className="my-4">
          {/* userName */}
          <div className="mt-3 relative">
            <label
              htmlFor="userName"
              className={clsx(
                " ",
                formik.errors.userName && formik.touched.userName
                  ? "text-main text-lg"
                  : " form-label"
              )}
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="userName"
                id="userName"
                className={clsx(
                  "form-input ",
                  formik.errors.userName && formik.touched.userName
                    ? "border-main"
                    : "form-input-border"
                )}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <UserRound className="form-icon" />
              </div>
            </div>
            {formik.errors.userName && formik.touched.userName ? (
              <div className="flex space-x-1 items-center text-main my-1">
                <CircleX className="w-5 h-5" />
                <h6 className="form-error">{formik.errors.userName}</h6>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* email*/}
          <div className="mt-3">
            <label
              htmlFor="email"
              className={clsx(
                " ",
                formik.errors.email && formik.touched.email
                  ? "text-main text-lg"
                  : " form-label"
              )}
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                id="email"
                className={clsx(
                  "form-input ",
                  formik.errors.email && formik.touched.email
                    ? "border-main"
                    : "form-input-border"
                )}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <Mail className="form-icon" />
              </div>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div className="flex space-x-1 items-center text-main my-1">
                <CircleX className="w-5 h-5" />
                <h6 className="form-error">{formik.errors.email}</h6>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* save */}
          <div className="my-5 flex justify-end items-center gap-2">
            <button
              onClick={() => {
                setEdit(false);
              }}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saveLoading}
              className="px-4 py-2 rounded-lg bg-secondry hover:bg-secondry/85 text-white disabled:opacity-50 flex justify-center items-center gap-1 disabled:cursor-not-allowed"
            >
              {saveLoading ? (
                <i className="fa-solid fa-spinner animate-spin" />
              ) : (
                ""
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="my-4">
          <h5 className="text-lg font-semibold mt-3">Full Name</h5>
          <p className={isLoading ? "load w-74 h-5" : ""}>
            {user && !isLoading ? user?.user_metadata?.userName : ""}
          </p>
          <h5 className="text-lg font-semibold mt-3">Email Address</h5>
          <p className={isLoading ? "load w-74 h-5" : ""}>
            {user && !isLoading ? user?.email : ""}
          </p>
        </div>
      )}
    </div>
  );
}
