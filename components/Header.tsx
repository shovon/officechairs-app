import Link from "next/link";

const linkStyle = {
  marginRight: 15,
};

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 20,
      }}
    >
      <span
        style={{ display: "inline-block", marginRight: 10, fontWeight: "bold" }}
      >
        Office Chairs.app
      </span>
      <span style={{ flex: 1 }}></span>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
    </div>
  );
}
