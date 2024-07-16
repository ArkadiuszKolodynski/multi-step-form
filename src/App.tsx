import { useState } from "react";
import styles from "./App.module.scss";
import { StepIndicator } from "./components/StepIndicator";
import { steps } from "./data";

function App() {
  const [step] = useState(0);

  return (
    <main className={styles.main}>
      <StepIndicator steps={steps} currentStep={steps[step].id} />
    </main>
  );
}

export default App;
