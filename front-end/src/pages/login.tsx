"use client";
import BaseLayout from "@/components/BaseLayout";
import { PasswordInput, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "./../assets/Home/logo.png";
import { loginApi } from "./api/login";

const Login = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation(loginApi);
  console.log("🚀 ~ file: login.tsx:13 ~ Login ~ isError:", isError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Replace 'your_username' and 'your_password' with actual values
    const formData = {
      username: username,
      password: password,
    };

    try {
      await mutate(formData);
      // router.push("/event"); // Redirect to the home page upon successful login
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BaseLayout>
      <section className="h-full overflow-y-auto mt-14">
        <div className="lg:container mx-auto h-full px-2 pt-10 lg:p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <Image
                          className="mx-auto w-20 h-20"
                          src={logo}
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Alumni
                        </h4>
                      </div>

                      <form>
                        <p className="mb-4">Please login to your account</p>
                        {/* <!--Username input--> */}
                        <TextInput
                          required
                          className="mb-4"
                          placeholder="Your username"
                          value={username}
                          onChange={(event) =>
                            setUsername(event.currentTarget.value)
                          }
                          label="Username"
                        />
                        {/* <!--Password input--> */}
                        <PasswordInput
                          label="Password"
                          required
                          className="mb-4"
                          placeholder="Your password"
                          mt="md"
                          value={password}
                          onChange={(event) =>
                            setPassword(event.currentTarget.value)
                          }
                        />

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            onClick={handleSubmit}
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>

                          {/* <!--Forgot password link--> */}
                          <a href="#!">Forgot password?</a>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>

                          <button
                            onClick={() => {
                              router.push({ pathname: "/signup" });
                            }}
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="lg:flex items-center rounded-b-lg lg:w-6/12  lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background: "#03045E",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        Login To Alumni Account
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Login;
