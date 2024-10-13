import Layout from "@/component_common/Partials/Headers/Layout";
import blog from "../../data/blogs.json";
import PageTitle from "@/component_common/Helpers/PageTitle";
import DataIteration from "@/component_common/Helpers/DataIteration";
import BlogCard from "@/component_common/Helpers/Cards/BlogCard";

export default function Blogs() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blogs-wrapper w-full-width">
        <div className="title-bar">
          <PageTitle
            title="Our Blogs"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "blogs", path: "/blogs" },
            ]}
          />
        </div>
      </div>

      <div className="w-full py-[60px]">
        <div className="container-x mx-auto">
          <div className="w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
              <DataIteration
                datas={blog.blogs}
                startLength={0}
                endLength={blog.blogs.length}
              >
                {({ datas }) => (
                  <div
                    data-aos="fade-up"
                    key={datas.id}
                    className="item w-full"
                  >
                    <BlogCard datas={datas} />
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
