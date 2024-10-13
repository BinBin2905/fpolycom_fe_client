import { Link } from "react-router-dom";

type MenuItemProps = {
  to: string;
  Icon: () => React.ReactNode;
  text?: string;
};

function MenuItem({ to, Icon, text }: MenuItemProps) {
  return (
    <div className="item group">
      <Link to={to}>
        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
          <span>
            <Icon />
          </span>
          <span className="font-normal text-base">{text}</span>
        </div>
      </Link>
    </div>
  );
}

export default MenuItem;
