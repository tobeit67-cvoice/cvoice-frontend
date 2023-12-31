"use client";

import { APIResponse, S2TResult, api } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import Loading from "../components/Loading";
import { isAxiosError } from "axios";

export default function UploadPage() {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (files: File[]) => {
      setLoading(true);

      const form = new FormData();

      form.append("file", files[0], files[0].name);
      try {
        const { data } = await api.post<APIResponse<S2TResult>>(
          "/speech/upload",
          form
        );
        if (!data.data) throw new Error("การส่งคำขอผิดพลาด");
        const { id, content } = data.data;
        if (data && data.data && data.data?.status === "done") {
          await mutate(`/speech/${id}/status`, content, {
            revalidate: false,
          });
        }
        router.push(`/result?id=${id}`);
      } catch (err) {
        console.error(err);
        if (isAxiosError(err) && err.response?.data?.message) {
          toast.error(err.response?.data?.message);
        } else {
          toast.error("เกิดข้อผิดพลาดบางอย่าง");
        }
      } finally {
        setLoading(false);
      }
    },
    [mutate, router]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/wav": [".wav"],
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full items-center xl:justify-center h-full md:p-8 pb-10">
      <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <h1>แปลงเสียงเป็นข้อความง่าย ๆ ได้ด้วยตัวคุณ !</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            {...getRootProps()}
            className={`w-full flex justify-center items-center p-16 text-center xl:p-32 border-2 border-gray-200 text-xl font-medium text-gray-400 transition duration-500 hover:cursor-pointer ${
              isDragActive ? "bg-gray-100" : "hover:bg-gray-100"
            } border-dashed border-gray-200 rounded-xl`}
          >
            <input {...getInputProps()} accept=".wav" />
            {isDragActive ? (
              <p>นั่นแหละ วางลงมาได้เลย!</p>
            ) : (
              <div className="flex flex-col gap-2">
                <p>ลากไฟล์เสียงมาวางตรงนี้ได้เลย!</p>
                <span className="font-normal text-sm">
                  หรือคลิกบนปุ่มเพื่ออัปโหลดไฟล์จากอุปกรณของคุณ
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
