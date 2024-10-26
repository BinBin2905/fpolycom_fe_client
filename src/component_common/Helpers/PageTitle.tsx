import BreadcrumbCom from "../BreadcrumbCom";

type Path = {
  name: string;
  path: string;
};

type PageTitleProps = {
  title: string;
  breadcrumb?: Path[];
};

export default function PageTitle({ title, breadcrumb = [] }: PageTitleProps) {
  return (
    <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
      <div className="container-x mx-auto">
        <div className="mb-5">
          <BreadcrumbCom paths={breadcrumb} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-slate-800">{title}</h1>
        </div>
      </div>
    </div>
  );
}
