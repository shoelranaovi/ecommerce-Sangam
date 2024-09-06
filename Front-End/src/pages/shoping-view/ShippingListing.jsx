/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ListingMain from "@/components/Shipping-view/ListingMain";
import ShoppingSideBar from "@/components/Shipping-view/ListingSideBar";
import { setAllPost } from "@/Redux/postSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShippingListing() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParmas, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const qurey = new URLSearchParams({
    ...filters,
    sortBy: sort,
  });
  async function fetchProduct() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/getallshopost?${qurey}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        dispatch(setAllPost(res.data.data));
      }

      console.log(res.data?.data);
    } catch (error) {
      console.log(error);
      dispatch(setAllPost(null));
    }
  }
  function createSearchParamsHelpers(filterParams) {
    const qurayParms = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramsValue = value.join(",");
        qurayParms.push(`${key}=${encodeURIComponent(paramsValue)}`);
      }
    }
    return qurayParms.join("&");
  }

  useEffect(() => {
    fetchProduct();
  }, [dispatch, filters, sort]);
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuryString = createSearchParamsHelpers(filters);
      setSearchParams(createQuryString);
    }
  }, [filters]);
  return (
    <div className="flex ">
      <ShoppingSideBar filters={filters} setFilters={setFilters} />

      <ListingMain sort={sort} setSort={setSort} />
    </div>
  );
}

export default ShippingListing;
