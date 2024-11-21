import Link from "next/link";

export default function Files({ data }) {
  return (
    <>
      <h1>Hi</h1>

      <ul>
        {data.files.map((file) => (
          <li key={file.id}>
            <Link href={`https://utfs.io/a/xprl9riwuu/${file.key}`}>
              {file.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
