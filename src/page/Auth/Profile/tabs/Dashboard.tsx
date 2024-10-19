import { getUserOrders } from "@/api/commonApi";
import { SpinnerLoading } from "@/component_common";
import { useUserStore } from "@/store";
import { OrderProps } from "@/type/TypeCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useUserStore();

  // const status = {
  //   complete: {
  //     background:
  //       "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  //     icon: "M5 11.917 9.724 16.5 19 7.5",
  //   },
  //   transferring: {
  //     background:
  //       "bg-yellow-100  text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  //     icon: "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  //   },
  // };

  const statusMap = new Map<
    string,
    { background: string; icon: string; title: string }
  >([
    [
      "complete",
      {
        background:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        icon: "M5 11.917 9.724 16.5 19 7.5",
        title: "Hoàn thành",
      },
    ],
    [
      "delivery",
      {
        background:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
        title: "Đang vận chuyển",
      },
    ],
    [
      "cancel",
      {
        background:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
        title: "Hủy",
      },
    ],
    [
      "pending",
      {
        background:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
        title: "Chờ xác nhận",
      },
    ],
    [
      "pickup",
      {
        background:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: "M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
        title: "Đang lấy hàng",
      },
    ],
  ]);

  const userOrders = useQuery({
    queryKey: ["orderList"],
    queryFn: async () =>
      await getUserOrders({ userLogin: currentUser!.userLogin }),
    enabled: !!currentUser!.userLogin,
  });

  useEffect(() => {
    if (userOrders.data) {
      console.log(userOrders.data);
    }
  }, [userOrders.data]);

  // if (!userOrders.data)
  //   return (
  //     <>
  //       <div className="flex items-center gap-3">
  //         <SpinnerLoading></SpinnerLoading>
  //         <h1>Loading...</h1>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <section className="bg-white antialiased dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Đơn hàng của tôi
              </h2>

              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label
                    htmlFor="order-type"
                    className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Trạng thái
                  </label>
                  <select
                    id="order-type"
                    className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option selected>Mặc định</option>
                    <option value="pending">Đang chờ xác nhận</option>
                    <option value="pickup">Đã xác nhận</option>
                    <option value="delivery">Đang vận chuyển</option>
                    <option value="complete">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`${userOrders.data ? "" : "relative opacity-40"}`}>
              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userOrders.data?.map((order: OrderProps) => (
                    <div
                      key={order.orderCode}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Order Code:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            {order.orderCode}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {order.pickupDate}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.finalTotal)}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd
                          className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                            statusMap.get(order.orderStatus)!.background
                          } `}
                        >
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={statusMap.get(order.orderStatus)!.icon}
                            />
                          </svg>
                          {statusMap
                            .get(order.orderStatus)!
                            .title.toUpperCase()}
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <button
                          type="button"
                          className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                        >
                          Cancel order
                        </button>
                        <Link
                          to={`/order-detail/${order.orderCode}`}
                          className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <nav
                className="mt-6 flex items-center justify-center sm:mt-8"
                aria-label="Page navigation example"
              >
                <ul className="flex h-8 items-center -space-x-px text-sm">
                  <li>
                    <a
                      href="#"
                      className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-4 w-4 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m15 19-7-7 7-7"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-4 w-4 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
              {userOrders.data ? (
                <> </>
              ) : (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  <SpinnerLoading></SpinnerLoading>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
