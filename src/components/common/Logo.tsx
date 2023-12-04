import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-3 items-center font-bold">
      <Image src="/dropbox_logo.png" alt="Logo" height={40} width={40} />
      Dropbox
    </Link>
  );
}
