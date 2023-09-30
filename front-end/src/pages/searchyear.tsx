import BaseLayout from "@/components/BaseLayout";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { IconUserCircle } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchGradYear = () => {
  const router = useRouter();
  const userId = Cookies.get("userId");

  // State to hold the search results
  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    // Get the search results from the query parameter
    const searchResultsParam: any = router.query.searchResults;

    if (searchResultsParam) {
      // Parse the JSON string to get the data
      const parsedResults = JSON.parse(searchResultsParam);

      // Set the search results in state
      setSearchResults(parsedResults);
    }
  }, [router]);

  useEffect(() => {
    if (!userId) {
      // Redirect the user to the login page
      router.push("/login"); // Replace "/login" with your actual login route
    }
  }, [router]);

  return (
    <BaseLayout>
      <div className="mt-[94px] w-[80%] mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchResults?.users?.map((result: any) => {
          return (
            <div key={result.id}>
              <Card className=" min-h-[250px]">
                <CardHeader className="flex gap-3">
                  <div className="h-[40px] w-[40px] flex justify-center items-center rounded-md bg-black">
                    <IconUserCircle size={30} color="white" />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-md">{result?.full_name}</p>
                    <p className="text-small text-default-500">
                      {result?.username}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <span className=" mb-2 font-bold">
                    Graduation Year : {result?.grad_year}
                  </span>
                  <p>
                    {result?.user_profile === ""
                      ? ` Welcome ${result?.full_name} to the Alumni Please click on the edit message to tell us more about more about yourself.`
                      : result?.user_profile}
                  </p>
                </CardBody>
                <Divider />
              </Card>
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
};

export default SearchGradYear;
