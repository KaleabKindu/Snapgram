import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-3 h-screen">
      {children}
      <div className="relative flex-1 hidden xl:block ">
        <Image
          className="object-cover"
          src={"/assets/images/side-img.svg"}
          alt="logo"
          fill
        />
      </div>
    </div>
  );
}
