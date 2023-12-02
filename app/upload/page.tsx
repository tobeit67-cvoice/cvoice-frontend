"use client";

import { api } from "@/libs/api";
import { prettyAxios, sleep } from "@/utils/promise";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function UploadPage() {
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const onDrop = useCallback(async (files: File[]) => {
        setLoading(true);

        const form = new FormData();

        form.append("file", files[0], files[0].name);

        const upload = await prettyAxios(api.post("/speech/upload", form));

        if (upload.isError) {
            setLoading(false);
            return toast.error(upload.data.message);
        }

        if (upload.data.data.status === "done") {
            setResult(upload.data.data.content);
            setLoading(false);
            return;
        }

        while (true) {
            const status = await prettyAxios(
                api.get(`/speech/${upload.data.data.id}/status`)
            );
            if (status.isError) {
                toast.error(status.data.message);
                break;
            }
            if (status.data.data.status === "done") {
                setResult(status.data.data.content);
                break;
            }
            await sleep(3000);
        }
        setLoading(false);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "audio/*": [".wav"],
        },
    });

    return (
        <div className="flex flex-col flex-1 w-full items-center xl:justify-center h-full md:p-8 pb-10">
            <div className="flex flex-col gap-8 items-center w-full max-w-2xl">
                <h1>
                    {result
                        ? "สำเร็จ! นี่คือผลลัพธ์ของคุณ"
                        : "แปลงเสียงเป็นข้อความง่าย ๆ ได้ด้วยตัวคุณ !"}
                </h1>
                {result ? (
                    <div className="w-full p-4 border-2 border-gray-200 border-dashed rounded-xl">
                        <p>{result}</p>
                    </div>
                ) : (
                    <div
                        {...{
                            ...getRootProps(),
                            ...(isLoading
                                ? {
                                      onClick: (e) => e.preventDefault(),
                                  }
                                : {}),
                        }}
                        className={`w-full flex justify-center items-center p-16 text-center xl:p-32 border-2 border-gray-200 text-xl font-medium text-gray-400 transition duration-500 hover:cursor-pointer ${
                            isLoading
                                ? "bg-gray-100 animate-pulse hover:cursor-not-allowed"
                                : ""
                        } ${
                            isDragActive ? "bg-gray-100" : "hover:bg-gray-100"
                        } border-dashed border-gray-200 rounded-xl`}
                    >
                        {isLoading ? (
                            <p>
                                <span className="text-2xl">
                                    <i className="fad fa-spinner-third fa-spin"></i>
                                </span>
                                &nbsp;&nbsp; กำลังโหลด...
                            </p>
                        ) : (
                            <>
                                <input {...getInputProps()} accept=".wav" />
                                {isDragActive ? (
                                    <p>นั่นแหละ วางลงมาได้เลย!</p>
                                ) : (
                                    <p>ลากไฟล์เสียงมาวางตรงนี้ได้เลย!</p>
                                )}
                            </>
                        )}
                    </div>
                )}
                {!!result && (
                    <button
                        type="button"
                        className="px-6 py-3 shadow rounded-lg font-medium bg-[#FFEDD5] hover:bg-[#f7dab4] text-[#085984] transition-colors"
                        onClick={e => {
                            e.preventDefault();
                            setResult(null);
                        }}
                    >
                        อัปโหลดอันต่อไปเลย
                    </button>
                )}
            </div>
        </div>
    );
}
