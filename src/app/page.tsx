import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-15 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-gray-800">
            Welcome to Voucher Seat Assignment System!
          </h1>
          <p className="text-md leading-relaxed text-gray-600">
            This application helps manage voucher seat assignments for flight crew members efficiently and transparently.
          </p>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-base leading-relaxed">
              💡 The system comes with <span className="font-semibold">default data</span> for aircraft and voucher, so you can get started right away.
            </p>
          </div>

          <p className="text-md leading-relaxed">
            You can explore existing data on the{" "}
            <Link href="/aircraft" className="font-semibold text-blue-600 hover:underline">
              Aircraft
            </Link>{" "}
            page before moving on to{" "}
            <Link href="/vouchers" className="font-semibold text-blue-600 hover:underline">
              Voucher Seat Assignment
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
