import cn from 'classnames'
import styles from './PlainBtn.module.scss'


const PlainBtn = (props) => {
    return (
        <button className={cn(styles.btnWrapper, props.classname)}>
            <div className={styles.round}>
                <div className={styles.inner}>{props.children}</div>
            </div>
        </button>
    )
}

export default PlainBtn