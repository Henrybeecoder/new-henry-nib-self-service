import { useDispatch } from "react-redux";
import { setStep } from "../../redux/global";
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
      onClick={onClick ? onClick : () => dispatch(setStep("bvn-validation"))}>
      Previous
    </button>
  );
};
