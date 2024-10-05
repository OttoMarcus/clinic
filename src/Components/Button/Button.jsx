import { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) => {
    const {
        type='button',
        classname= '',
        click,
        children,
        boxView= false,
        underlineView= false,
        disabled= false,
    } = props;

    return (
        <button
            type={type}
            className={cn(styles.btnAbstract, classname, {
                [styles.boxView]: boxView,
                [styles.underlineView]: underlineView,
                [styles.disabled]: disabled
            })}
            onClick={click}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    classname: PropTypes.string,
    click: PropTypes.func,
    boxView: PropTypes.bool,
    underlineView: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};


export default memo(Button);
