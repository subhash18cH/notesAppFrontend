import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import { jwtDecode } from "jwt-decode";
import InputField from "../InputField/InputField";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Divider } from "@mui/material";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";
import { useForm } from "react-hook-form";
const apiUrl = "http://localhost:8080";

const Login = () => {

  const [step, setStep] = useState(1);
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken, token } = useMyContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code: "",
    },
    mode: "onTouched",
  });

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));
    setToken(token);
    navigate("/notes");
  };


  const onLoginHandler = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/public/signin", data);
      toast.success("Login Successful");
      reset();

      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        if (decodedToken.is2faEnabled) {
          setStep(2);
        } else {
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/notes");
  }, [navigate, token]);


  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <React.Fragment>
        <form
          onSubmit={handleSubmit(onLoginHandler)}
          className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
        >
          <div>
            <h1 className="font-montserrat text-center font-bold text-2xl">
              Login Here
            </h1>
            <p className="text-slate-600 text-center">
              Please Enter your username and password{" "}
            </p>
            <div className="flex items-center justify-between gap-1 py-5 ">
              <Link
                to={`${import.meta.env.VITE_BACKURL}/oauth2/authorization/google`}
                className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
              >
                <span>
                  <FcGoogle className="text-2xl" />
                </span>
                <span className="font-semibold sm:text-customText text-xs">
                  Login with Google
                </span>
              </Link>
              <Link
                to={`${import.meta.env.VITE_BACKURL}/oauth2/authorization/github`}
                className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
              >
                <span>
                  <FaGithub className="text-2xl" />
                </span>
                <span className="font-semibold sm:text-customText text-xs">
                  Login with Github
                </span>
              </Link>
            </div>

            <Divider className="font-semibold">OR</Divider>
          </div>

          <div className="flex flex-col gap-2">
            <InputField
              label="UserName"
              required
              id="username"
              type="text"
              message="*UserName is required"
              placeholder="type your username"
              register={register}
              errors={errors}
            />{" "}
            <InputField
              label="Password"
              required
              id="password"
              type="password"
              message="*Password is required"
              placeholder="type your password"
              register={register}
              errors={errors}
            />
          </div>
          <Buttons
            disabled={loading}
            onClickhandler={() => { }}
            className="bg-red-500 font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
            type="text"
          >
            {loading ? <span>Loading...</span> : "LogIn"}
          </Buttons>
          <p className=" text-sm text-slate-700 ">
            <Link
              className=" underline hover:text-black"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </p>

          <p className="text-center text-sm text-slate-700 mt-6">
            Don't have an account?{" "}
            <Link
              className="font-semibold underline hover:text-black"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </React.Fragment>
    </div>
  );
};

export default Login;
