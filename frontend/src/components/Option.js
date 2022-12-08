import React from "react";
import cn from "classnames";
export default function Option({
	text,
	onClick,
	answerIsCorrect,
	isAnswered,
	clickedCountry,
	answer,
}) {
	return (
		<div
			onClick={(e) => onClick(e, text)}
			className={cn("option", {
				"correct":
					(isAnswered && clickedCountry === text && answerIsCorrect) ||
					(answer.name.common === text && isAnswered),
				"uncorrect": isAnswered && clickedCountry === text && !answerIsCorrect,
			})}
		>
			{text}
		</div>
	);
}
