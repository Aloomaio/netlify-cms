import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Loader } from 'UI';
import EntryListing from './EntryListing';

const Entries = ({
  collections,
  entries,
  publicFolder,
  page,
  onPaginate,
  isFetching,
  viewStyle
}) => {
  const loadingMessages = [
    'Loading Entries',
    'Caching Entries',
    'This might take several minutes',
  ];

  const sortedEntries = entries.sort(function(a, b) {
    if (!a || !b){
      return 0;
    }
    console.log(a.data, b.data);
    if (a.data && b.data){
      if (a.data.index){
        return parseFloat(a.data.index) - parseFloat(b.data.index);
      }
      if (a.data.date){
        return b.data.date - a.data.date;
      }
    } else {
      return 0;
    }
  });

  if (entries) {
    return (
      <EntryListing
        collections={collections}
        entries={sortedEntries}
        publicFolder={publicFolder}
        page={page}
        onPaginate={onPaginate}
        viewStyle={viewStyle}
      />
    );
  }

  if (isFetching) {
    return <Loader active>{loadingMessages}</Loader>;
  }

  return <div className="nc-collectionPage-noEntries">No Entries</div>;
}

Entries.propTypes = {
  collections: ImmutablePropTypes.map.isRequired,
  entries: ImmutablePropTypes.list,
  publicFolder: PropTypes.string.isRequired,
  page: PropTypes.number,
  isFetching: PropTypes.bool,
  viewStyle: PropTypes.string,
};

export default Entries;
