import thankYouIcon from "../../assets/images/icon-thank-you.svg";
import { Card } from "./Card";
import styles from "./ThankYouCard.module.scss";

export default function ThankYouCard() {
  return (
    <Card className={styles.card}>
      <img src={thankYouIcon} alt="Thank you" className={styles.icon} />
      <Card.Title className={styles.title}>Thank you!</Card.Title>
      <Card.Description className={styles.description}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </Card.Description>
    </Card>
  );
}
