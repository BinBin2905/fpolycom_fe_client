export default function CheckedMark(props: { value: number }) {
    const maTrangThai = props.value;
  
    const getBgClass = (step: number) => {
      return maTrangThai >= step ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-800";
    };
  
    const getBgClassST = (step: number) => {
      return maTrangThai >= step + 1 ? "bg-blue-400" : "bg-gray-200";
    };
  
    const getStepContent = (step: number) => {
      return maTrangThai > step ? "✔" : step + 1;
    };
  
    // Mảng chứa các bước
    const steps = [
      { label: "Xác nhận đơn từ cửa hàng" },
      { label: "Đơn vị vận chuyển lấy hàng" },
      { label: "Giao hàng" },
      { label: "Hoàn thành" },
    ];
  
    return (
      <div>
        <ul className="relative flex flex-col md:flex-row gap-2">
          {steps.map((step, index) => (
            <li key={index} className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
              <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                <span className={`size-7 flex justify-center items-center shrink-0 font-medium rounded-full ${getBgClass(index)}`}>
                  {getStepContent(index)}
                </span>
                <div className={`mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden ${getBgClassST(index)}`}></div>
              </div>
              <div className="grow md:grow-0 md:mt-3">
                <span className="block text-sm font-medium text-gray-800">
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  