/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function AdressCart({ item, handledelete, handleupdate }) {
  return (
    <div className=" ">
      <Card className="p-4 w-[250px] ">
        <h2>Address : {item.address} </h2>
        <h2>city : {item.city} </h2>
        <h2>pincode : {item.pincode} </h2>
        <h2>phone : {item.phone} </h2>
        <h2>notes : {item.notes} </h2>
        <div className="flex justify-between">
          <Button onClick={() => handleupdate(item)}>Edit</Button>
          <Button onClick={() => handledelete(item._id)}>Delete</Button>
        </div>
      </Card>
    </div>
  );
}

export default AdressCart;
