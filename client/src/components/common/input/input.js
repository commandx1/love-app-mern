import AntdInput from 'antd/lib/input';
import styles from './input.module.scss';
import AntdTextArea from 'antd/lib/input/TextArea';
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return <AntdInput className={styles.input} ref={ref} {...props} />;
});

const TextArea = props => <AntdTextArea className={styles.textarea} {...props} />;

Input.TextArea = TextArea;

export default Input;
