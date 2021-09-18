import React from 'react';
import {Field} from 'react-final-form';

const percentiles = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const PercentileTable = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Percentile</th>
          <th>Male</th>
          <th>Female</th>
        </tr>
        {percentiles.map(percentile => {
          return (
            <tr>
              <td>{`${percentile}th`}</td>
              <td>
                <Field
                  style={{width: 60}}
                  name={`mens.${percentile}th`}
                  component="input"
                  type="number"
                />
              </td>
              <td>
                <Field
                  style={{width: 60}}
                  name={`womens.${percentile}th`}
                  component="input"
                  type="number"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PercentileTable;
