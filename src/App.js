import { useSelector } from "react-redux";

import CreateCustomer from "./features/customers/create-customer";
import Customer from "./features/customers/customer";
import AccountOperations from "./features/accounts/account-operators";
import BalanceDisplay from "./features/accounts/balance-display";

function App() {
  const customerName = useSelector((store) => store.customer.fullname);

  return (
    <div>
      <h1>🏦 The Bank ⚛️</h1>
      {customerName === "" ? 
      <CreateCustomer />
       :
       <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay /> 
       </>  
    }
      
    </div>
  );
}

export default App;