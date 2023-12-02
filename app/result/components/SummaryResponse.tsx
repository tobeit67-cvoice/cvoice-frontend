import { useCompletion } from "ai/react";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
export function SummaryResponse({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const isSending = useRef(false);
  const { completion, complete, error } = useCompletion({
    api: `http://localhost:3000/speech/${id}/summarize`,
    onError(error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาด");
      isSending.current = false;
    },
    onFinish() {
      isSending.current = false;
    },
  });
  useEffect(() => {
    if (content && !completion && !error && !isSending.current) {
      console.log(content);
      isSending.current = true;
      complete(content);
    }
  }, [content, complete, completion, error]);
  return <div>{completion}</div>;
}
