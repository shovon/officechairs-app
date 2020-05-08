import fetch from "isomorphic-unfetch";
import parser from "fast-xml-parser";
import Header from "../components/Header";
import Head from "next/head";
import Master from "../components/Master";
import Product from "../components/Product";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export default function Index({ products }) {
  return (
    <Master>
      <Head>
        <title>Office Chairs.app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Grid>
        {products.map((product) => {
          return <Product product={product} />;
        })}
      </Grid>
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
