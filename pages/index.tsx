import fetch from "isomorphic-unfetch";
import parser from "fast-xml-parser";
import Header from "../components/Header";
import Master from "../components/Master";
import Link from "next/link";

type Product = {
  name: string;
  price: string;
  "image-url": string;
};

type ProductProps = {
  product: Product;
};

function ProductThumbnail({
  product: { name, price, ...product },
}: ProductProps) {
  return (
    <Link href={`/product/${"something"}`}>
      <div>
        <img
          style={{
            width: "100%",
          }}
          src={product["image-url"]}
          alt={name}
        />
        <div style={{ marginBottom: 5 }}>{name}</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
          <sup>$</sup>
          {price}
        </div>
      </div>
    </Link>
  );
}

export default function Index({ products }) {
  return (
    <Master>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridGap: 20,
        }}
      >
        {products.map((product) => {
          return <ProductThumbnail product={product} />;
        })}
      </div>
    </Master>
  );
}

Object.assign(Index, {
  async getInitialProps() {
    const pid = "9280107";
    const accessToken = "4capdb8pnjjywcwm3e90eb63fv";
    const res = await fetch(
      `https://product-search.api.cj.com/v2/product-search?website-id=${pid}&advertiser-ids=4044331&keywords="Office Chair"`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.text();
    if (parser.validate(data)) {
      const jsonobj = parser.parse(data);
      console.log(jsonobj["cj-api"].products.product);
      return { products: jsonobj["cj-api"].products.product };
    }
    return {};
  },
});
