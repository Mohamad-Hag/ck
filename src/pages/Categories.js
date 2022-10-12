import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../styles/Categories.css";
import Axios from "axios";
import HOST from "../utils/Host";
import NoData from "../components/NoData";
import { Divider, Skeleton } from "@mui/material";

function Categories() {
  const [data, setData] = useState([]);

  const getData = async () => {
    let api = `${HOST}categories`;
    let res = await Axios.get(api);
    let d = res.data;
    setData(d.length === 0 ? [[]] : d);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Categories">
      <Stack spacing="var(--huge-sp)">
        <h1>What Category You're Looking For?</h1>
        <Stack spacing="var(--tiny-sp)">
          {Array.isArray(data[0]) ? (
            <NoData />
          ) : data.length === 0 ? (
            <Stack spacing="var(--tiny-sp)">
              {Array(5)
                .fill(0)
                .map((_) => (
                  <Skeleton
                    variant="rectangular"
                    height={236}
                    style={{
                      borderRadius: "var(--tiny-sp)",                      
                    }}
                    
                  />
                ))}
            </Stack>
          ) : (
            data.map((cate) => (
              <>
                <CategoryCard
                  key={cate.id.toString()}
                  id={cate.id.toString()}
                  title={cate.title}
                  productsCount={cate.products.length}
                  img={cate.image}
                >
                  {cate.description}
                </CategoryCard>
              </>
            ))
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export default Categories;
