import { useRef, useState } from "react";
import { FormInput } from "../FormInput";
import { Card } from "./Card";
import styles from "./PersonalInfoCard.module.scss";

type SubmitResult = { name: string; email: string; phone: string };

type Props = {
  initialName: string;
  initialEmail: string;
  initialPhoneNumber: string;
  formId: string;
  onSubmit: (result: SubmitResult) => void;
};

export default function PersonalInfoCard({
  initialName,
  initialEmail,
  initialPhoneNumber,
  formId,
  onSubmit,
}: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhoneNumber);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const phoneError = validatePhoneNumber(phone);
  const emailError = validateEmail(email);
  const nameError = validateName(name);

  return (
    <Card>
      <Card.Title>Personal info</Card.Title>
      <Card.Description>
        Please provide your name, email address, and phone number.
      </Card.Description>
      <form
        noValidate
        id={formId}
        className={styles.cardContent}
        onSubmit={(event) => {
          event.preventDefault();
          if (!(nameError || emailError || phoneError)) {
            onSubmit({ name, email, phone });
            return;
          }

          setHasSubmitted(true);

          if (nameError) {
            nameInputRef.current?.focus();
            return;
          }
          if (emailError) {
            emailInputRef.current?.focus();
            return;
          }
          if (phoneError) {
            phoneInputRef.current?.focus();
            return;
          }
        }}
      >
        <FormInput
          ref={nameInputRef}
          label="Name"
          value={name}
          type="text"
          placeholder="e.g. Stephen King"
          onChange={(name: string) => setName(name)}
          autoFocus
          error={hasSubmitted ? nameError : undefined}
        />
        <FormInput
          ref={emailInputRef}
          label="Email Address"
          value={email}
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          onChange={(email: string) => setEmail(email)}
          error={hasSubmitted ? emailError : undefined}
        />
        <FormInput
          ref={phoneInputRef}
          label="Phone Number"
          value={phone}
          type="tel"
          placeholder="e.g. 1234567890"
          onChange={(phone: string) => setPhone(phone)}
          error={hasSubmitted ? phoneError : undefined}
        />
      </form>
    </Card>
  );
}

const requiredFieldError = "This field is required";

function validateName(name: string): string | undefined {
  if (name.length === 0) {
    return requiredFieldError;
  }
}

function validateEmail(email: string): string | undefined {
  if (email.length === 0) {
    return requiredFieldError;
  }

  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "Invalid email";
  }
}

function validatePhoneNumber(phone: string): string | undefined {
  if (phone.length === 0) {
    return requiredFieldError;
  }

  if (!/^[0-9]*$/.test(phone)) {
    return "Should only contain numbers";
  }
}
