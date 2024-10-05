import PropTypes from 'prop-types'
import  useScroll from '../../helper/useScroll.js'
import styles from './BgWallpaper.module.scss'

const BgWallpaper = ({anouncement}) => {
    const scrollPosition = useScroll();

    return (
        <div className={styles.framer}>

            <div className={styles.frame}>
                <div className={styles.docDescription}
                     style={{
                         transform: `translateY(${ scrollPosition * 0.5}px)`,
                         opacity: `${1 - scrollPosition * 0.005}`
                     }}>
                    {anouncement}
                </div>
            </div>
        </div>
    )
}

BgWallpaper.propTypes = {
    anouncement: PropTypes.string.isRequired
}

export default BgWallpaper