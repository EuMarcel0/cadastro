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
	description: string;
	onCloseModalSave?: () => void;
	onCloseModaAndBack?: () => void;
}

export const ConfirmModalSave: React.FC<IConfirmModal> = ({ title, description, onCloseModalSave, onCloseModaAndBack }) => {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();
	const { id = 'nova' } = useParams<'id'>();


	const handleClose = () => {
		onCloseModalSave?.();
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
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button sx={{ borderRadius: '0' }} onClick={onCloseModaAndBack} variant='contained'>Salvar e fechar</Button>
					<Button sx={{ borderRadius: '0' }} onClick={onCloseModalSave} variant='outlined'>OK</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
