/** @format */

/**
 * External dependencies
 */

import React from 'react';
import { translate } from 'i18n-calypso';
import Gridicon from 'gridicons';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import {
	ButtonRow,
	Continue,
	makeTour,
	Next,
	SiteLink,
	Step,
	Tour,
} from 'layout/guided-tours/config-elements';

const ChangeButtonLabel = translate( 'Change' );
const ContinueButtonLabel = translate( 'Continue' );
const DoneButtonLabel = translate( 'Done' );

export const ChecklistSiteIconTour = makeTour(
	<Tour name="checklistSiteIcon" version="20171205" path="/non-existent-route" when={ noop }>
		<Step
			name="init"
			target="settings-site-icon-change"
			arrow="top-left"
			placement="below"
			style={ {
				animationDelay: '0.7s',
			} }
		>
			<p>
				{ translate(
					'Press {{ChangeButton/}} to upload your own image or icon that can help people identify your site in the browser.',
					{
						components: { ChangeButton: <strong>{ ChangeButtonLabel }</strong> },
					}
				) }
			</p>
			<ButtonRow>
				<Continue target="settings-site-icon-change" step="choose-image" click hidden />
				<SiteLink isButton={ false } href="/checklist/:site">
					{ translate( 'Return to the checklist' ) }
				</SiteLink>
			</ButtonRow>
		</Step>

		<Step
			name="choose-image"
			target="media-library-upload-more"
			placement="beside"
			arrow="left-top"
		>
			<p>
				{ translate( 'Pick or drag a file from your computer to add it to your media library.' ) }
			</p>
			<Next step="click-continue">{ translate( 'All done, continue' ) }</Next>
		</Step>

		<Step
			name="click-continue"
			target="dialog-base-action-confirm"
			arrow="bottom-center"
			placement="above"
		>
			<Continue target="dialog-base-action-confirm" step="click-done" click>
				{ translate( 'Good choice, press {{ContinueButton/}} to use it as your Site Icon.', {
					components: { ContinueButton: <strong>{ ContinueButtonLabel }</strong> },
				} ) }
			</Continue>
		</Step>

		<Step
			name="click-done"
			target="image-editor-button-done"
			arrow="bottom-center"
			placement="above"
		>
			<Continue target="image_editor_button_done" step="finish" click>
				{ translate(
					'Let’s make sure it looks right before you press {{DoneButton/}} to save your changes.',
					{ components: { DoneButton: <strong>{ DoneButtonLabel }</strong> } }
				) }
			</Continue>
		</Step>

		<Step name="finish" placement="right">
			<h1 className="tours__title">
				<span className="tours__completed-icon-wrapper">
					<Gridicon icon="checkmark" className="tours__completed-icon" />
				</span>
				{ translate( 'Excellent, you’re done!' ) }
			</h1>
			<p>
				{ translate(
					'Your Site Icon has been saved. Let’s move on and see what’s next on our checklist.'
				) }
			</p>
			<SiteLink isButton href={ '/checklist/:site' }>
				{ translate( 'Return to the checklist' ) }
			</SiteLink>
		</Step>
	</Tour>
);
