// HOC container for pages with Navbar and Footer
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../hooks/windowDimensions";
import { useAuth } from "../lib/AuthContext";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

export default function PageHOC({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuth();
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (!auth?.isLogged) {
      console.log("Logged in");
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    console.log(width);
    if (width > 800) {
      setShowRightSidebar(true);
    } else {
      setShowRightSidebar(false);
    }
  }, [width]);

  return (
    <>
      <div className={`he-full inset-0 flex w-full justify-evenly`}>
        <div className="grow-4 absolute inset-0 right-auto flex">
          <RightSidebar
            classes={`w-[15rem] transition-all duration-500 ease-in-out ${
              showRightSidebar ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="flex grow-[15]">{children}</div>
        <div className="absolute inset-0 left-auto flex w-[5rem] grow-[2]">
          <LeftSidebar />
        </div>
      </div>
    </>
  );
}
