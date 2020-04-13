import Header from "../components/Header";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <h1>{router.query.title}</h1>
      <p>Hello, World!</p>
    </div>
  );
}
