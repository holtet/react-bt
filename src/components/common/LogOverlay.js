import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { locale } from 'date-fns/locale/nb/index.js';
import './LogOverlay.css';

LogOverlay.propTypes = {
  log: PropTypes.array.isRequired,
  closeNav: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

function LogOverlay({ style, closeNav, log = [] }) {
  return (
    <div className="overlay" style={style}>
      <div className="sidenav-container">
        <div className="text-center">
          <h2>Changelog</h2>
        </div>
        <a className="closebtn" onClick={closeNav}>
          ×
        </a>
        <div className="list-group">
          <table className="table table-dark" style={{ width: '95%' }}>
            <thead>
              <tr>
                <td>Time and date</td>
                <td>Field</td>
                <td>Changed from</td>
                <td>To</td>
              </tr>
            </thead>
            <tbody>
              {log.length > 0 &&
                log.map((li) => (
                  <tr key={li._links.self.href}>
                    <td>
                      {format(new Date(li.dateTime), 'HH:mm EEE dd.MM.yyyy', {
                        locale: locale,
                      })}
                    </td>
                    <td>{li.field}</td>
                    <td>{li.oldValue}</td>
                    <td>{li.newValue}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LogOverlay;
