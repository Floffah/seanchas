import { queryHelpers } from "@testing-library/react";

export const queryBySlot = queryHelpers.queryByAttribute.bind(
    null,
    "data-slot",
);
