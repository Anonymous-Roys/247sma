import React, { useState } from "react";
import Avatar from "react-avatar";

interface Review {
  name: string;
  email: string;
  location: string;
  amount: string;
}

const reviewData: Review[] = [
    {
        name: "David Adjei",
        email: "d****@gmail.com",
        location: "Accra, Ghana",
        amount: "GHC11,234",
      },
      {
        name: "Ama Mensah",
        email: "a****@yahoo.com",
        location: "Kumasi, Ghana",
        amount: "GHC8,543",
      },
      {
        name: "Kwame Asante",
        email: "k****@outlook.com",
        location: "Takoradi, Ghana",
        amount: "GHC9,874",
      },
      {
        name: "Afia Boakye",
        email: "a****@gmail.com",
        location: "Tamale, Ghana",
        amount: "GHC12,350",
      },
      {
        name: "Yaw Owusu",
        email: "y****@hotmail.com",
        location: "Sunyani, Ghana",
        amount: "GHC7,210",
      },
      {
        name: "Akosua Amponsah",
        email: "a****@gmail.com",
        location: "Cape Coast, Ghana",
        amount: "GHC8,900",
      },

];

const Reviews: React.FC = () => {
  const initialVisible = 5;
  const [visibleReviews, setVisibleReviews] = useState(initialVisible);

  const handleSeeMore = () => {
    setVisibleReviews((prev) => prev + initialVisible);
  };

  const handleSeeLess = () => {
    setVisibleReviews(initialVisible);
  };

  return (
    <div className=" lg:row-span-4">
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 font-semibold text-gray-700">Reviews and Comments</h3>
      <ul className="space-y-4">
        {reviewData.slice(0, visibleReviews).map((review, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Avatar using react-avatar */}
              <Avatar name={review.name} size="40" round />
              <div>
                <div className="font-medium text-gray-800">{review.name}</div>
                <div className="text-sm text-gray-500">{review.email}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">{review.amount}</div>
              <div className="text-sm text-gray-400">{review.location}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {visibleReviews < reviewData.length ? (
          <button
            onClick={handleSeeMore}
            className="mr-4 text-sm text-blue-500 hover:underline"
          >
            See More
          </button>
        ) : (
          <button
            onClick={handleSeeLess}
            className="text-sm text-blue-500 hover:underline"
          >
            See Less
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default Reviews;
