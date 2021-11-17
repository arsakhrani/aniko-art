import React from "react"
import { ReactComponent as MasterCard } from "../../assets/icons/payment-methods/master-card-logo.svg"
import { ReactComponent as VisaCard } from "../../assets/icons/payment-methods/visa-logo.svg"
import { ReactComponent as CreditCard } from "../../assets/icons/payment-methods/credit-card-icon.svg"
import { ReactComponent as AxaInsurance } from "../../assets/icons/insurance-methods/axa-logo.svg"

export default function RadialInput({
  label,
  name,
  masterCard,
  visaCard,
  creditCard,
  axaInsurance,
  onClick,
  checked,
}) {
  return (
    <div onClick={onClick} className="radial-input">
      <input checked={checked} name={name} type="radio" />
      {masterCard && (
        <span>
          <MasterCard />
        </span>
      )}
      {visaCard && (
        <span>
          <VisaCard />
        </span>
      )}
      {creditCard && (
        <span>
          <CreditCard />
        </span>
      )}
      {axaInsurance && (
        <span>
          <AxaInsurance />
        </span>
      )}
      <label>{label}</label>
    </div>
  )
}
