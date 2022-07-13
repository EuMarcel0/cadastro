import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Icon, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


interface IConfirmModal {
	title: string;
	onCloseModaSave?: () => void;
}

export const ConfirmModalSave: React.FC<IConfirmModal> = ({ title, onCloseModaSave }) => {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();
	const { id = 'nova' } = useParams<'id'>();


	const handleClose = () => {
		onCloseModaSave?.();
		setOpen(false);
		navigate(id !== 'nova' ? '' : '/pessoas');
	};

	return (
		<Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{''}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCloseModaSave} variant='outlined'>Fechar</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
