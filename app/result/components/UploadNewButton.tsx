import { useRouter } from "next/navigation";

export function UploadNewButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="px-6 py-3 shadow rounded-lg font-medium bg-[#FFEDD5] hover:bg-[#f7dab4] text-[#085984] transition-colors"
      onClick={() => {
        router.replace("/upload");
      }}
    >
      อัปโหลดอันต่อไปเลย
    </button>
  );
}
