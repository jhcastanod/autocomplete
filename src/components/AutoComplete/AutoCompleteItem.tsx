import React, { FC } from "react";

import HighlightText from "./HighlightedText";

interface IAutoCompleteItem {
  name: string;
  onSelectItem: () => void;
  isHighlighted: boolean;
  text: string;
  key: string;
}

const AutoCompleteItem: FC<IAutoCompleteItem> = ({ name, onSelectItem, isHighlighted, text }) => (
    <li
      className={`list-group-item ${isHighlighted ? "active highlighted": ""}`}
      onClick={onSelectItem}
    >
      <HighlightText name={name} text={text} />
    </li>
  );

export default AutoCompleteItem;
