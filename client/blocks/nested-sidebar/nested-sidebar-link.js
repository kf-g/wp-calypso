/** @format */
/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

/**
 * internal dependencies
 */
import {
	setSidebarRoute,
	startSidebarTransition,
	endSidebarTransition,
} from 'state/sidebar/actions';

export class NestedSidebarLink extends Component {
	static defaultProps = {
		direction: 'right',
	};

	state = {
		renderChild: false,
	};

	onClick = () => {
		if ( !! this.props.children ) {
			this.setState( {
				renderChild: ! this.state.renderChild,
			} );
		}
	};

	render() {
		const showChild = this.props.children && ! this.state.renderChild;

		return (
			<div>
				<span
					onClick={ showChild ? this.onClick : null }
					style={ { color: showChild ? 'green' : 'black' } }
				>
					{ this.props.text }
					{ this.state.renderChild && this.props.children }
				</span>
			</div>
		);
	}
}

export default connect(
	state => ( {
		parentRoute: get( state, 'sidebar.parentRoute' ),
	} ),
	dispatch =>
		bindActionCreators(
			{
				setSidebarRoute,
				startSidebarTransition,
				endSidebarTransition,
			},
			dispatch
		)
)( NestedSidebarLink );
