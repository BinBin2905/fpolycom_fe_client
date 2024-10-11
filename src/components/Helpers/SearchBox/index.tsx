export default function SearchBox({ className }: { className?: string }) {
  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${className}`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form action="#" className="h-full">
            <input
              type="text"
              className="search-input"
              placeholder="Nhập tên sản phẩm"
            />
          </form>
        </div>
        <button
          className={` w-[93px] h-full text-sm font-600 search-btn bg-qyellow`}
          type="button"
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
}
