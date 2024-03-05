import './video.scss';
import { imageUrl } from 'helpers/process_env';

const ValentineVideo = () => {
    return (
        <div className='video-wrapper'>
            <div className='video-wrapper-box'>
                <video className='video' controls>
                    <source src={imageUrl + '/giftvideo.mp4'} type='video/mp4' />
                </video>
            </div>
        </div>
    );
};

export default ValentineVideo;
