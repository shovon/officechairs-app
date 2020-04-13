import fetch from "isomorphic-unfetch";
import parser from "fast-xml-parser";

export default function Products({ products }) {
  return (
    <div>
      {products.map(({ name, price, ...remainder }) => {
        return (
          <div>
            <img
              style={{
                maxWidth: 200,
              }}
              src={remainder["image-url"]}
              alt={name}
            />
            {name} {price}
          </div>
        );
      })}
    </div>
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
