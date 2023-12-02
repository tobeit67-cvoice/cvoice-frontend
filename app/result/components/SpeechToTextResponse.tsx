export function SpeechToTextResponse({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <b>ข้อความจากการถอดเสียงเป็นข้อความ:</b>
      <div className="w-full p-4 border-2 border-gray-200 border-dashed rounded-xl">
        <p>{content}</p>
      </div>
    </div>
  );
}
