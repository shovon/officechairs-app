import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();

  return (
    <div>
      <h3>{router.query.id}</h3>
    </div>
  );
}
