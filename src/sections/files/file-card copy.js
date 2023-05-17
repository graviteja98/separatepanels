import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';

export const FilesCard = (props) => {
  const { company } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

console.log('Display File Details',company)



// for (let i = 0; i < company.length; i++) {
//   console.log(company[i].Filename);
// }

const handleButtonClick = () => {
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={'assets/logos/pdf.png'}
            variant="square"
          />
        </Box>
        
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >

          {company.Filename}
          
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {/* {'description'} */}
         
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {/* Updated 2hr ago */}
            createdAt:{company.createdAt}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {/* {'downloads'} Downloads */}
           FileSize: {company.FileSize}
          </Typography>
        </Stack>
      </Stack>
      <Button onClick={handleButtonClick}>View</Button>
      {/* <button onClick={handleButtonClick}>Open Modal</button> */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* <h2>Modal Title</h2> */}
            <p>File Name:{company.Filename}</p>
            <p>File Size:{company.FileSize}</p>
            <p>Created Date:{company.createdAt}</p>
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

FilesCard.propTypes = {
  company: PropTypes.object.isRequired
};
