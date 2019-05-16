export const getPositionClicked = (event: MouseEvent): { left: number, top: number } => ({
  left: event.pageX,
  top: event.pageY
});