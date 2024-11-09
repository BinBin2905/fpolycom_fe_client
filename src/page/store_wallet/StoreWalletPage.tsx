import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteData,
  fetchCategory,
  fetchDataCommon,
  fetchDataCondition,
  postDataStore,
} from "@/api/commonApi";
import { error } from "console";
import TableCustom from "@/component_common/table/TableCustom";
import { payments } from "@/component_common/data/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment, ProductObject } from "@/type/TypeCommon";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { useStoreStore, useUserStore } from "@/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StoreWalletLoginDialog from "./component/StoreWalletLoginDialog";
import { toast } from "sonner";
import StoreWalletCreatePasswordDialog from "./component/StoreWalletCreatePasswordDialog";

const StoreWalletPage = () => {
  const { currentStore } = useStoreStore();
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [openCreatePassword, setOpenCreatePassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductObject | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const fetchPaymentWallet = useMutation({
    mutationFn: (body: any) => postDataStore(body, "/store/store-wallet/get"),
  });

  const { data, isLoading, isFetching, error, isSuccess, refetch } = useQuery({
    queryKey: ["store_transaction"],
    queryFn: () =>
      postDataStore(
        { storeCode: currentStore?.storeCode },
        "/store/store-transaction/all"
      ),
    enabled: currentStore != null,
  });
  const {
    data: dataTypeGood,
    isLoading: isLoadingTypeGood,
    isFetching: isFetchingTypeGood,
    error: errorTypeGood,
    isSuccess: isSuccessTypeGood,
  } = useQuery({
    queryKey: ["typeGoods"],
    queryFn: () => fetchDataCommon("/common/type-good/all"),
    enabled: currentStore != null,
  });

  const handleDelete = useMutation({
    mutationFn: (body: { [key: string]: any }) => deleteData(body),
    onSuccess: async (data: ProductObject[], body) => {
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (oldData: ProductObject[]) => {
          if (!oldData) return [];
          console.log(data);
          console.log(body);
          return oldData.filter(
            (item) => item.productCode !== body.productCode
          );
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Ví cửa hàng",
      itemLink: "/store/wallet",
    },
  ];
  const columns: ColumnDef<ProductObject>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "storeTransactionCode",
      meta: "Mã giao dịch",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã giao dịch
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          #{row.getValue("storeTransactionCode")}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "totalAmount",
      meta: "Tổng tiền giao dịch",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tổng tiền giao dịch
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(row.getValue("totalAmount"))}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "bankName",
      meta: "Ngân hàng",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="hidden"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngân hàng
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize hidden">{row.getValue("bankName")}</div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "bankBranchName",
      meta: "Chi nhánh",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Chi nhánh
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("bankBranchName")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "transactionStatus",
      meta: "Trạng thại",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {row.getValue("transactionStatus") == "pending"
            ? "Đang rút tiền"
            : row.getValue("transactionStatus") == "complete"
            ? "Hoàn thành"
            : "Từ chối"}
        </div>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      header: () => {
        return <div className="flex justify-end">Tác vụ</div>;
      },
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-16 text-end cursor-pointer ml-auto pr-5">
                <i className="ri-menu-line text-xl text-gray-600"></i>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-44" align="end">
              <div
                className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                onClick={() => {
                  navigate("/store/update_product/" + row.original.productCode);
                }}
              >
                <span>Xem chi tiết</span>
              </div>
              <div
                className="px-3 hover:bg-slate-100 cursor-pointer text-sm py-2 text-gray-600 flex gap-x-1"
                onClick={async () => {
                  setSelectedItem(row.original);
                  setOpenDelete(true);
                }}
              >
                <span>Xóa</span>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  useEffect(() => {
    if (fetchPaymentWallet.data && fetchPaymentWallet.isSuccess && !signedIn) {
      if (fetchPaymentWallet.data?.setPassword) {
        setOpenLogin(true);
      } else {
        setOpenCreatePassword(true);
      }
    }
  }, [fetchPaymentWallet.isSuccess]);

  useEffect(() => {
    fetchPaymentWallet.mutateAsync({ storeCode: currentStore?.storeCode });
  }, []);
  return (
    <>
      <StoreWalletCreatePasswordDialog
        open={openCreatePassword}
        onClose={() => {
          setOpenCreatePassword(false);
          setOpenLogin(true);
        }}
      ></StoreWalletCreatePasswordDialog>
      <StoreWalletLoginDialog
        open={openLogin}
        onClose={() => {
          setSignedIn(true);
          setOpenLogin(false);
        }}
      ></StoreWalletLoginDialog>
      <div className="flex flex-col gap-y-2">
        <div className="mb-3">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        {/* Action  */}
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-medium text-gray-600">Thông tin ví</h4>
          <div className="flex gap-x-2">
            <ButtonForm
              className="!bg-primary !w-28"
              type="button"
              icon={<i className="ri-download-2-line"></i>}
              label="Xuất excel"
            ></ButtonForm>
            <ButtonForm
              className="!bg-secondary !w-28"
              type="button"
              icon={<i className="ri-file-add-line"></i>}
              onClick={() => navigate("/store/create_product")}
              label="Rút tiền"
            ></ButtonForm>
          </div>
        </div>

        <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
          <div>
            <p className="flex items-center gap-x-1">
              <span className="text-base text-gray-700 font-medium">
                Số dư ví:
              </span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(fetchPaymentWallet.data?.balance)}
              </span>
            </p>
          </div>
        </div>

        {/* table */}
        <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
          <h5 className="mb-3">Danh sách giao dịch</h5>
          <TableCustom
            data={isSuccess ? data : []}
            columns={columns}
            search={[
              { key: "productCode", name: "mã sản phẩm", type: "text" },
              { key: "name", name: "tên sản phẩm", type: "text" },
              {
                key: "typeGoodCode",
                name: "Loại hàng",
                type: "combobox",
                dataList: dataTypeGood ? dataTypeGood : [],
                dataKey: "typeGoodCode",
                dataName: "name",
              },
            ]}
            isLoading={isFetching}
          ></TableCustom>
        </div>
      </div>{" "}
    </>
  );
};

export default StoreWalletPage;
