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
}

export const ConfirmModalDelete: React.FC<IConfirmModal> = ({ onDelete }) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		setOpen(false);
		onDelete();
	};

	const handleKeyDelete = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			console.log('Clicou Enter');
		}
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
					{'Você deseja realmente deletar este registro?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Depois que deletar este registro, o mesmo não poderá ser restaurado ou reutilizado.
						Deseja prosseguir com a operação, em sua total responsabilidade?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined'>Abortar</Button>
					<Button
						onClick={handleDelete}
						onKeyUp={() => handleKeyDelete}
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
