"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import Loading from "../components/Loading";
import {
  SpeechToTextResponse,
  SummaryResponse,
  UploadNewButton,
} from "./components";

export default function ResultPage() {
  const params = useSearchParams();
  const id = params.get("id");
  const { data: response, mutate } = useSWR(id ? `/speech/${id}/status` : null);
  useEffect(() => {
    if (response && response.data.status === "pending") {
      setTimeout(() => {
        mutate();
      }, 3000);
    }
  }, [response, mutate]);

  return (
    <div className="flex flex-col flex-1 w-full items-center xl:justify-center h-full md:p-8 pb-10">
      <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <h1>ผลลัพธ์การสรุปจากเสียงเป็นข้อความ</h1>
        {id && response?.data?.content ? (
          <>
            <SummaryResponse content={response.data.content} id={id} />
            <SpeechToTextResponse content={response.data.content} />
            <UploadNewButton />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
