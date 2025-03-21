import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";
import Apartments from "./Apartments";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-white scrolling-sign scrolllbar-none">
      <div
        className="flex gap-6 mb-8 max-w-8xl max-auto h-[90vh]"
        style={{
          background: `url('./backimage.png') center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col gap-6 py-28 px-[150px] ">
          <h1 className="text-white text-3xl font-bold lg:text-5xl">
            Find your next <span className="text-yellow-50">perfect</span>
            <br />
            place with ease
          </h1>
          <div className="text-white text-xs sm:text-sm">
            Urban Homes will help you find your next perfect place to live,
            <br />
            easy and comfortable.
            <br /> Our expert support are always available
          </div>

          <div className="relative flex flex-row items-center w-full space-x-44">
            <Link
              to="/search"
              className="relative flex flex-row items-center justify-start bg-blue-700 w-fit rounded-md px-7 w-64 py-2 text-white font-bold hover:underline"
            >
              let's get started...
            </Link>
            <div className="w-12 h-[60px] bg-white absolute skew-x-[20deg] flex justify-center items-center">
              {/* <svg
              {/* <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    class="w-[20px] hover:fixed h-[20px] -skew-x-[20deg]">
                    <path
                      fill="currentColor"
                      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    ></path>
                  </svg> */}
            </div>
          </div>
          {/* <SearchBox /> */}
        </div>

        <div>
          <img
            className="w-[550px] h-[450px] mt-20 shadow-xl border "
            src="./promote.jpeg"
          ></img>
        </div>
      </div>

      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[600px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}
        <Apartments/>

      <div className="w-full p-3 flex flex-col gap-8 justify-center items-center">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3 flex items-center w-full justify-between">
              <h2 className="text-2xl font-semibold text-black">
                Recent offers
              </h2>
              <Link
                className="text-sm font-medium text-blue-700 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3 flex items-center w-full justify-between">
              <h2 className="text-2xl font-semibold text-black">
                Recent places for rent
              </h2>
              <Link
                className="text-sm font-medium text-blue-700 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3 flex items-center w-full justify-between">
              <h2 className="text-2xl font-semibold text-black">
                Recent places for sale
              </h2>
              <Link
                className="text-sm font-medium text-blue-700 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
