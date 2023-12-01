export default function HowToUsePage() {
  return (
    <div className="flex flex-col flex-1 w-full items-center xl:justify-center h-full md:p-8 pb-10">
      <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <h1>วิธีใช้งาน!</h1>
        <div className="flex w-full rounded-lg bg-gray-100 px-10 py-6 shadow-sm text-lg">
          <ol className="list-outside list-decimal space-y-1">
            <li>
              กด <b>เริ่มต้นใช้งาน</b>
            </li>
            <li>
              กด <b>อัปโหลดไฟล์เสียงที่นี่</b>
            </li>
            <li>เลือกไฟล์เสียงที่ต้องการ</li>
            <li>รอสักครู่</li>
            <li>ได้เนื้อหาและสรุป</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
