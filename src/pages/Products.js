import { Box, Skeleton, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import HOST from "../utils/Host";
import Axios from "axios";
import { useEffect, useState } from "react";
import NoData from "../components/NoData";

function Products() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({});

  const getData = async () => {
    let api = `${HOST}categories/${id}`;
    let res = await Axios.get(api);
    let d = res.data.products;
    setCategory(res.data);
    setData(d.length === 0 ? [[]] : d);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Products">
      <Stack spacing="var(--huge-sp)">
        <h1>Products For /{category.title}/</h1>
        <div className="products-container">
          {Array.isArray(data[0]) ? (
            <NoData />
          ) : data.length === 0 ? (
            Array(10)
              .fill(0)
              .map((_) => (
                <Stack>
                  <Skeleton
                    variant="rectangular"
                    height={236}
                    style={{ borderRadius: "var(--tiny-sp)" }}
                    animation="wave"
                  />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton width="60%"/>
                </Stack>
              ))
          ) : (
            data.map((prod) => (
              <ProductCard
                key={prod.id.toString()}
                id={prod.id.toString()}
                img={prod.image}
                title={prod.title}
                price={prod.price}
              >
                {prod.description}
              </ProductCard>
            ))
          )}
        </div>
      </Stack>
    </div>
  );
}

export default Products;
