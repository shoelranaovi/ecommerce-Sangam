// npx shadcn@latest add select

import ShippingFrom from "@/components/Shipping-view/Address/ShoppingFrom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ShippingAccount() {
  const [tab, setTab] = useState("address");
  return (
    <div>
      <div>
        <Button onClick={() => setTab("order")}>Order </Button>
        <Button onClick={() => setTab("address")}>Address </Button>
      </div>
      <div>
        {tab === "order" && null}
        {tab === "address" && <ShippingFrom />}
      </div>
    </div>
  );
}

export default ShippingAccount;
