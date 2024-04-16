import {Typography} from '@mui/material';
import React from 'react';
import {useController} from 'react-hook-form';

const MyInput: React.FC<{gender: string; name: string}> = ({gender, name}) => {
  const controller = useController({
    name: `${gender}${name}`,
    defaultValue: '',
  });
  return (
    <input
      {...controller.field}
      style={{width: 60}}
      // @ts-ignore
      component="input"
      type="number"
    />
  );
};

const Table: React.FC<{gender: string}> = ({gender}) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {gender}
      </Typography>
      <table>
        <tbody>
          <tr>
            <th>Age</th>
            <th>
              <MyInput gender={gender} name=".age.col1.lower" />
              -
              <MyInput gender={gender} name=".age.col1.higher" />
            </th>
            <th>
              <MyInput gender={gender} name=".age.col2.lower" />
              -
              <MyInput gender={gender} name=".age.col2.higher" />
            </th>
            <th>
              <MyInput gender={gender} name=".age.col3.lower" />
              -
              <MyInput gender={gender} name=".age.col3.higher" />
            </th>
            <th>
              <MyInput gender={gender} name=".age.col4.lower" />
              -
              <MyInput gender={gender} name=".age.col4.higher" />
            </th>
            <th>
              <MyInput gender={gender} name=".age.col5.lower" />
              -
              <MyInput gender={gender} name=".age.col5.higher" />
            </th>
            <th>
              <MyInput gender={gender} name=".age.col6.lower" />
              -
              <MyInput gender={gender} name=".age.col6.higher" />
            </th>
          </tr>
          <tr>
            <td>Excellent</td>
            <td>
              <MyInput gender={gender} name=".excellent.col1.lower" />
              -
              <MyInput gender={gender} name=".excellent.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".excellent.col2.lower" />
              -
              <MyInput gender={gender} name=".excellent.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".excellent.col3.lower" />
              -
              <MyInput gender={gender} name=".excellent.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".excellent.col4.lower" />
              -
              <MyInput gender={gender} name=".excellent.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".excellent.col5.lower" />
              -
              <MyInput gender={gender} name=".excellent.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".excellent.col6.lower" />
              -
              <MyInput gender={gender} name=".excellent.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Good</td>
            <td>
              <MyInput gender={gender} name=".good.col1.lower" />
              -
              <MyInput gender={gender} name=".good.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".good.col2.lower" />
              -
              <MyInput gender={gender} name=".good.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".good.col3.lower" />
              -
              <MyInput gender={gender} name=".good.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".good.col4.lower" />
              -
              <MyInput gender={gender} name=".good.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".good.col5.lower" />
              -
              <MyInput gender={gender} name=".good.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".good.col6.lower" />
              -
              <MyInput gender={gender} name=".good.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Above Average</td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col1.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col2.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col3.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col4.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col5.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".aboveAverage.col6.lower" />
              -
              <MyInput gender={gender} name=".aboveAverage.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Average</td>
            <td>
              <MyInput gender={gender} name=".average.col1.lower" />
              -
              <MyInput gender={gender} name=".average.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".average.col2.lower" />
              -
              <MyInput gender={gender} name=".average.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".average.col3.lower" />
              -
              <MyInput gender={gender} name=".average.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".average.col4.lower" />
              -
              <MyInput gender={gender} name=".average.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".average.col5.lower" />
              -
              <MyInput gender={gender} name=".average.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".average.col6.lower" />
              -
              <MyInput gender={gender} name=".average.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Below Average</td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col1.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col2.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col3.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col4.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col5.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".belowAverage.col6.lower" />
              -
              <MyInput gender={gender} name=".belowAverage.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Poor</td>
            <td>
              <MyInput gender={gender} name=".poor.col1.lower" />
              -
              <MyInput gender={gender} name=".poor.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".poor.col2.lower" />
              -
              <MyInput gender={gender} name=".poor.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".poor.col3.lower" />
              -
              <MyInput gender={gender} name=".poor.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".poor.col4.lower" />
              -
              <MyInput gender={gender} name=".poor.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".poor.col5.lower" />
              -
              <MyInput gender={gender} name=".poor.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".poor.col6.lower" />
              -
              <MyInput gender={gender} name=".poor.col6.higher" />
            </td>
          </tr>
          <tr>
            <td>Very Poor</td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col1.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col1.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col2.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col2.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col3.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col3.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col4.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col4.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col5.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col5.higher" />
            </td>
            <td>
              <MyInput gender={gender} name=".veryPoor.col6.lower" />
              -
              <MyInput gender={gender} name=".veryPoor.col6.higher" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
