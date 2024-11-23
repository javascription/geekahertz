"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";

export default function Footer() {
  return (
    <>
      <section>
        <div className="p-2-3-percent flex justify-center w-[100%] z-[100] fixed bottom-0 backdrop-blur-[10px]">
          <div className="text-[25px]">© GoDoc, {new Date().getFullYear()}</div>
        </div>
      </section>
    </>
  );
}
