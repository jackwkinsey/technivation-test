import React from "react";

export default function Redeem(props) {
  const account = props.account;
  const points = props.points;

  return account.isEligibleForRewards && account.isEnrolledInRewards ? (
    <div>
      <div>Reward Points: {account.rewardPoints}</div>
      <button
        disabled={account.rewardPoints < points}
        type="button"
        className="btn btn-primary"
        onClick={() => props.onRedeem(account, points)}
      >
        Redeem Points
      </button>
    </div>
  ) : null;
}
