import BottomBar from "@/components/common/BottomBar";
import SideBar from "@/components/common/SideBar";
import TopBar from "@/components/common/TopBar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col gap-5 h-screen">
        <TopBar/>
        <div className="flex gap-3 h-screen">
          <SideBar/>
          {children}
        </div>
        <BottomBar/>
      </div>
    );
  }
  