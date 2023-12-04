"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./Colums";

export default function TableWrapper({
  skeletonFiles,
}: {
  skeletonFiles: FileType[];
}) {
  const { user } = useUser();
  // @ts-ignore
  const [, setInitialFiles] = useState<FileType[] | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [docs, loading] = useCollection(
    user && query(collection(db, "users", user.id, "files")),
    // @ts-ignore
    orderBy("timestamp", sort)
  );

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().name,
      // eslint-disable-next-line no-unsafe-optional-chaining
      timestamp: new Date(doc.data().timestamp?.seconds * 1000),
      type: doc.data().type,
      size: doc.data().size,
      fullName: doc.data().fullName,
      downloadUrl: doc.data().downloadUrl,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (loading)
    return (
      <div className="flex flex-col">
        <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="w-full h-5 rounded-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12 space-y-6">
            {skeletonFiles.map((file) => (
              <Skeleton key={file.id} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className="space-y-6 flex flex-col">
      <Button
        className="ml-auto w-fit"
        onClick={() => setSort((prev) => (prev === "desc" ? "asc" : "desc"))}
      >
        Sort by {sort === "asc" ? "Newest" : "Oldest"}
      </Button>

      <DataTable data={skeletonFiles} columns={columns} />
    </div>
  );
}
