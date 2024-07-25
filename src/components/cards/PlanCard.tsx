import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconArcade from "../../assets/images/icon-arcade.svg";
import iconPro from "../../assets/images/icon-pro.svg";
import { Plan, PriceType } from "../../data";
import { SelectionToggle } from "../SelectionToggle";
import { Card } from "./Card";
import styles from "./PlanCard.module.scss";

type Props = {
  plans: Plan[];
  selectedPlan: Plan;
  onPlanChange: (planId: Plan) => void;
  selectedPriceType: PriceType;
  onPriceTypeToggle: () => void;
};

export default function PlanCard({
  plans,
  selectedPlan,
  onPlanChange,
  selectedPriceType,
  onPriceTypeToggle,
}: Props) {
  return (
    <Card>
      <Card.Title>Select your plan</Card.Title>
      <Card.Description>
        You have the option of monthly or yearly billing.
      </Card.Description>
      <div className={styles.planList} role="radiogroup">
        <legend className="sr-only">Select your plan</legend>
        {plans.map((plan) => {
          const inputId = `radio-${plan.id}`;

          return (
            <div key={plan.id} className={styles.planWrapper}>
              <input
                id={inputId}
                type="radio"
                name="plan"
                className={styles.planRadio}
                value={plan.id}
                checked={selectedPlan.id === plan.id}
                onChange={() => onPlanChange(plan)}
              />

              <label key={plan.id} htmlFor={inputId} className={styles.plan}>
                <img src={getIcon(plan.icon)} className={styles.planIcon} />
                <p className={styles.planName}>{plan.name}</p>
                <p className={styles.planPrice}>
                  {getPriceMessage(plan, selectedPriceType)}
                </p>
                {selectedPriceType === "yearly" && (
                  <p className={styles.bonusMessage}>{plan.bonusMessage}</p>
                )}
              </label>
            </div>
          );
        })}
      </div>
      <SelectionToggle
        leftLabel="Monthly"
        rightLabel="Yearly"
        onToggle={onPriceTypeToggle}
        toggled={selectedPriceType === "yearly"}
        className={styles.priceTypeSelector}
      />
    </Card>
  );
}

function getIcon(iconName: string): string | undefined {
  switch (iconName) {
    case "arcade":
      return iconArcade;
    case "advanced":
      return iconAdvanced;
    case "pro":
      return iconPro;
  }
}

function getPriceMessage(plan: Plan, type: PriceType): string {
  if (type === "monthly") {
    return `$${plan.monthlyPrice}/mo`;
  }

  return `$${plan.yearlyPrice}/yr`;
}
