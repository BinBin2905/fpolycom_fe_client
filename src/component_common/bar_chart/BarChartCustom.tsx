import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
type BarObject = {
  [key: string]: any;
};
const BarChartCustom = ({
  list,
  labelKey,
  itemKeyOne,
  itemKeyTwo,
}: {
  list: any[];
  labelKey?: string;
  itemKeyOne?: string;
  itemKeyTwo?: string;
}) => {
  const chartData = [
    { month: "January", desktop: 186, laptop: 186 },
    { month: "February", desktop: 305, laptop: 186 },
    { month: "March", desktop: 237, laptop: 186 },
    { month: "April", desktop: 73, laptop: 186 },
    { month: "May", desktop: 209, laptop: 186 },
    { month: "June", desktop: 214, laptop: 186 },
    { month: "December", desktop: 214, laptop: 186 },
    { month: "October", desktop: 214, laptop: 186 },
  ];

  const chartConfig = {
    [itemKeyOne as string]: {
      label: "Doanh thu",
      color: "#09B291",
    },
  } satisfies ChartConfig;
  const tickFormatter = (value: any) => {
    if (typeof value === "string" || Array.isArray(value)) {
      return value.slice(0, 3); // Giới hạn độ dài nếu là chuỗi/mảng
    }
    return String(value); // Chuyển các giá trị khác thành chuỗi
  };
  console.log(list);
  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  return (
    <div className="w-full h-80">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          accessibilityLayer
          data={list}
          margin={{
            top: 20,
          }}
          barGap={0}
          maxBarSize={15}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={labelKey ? labelKey : ""}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={tickFormatter}
          />
          <YAxis
            label={{
              value: "(Doanh thu)",
              angle: -90,
              position: "insideMiddle",
            }}
            tickFormatter={currencyFormatter}
            axisLine={false}
          ></YAxis>
          <ChartTooltip
            cursor={false}
            formatter={currencyFormatter}
            content={<ChartTooltipContent hideLabel />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey={itemKeyOne ? itemKeyOne : ""} fill="#b14719" radius={8}>
            <LabelList
              formatter={currencyFormatter}
              position="top"
              offset={12}
              className="text-gray-600"
              fontSize={12}
            />
          </Bar>
          {/* <Bar
            dataKey={itemKeyTwo ? itemKeyTwo : ""}
            fill="var(--color-laptop)"
            radius={8}
          >
            <LabelList
              position="top"
              offset={12}
              className="text-gray-600"
              fontSize={12}
            />
          </Bar> */}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartCustom;
