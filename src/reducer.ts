import { Reducer } from "react";
import { Addon, Plan, PriceType } from "./data";

export type Action =
  | ({
      type: "UPDATE_PERSONAL_INFO";
    } & Pick<State, "name" | "email" | "phoneNumber">)
  | { type: "UPDATE_PLAN"; plan: Plan }
  | { type: "TOGGLE_PRICE_TYPE" }
  | { type: "TOGGLE_PLAN_ADDON"; addon: Addon };

export type State = {
  name: string;
  email: string;
  phoneNumber: string;
  personalInfoCardKey: number;
  plan: Plan;
  priceType: PriceType;
  addons: Set<Addon>;
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        name: action.name,
        email: action.email,
        phoneNumber: action.phoneNumber,
        personalInfoCardKey: state.personalInfoCardKey + 1,
      };
    case "UPDATE_PLAN":
      return {
        ...state,
        plan: action.plan,
      };
    case "TOGGLE_PRICE_TYPE":
      return {
        ...state,
        priceType: state.priceType === "monthly" ? "yearly" : "monthly",
      };
    case "TOGGLE_PLAN_ADDON": {
      const updatedAddons = new Set(state.addons);

      if (updatedAddons.has(action.addon)) {
        updatedAddons.delete(action.addon);
      } else {
        updatedAddons.add(action.addon);
      }

      return {
        ...state,
        addons: updatedAddons,
      };
    }
    default:
      return state;
  }
};
