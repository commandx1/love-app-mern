import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ceyizBanner from 'components/ceyiz/ceyiz_banner.jpeg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import ActionMenu from './action-menu/action-menu';
import FavouriteIcon from './favourite-icon/favourite-icon';
import dayjs from 'dayjs';
import Slider from 'components/common/slick/slick';

const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ setItems, item, activeTab }) {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const { created_date, title, _id, s3_paths, color, description, more_description, is_favourite } = item;

    const subheader = dayjs(created_date).format('DD/MM/YYYY HH:mm');

    const handleExpandClick = () => setExpanded(prev => !prev);
    const handleActionClick = event => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            <ActionMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} item={item} setItems={setItems} />
            <Card style={{ width: '100%', height: '100%' }}>
                <CardHeader
                    avatar={
                        title ? (
                            <Avatar sx={{ bgcolor: color || red[500] }} aria-label='recipe'>
                                {title
                                    .split(' ')
                                    .map(word => word.charAt('0'))
                                    .join('')
                                    .toLocaleUpperCase()}
                            </Avatar>
                        ) : null
                    }
                    title={title}
                    subheader={subheader}
                    action={
                        <IconButton
                            aria-label='settings'
                            id='settings'
                            aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                            onClick={handleActionClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <Slider
                    previewUrls={
                        s3_paths?.map?.(s3_path => `${process.env.REACT_APP_IMAGE_URL}/${s3_path}`) || [ceyizBanner]
                    }
                />
                <CardContent style={{ marginTop: '1em' }}>
                    <Typography variant='body2' color='text.secondary'>
                        {description || 'Güzel eşyalarımızdan birisi 😇'}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <FavouriteIcon
                        ceyizItemId={_id}
                        isFavourite={is_favourite}
                        setItems={setItems}
                        activeTab={activeTab}
                    />
                    {Boolean(more_description) && (
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label='show more'
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    )}
                </CardActions>
                {Boolean(more_description) && (
                    <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <Typography>{more_description}</Typography>
                        </CardContent>
                    </Collapse>
                )}
            </Card>
        </>
    );
}
