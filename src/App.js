import CreateCustomer from "./components/create-customer";
import Customer from "./components/customer";
import AccountOperations from "./components/account-operators";
import BalanceDisplay from "./components/balance-display";
import { store } from "./store";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;