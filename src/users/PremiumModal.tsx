import {
  Box,
  Button,
  CircularProgress,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import moment from 'moment';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import * as api from '../helpers/api';
import {Entitlement} from '../types/Shared';

const PremiumModal: React.FC<{
  grant: boolean;
  open: boolean;
  handleClose: () => void;
  uid: string;
}> = ({grant, open, handleClose, uid}) => {
  const [loading, setLoading] = useState(false);
  const [entitlement, setEntitlement] = useState<Entitlement>('Premium');
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (grant && startTime && endTime) {
        await api.grantEntitlement(uid, entitlement, startTime, endTime);
      } else if (!grant) {
        await api.revokeEntitlement(uid, entitlement);
      }
      toast.success(`${entitlement} ${grant ? 'granted' : 'revoked'}`);
      handleClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
    setLoading(false);
  };

  const handlePremiumToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    entitlement: Entitlement,
  ) => {
    setEntitlement(entitlement);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // width: 400,
          bgcolor: 'background.paper',
          borderRadius: '15px',
          boxShadow: 24,
          p: 4,
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            style={{textAlign: 'center'}}
            gutterBottom
            component="h2">
            {`${grant ? 'Grant' : 'Revoke'} premium`}
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={entitlement}
            exclusive
            onChange={handlePremiumToggleChange}
            aria-label="Platform">
            <ToggleButton value="Premium">Premium</ToggleButton>
            <ToggleButton value="Premium Plus">Premium Plus</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {grant && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <div>
              <DatePicker
                label="Start time"
                minDate={moment()}
                format="DD/MM/YYYY"
                value={startTime ? moment(startTime) : undefined}
                onChange={val => {
                  if (val) {
                    setStartTime(val.valueOf());
                  }
                }}
              />
            </div>
            <div>
              <DatePicker
                label="End time"
                minDate={moment()}
                format="DD/MM/YYYY"
                value={endTime ? moment(endTime) : undefined}
                onChange={val => {
                  if (val) {
                    setEndTime(val.valueOf());
                  }
                }}
              />
            </div>
          </div>
        )}
        <Typography
          style={{width: 300, margin: '10px', textAlign: 'center'}}
          fontStyle="italic">
          Changes will take effect when the user next opens the app
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}>
          <Button
            onClick={onSubmit}
            disabled={loading || (grant && !(startTime && endTime))}
            endIcon={loading ? <CircularProgress size={20} /> : undefined}
            variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PremiumModal;
