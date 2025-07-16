/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDocument } from "../utils/format-cpf";

export const useFormatValues = () => {
  const handleFormatMinMaxValue = (
    event: any,
    minValue: number,
    maxValue?: number
  ) => {
    const regexNumber = /^[0-9]/;
    const value = event?.key;
    const asciiTable = {
      zero: 48,
    };

    const currentValue =
      event?.target?.value?.toString() + event?.key?.toString();

    if (!regexNumber.test(value)) return event?.preventDefault();

    if (currentValue.length < minValue.toString().length) return;

    if (parseInt(currentValue) < minValue) return event?.preventDefault();

    if (maxValue && parseInt(currentValue) > maxValue)
      return event?.preventDefault();

    const hasDigitZero =
      event?.which === asciiTable.zero || event?.keyCode === asciiTable.zero;

    if (
      value !== "" &&
      currentValue?.length <= 1 &&
      hasDigitZero &&
      minValue !== 0
    )
      return event.preventDefault();
  };

  const CPF_LENGTH = 14;

  const handleDocumentMask = (event: any) => {
    const inputSize = event?.target?.value.replace(/\D/g, "");

    if (inputSize?.length >= CPF_LENGTH) {
      return event?.preventDefault();
    }
    const formattedValue = formatDocument(inputSize);
    event.target.value = formattedValue;
  };

  return {
    handleFormatMinMaxValue,
    handleDocumentMask,
  };
};
