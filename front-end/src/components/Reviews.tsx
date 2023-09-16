import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";

const Reviews = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  return (
    <section className="primaryColor text-white pb-20 pt-10 lg:px-[100px] px-[20px]">
      <h1 className="text-3xl text-center">Alumni Reviews</h1>
      <Card className="max-w-[340px] bg-gray-600/50 text-white mt-10">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://bit.ly/sage-adebayo"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed ? "bg-white text-foreground border-default-200" : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
          <span className="pt-2">
            #FrontendWithZoey
            <span className="py-2" aria-label="computer" role="img"></span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className=" text-default-400 text-small">Member</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Reviews;
