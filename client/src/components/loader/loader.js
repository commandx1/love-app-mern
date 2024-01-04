import './loader.scss';

const Loader = ({ loading }) => {
    const classes = ['heartLoader'];

    if (loading) {
        classes.push('active');
    }

    return (
        <div className={classes.join(' ')}>
            <div className='heartLoader_relative'>
                <div className='heartLoader_heart'>
                    <div className='circle1'></div>
                    <div className='circle2'></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
