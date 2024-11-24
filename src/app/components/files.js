"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/uploadthing/listfiles");
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = await response.json();

      setFiles(data.files);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const DeleteFiles = async (key) => {
    await axios.delete("api/uploadthing/deletefiles", {
      data: {
        url: key,
      },
    });
    window.location.reload();
  };

  return (
    <div>
      {loading && <p>Loading files...</p>}
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <Link href={`https://utfs.io/a/xprl9riwuu/${file.key}`}>
              {file.name}
            </Link>
            <button onClick={() => DeleteFiles(file.key)}> <FontAwesomeIcon icon={faTrash} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;
