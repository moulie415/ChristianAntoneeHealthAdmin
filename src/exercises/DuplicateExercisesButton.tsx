import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';

const DuplicateExercisesButton: React.FC<{source: string}> = ({source}) => {
  const context = useFormContext();

  const exercises = context?.getValues(source);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(1);
  return (
    <>
      <Button
        disabled={!exercises?.length}
        style={{marginTop: -20, marginBottom: 20}}
        onClick={handleOpen}
        variant="contained"
        color="primary">
        Duplicate exercises
      </Button>
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
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How many times?
          </Typography>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <input
              style={{margin: '10px 0 20px'}}
              type="number"
              min={1}
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
            />
            <Button
              disabled={!value}
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
                const arr = [];
                for (let i = 0; i <= value; i++) {
                  arr.push(...exercises);
                }
                context.setValue(source, arr, {shouldDirty: true});
              }}>
              Duplicate
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DuplicateExercisesButton;
