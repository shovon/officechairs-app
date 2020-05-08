import { useRouter } from "next/router";
import Master from "../../components/Master";
import Header from "../../components/Header";
import Head from "next/head";
import parser from "fast-xml-parser";
import next, { NextPageContext } from "next";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";

const ProductPage = styled.div`
  display: flex;
`;

const Image = styled.div`
  flex: 1;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

export default function Product({ product }) {
  return (
    <Master>
      <Head>
        <title>{product.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <ProductPage>
        <Image>
          <img src={product["image-url"]} />
        </Image>
        <ProductDetails>
          <h3>{product.name}</h3>
        </ProductDetails>
      </ProductPage>
    </Master>
  );
}

Object.assign(Product, {
  async getInitialProps(ctx: NextPageContext) {
    let { id } = ctx.query;
    if (Array.isArray(id)) {
      id = id.join(".");
    }
    const [advertiserId, upc] = id.split(".");
    const pid = "9280107";
    const accessToken = "4capdb8pnjjywcwm3e90eb63fv";
    const res = await fetch(
      `https://product-search.api.cj.com/v2/product-search?website-id=${pid}&advertiser-ids=${advertiserId}&upc=${upc}`,
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
      let product = jsonobj["cj-api"].products.product;
      if (Array.isArray(product)) {
        product = product[0];
      }
      return { product };
    }
    return {};
  },
});
