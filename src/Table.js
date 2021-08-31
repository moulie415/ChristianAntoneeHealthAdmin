import * as React from 'react';
import {Field} from 'react-final-form';

const Table = ({gender}) => (
  <table>
    <strong>{gender}</strong>
    <tbody>
      <tr>
        <th></th>
        <th>18-25</th>
        <th>26-35</th>
        <th>36-45</th>
        <th>46-55</th>
        <th>56-65</th>
        <th>65+</th>
      </tr>
      <tr>
        <td>Excellent</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.excellent.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Good</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.eighteen.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.twentySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.thirtySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.fortySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.fiftySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.good.sixtyFive.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.good.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Above Average</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.eighteen.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.twentySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.thirtySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.fortySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.fiftySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.sixtyFive.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.aboveAverage.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Average</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.eighteen.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.twentySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.thirtySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.fortySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.fiftySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.average.sixtyFive.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.average.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Below Average</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.eighteen.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.twentySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.thirtySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.fortySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.fiftySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.sixtyFive.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.belowAverage.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Poor</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.eighteen.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.eighteen.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.twentySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.twentySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.thirtySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.thirtySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.fortySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.fortySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.fiftySix.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.fiftySix.higher`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.poor.sixtyFive.lower`}
            component="input"
            type="number"
          />
          <Field style={{width: 40}} 
            name={`${gender}.poor.sixtyFive.higher`}
            component="input"
            type="number"
          />
        </td>
      </tr>
      <tr>
        <td>Very Poor</td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.eighteen.lower`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.twentySix.lower`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.thirtySix.lower`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.fortySix.lower`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.fiftySix.lower`}
            component="input"
            type="number"
          />
        </td>
        <td>
          <Field style={{width: 40}} 
            name={`${gender}.veryPoor.sixtyFive.lower`}
            component="input"
            type="number"
          />
        </td>
      </tr>
    </tbody>
  </table>
);

export default Table;
