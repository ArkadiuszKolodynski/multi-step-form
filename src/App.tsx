import {
  lazy,
  startTransition,
  Suspense,
  useId,
  useReducer,
  useState,
} from "react";
import { ClipLoader } from "react-spinners";
import styles from "./App.module.scss";
import AddonsCard from "./components/cards/AddonsCard";
import PersonalInfoCard from "./components/cards/PersonalInfoCard";
import { NavBar } from "./components/NavBar";
import { StepIndicator } from "./components/StepIndicator";
import { Addon, addons, Plan, plans, steps } from "./data";
import { reducer, State } from "./reducer";

const PlanCard = lazy(() => import("./components/cards/PlanCard"));

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

  const [step, setStep] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isComplete, setIsComplete] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const personalInfoFormId = "form-" + useId();

  const goToNextStep = () => {
    startTransition(() => setStep((step) => step + 1));
  };

  const goToPrevStep = () => {
    startTransition(() => setStep((step) => step - 1));
  };

  const finish = () => {
    startTransition(() => setIsComplete(true));
  };

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
                      goToNextStep();
                    }}
                  />
                )}
                {step === 1 && (
                  <PlanCard
                    plans={plans}
                    selectedPlan={state.plan}
                    onPlanChange={(plan: Plan) =>
                      dispatch({ type: "UPDATE_PLAN", plan })
                    }
                    selectedPriceType={state.priceType}
                    onPriceTypeToggle={() =>
                      dispatch({ type: "TOGGLE_PRICE_TYPE" })
                    }
                  />
                )}
                {step === 2 && (
                  <AddonsCard
                    addons={addons}
                    priceType={state.priceType}
                    checkedAddons={state.addons}
                    onToggleAddon={(addon: Addon) =>
                      dispatch({ type: "TOGGLE_PLAN_ADDON", addon })
                    }
                  />
                )}
              </div>

              <NavBar
                steps={steps.length}
                currentStep={step}
                isAtPersonalInfoStep={step === 0}
                personalInfoFormId={personalInfoFormId}
                onBackButtonClick={goToPrevStep}
                onNextStepButtonClick={goToNextStep}
                onConfirmButtonClick={finish}
              />
            </>
          }
        </div>
      </Suspense>
    </main>
  );
}

export default App;
