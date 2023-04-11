import { useDispatch } from "react-redux";
import { setAccountOpeningStep } from "../../redux/accountOpening";
import { type MouseEventHandler } from "react";
import styles from "./style.module.css";

interface PrevButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const PrevButton = ({ onClick }: PrevButtonProps) => {
  const dispatch = useDispatch();
  return (
    <button
      className={styles.previous}
      type='button'
      onClick={
        onClick
          ? onClick
          : () => dispatch(setAccountOpeningStep("bvn-validation"))
      }>
      Previous
    </button>
  );
};
