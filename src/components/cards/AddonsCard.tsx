import checkmarkIcon from "../../assets/images/icon-checkmark.svg";
import { Addon, PriceType } from "../../data";
import styles from "./AddonsCard.module.scss";
import { Card } from "./Card";

type Props = {
  addons: Addon[];
  checkedAddons: Set<Addon>;
  onToggleAddon: (addon: Addon) => void;
  priceType: PriceType;
};

export default function AddonsCard({
  addons,
  checkedAddons,
  onToggleAddon,
  priceType,
}: Props) {
  return (
    <Card>
      <Card.Title>Pick add-ons</Card.Title>
      <Card.Description>
        Add-ons help enhance your gaming experience.
      </Card.Description>
      <div className={styles.cardContent}>
        {addons.map((addon) => {
          const isChecked = checkedAddons.has(addon);

          return (
            <div
              key={addon.id}
              className={`${styles.addon} ${isChecked ? styles.checked : ""}`}
              role="checkbox"
              aria-checked={isChecked}
              onKeyDown={(event) => {
                if (event.key === " ") {
                  onToggleAddon(addon);
                }
              }}
              onClick={(event) => {
                event.preventDefault();
                onToggleAddon(addon);
              }}
              tabIndex={0}
            >
              <div className={styles.checkbox}>
                <img
                  src={checkmarkIcon}
                  alt="Checkmark"
                  className={styles.checkmark}
                />
              </div>
              <p className={styles.name}>{addon.name}</p>
              <p className={styles.description}>{addon.description}</p>
              <p className={styles.price}>
                {getPriceMessage(addon, priceType)}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function getPriceMessage(addon: Addon, priceType: PriceType): string {
  if (priceType === "monthly") {
    return `+$${addon.monthlyPrice}/mo`;
  }
  return `+$${addon.yearlyPrice}/yr`;
}
