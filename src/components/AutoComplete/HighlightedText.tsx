import React, { FC } from "react";

interface IHighlightedText {
  name: string;
  text: string
};

const HighlightText: FC<IHighlightedText> = ({ name, text }) => (
	<div key={name}>
		{name
			.split("")
			.map((char) =>
				text.toLowerCase().includes(char.toLowerCase()) ? (
					<mark>{char}</mark>
				) : (
					<span>{char}</span>
				)
			)}
	</div>
);

export default HighlightText;