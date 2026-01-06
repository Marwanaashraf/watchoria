import { useFormik } from "formik";
import { CircleX, Loader, Lock, Mail, UserRound } from "lucide-react";
import { signUpSchema } from "../../../validation/validation.js";
import clsx from "clsx";
import { useState } from "react";
import { supabase } from "../../../supabaseClient.js";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUserData } from "../../../Redux/userSlice.js";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { setUserAvatar } from "../../../Redux/avatarSlice.js";

export default function SignUp() {
  const navigate = useNavigate();
  const disp = useDispatch();
  // loading btn
  const [isLoading, setLoading] = useState(false);

  const submitForm = async (values) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { userName: values.userName, avatar_url: "" },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (data.user) {
      localStorage.setItem(
        "user_token",
        JSON.stringify({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiredTime: Date.now() + data.session.expires_in * 1000,
        })
      );
      disp(
        setUserData({
          email: data.user.email,
          userName: data.user.user_metadata.userName,
        })
      );
      disp(setUserAvatar(""));

      toast.success(`Hello ${data.user.user_metadata.userName}`, {
        icon: "🎉",
        style: {
          fontSize: "18px",

          backgroundColor: "#333",
          color: "white",
        },
      });
      navigate("/");
    }
    console.log(data.user.user_metadata.userName);
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: submitForm,
    validationSchema: signUpSchema,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="form-contain">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="my-3 text-center">
            <h1 className="text-3xl font-bold">Create New Account</h1>
          </div>

          {/* name */}
          <div className="my-4">
            <label
              className={clsx(
                " ",
                formik.errors.userName && formik.touched.userName
                  ? "text-main text-lg"
                  : " form-label"
              )}
              htmlFor="userName"
            >
              Username
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "form-input ",
                  formik.errors.userName && formik.touched.userName
                    ? "border-main"
                    : "form-input-border"
                )}
                type="text"
                name="userName"
                id="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <UserRound className="form-icon" />
              </div>
            </div>
            {formik.errors.userName && formik.touched.userName ? (
              <div className="flex space-x-1 items-center text-main">
                <CircleX className="w-5 h-5" />
                <p className="form-error">{formik.errors.userName}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* mail */}
          <div className="my-3">
            <label
              className={clsx(
                " ",
                formik.errors.email && formik.touched.email
                  ? "text-main text-lg"
                  : " form-label"
              )}
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "form-input ",
                  formik.errors.email && formik.touched.email
                    ? "border-main"
                    : "form-input-border"
                )}
                type="text"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <Mail className="form-icon" />
              </div>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div className="flex space-x-1 items-center text-main">
                <CircleX className="w-5 h-5" />
                <p className="form-error">{formik.errors.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* password */}
          <div className="my-3">
            <label
              className={clsx(
                " ",
                formik.errors.password && formik.touched.password
                  ? "text-main text-lg"
                  : " form-label"
              )}
              htmlFor="password"
            >
              password
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "form-input ",
                  formik.errors.password && formik.touched.password
                    ? "border-main"
                    : "form-input-border"
                )}
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <Lock className="form-icon" />
              </div>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div className="flex space-x-1 items-center text-main">
                <CircleX className="w-5 h-5" />
                <p className="form-error">{formik.errors.password}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* repassword */}
          <div className="my-3">
            <label
              className={clsx(
                " ",
                formik.errors.rePassword && formik.touched.rePassword
                  ? "text-main text-lg"
                  : " form-label"
              )}
              htmlFor="rePassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "form-input ",
                  formik.errors.rePassword && formik.touched.rePassword
                    ? "border-main"
                    : "form-input-border"
                )}
                type="password"
                name="rePassword"
                id="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <Lock className="form-icon" />
              </div>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="flex space-x-1 items-center text-main">
                <CircleX className="w-5 h-5" />
                <p className="form-error">{formik.errors.rePassword}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" disabled={isLoading} className="form-btn">
            {isLoading ? <Loader className="w-5 h-5 animate-spin " /> : ""}
            <span>Signup</span>
          </button>
          <p className="text-center ">
            Already have an account?{" "}
            <Link className="text-secondry hover:underline" to="/auth/login">
              Login
            </Link>{" "}
          </p>
        </form>
      </section>
    </>
  );
}
