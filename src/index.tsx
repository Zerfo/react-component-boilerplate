import type { FC } from 'react';
import { clsx } from 'clsx';

import plus from 'plus';

import styles from './styles.scss';

interface IProps {
  text: string;
  warning?: boolean;
}

const Button: FC<IProps> = (props) => {
  const { text, warning = false } = props;

  return (
    <>
      <button className={clsx(styles.btn, { [styles.warning as string]: warning })}>{text}</button>
      <p>1 + 2 ={plus(1, 2)}</p>
    </>
  );
};

export default Button;
