import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <section className="bg-[#2B2929] dark:bg-slate-800 lg:flex p-6 text-white space-y-6">
        <div className="space-y-8">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Welcome to dropbox
          </h1>
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Storing everything for you and your business needs. All in one place
          </h1>
          <p className="pb-20">
            Collaborate seamlessly and deliver work faster from anywhere with
            Dropbox. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement—without leaving Dropbox.
          </p>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 bg-blue-500 w-fit p-3"
          >
            Try it for free
            <ArrowRight />
          </Link>
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video autoPlay loop>
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
    </main>
  );
}
