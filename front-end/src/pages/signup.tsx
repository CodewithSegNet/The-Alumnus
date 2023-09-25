"use client";
import AlertComponent from "@/components/Alert";
import BaseLayout from "@/components/BaseLayout";
import { PasswordInput, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logo from "./../assets/Home/logo.png";
import { signUpApi } from "./api/signup";

function Register() {
  const { mutate, isLoading, isError, isSuccess } = useMutation(signUpApi);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [grad_Year, setGradYear] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/login"); // Redirect to the '/events' page
    }
  }, [isSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Replace 'your_username' and 'your_password' with actual values
    const formData = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      grad_year: parseInt(grad_Year),
      username: username,
      password: password,
      confirm_password: confirm_password,
    };

    try {
      await mutate(formData);
      if (isSuccess) {
        router.push("/login"); // Redirect to the '/events' page
        toast.success(`Signup Successful, ${username}`, {
          position: "top-right",
          autoClose: 2000, // in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } 
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
                      <>
                        {isSuccess ? (
                          <>
                            <AlertComponent
                              title={`Signup Successful, ${username}`}
                              color="green"
                            />
                          </>
                        ) : null}
                        {isError ? (
                          <AlertComponent
                            title={`Something went wrong`}
                            color="red"
                          />
                        ) : null}
                      </>
                      <form>
                        <p className="mb-4">Please login to your account</p>
                        {/* <!--firstName input--> */}
                        <TextInput
                          required
                          className="mb-2"
                          placeholder="First Name"
                          value={first_name}
                          onChange={(event) =>
                            setFirstName(event.currentTarget.value)
                          }
                          label="First Name"
                        />

                        {/* <!--middleName input--> */}
                        <TextInput
                          required
                          className="mb-2"
                          placeholder="Middle Name"
                          value={middle_name}
                          onChange={(event) =>
                            setMiddleName(event.currentTarget.value)
                          }
                          label="Middle Name"
                        />

                        {/* <!--lastName input--> */}
                        <TextInput
                          required
                          className="mb-2"
                          placeholder="Last Name"
                          value={last_name}
                          onChange={(event) =>
                            setLastName(event.currentTarget.value)
                          }
                          label="Last Name"
                        />

                        {/* <!--grad_year input--> */}
                        <TextInput
                          required
                          className="mb-2"
                          placeholder="Graduation Year"
                          value={grad_Year}
                          onChange={(event) =>
                            setGradYear(event.currentTarget.value)
                          }
                          label="Graduation Year"
                        />

                        {/* <!--username input--> */}
                        <TextInput
                          required
                          className="mb-2"
                          placeholder="Username"
                          value={username}
                          onChange={(event) =>
                            setUsername(event.currentTarget.value)
                          }
                          label="Username"
                        />

                        {/* <!--Password input--> */}
                        <PasswordInput
                          required
                          className="mb-2"
                          placeholder="Password"
                          value={password}
                          onChange={(event) =>
                            setPassword(event.currentTarget.value)
                          }
                          label="Password"
                        />

                        {/* <!--Password input--> */}
                        <PasswordInput
                          required
                          className="mb-2"
                          placeholder="Confirm Password"
                          value={confirm_password}
                          onChange={(event) =>
                            setConfirmPassword(event.currentTarget.value)
                          }
                          label="Confirm Password"
                        />

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            disabled={isLoading ? true : false}
                            onClick={handleSubmit}
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background: isLoading
                                ? "gray"
                                : "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            {isLoading ? "Loading..." : "Sign Up"}
                          </button>

                          {/* <!--Forgot password link--> */}
                          <a href="#!">Forgot password?</a>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Already have an account?</p>

                          <button
                            onClick={() => {
                              router.push({ pathname: "/login" });
                            }}
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            login
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
                        Register To Alumni Account
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
}

export default Register;
