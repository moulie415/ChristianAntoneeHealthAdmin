import {useController} from 'react-hook-form';

const percentiles = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const MyInput: React.FC<{percentile: number; name: string}> = ({
  percentile,
  name,
}) => {
  const controller = useController({
    name: `${name}${percentile}th`,
    defaultValue: '',
  });
  return (
    <input
      {...controller.field}
      style={{width: 60}}
      name={`womens.${percentile}th`}
      type="number"
    />
  );
};

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
            <tr key={percentile}>
              <td>{`${percentile}th`}</td>
              <td>
                <MyInput name={`mens.`} percentile={percentile} />
              </td>
              <td>
                <MyInput name={`womens.`} percentile={percentile} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PercentileTable;
