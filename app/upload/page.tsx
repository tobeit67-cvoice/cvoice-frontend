"use client";
import { api } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UploadFileRequest = {
    file: File
}


export default function UploadAudioFilePage() {
    const [isSubmitting, setSubmitting] = useState(false)
  const { register, handleSubmit } = useForm<UploadFileRequest>();

  const submit = async (data: UploadFileRequest) => {
    console.log(data)
    setSubmitting(true);
    try {
        const json = await api.get("speech").json();
        console.log("Result", json)
    }
    catch(err) {
        console.error(err);
    }
    finally {
        setSubmitting(false)
    }

  }

  return (
    <form
      className="p-4 flex gap-2 items-center"
      onSubmit={handleSubmit(submit)}
    >
      <label htmlFor="file">Upload:</label>
      <input
        type="file"
        accept="audio/*"
        {...register("file", {
          required: true,
        })}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-800  text-white px-4 py-2 rounded-lg"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
