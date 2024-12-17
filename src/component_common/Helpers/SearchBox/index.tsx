import { fetchDataCommon, postDataCommon } from "@/api/commonApi";
import { toSlug } from "@/helper/functionHelper";
import { CommonProductAll } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type CallbackFunction = (...args: any[]) => void;

type SuggestProps = {
  productId: number;
  productName: string;
};

const useDebounce = (callback: CallbackFunction, delay: number) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: any[]) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default function SearchBox({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const refInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSuggestions([
      ...productList.data.filter(
        (item: any) =>
          item.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .indexOf(
              value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            ) >= 0
      ),
    ]);
  };

  const saveKeyWord = useMutation({
    mutationFn: (word: string) =>
      postDataCommon({ word: word }, "/common/keysearch"),
    onSuccess(data, variables, context) {
      if (queryClient.getQueryData(["keySearchs"])) {
        queryClient.setQueryData(["keySearchs"], (oldData: any) => {
          const resultData = data;
          console.log(resultData);
          return [resultData, ...oldData];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "keySearchs",
        });
      }
    },
  });

  const productList = useQuery({
    queryKey: ["keySearchs"],
    queryFn: () => fetchDataCommon("/common/keysearch"),
  });
  console.log(productList.data);
  return (
    <>
      <div
        className={`w-full h-full flex items-center border border-qgray-border bg-white ${className}`}
      >
        <div className="flex-1 h-full relative">
          <div className="h-full">
            <input
              type="text"
              onChange={handleChange}
              id="searchKey"
              ref={refInput}
              onKeyDown={(event) => {
                if (event.key === "Enter" && refInput.current?.value) {
                  if (
                    !productList.data.find(
                      (item: any) => item.name == refInput.current?.value
                    )
                  ) {
                    saveKeyWord.mutateAsync(event.currentTarget.value);
                  }
                  navigate("/search/" + toSlug(refInput.current?.value));
                  document.getElementById("searchKey")?.blur();
                }
              }}
              className="search-input border rounded p-1.5 w-full"
              placeholder="Nhập tên sản phẩm"
              onFocus={() => {
                setIsTyping(true);
              }}
              onBlur={() => setTimeout(() => setIsTyping(false), 150)}
            />
          </div>

          {suggestions && suggestions.length > 0 && isTyping && (
            <ul className="absolute left-0 rounded-sm custom-scrollbar-wider right-0 border border-gray-300 bg-white mt-1 z-50 max-h-40 overflow-y-auto transition duration-300">
              {suggestions.slice(0, 5).map((product: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate("/search/" + toSlug(product.name));
                    document.getElementById("searchKey")?.blur();
                  }}
                  className="hover:bg-gray-100 text-xs text-gray-600 cursor-pointer"
                >
                  <span className="p-2 block">
                    {/* Tạo phần in đậm cho từng ký tự khớp */}
                    {product.name}
                    {/* {highlightMatchingText(product.productName)} */}
                  </span>
                </li>
              ))}
              {suggestions.length > 5 && <li className="p-2">...</li>}
            </ul>
          )}
        </div>

        <button
          onClick={() => {
            if (refInput.current && refInput.current.value) {
              if (
                !productList.data.find(
                  (item: any) => item.name == refInput.current?.value
                )
              ) {
                saveKeyWord.mutateAsync(refInput.current?.value);
              }
              document.getElementById("searchKey")?.blur();
              navigate("/search/" + toSlug(refInput.current?.value));
            }
          }}
          className={`w-[93px] h-full text-sm font-600 search-btn bg-qyellow`}
          type="button"
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
}
