import Layout from "@/component_common/Partials/Headers/Layout";
import Thumbnail from "./Thumbnail";
import PageTitle from "@/component_common/Helpers/PageTitle";
import InputCom from "@/component_common/Helpers/InputCom";
import { useRef, useState } from "react";
import { ButtonForm } from "@/component_common";

export default function TrackingOrder() {
  const [isTracked, setIsTracked] = useState<boolean>(false);

  const orderNumberRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(orderNumberRef.current!.value);
  };

  return (
    // <Layout childrenClasses="pt-0 pb-0">
    <div className="tracking-page-wrapper w-full">
      <div className="page-title mb-[40px]">
        <PageTitle
          title="Track Order"
          breadcrumb={[
            { name: "home", path: "/" },
            { name: "Track Order", path: "/tracking-order" },
          ]}
        />
      </div>
      <div className="content-wrapper w-full mb-[40px]">
        <div className="container-x mx-auto">
          <h1 className="text-[22px] text-qblack font-semibold leading-9">
            Track Your Order
          </h1>
          <p className="text-[15px] text-qgraytwo leading-8 mb-5">
            Enter your order tracking number and your secret id.
          </p>
          <div className="w-full bg-white lg:px-[30px] px-5 py-[23px] lg:flex items-center">
            <div className="lg:w-[642px] w-full">
              <div className="mb-3">
                <InputCom
                  placeholder="Order Number"
                  label="Order Tracking Number*"
                  inputClasses="w-full h-[50px]"
                  ref={orderNumberRef}
                />
              </div>
              <div className="mb-[30px]">
                <InputCom
                  placeholder="23/09/2022"
                  label="Delivery Date"
                  inputClasses="w-full h-[50px]"
                />
              </div>

              <div className="w-[142px] h-[50px] black-btn flex justify-center items-center">
                <ButtonForm
                  label="Track Now"
                  type="button"
                  className={`bg-qblack ${
                    isTracked ? "bg-slate-400  w-full" : ""
                  } h-full mb-3 `}
                  loading={isTracked}
                  labelLoading="Đang cập nhật..."
                  disabled={isTracked}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <div className="flex-1 flex justify-center mt-5 lg:mt-0">
              <Thumbnail />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
}
