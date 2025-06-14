import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
       <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain logo-loading"
            />
    </div>
  );
}
