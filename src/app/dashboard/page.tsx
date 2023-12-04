import TableWrapper from "@/components/dashboard/TableWrapper";
import DropZone from "@/components/dropbox/DropZone";
import { db } from "@/firebase";
import { FileType } from "@/typing";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

export default async function page() {
  const { userId } = auth();

  const docsResult = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    fullName: doc.data().fullName || doc.id,

    // eslint-disable-next-line no-unsafe-optional-chaining
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || null,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <main className="p-6 border-t">
      <DropZone />

      <section className="container space-y-3 mt-6">
        <h2 className="font-bold text-3xl">All files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </main>
  );
}
