import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography , Stack} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Roles } from 'src/components/roles';
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
 // console.log(Roles)
 
  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  function findKeyByValue(obj, value) {
    //console.log('R value',value)
    for (let key in obj) {
      
        if (obj[key] == value) {
            
          return key;
      }
    }
    return null;
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {auth?.user?.name}
        </Typography>
        <Typography variant="h4">
          <Stack direction="column">
            {auth?.user?.roles?.map((R, index) => (
            <Typography variant="subtitle1" color="secondary" key={index}>
            {findKeyByValue(Roles,R)}
        </Typography>))}</Stack>
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
