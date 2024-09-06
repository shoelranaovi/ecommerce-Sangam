/* eslint-disable react/prop-types */

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

function Cartproduct({ item }) {
  return (
    <div className="w-[300px] h-[400px] flex flex-grow  justify-center items-center  bg-slate-200">
      <Card className="w-full">
        <CardHeader>
          <img
            className=" bg-cover bg-center h-[200px]"
            src={item.image}
            alt=""
          />
          <span className="">{item.title} </span>
        </CardHeader>
        <CardContent className="flex justify-between font-bold">
          <span className="line-through">$200</span>
          <span>$100</span>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <div>{item.price}</div> <div>{item.category}</div>{" "}
          <div>{item.brand}</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cartproduct;
