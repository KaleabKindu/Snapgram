"use client";
import { bottombarLinks } from "@/constants";
import Link from "next/link";
import { INavLink } from "@/types";
import { usePathname } from "next/navigation";
import classNames from "classnames";

type Props = {};

const BottomBar = (props: Props) => {
  const path = usePathname();
  return (
    <div className="bottom-bar">
      <div className="flex justify-between gap-2 w-full">
        {bottombarLinks.map((link: INavLink) => {
          const Icon = link.icon;
          const active = path === link.route;
          return (
            <Link
              key={link.route}
              href={link.route}
              className={classNames(
                "flex flex-col group gap-2 items-center p-3 rounded-lg bottombar-link",
                { "bg-primary-500": active },
              )}
            >
              <Icon size={25} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
