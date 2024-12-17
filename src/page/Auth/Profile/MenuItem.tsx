import { Link, NavLink } from "react-router-dom";

type MenuItemProps = {
  to: string;
  Icon: React.ReactNode;
  text?: string;
};

function MenuItem({ to, Icon, text }: MenuItemProps) {
  return (
    <div className="item group">
      <NavLink to={to}>
        <div className="flex gap-x-2 items-center text-qgray hover:text-qblack">
          <span className="text-xl">{Icon}</span>
          <span className="font-normal text-base">{text}</span>
        </div>
      </NavLink>
    </div>
  );
}

export default MenuItem;
