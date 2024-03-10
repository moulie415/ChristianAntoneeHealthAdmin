import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import moment from 'moment';
import {DateField, useRecordContext} from 'react-admin';
import {Profile} from '../types/Shared';

const Aside = () => {
  const record = useRecordContext<Profile>();
  return (
    <Box width={400} display={{xs: 'none', lg: 'block'}}>
      <Box ml={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              History
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={6} display="flex" gap={1}>
                <AccessTimeIcon fontSize="small" color="disabled" />
                <Box flexGrow={1}>
                  <Typography variant="body2">Sign up date</Typography>
                  <DateField
                    record={record}
                    transform={(val: number) => moment.unix(val).toDate()}
                    source="signUpDate"
                  />
                </Box>
              </Grid>

              <Grid item xs={6} display="flex" gap={1}>
                <AccessTimeIcon fontSize="small" color="disabled" />
                <Box flexGrow={1}>
                  <Typography variant="body2">Last seen</Typography>
                  <DateField record={record} source="last_seen" />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Aside;
