import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface ICardDashboardProps {
	title: string;
	description: string;
	image: string;
	alt: string;
	totalCount: number | JSX.Element;

	handleClick?: () => void;
}

export const CardDashboard: React.FC<ICardDashboardProps> = ({ description, title, image, alt, totalCount, handleClick }) => {
	return (

		<Card sx={{ maxWidth: 350, height: '350px' }}>
			<CardActionArea onClick={handleClick} >
				<CardMedia
					component="img"
					image={image}
					alt={alt}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div" align='center'>
						{title}
					</Typography>
					<Box>
						<Typography variant="body2" color="text.secondary" align='center'>
							{description}
						</Typography>
						<Typography variant="h2" align='center'>
							{totalCount}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
