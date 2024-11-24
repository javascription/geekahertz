"use client";

export default function Footer() {
  return (
    <>
      <section>
        <div className="p-2-3-percent flex justify-center w-[100%] z-[100] fixed bottom-0 backdrop-blur-[10px]">
          <div className="text-[15px]">© GoDoc, {new Date().getFullYear()}</div>
        </div>
      </section>
    </>
  );
}
