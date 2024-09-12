import Image from "next/image";

export default function PreLoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden bg-muted lg:block h-screen">
          <Image
            src="/offerado-login.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-contain dark:brightness-[0.5]"
          />
        </div>
        <div className="flex items-center justify-center py-12">{children}</div>
      </div>
    </section>
  );
}
