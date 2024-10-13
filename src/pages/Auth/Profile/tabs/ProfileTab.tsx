import { useRef, useState } from "react";
import InputCom from "../../../../components/Helpers/InputCom";

export default function ProfileTab() {
  const [profileImg, setprofileImg] = useState<string | null>(null);
  const profileImgInput = useRef<HTMLInputElement>(null);
  const browseprofileImg = () => {
    profileImgInput.current!.click();
  };
  const profileImgChangHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setprofileImg(event.target!.result as string);
      };
      imgReader.readAsDataURL(e.target.files![0]);
    }
  };
  return (
    <>
      <div className="w-full input-item flex flex-col lg:flex-row space-x-2.5 gap-x-10 mb-8 px-5">
        <div className="flex-none mx-auto">
          <div className="update-logo mb-9 flex-row">
            <h1 className="text-xl tracking-wide font-bold text-qblack text-center lg:text-start">
              Hình đại diện
            </h1>
            <p className="text-xs text-qgraytwo mb-5 text-center lg:text-start">
              Hình ảnh nên là hình vuông <br></br>
              Size tối thiếu là
              <span className=" text-qblack"> 300x300</span>
            </p>
            <div className="relative">
              <img
                src={profileImg || `/assets/images/ads-1.png`}
                alt=""
                className="object-cover rounded-full w-52 h-52"
              />
              <div
                onClick={browseprofileImg}
                className="absolute bottom-3 right-3 bg-qblack rounded-full cursor-pointer"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                    fill="white"
                  />
                  <path
                    d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <input
              ref={profileImgInput}
              onChange={(e) => profileImgChangHandler(e)}
              type="file"
              className="hidden"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="w-full">
            <InputCom
              label="Tên đăng nhập: "
              subLabel={
                <div>
                  Có tối thiểu 6 kí tự, tối đa 18 kí tự. <br />
                  Không bao gồm các kí tự đặc biệt ( /, =, &lt;, &gt;... )
                </div>
              }
              placeholder="Tên đang nhập"
              type="text"
              inputClasses="py-3"
            />
          </div>
          <div className="w-full">
            <InputCom
              label="Họ và tên: "
              placeholder="Nguyễn Văn A"
              type="text"
              inputClasses="py-3"
            />
          </div>
          <div className="input-item flex space-x-2.5 mb-8">
            <div className="w-1/2 h-full">
              <InputCom
                label="Email*"
                placeholder="demoemial@gmail.com"
                type="email"
                inputClasses="py-3"
              />
            </div>
            <div className="w-1/2 h-full">
              <InputCom
                label="Số điện thoại*"
                placeholder="012 3  *******"
                type="text"
                inputClasses="py-3"
              />
            </div>
          </div>
          <div className="input-item mb-8">
            <div className="w-full">
              <InputCom
                label="Địa chỉ:"
                placeholder="ABC đường XYZ"
                subLabel={
                  <div>
                    Phiên bản hiện tại chỉ hỗ trợ cho các khu vực nằm trong
                    thành phố Hồ Chí Minh
                  </div>
                }
                type="text"
                inputClasses="py-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="action-area flex space-x-4 items-center justify-end">
        <button type="button" className="text-sm text-qred font-semibold">
          Loại bỏ thay đổi
        </button>
        <button
          type="button"
          className="w-[100px] h-[50px] bg-qblack text-white text-sm"
        >
          Lưu
        </button>
      </div>
    </>
  );
}
