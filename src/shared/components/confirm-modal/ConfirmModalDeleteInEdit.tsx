import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Icon, IconButton } from '@mui/material';


interface IConfirmModal {
	onDelete: () => void;
	onCloseModal: () => void;
}

export const ConfirmModalDeleteInEdit: React.FC<IConfirmModal> = ({ onDelete, onCloseModal }) => {
	const [open, setOpen] = React.useState(true);


	const handleClose = () => {
		onCloseModal();
	};

	const handleDelete = () => {
		setOpen(false);
		onDelete();
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
					{'Você deseja realmente deletar este registro?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Depois que deletar este registro, o mesmo não poderá ser restaurado ou reutilizado.
						Deseja prosseguir com a operação, em sua total responsabilidade?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCloseModal} variant='outlined'>Abortar</Button>
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
