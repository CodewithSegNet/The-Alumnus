import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";

const reviewsdata = [
  {
    id: 1,
    name: "Zoey Lang",
    username: "@zoeylang",
    avatar:
      "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50",
    review:
      " best alumni ever seen, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 2,
    name: "john doe",
    username: "@johndoe",
    avatar: "https://bit.ly/sage-adebayo",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 3,
    name: "jane doe",
    username: "@janedoe",
    avatar:
      "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 4,
    name: "segun doe",
    username: "@segundoe",
    avatar: "https://bit.ly/sage-adebayo",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 5,
    name: "shogo doe",
    username: "@shogodo",
    avatar:
      "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 6,
    name: "zeus doe",
    username: "@zeus",
    avatar: "https://bit.ly/sage-adebayo",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
  {
    id: 7,
    name: "hades doe",
    username: "@hades",
    avatar:
      "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=50",
    review: " best alumni ever, am happy to be part of the great institute",
    designation: "Frontend Developer",
    followers: "Followers",
    member: "member",
    ratings: "1.3k",
  },
];

const breakpoints = {
  // when window width is >= 320px (mobile)
  320: {
    slidesPerView: 1,
  },
  // when window width is >= 768px (tablets)
  768: {
    slidesPerView: 3,
  },
  // when window width is >= 1024px (large screens)
  1024: {
    slidesPerView: 4,
  },
};

const Reviews = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  return (
    <section className="primaryColor text-white pb-20 pt-10 lg:px-[100px] px-[20px]">
      <h1 className="text-3xl text-center">Alumni Reviews</h1>
      <Swiper
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        breakpoints={breakpoints}
        className="mySwiper"
      >
        {reviewsdata.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Card className=" bg-gray-600/50 text-white mt-10">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={item.avatar}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {item.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {item.username}
                      </h5>
                    </div>
                  </div>
                  <Button
                    className={
                      isFollowed
                        ? "bg-white text-foreground border-default-200"
                        : ""
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
                  <p>{item.review}</p>
                  <span className="pt-2">
                    #FrontendWith{item.username}
                    <span
                      className="py-2"
                      aria-label="computer"
                      role="img"
                    ></span>
                  </span>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className=" text-default-400 text-small">
                      {item.member}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {item.ratings}
                    </p>
                    <p className="text-default-400 text-small">
                      {item.followers}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Reviews;
