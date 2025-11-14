import React from "react";

import { formatName } from "./utils";

type UserCardProps = {
  firstName: string;
  lastName: string;
};

const cardStyle: React.CSSProperties = {
  border: "2px solid #aaa",
  borderRadius: 8,
  padding: 12,
  width: 220,
  textAlign: "center",
  backgroundColor: "#000000",
  color: "#fff",
};

export function UserCard({ firstName, lastName }: UserCardProps) {
  return (
    <div style={cardStyle}>
      <h3>{formatName(firstName, lastName)}</h3>
      <p>👋 UserCard component from Remote App</p>
    </div>
  );
}

export default UserCard;
