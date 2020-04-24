import fetch from "isomorphic-unfetch";
import parser from "fast-xml-parser";
import Header from "../components/Header";
import Master from "../components/Master";

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
    <div>
      <img
        style={{
          width: "100%",
        }}
        src={product["image-url"]}
        alt={name}
      />
      <div
        style={{
          marginBottom: 200,
        }}
      >
        {name}
      </div>
      <div>${price}</div>
    </div>
  );
}

export default function Products({ products }) {
  return (
    <Master>
      <Header />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        {products.map((product) => {
          return <ProductThumbnail product={product} />;
        })}
      </div>
    </Master>
  );
}

Object.assign(Products, {
  async getInitialProps() {
    const pid = "9280107";
    const accessToken = "4capdb8pnjjywcwm3e90eb63fv";
    const res = await fetch(
      `https://product-search.api.cj.com/v2/product-search?website-id=${pid}&advertiser-ids=2746196&keywords="Office Chair"`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.text();
    console.log(data);
    if (parser.validate(data)) {
      const jsonobj = parser.parse(data);
      console.log(jsonobj);
      return { products: jsonobj["cj-api"].products.product };
    }
    return {};
  },
});
