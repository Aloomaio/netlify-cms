import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import c from 'classnames';
import history from 'Routing/history';
import { resolvePath } from 'Lib/pathHelper';
import { VIEW_STYLE_LIST, VIEW_STYLE_GRID } from 'Constants/collectionViews';

const EntryCard = ({
  collection,
  entry,
  inferedFields,
  publicFolder,
  viewStyle = VIEW_STYLE_LIST,
}) => {
  const label = entry.get('label');
  const isIndex = entry.get('slug') === "index";
  const title = label || entry.getIn(['data', inferedFields.titleField]);
  const path = `/collections/${collection.get('name')}/entries/${entry.get('slug')}`;
  let image = entry.getIn(['data', inferedFields.imageField]);
  image = resolvePath(image, publicFolder);
  if(image) {
    image = encodeURI(image);
  }

  if (viewStyle === VIEW_STYLE_LIST) {
    return (
      <Link to={path} style={{display:"block",marginTop:"0px"}} className={ (isIndex ? 'nc-collectionPage-sidebarLink nc-collectionPage-sidebarLink-active' : '') + ' nc-entryListing-listCard' }>
        {
          isIndex ? <div>OVERVIEW PAGE</div> : null
        }
        <h2 className="nc-entryListing-listCard-title">{title}</h2>
      </Link>
    );
  }

  if (viewStyle === VIEW_STYLE_GRID) {
    return (
      <Link to={path} style={{display:"block",marginTop:"0px"}} className={ (isIndex ? 'nc-collectionPage-sidebarLink nc-collectionPage-sidebarLink-active' : '') + ' nc-entryListing-gridCard' }>
        {
          isIndex ? <div>OVERVIEW PAGE</div> : null
        }
        <div className={c('nc-entryListing-cardBody', { 'nc-entryListing-cardBody-full': !image })}>
          <h2 className="nc-entryListing-cardHeading">{title}</h2>
        </div>
        {
          image
            ? <div
                className="nc-entryListing-cardImage"
                style={{ backgroundImage: `url(${ image })` }}
              />
            : null
        }
      </Link>
    );
  }
}

export default EntryCard;
