import { fetchDataCommon } from "@/api/commonApi";
import { CommonProductAll } from "@/type/TypeCommon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  const [products, setProducts] = useState<SuggestProps[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const debouncedSearch = useDebounce((searchTerm: string) => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  const productList = useQuery({
    queryKey: ["products"],
    queryFn: async () => await fetchDataCommon("/common/product/all"),
  });

  useEffect(() => {
    if (productList.data) {
      setProducts(
        productList.data.map((item: CommonProductAll) => ({
          productId: item.productCode,
          productName: item.name,
        }))
      );
    }
  }, [productList.data]);

  const highlightMatchingText = (productName: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const parts = productName.split(new RegExp(`(${lowerCaseQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === lowerCaseQuery ? (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div
        className={`w-full h-full flex items-center border border-qgray-border bg-white ${className}`}
      >
        <div className="flex-1 h-full relative">
          <form action="#" className="h-full">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              className="search-input border rounded p-2 w-full"
              placeholder="Nhập tên sản phẩm"
              onFocus={() => setIsTyping(true)}
              onBlur={() => setTimeout(() => setIsTyping(false), 150)}
            />
          </form>

          {suggestions.length > 0 && isTyping && (
            <ul className="absolute left-0 right-0 border border-gray-300 bg-white mt-1 z-50 max-h-40 overflow-y-auto transition duration-300">
              {suggestions.map((product, index) => (
                <li key={index} className="hover:bg-gray-100 cursor-pointer">
                  <Link
                    className="p-2 block"
                    to={`/single-product/${product.productId}`}
                  >
                    {/* Tạo phần in đậm cho từng ký tự khớp */}
                    {highlightMatchingText(product.productName)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className={`w-[93px] h-full text-sm font-600 search-btn bg-qyellow`}
          type="button"
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
}
