import { Suspense, useId, useReducer, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./App.module.scss";
import PersonalInfoCard from "./components/cards/PersonalInfoCard";
import { StepIndicator } from "./components/StepIndicator";
import { plans, steps } from "./data";
import { reducer, State } from "./reducer";

function App() {
  const initialState: State = {
    name: "",
    email: "",
    phoneNumber: "",
    personalInfoCardKey: 1,
    plan: plans[0],
    priceType: "monthly",
    addons: new Set(),
  };

  const [step] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const personalInfoFormId = "form-" + useId();

  return (
    <main className={styles.main}>
      <StepIndicator steps={steps} currentStep={steps[step].id} />
      <Suspense fallback={<ClipLoader />}>
        <div className={styles.content}>
          {
            <>
              <div className={styles.cardWrapper}>
                {step === 0 && (
                  <PersonalInfoCard
                    key={`personal-info-card-${state.personalInfoCardKey}`}
                    initialName={state.name}
                    initialEmail={state.email}
                    initialPhoneNumber={state.phoneNumber}
                    formId={personalInfoFormId}
                    onSubmit={(result) => {
                      dispatch({
                        type: "UPDATE_PERSONAL_INFO",
                        name: result.name,
                        email: result.email,
                        phoneNumber: result.phone,
                      });
                    }}
                  />
                )}
              </div>
            </>
          }
        </div>
      </Suspense>
    </main>
  );
}

export default App;
