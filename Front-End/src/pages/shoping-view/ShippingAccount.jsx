/* eslint-disable react/prop-types */
import { Label } from "@radix-ui/react-label";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addNewAddress, fetchAllAddresses } from "@/Redux/AddressSlice";

// npx shadcn@latest add select

function ShippingAccount() {
  const { user } = useSelector((state) => state.auth);
  const [fromdata, setFromdata] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const dispatch = useDispatch();

  console.log(fromdata);
  useEffect(() => {
    dispatch(fetchAllAddresses(user.id));
  }, []);
  async function onsubmit(e) {
    e.preventDefault();
    dispatch(addNewAddress({ ...fromdata, userId: user.id })).then((data) => {
      console.log(data);
    });
  }

  return (
    <div className="w-[500px] ">
      <form onSubmit={onsubmit} className="mt-2">
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
          {" "}
          Add{" "}
        </Button>
      </form>
    </div>
  );
}

export default ShippingAccount;
