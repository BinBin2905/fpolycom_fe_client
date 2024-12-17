// import { Link } from "react-router-dom";
import ThinPeople from "../../Helpers/icons/ThinPeople";
import SearchBox from "../../Helpers/SearchBox";
import Cart from "@/page/Cart";
import { useUserStore } from "@/store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import NotifyUser from "@/component_common/notify/NotifyUser";
import MessageUser from "./MessageUser";
import FriendNotify from "./FriendNotify";

export default function Middlebar({ className }: { className?: string }) {
  const { currentUser, currentUserInfo, logoutUser } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <NavLink to="/">
                <img
                  width="152"
                  height="36"
                  src={`/assets/images/FpolyComLogoVertical.png`}
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="cart-wrapper relative py-4 items-center flex gap-x-4">
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart />
                <FriendNotify></FriendNotify>
                <NotifyUser></NotifyUser>
                <MessageUser></MessageUser>
              </div>
              <div>
                {currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <div className="flex gap-x-3 items-center">
                        <Avatar className="size-9">
                          <AvatarImage src={currentUser.userImage} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-gray-600">
                          <span className="font-medium">
                            {currentUserInfo
                              ? currentUserInfo!.name
                              : currentUser.username}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" side="bottom">
                      <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          Thông tin tài khoản
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/profile#password");
                          }}
                        >
                          Đổi mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/wishlist");
                          }}
                        >
                          Danh sách thích
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Cài đặt
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          queryClient.clear();
                          queryClient.invalidateQueries();
                          logoutUser();
                        }}
                      >
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div
                    className="cursor-pointer py-4"
                    onClick={() => navigate("/login")}
                  >
                    <ThinPeople />
                  </div>
                )}

                {/* <Link to="/profile">
                  <span>
                  
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
