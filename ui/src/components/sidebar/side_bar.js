import React from 'react';
import { FormattedMessage } from 'react-intl';
import BorderCol from '../ui/content/bordered_content';
import { BORDER_SIDEBAR } from '../../utils/constant';
import UpcomingEvents from '../../containers/event/event_upcoming';
import PhotoSidebar from '../../containers/photo/photo_sidebar';

export default () => (
    <div>
        <BorderCol type={BORDER_SIDEBAR} >
            <h4>
                <FormattedMessage  id='nav.photoOfTheWeek' defaultMessage='Photo Of The Week' />
            </h4>
            <PhotoSidebar />
        </BorderCol>
        <BorderCol type={BORDER_SIDEBAR} >
            <h4>
                <FormattedMessage  id='event.upcomingEvents' defaultMessage='Upcoming Events' />
            </h4>
            <UpcomingEvents />
        </BorderCol>
    </div>
);