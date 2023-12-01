import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full items-center xl:justify-center h-full p-8">
      <div className="flex flex-col gap-4 md:gap-6 w-full max-w-6xl pb-10">
        <h1 className="md:text-5xl">ใช้งานง่ายและฟรี!</h1>
        <span className="md:text-lg max-w-sm">
          แปลงไฟล์เสียงของคุณเป็นข้อความที่อ่านง่าย
          แถมได้รับการตรวจสอบและสรุปมาแล้วกันเลย
        </span>
        <div className="py-2">
          <Link
            href="/upload"
            className="px-6 py-3 text-lg shadow rounded-lg font-medium bg-[#FFEDD5] hover:bg-[#f7dab4] text-[#085984] transition-colors"
          >
            เริ่มต้นใช้งาน
          </Link>
        </div>
      </div>
      <img
        alt="hand"
        src="/images/hand.png"
        className="absolute right-0 bottom-0 max-w-[90vw] md:max-w-[665px]"
      />
    </div>
  );
}
