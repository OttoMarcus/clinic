import React from 'react';
import Button from '../../Button/Button.jsx';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Modal.module.scss';

const ModalFooter = (props) => {
    const {
        textFirst = '',
        textSecondary = '',
        clickFirst,
        clickSecondary,
        classnameFirst = '',
        classnameSecondary = '',
        disabledFirst = false,
        disabledSecondary = false
    } = props;

    return (
        <div className={styles.footerWrapper}>
            {textFirst && (
                <Button
                    boxView
                    classname={cn(styles.btnGreyWide, classnameFirst)}
                    click={clickFirst}
                    disabled={disabledFirst}
                >
                    {textFirst}
                </Button>
            )}
            {textSecondary && (
                <Button
                    underlineView
                    classname={cn(styles.btnBlackWide, classnameSecondary)}
                    click={clickSecondary}
                    disabled={disabledSecondary}
                >
                    {textSecondary}
                </Button>
            )}
        </div>
    );
}

ModalFooter.propTypes = {
    textFirst: PropTypes.string,
    textSecondary: PropTypes.string,
    clickFirst: PropTypes.func,
    clickSecondary: PropTypes.func,
    classnameFirst: PropTypes.string,
    classnameSecondary: PropTypes.string,
    disabled: PropTypes.bool
};



export default ModalFooter;
