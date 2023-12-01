import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#06B6D4] px-4 py-3 flex gap-8 text-white items-center">
      <Link href={"/"}>
        <img
          src="/images/c-voice-logo-white.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <Link href="/how-to-use">วิธีใช้งาน</Link>
      <Link href="/upload">อัปโหลดไฟล์</Link>
    </nav>
  );
}
