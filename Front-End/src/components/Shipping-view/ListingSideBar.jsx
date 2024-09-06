/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";

const filterOption = {
  category: [
    { id: "man", label: "Man" },
    { id: "woman", label: "Woman" },
    { id: "kids", label: "Kids" },
    { id: "accessrioes", label: "Accessrioes" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "addidas", label: "Addidas" },
    { id: "puma", label: "Puma" },
    { id: "levi's", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

// eslint-disable-next-line react/prop-types
function ShoppingSideBar({ filters, setFilters }) {
  function handleFilters(getsessionid, getcurrentfilter) {
    let cpyfilter = { ...filters };
    const indexofCurrentsection = Object.keys(cpyfilter).indexOf(getsessionid);
    if (indexofCurrentsection === -1) {
      cpyfilter = {
        ...cpyfilter,
        [getsessionid]: [getcurrentfilter],
      };
    } else {
      const indexOfCurrentOption =
        cpyfilter[getsessionid].indexOf(getcurrentfilter);
      if (indexOfCurrentOption === -1) {
        cpyfilter[getsessionid].push(getcurrentfilter);
      } else {
        cpyfilter[getsessionid].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyfilter);
    sessionStorage.setItem("filters", JSON.stringify(cpyfilter));
  }
  console.log(filters);
  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")));
  }, []);

  return (
    <div className="w-1/6 flex items-center gap-4 flex-col ">
      <h1 className="font-bold text-xl ">Filters</h1>
      <div>
        {Object.keys(filterOption).map((keyItem, i) => (
          <div className="flex flex-col " key={i}>
            {" "}
            <h1 className="font-bold mb-1">{keyItem} </h1>{" "}
            <div>
              {filterOption[keyItem].map((item, i) => (
                <div key={i}>
                  {" "}
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(item.id) > -1
                    }
                    onCheckedChange={() => handleFilters(keyItem, item.id)}
                  />{" "}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingSideBar;
