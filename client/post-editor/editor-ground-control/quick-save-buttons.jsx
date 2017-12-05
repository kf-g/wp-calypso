/** @format */
/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { get } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import postUtils from 'lib/posts/utils';
import { isEnabled } from 'config';
import HistoryButton from 'post-editor/editor-ground-control/history-button';
import { recordEvent, recordStat } from 'lib/posts/stats';

const QuickSaveButtons = ( {
	isSaving,
	isSaveBlocked,
	isDirty,
	hasContent,
	loadRevision,
	post,
	translate,
	onSave,
	showRevisions = true,
} ) => {
	const onSaveButtonClick = () => {
		onSave();
		const eventLabel = postUtils.isPage( post )
			? 'Clicked Save Page Button'
			: 'Clicked Save Post Button';
		recordEvent( eventLabel );
		recordStat( 'save_draft_clicked' );
	};

	const isSaveAvailable =
		! isSaving &&
		! isSaveBlocked &&
		isDirty &&
		hasContent &&
		!! post &&
		! postUtils.isPublished( post );

	const showingStatusLabel = isSaving || ( post && post.ID && ! postUtils.isPublished( post ) );
	const showingSaveStatus = isSaveAvailable || showingStatusLabel;
	const hasRevisions =
		showRevisions &&
		isEnabled( 'post-editor/revisions' ) &&
		postUtils.deviceSupportsRevisions() &&
		get( post, 'revisions.length' );

	if ( ! ( showingSaveStatus || hasRevisions ) ) {
		return null;
	}

	return (
		<div className="editor-ground-control__quick-save">
			{ hasRevisions && <HistoryButton loadRevision={ loadRevision } /> }
			{ showingSaveStatus && (
				<div className="editor-ground-control__status">
					{ isSaveAvailable && (
						<button
							className="editor-ground-control__save button is-link"
							onClick={ onSaveButtonClick }
							tabIndex={ 3 }
						>
							{ translate( 'Save' ) }
						</button>
					) }
					{ ! isSaveAvailable &&
						showingStatusLabel && (
							<span
								className="editor-ground-control__save-status"
								data-e2e-status={ isSaving ? 'Saving…' : 'Saved' }
							>
								{ isSaving ? translate( 'Saving…' ) : translate( 'Saved' ) }
							</span>
						) }
				</div>
			) }
		</div>
	);
};

QuickSaveButtons.propTypes = {
	isSaving: PropTypes.bool,
	isSaveBlocked: PropTypes.bool,
	isDirty: PropTypes.bool,
	hasContent: PropTypes.bool,
	loadRevision: PropTypes.func.isRequired,
	post: PropTypes.object,
	onSave: PropTypes.func,

	// localize
	translate: PropTypes.func,
};

export default localize( QuickSaveButtons );
