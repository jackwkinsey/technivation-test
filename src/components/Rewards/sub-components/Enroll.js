import React from "react";

export default function Enroll(props) {
  const account = props.account;

  return account.isEligibleForRewards && !account.isEnrolledInRewards ? (
    <div>
      <div>Eligible For Rewards</div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => props.onEnroll(account)}
      >
        Enroll Now
      </button>
    </div>
  ) : null;
}
