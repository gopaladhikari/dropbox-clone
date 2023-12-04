"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";

const maxSize = 20971520;

export default function DropZone() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const uploadFile = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fileName: selectedFile.name,
      profileImage: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    await uploadBytes(imageRef, selectedFile).then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl,
      });
    });
    setLoading(false);
  };

  const onDrop = (files: File[]) => {
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading failed");
      reader.onerror = () => console.log("file reading error");
      reader.onload = async () => {
        await uploadFile(file);
        router.refresh();
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections?.length > 0 && fileRejections[0]?.file?.size > maxSize;

        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",

                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-700 dark:text-white"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload..."}
              {isDragActive && !isDragReject && "Drop to upload..."}
              {isDragReject && "File type is not allowed, sorry!"}
              {isFileTooLarge && "File is too large"}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}
