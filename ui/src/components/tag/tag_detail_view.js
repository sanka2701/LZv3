import React from 'react';
import { Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import BorderCol from '../../components/ui/content/bordered_content';
import ViewText from '../../components/ui/fields/view/view_text';

const TagDetailView = ({tag}) => (
	<BorderCol>
		<Row>
			<Col>
				<FormGroup>
					<Label>
						<FormattedMessage id={'tag.label'} defaultMessage={'Label'}/>
					</Label>
					<ViewText>
						{tag.label}
					</ViewText>
				</FormGroup>
			</Col>
		</Row>
	</BorderCol>
);

export default TagDetailView;