import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Icon, IconButton } from '@mui/material';


interface IConfirmModal {
	handleDelete: () => void;
}

export const ConfirmModal: React.FC<IConfirmModal> = ({ handleDelete }) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Box>
			<IconButton onClick={handleClickOpen}>
				<Icon>delete</Icon>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Você deseja realmente apagar este arquivo?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Depois que deletar este registro, o mesmo não poderá ser restaurado ou reutilizado.
						Deseja prosseguir com a operação, em sua total responsabilidade?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined'>Abortar</Button>
					<Button onClick={handleDelete}
						variant='contained'
						autoFocus
					>
						Deletar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
