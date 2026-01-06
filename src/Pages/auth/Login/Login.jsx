import { useFormik } from "formik";
import React, { useState } from "react";
import { loginSchema } from "../../../validation/validation.js";
import clsx from "clsx";
import { CircleX, Loader, Lock, Mail } from "lucide-react";
import { supabase } from "../../../supabaseClient.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../Redux/userSlice.js";
import { Helmet } from "react-helmet";
import { setUserAvatar } from "../../../Redux/avatarSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const disp = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const submitForm = async (values) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else if (data.user) {
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
      disp(setUserAvatar(data.user.user_metadata?.avatar_url));
      toast.success(`Hello ${data.user.user_metadata.userName}`, {
        icon: "🎉",
        style: {
          fontSize: "18px",
          background: "#333",
          color: "white",
        },
      });
      navigate("/");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: loginSchema,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="form-contain">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="my-3 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
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

          <button className="form-btn" disabled={isLoading}>
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : ""}
            <span>Login</span>
          </button>
          <p className="text-center ">
            Don’t have an account?{" "}
            <Link className="text-secondry hover:underline" to="/auth/signup">
              Sign up
            </Link>{" "}
          </p>
        </form>
      </section>
    </>
  );
}
