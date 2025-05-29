export const addDotsToNumber = (number: number) => {
  return number.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export interface BottomSheetRefType {
  open: () => void;
  close: () => void;
}
