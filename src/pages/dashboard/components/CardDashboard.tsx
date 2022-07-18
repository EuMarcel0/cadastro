import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface ICardDashboardProps {
	title: string;
	description: string;
	image: string;
	alt: string;
	totalCount: number;
}

export const CardDashboard: React.FC<ICardDashboardProps> = ({ description, title, image, alt, totalCount }) => {
	return (

		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height='263px'
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
