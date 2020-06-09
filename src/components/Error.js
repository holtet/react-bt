import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  //   console.log('state ' + JSON.stringify(state));
  return {
    err: state.error,
  };
}

const Error = ({ err = undefined }) => {
  useEffect(() => {
    // console.log('UseEffect');
    if (err != undefined) {
      setTimeout(() => (err = undefined), 2000);
    }
  }, [err]);

  //   console.log('error ' + err);

  return err == undefined ? null : <div>Error happened: {err}</div>;
};

Error.propTypes = {
  err: PropTypes.string,
};
export default connect(mapStateToProps)(Error);
