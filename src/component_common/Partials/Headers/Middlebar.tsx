// import { Link } from "react-router-dom";
import ThinBag from "../../Helpers/icons/ThinBag";
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
import { useNavigate } from "react-router-dom";

export default function Middlebar({ className }: { className?: string }) {
  const { currentUser, currentUserInfo, logoutUser } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`/assets/images/FpolyComLogoVertical.png`}
                  alt="logo"
                />
              </a>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <a href="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </a>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow
                      `}
                  >
                    15
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div>
              <div>
                {currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <div className="flex gap-x-3 items-center">
                        <Avatar className="size-9">
                          <AvatarImage src="https://github.com/shadcn.png" />
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
                        <DropdownMenuItem className="cursor-pointer">
                          Cài đặt
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => logoutUser()}
                      >
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <ThinPeople />
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
