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
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (key) => {
    try {
      await axios.delete("/api/uploadthing/deletefiles", {
        data: { url: key },
      });
      setFiles((prev) => prev.filter((file) => file.key !== key));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div className="relative p-4 shadow-md rounded-lg left-6">
      <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
      {loading ? (
        <p className="text-gray-500">Loading files...</p>
      ) : files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex gap-4 justify-between items-center border-b py-2"
            >
              <Link
                href={`https://utfs.io/a/xprl9riwuu/${file.key}`}
                className="text-blue-500 hover:underline truncate"
              >
                {file.name}
              </Link>
              <div className="flex items-center">
                <button
                  onClick={() => deleteFile(file.key)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete file"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 pb-16">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default Files;
