import { confirmAccount } from "@/api/authApi";
import { ButtonForm } from "@/component_common";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmAccountPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const handleConfirm = useMutation({
    mutationFn: (token: string) => confirmAccount(token),
  });

  console.log(token);
  useEffect(() => {
    if (token) {
      handleConfirm.mutate(token);
    }
  }, [token]);

  useEffect(() => {
    if (handleConfirm.isError) {
      navigate("/login");
    }
  }, [handleConfirm.isError]);

  useEffect(() => {
    if (handleConfirm.isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [handleConfirm.isSuccess]);
  return (
    <div className="flex flex-col items-center pt-20">
      <h4 className="text-gray-700 font-semibold text-xl mb-5">
        Xác thực tài khoản thành công! Chuyển sang sau 3s...
      </h4>
      <ButtonForm
        label="Chuyển trang"
        type="button"
        className="!w-fit px-24"
        onClick={() => {
          navigate("/login");
        }}
      ></ButtonForm>
    </div>
  );
};

export default ConfirmAccountPage;
