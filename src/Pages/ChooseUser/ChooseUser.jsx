import React from "react";
import { Link } from "react-router-dom";
import Title from "Components/UI/Title/Title";

import customerImg from "Assets/Images/customer.jpg";
import kitchenImg from "Assets/Images/kitchen.jpg";
import adminImg from "Assets/Images/admin.jpg";

const ChooseUser = () => {
  const users = [
    { title: "Customer", link: "/customer", image: customerImg },
    { title: "Kitchen", link: "/kitchen/login", image: kitchenImg },
    { title: "Admin", link: "/admin/login", image: adminImg },
  ];

  return (
    <div className="h-[100vh] overflow-hidden relative flex flex-col justify-center items-center">
      <div className=" w-full text-center">
        <Title text="E-menu system" />
      </div>

      <h1 className="text-center font-bold text-[4em]">Choose a user!</h1>

      <div className="flex w-full flex-wrap md:gap-10 lg:gap-[7em] justify-center mt-5">
        {users.map((user, i) => (
          <Link to={user.link} key={i}>
            <div className="flex flex-col hover:scale-[1.1] transition-all duration-[250ms]">
              <div
                key={i}
                className="h-[14em] w-[15em] border-2 border-black rounded-lg overflow-hidden"
              >
                <img
                  src={user.image}
                  alt={user.title}
                  className="object-fit"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h4 className="text-center text-[1.2em]">{user.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseUser;
