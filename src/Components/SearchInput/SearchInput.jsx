import {useState} from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import styles from './SearchInput.module.scss';



const SearchInput = ({ value, onChange }) => {
    const [isActive, setIsActive] = useState(false);
    const handleClose = () => {
        setIsActive(false);
        onChange("")
    }

    return (
        <div className={cn(styles.search, {[styles.active]: isActive})}>
            <input type="text"
                   className={styles.input}
                   placeholder="Search..."
                   onClick={() => setIsActive(true)}
                   value={value}
                   onChange={(e) => onChange(e.target.value)}
            />
            <button className={styles.reset} onClick={handleClose}>
                <div className={styles.handle}></div>
            </button>
        </div>
    )
}

export default SearchInput

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
