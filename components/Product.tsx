import Link from "next/link";
import styled from "styled-components";

const Img = styled.img`
  min-width: 100%;
  min-height: 200px;
  background-color: rgba(250, 250, 250, 1);
`;

type ProductType = {
  name: string;
  price: string;
  upc: number;
  "advertiser-id": number;
  "image-url": string;
};

type ProductProps = {
  product: ProductType;
};

export default function Product({
  product: { name, price, ...product },
}: ProductProps) {
  return (
    <Link href={`/product/${product["advertiser-id"]}.${product.upc}`}>
      <div>
        <Img src={product["image-url"]} alt={name} />
        <div style={{ marginBottom: 5 }}>{name}</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
          <sup>$</sup>
          {price}
        </div>
      </div>
    </Link>
  );
}
