import { ReactNode } from "react";

type DataIterationProps = {
  datas?: object[];
  startLength: number;
  endLength: number;
  children: (data: { datas: any }) => ReactNode;
};

function DataIteration({
  datas,
  startLength,
  endLength,
  children,
}: DataIterationProps) {
  return (
    <>
      {datas!.length >= endLength &&
        datas!
          .slice(startLength, endLength)
          .map((value, index) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;
