/* eslint-disable react/prop-types */
import { Label } from "@radix-ui/react-label";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/Redux/AddressSlice";
import AdressCart from "./AdressCart";

// npx shadcn@latest add select
const initialData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

function ShippingFrom() {
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [itemforupdete, setitemforupdete] = useState(null);
  // console.log(itemforDelete);

  const [fromdata, setFromdata] = useState(initialData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAddresses(user.id));
  }, []);
  async function onsubmit(e) {
    e.preventDefault();

    if (addressList.length >= 3) {
      alert("You can't add more than 3 addresses");
      setFromdata(initialData);
      return;
    }

    itemforupdete !== null
      ? dispatch(
          editaAddress({
            userId: user.id,
            addressId: itemforupdete,
            formData: fromdata,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            alert("Address updated");
            dispatch(fetchAllAddresses(user.id));
            setFromdata(initialData);
            setitemforupdete(null);
          }
        })
      : dispatch(addNewAddress({ ...fromdata, userId: user.id })).then(
          (data) => {
            if (data?.payload?.success) {
              alert("Address Added");
              dispatch(fetchAllAddresses(user.id));
              setFromdata(initialData);
              setitemforupdete(null);
            }
          }
        );
  }
  async function deleteaddresshandler(id) {
    dispatch(deleteAddress({ userId: user.id, addressId: id })).then((data) => {
      if (data?.payload?.success) {
        alert("Address delete");
        dispatch(fetchAllAddresses(user.id));
      }
    });
  }
  function handleupdate(item) {
    setitemforupdete(item._id);
    setFromdata({
      address: item.address,
      city: item.city,
      pincode: item.pincode,
      phone: item.phone,
      notes: item.notes,
    });
  }

  return (
    <div className=" flex flex-col gap-4 p-8 ">
      <div className="flex flex-wrap  ">
        {addressList.map((address, index) => (
          <AdressCart
            key={index}
            item={address}
            handledelete={deleteaddresshandler}
            handleupdate={handleupdate}
          />
        ))}
      </div>
      <form onSubmit={onsubmit} className="mt-2 w-[500px] ">
        <div className="flex flex-col gap-1">
          <Label>address</Label>
          <Input
            id="address"
            value={fromdata.address}
            onChange={(e) =>
              setFromdata({ ...fromdata, [e.target.id]: e.target.value })
            }
            placeholder="Enter your product title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>city</Label>
          <Input
            id="city"
            value={fromdata.city}
            onChange={(e) =>
              setFromdata({ ...fromdata, [e.target.id]: e.target.value })
            }
            placeholder="Enter your product title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>pincode</Label>
          <Input
            id="pincode"
            value={fromdata.pincode}
            onChange={(e) =>
              setFromdata({ ...fromdata, [e.target.id]: e.target.value })
            }
            placeholder="Enter your product pincode"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>phone</Label>
          <Input
            id="phone"
            value={fromdata.phone}
            onChange={(e) =>
              setFromdata({ ...fromdata, [e.target.id]: e.target.value })
            }
            type="text"
            placeholder="Enter your product phone"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>notes</Label>
          <Input
            id="notes"
            value={fromdata.notes}
            onChange={(e) =>
              setFromdata({ ...fromdata, [e.target.id]: e.target.value })
            }
            type="text"
            placeholder="Enter your notes"
          />
        </div>
        <Button onClick={onsubmit} className="w-full">
          {itemforupdete !== null ? "Update" : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default ShippingFrom;
