import BaseLayout from "@/components/BaseLayout";
import { Image } from "@mantine/core";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { IconPencil } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "./Modal";
import ModalEditMessage from "./ModalEditMessage";
import { editMessageApi } from "./api/EditMessage";
import { deleteUser } from "./api/deleteUser";
import { getUserData } from "./api/user";

const searchId = [
  {
    id: 1,
    name: "search name",
  },
  {
    id: 2,
    name: "search grad year",
  },
];

const Events = () => {
  const userId = Cookies.get("userId");
  const { data, isLoading, isError } = useQuery(["user", userId], () =>
    getUserData(userId)
  );
  const [formData, setFormData] = useState({
    userDescript: "",
  });
  const [searchIndex, setSearchIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [gradYear, setGradYear] = useState("");
  console.log("🚀 ~ file: alumni.tsx:41 ~ Events ~ gradYear:", gradYear);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditMessage,
    onOpen: onEditMessage,
    onOpenChange: onEditMessageChange,
  } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  function logout() {
    // Remove the user-related cookies (e.g., authentication token and user ID)
    Cookies.remove("token");
    Cookies.remove("userId");

    // Optionally, you can perform other logout actions, such as redirecting to the login page
    router.push("/login");
    // Example: window.location.href = "/login";
  }

  const handleDelete = async () => {
    Cookies.remove("userId");
    try {
      setIsDeleting(true);
      router.push("/login");
      await deleteUser(userId);
      setIsDeleting(false);

      // Optionally, you can perform actions after successful deletion
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditMessage = async () => {
    try {
      setLoading(true);
      const editedData = await editMessageApi(formData, userId);

      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries(["user", userId]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (id: any) => {
    setSearchIndex(id);
    setName("");
  };

  // Define a mutation function to reset the password

  const searchName = useMutation(
    async () => {
      const response = await axios.get(
        `https://the-alumnus-api.onrender.com/api/users/search?name=${name}`
      );
      const searchData = response.data;

      return searchData;
    },
    {
      onSuccess: (data) => {
        // Display a success toast message and navigate to the search results page
        toast.success(`Search found for, ${name}`, {
          position: "top-right",
          autoClose: 2000, // in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        router.push({
          pathname: "/search",
          query: { searchResults: JSON.stringify(data) },
        });
      },
      onError: () => {
        // Display an error toast message
        toast.error(`Search not found for, ${name}`, {
          position: "top-right",
          autoClose: 2000, // in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    }
  );

  const searchYear = useMutation(
    async () => {
      const response = await axios.get(
        `https://the-alumnus-api.onrender.com/api/users/search?grad_year=${gradYear}`
      );
      const searchData = response.data;

      return searchData;
    },
    {
      onSuccess: (data) => {
        // Display a success toast message and navigate to the search results page
        toast.success(`Search result found`, {
          position: "top-right",
          autoClose: 2000, // in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        router.push({
          pathname: "/searchyear",
          query: { searchResults: JSON.stringify(data) },
        });
      },
      onError: () => {
        // Display an error toast message
        toast.error(`Search result not found`, {
          position: "top-right",
          autoClose: 2000, // in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    }
  );

  const handleSubmitName = (e: any) => {
    e.preventDefault();
    searchName.mutate(); // Trigger the mutation
  };
  const handleSubmitYear = (e: any) => {
    e.preventDefault();
    searchYear.mutate(); // Trigger the mutation
  };

  useEffect(() => {
    if (!userId) {
      // Redirect the user to the login page
      router.push("/login"); // Replace "/login" with your actual login route
    }
    if (isDeleting === true) {
      router.push("/login"); // Replace "/login" with your actual login route
    }
  }, [router]);

  if (!userId) {
    return (
      <div className="h-screen flex justify-center items-center m-auto">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <BaseLayout>
      <>
        <section className="mt-5">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pb-24 pt-[80px] mx-auto">
              <div className=" mx-auto w-full flex-col justify-center items-center">
                <div className=" mb-10 mx-auto lg:w-[40%] ">
                  <div className="flex  justify-between  mb-4 w-[80%] mx-auto">
                    {searchId.map((item) => {
                      return (
                        <button
                          onClick={() => handleSearch(item.id)}
                          className={`capitalize  hover:text-indigo-500 ${
                            item.id === searchIndex
                              ? "border-b-2 border-[#03045E] text-black"
                              : "text-gray-600"
                          }`}
                          key={item.id}
                          type="button"
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                  {searchIndex === 1 ? (
                    <div className="flex relative">
                      <Input
                        type="text"
                        placeholder="Enter Alumni Name"
                        defaultValue=""
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        onSubmit={handleSubmitName}
                      />
                      <Button
                        className="absolute -right-1 bg-[#03045E] text-white p-1.5 rounded-full"
                        onClick={handleSubmitName}
                        radius="full"
                      >
                        Search
                      </Button>
                    </div>
                  ) : (
                    <div className="flex relative">
                      <Input
                        type="text"
                        placeholder="Enter Grad Year"
                        onChange={(e) => setGradYear(e.target.value)}
                        value={gradYear}
                        defaultValue=""
                        onSubmit={handleSubmitYear}
                        className=""
                      />
                      <Button
                        className="absolute -right-1 bg-[#03045E] text-white p-1.5 rounded-full"
                        onClick={handleSubmitYear}
                        radius="full"
                      >
                        Search
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="  lg:flex ">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Alumni Name
                  </h2>

                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 capitalize">
                    {data?.user?.first_name} {data?.user?.middle_name}{" "}
                    {data?.user?.last_name}{" "}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex-grow text-indigo-500 border-b-2 border-indigo-500 text-lg px-1">
                      Description
                    </span>
                    <div
                      onClick={onEditMessage}
                      className="text-gray-600  border-b-2 border-indigo-500 flex gap-x-3 cursor-pointer"
                    >
                      <span className="">Edit Message</span>{" "}
                      <span className="">
                        {" "}
                        <IconPencil size={24} color="blue" />
                      </span>
                    </div>
                  </div>

                  <p className="leading-relaxed mb-4 capitalize">
                    {data?.user?.user_profile === ""
                      ? ` Welcome ${data?.user?.first_name} to the Alumni Please click on the edit message to tell us more about more about yourself.`
                      : data?.user?.user_profile}
                  </p>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">First Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.first_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Middle Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.middle_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Last Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.last_name}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">User Name</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.username}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Email</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.email}
                    </span>
                  </div>
                  <div className="flex border-t capitalize border-gray-200 py-2">
                    <span className="text-gray-500">Graduation year</span>
                    <span className="ml-auto text-gray-900">
                      {data?.user?.grad_year}
                    </span>
                  </div>

                  <div className="flex justify-end gap-x-4 mt-4">
                    <button
                      onClick={() => {
                        onOpen();
                      }}
                      className="  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded capitalize"
                    >
                      {"Delete"}
                    </button>
                    <button
                      onClick={logout}
                      className="  text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded capitalize"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full hidden lg:block rounded-md">
                  <Image
                    alt="ecommerce"
                    height={600}
                    radius={3}
                    className=" lg:h-auto  object-cover object-center rounded "
                    src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </>
      <div className="">
        {" "}
        <ModalDelete
          isOpen={isOpen}
          onOpen={onOpen}
          isDeleting={isDeleting}
          onOpenChange={onOpenChange}
          buttonAction={() => {
            handleDelete();
          }}
        />
      </div>
      <div className="">
        <ModalEditMessage
          isOpen={isEditMessage}
          onOpen={onEditMessage}
          isDeleting={loading}
          value={formData.userDescript}
          onOpenChange={onEditMessageChange}
          onchange={handleInputChange}
          buttonAction={() => {
            handleEditMessage();
          }}
        />
      </div>
    </BaseLayout>
  );
};

export default Events;
