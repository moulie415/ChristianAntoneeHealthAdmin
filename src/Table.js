import React from 'react';
import {Field} from 'react-final-form';

const Table = ({gender}) => {
  return (
    <table>
      <strong>{gender}</strong>
      <tbody>
        <tr>
          <th>Age</th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col1.higher`}
              component="input"
              type="number"
            />
          </th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col2.higher`}
              component="input"
              type="number"
            />
          </th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col3.higher`}
              component="input"
              type="number"
            />
          </th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col4.higher`}
              component="input"
              type="number"
            />
          </th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col5.higher`}
              component="input"
              type="number"
            />
          </th>
          <th>
            <Field
              style={{width: 60}}
              name={`${gender}.age.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.age.col6.higher`}
              component="input"
              type="number"
            />
          </th>
        </tr>
        <tr>
          <td>Excellent</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.excellent.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Good</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.good.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.good.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Above Average</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.aboveAverage.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Average</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.average.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.average.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Below Average</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.belowAverage.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Poor</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.poor.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
        <tr>
          <td>Very Poor</td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col1.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col1.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col2.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col2.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col3.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col3.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col4.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col4.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col5.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col5.higher`}
              component="input"
              type="number"
            />
          </td>
          <td>
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col6.lower`}
              component="input"
              type="number"
            />
            -
            <Field
              style={{width: 60}}
              name={`${gender}.veryPoor.col6.higher`}
              component="input"
              type="number"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
