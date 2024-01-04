import { Image } from '@mui/icons-material';
import Typography from 'antd/lib/typography/Typography';
import AntdDragger from 'antd/lib/upload/Dragger';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

const Dragger = ({ ...props }) => {
    return (
        <AntdDragger customRequest={dummyRequest} on showUploadList={false} {...props}>
            <Typography>
                <Image />
            </Typography>
            <Typography>Resim yüklemek için tıklayın ya da resmi bu alana sürükleyin</Typography>
        </AntdDragger>
    );
};

export default Dragger;
