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
import FinishingUpCard from "./components/cards/FinishingUpCard";
import { NavBar } from "./components/NavBar";
import { StepIndicator } from "./components/StepIndicator";
import { Addon, addons, Plan, plans, steps } from "./data";
import { reducer, State } from "./reducer";

const PersonalInfoCard = lazy(
  () => import("./components/cards/PersonalInfoCard")
);
const PlanCard = lazy(() => import("./components/cards/PlanCard"));
const AddonsCard = lazy(() => import("./components/cards/AddonsCard"));
const ThankYouCard = lazy(() => import("./components/cards/ThankYouCard"));

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
  const [isComplete, setIsComplete] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const personalInfoFormId = "form-" + useId();

  const goToNextStep = () => {
    startTransition(() => setStep((step) => step + 1));
  };

  const goToPrevStep = () => {
    startTransition(() => setStep((step) => step - 1));
  };

  const goToPlanStep = () => {
    startTransition(() => setStep(1));
  };

  const finish = () => {
    startTransition(() => setIsComplete(true));
  };

  return (
    <main className={styles.main}>
      <StepIndicator steps={steps} currentStep={steps[step].id} />
      <Suspense fallback={<ClipLoader />}>
        <div className={styles.content}>
          {!isComplete ? (
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
                {step === 3 && (
                  <FinishingUpCard
                    onChangePlanClick={goToPlanStep}
                    plan={state.plan}
                    addons={state.addons}
                    priceType={state.priceType}
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
          ) : (
            <div className={styles.thankYouCardWrapper}>
              <ThankYouCard />
            </div>
          )}
        </div>
      </Suspense>
    </main>
  );
}

export default App;
