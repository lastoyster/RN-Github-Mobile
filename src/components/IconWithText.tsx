import React from "react";
import FlexContainer from "./FlexContainer";
import Octicons from "@expo/vector-icons/Octicons";
import { SPACES } from "../constants";
import Divider from "./Divider";

const { small, medium } = SPACES;

interface ListItemProps {
  /** When left is a string, it will be rendered as an icon */
  left: React.ReactElement | string;
  right: React.ReactElement;
}
const ListItem = ({ left, right }: ListItemProps) => {
  return (
    <FlexContainer style={{ marginBottom: small }}>
      {typeof left === "string" ? (
        <Octicons name={left as any} size={15} color="gray" />
      ) : (
        left
      )}
      <Divider direction="horizontal" size={small} />
      {right}
    </FlexContainer>
  );
};

export default ListItem;
