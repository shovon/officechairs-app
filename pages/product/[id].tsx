import { useRouter } from "next/router";
import Master from "../../components/Master";
import Header from "../../components/Header";

export default function Product() {
  const router = useRouter();

  return (
    <Master>
      <Header />
      <h3>{router.query.id}</h3>
    </Master>
  );
}
